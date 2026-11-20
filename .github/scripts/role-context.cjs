'use strict';

const { execFileSync } = require('node:child_process');

function section(body, title) {
  const lines = (body ?? '').split(/\r?\n/);
  const start = lines.indexOf(title);
  if (start < 0) throw new Error(`Manca la sezione ${title}`);
  const end = lines.findIndex((line, i) => i > start && /^#{1,3} /.test(line));
  return lines.slice(start + 1, end < 0 ? undefined : end).join('\n').trim();
}

function taskInputs(body) {
  const revision = section(body, '### Commit delle specifiche');
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('Indica lo SHA completo delle specifiche.');
  const paths = section(body, '### Specifica (file di docs/ da leggere)').split(/\n+/).map(s => s.trim());
  if (!paths.every(p => /^docs\/(rad\/uc|test|modelli|sdd|contratti)\/(?:[\w-]+\/)*[\w.-]+\.(md|csv|puml|mmd|json|ya?ml)$/i.test(p))) {
    throw new Error('Indica un percorso testuale di specifica per riga.');
  }
  if (!paths.some(p => p.startsWith('docs/rad/uc/')) || !paths.some(p => p.startsWith('docs/test/'))) {
    throw new Error('Servono il caso d’uso e la Category Partition.');
  }
  const acceptance = section(body, '### Criteri di accettazione');
  if (!acceptance || acceptance === '_No response_') throw new Error('Mancano i criteri di accettazione.');
  const frames = {};
  for (const line of section(body, '### Category Partition, test frame ed esiti attesi').split('\n')) {
    const match = /^(TF[\w.-]*)\s*\|\s*(.+)$/i.exec(line.trim());
    if (!match || !match[2].trim()) throw new Error('Descrivi ciascun frame come TF01 | esito atteso.');
    const id = match[1].toUpperCase();
    if (Object.hasOwn(frames, id)) throw new Error('Frame duplicato nella Issue.');
    frames[id] = match[2].trim();
  }
  return { revision, paths, acceptance, frames };
}

function checkEvidence(body, frames) {
  const rows = section(body, '## Verifica dei frame').replace(/<!--[\s\S]*?-->/g, '').trim().split('\n');
  const missing = new Set(Object.keys(frames));
  for (const row of rows) {
    const [id, status, detail, evidence] = row.split('|').map(s => s.trim());
    if (!missing.delete(id?.toUpperCase()) || !['superato', 'non eseguibile'].includes(status) || !detail || !evidence) {
      throw new Error('Completa ogni frame una volta con stato, test o motivo, ed evidenza.');
    }
  }
  if (missing.size) throw new Error(`Mancano le evidenze per ${[...missing].join(', ')}.`);
}

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
}

function buildContext(phase, issue, base, head) {
  const { revision, paths, acceptance, frames } = taskInputs(issue.body);
  git('merge-base', '--is-ancestor', revision, base);
  const models = {};
  for (const path of paths) {
    const entry = git('ls-tree', revision, '--', path);
    if (!/^100(?:644|755) blob /.test(entry)) throw new Error(`Documento assente o non regolare: ${path}`);
    if (path.endsWith('/_TEMPLATO_UC.md')) throw new Error('Sostituisci il template con il caso d’uso del task.');
    if (phase === 'test' && !/^docs\/(rad\/uc|test|contratti)\//.test(path)) continue;
    models[path] = git('show', `${revision}:${path}`);
    if (!models[path].trim()) throw new Error(`Documento vuoto: ${path}`);
  }
  const packet = { phase, issue: issue.number, revision, models, acceptance, frames };
  if (phase === 'test' || phase === 'revisione') {
    const role = phase === 'test' ? 'tester' : 'revisore';
    packet.instructions = git('show', `${base}:.github/agents/${role}.agent.md`);
  }
  if (phase === 'revisione') {
    if (!/^[a-f0-9]{40}$/.test(head)) throw new Error('SHA della PR mancante.');
    packet.scope = section(issue.body, '### Ambito (classi, componenti o endpoint da toccare)');
    packet.head = head;
    packet.diff = git('diff', '--no-ext-diff', '--no-textconv', `${base}...${head}`, '--');
  }
  return packet;
}

module.exports = { taskInputs, checkEvidence, buildContext };
