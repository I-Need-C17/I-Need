const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {test} = require('node:test');
const {approvedPlan, readPlanMarkdown} = require('./piano.cjs');

const tm = {id: 1, type: 'User', login: 'tm'};
const bot = {id: 2, type: 'Bot', login: 'github-actions[bot]'};
const issue = {
  state: 'open', title: 'Documentazione', body: 'Contenuto della Issue',
  assignees: [tm], labels: [{name: 'task-agente'}, {name: 'area:frontend'}],
};
const created = '2026-11-21T12:00:00Z';
const candidates = ['README.md', 'docs/README.md'];
const plan = {
  cycle: 1, assigned: tm.id, title: issue.title, body: issue.body,
  area: 'frontend', status: 'da-approvare', candidates,
};

function comment(id, user, body) {
  return {id, user, body, created_at: created, updated_at: created};
}

function proposal(id, data) {
  return comment(id, bot, '<!-- i-need:piano 1 ' + JSON.stringify(data) + ' -->\n# Piano');
}

function approval(id, user, files, planId = '') {
  return comment(id, user, ['APPROVO PIANO' + planId, 'File autorizzati:',
    ...files.map(file => '- ' + file)].join('\n'));
}

function approve(comments) {
  const github = {
    rest: {
      issues: {
        get: async () => ({data: issue}),
        listEvents: {},
        listComments: {},
      },
      repos: {
        getCollaboratorPermissionLevel: async () => ({data: {permission: 'write'}}),
      },
    },
    paginate: async method => method === github.rest.issues.listEvents
      ? [{id: 1, event: 'labeled', label: {name: 'fase:piano'}}] : comments,
  };
  return approvedPlan(github, {owner: 'I-Need-C17', repo: 'I-Need'}, 9);
}

test('pubblica Markdown con titoli, elenchi e testo libero', t => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'i-need-piano-'));
  t.after(() => fs.rmSync(directory, {recursive: true, force: true}));
  const filename = path.join(directory, 'piano.md');
  const markdown = '# Proposta\n\n- Aggiornare `README.md`.';
  fs.writeFileSync(filename, markdown);
  assert.equal(readPlanMarkdown(filename), markdown);
  fs.writeFileSync(filename, '  \n');
  assert.throws(() => readPlanMarkdown(filename), /10\.000 caratteri/);
});

test('usa solo i file autorizzati dal TM tra i candidati', async () => {
  const {plan: approved} = await approve([proposal(2, plan), approval(3, tm, ['README.md'], ' 2')]);
  assert.deepEqual(approved.files, ['README.md']);
});

test('rifiuta elenchi vuoti, duplicati o fuori perimetro', async () => {
  for (const files of [[], ['README.md', 'README.md'], ['AGENTS.md']]) {
    await assert.rejects(approve([proposal(2, plan), approval(3, tm, files)]), /percorsi esatti|file candidati/);
  }
});

test('rifiuta un altro autore o un commento di approvazione modificato', async () => {
  const other = {...tm, id: 3};
  const edited = {...approval(3, tm, ['README.md']), updated_at: '2026-11-21T12:01:00Z'};
  for (const invalid of [approval(3, other, ['README.md']), edited]) {
    await assert.rejects(approve([proposal(2, plan), invalid]), /nuovo commento di approvazione/);
  }
});

test('richiede una nuova approvazione dopo una ripianificazione', async () => {
  const comments = [proposal(2, plan), approval(3, tm, ['README.md']), proposal(4, {...plan, version: 2})];
  await assert.rejects(approve(comments), /nuovo commento di approvazione/);
  await assert.rejects(approve([...comments, approval(5, tm, ['README.md'], ' 2')]), /APPROVO PIANO/);
  await assert.rejects(approve([...comments, comment(5, tm, 'RICHIESTA REVISIONE PIANO: chiarire le verifiche'),
    approval(6, tm, ['README.md'])]), /Ripianificazione pendente/);
});

test('mantiene il blocco automatico sulle fonti mancanti', async () => {
  await assert.rejects(approve([proposal(2, {...plan, status: 'bloccato'}), approval(3, tm, ['README.md'])]),
    /piano obsoleti/);
});

test('i piani precedenti richiedono ancora la lista esatta di file', async () => {
  const legacy = proposal(2, {...plan, status: 'pronto', files: ['README.md']});
  await assert.rejects(approve([legacy, approval(3, tm, candidates)]), /formato precedente/);
  const {plan: approved} = await approve([legacy, approval(3, tm, ['README.md'])]);
  assert.deepEqual(approved.files, ['README.md']);
});
