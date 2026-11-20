'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const { buildContext } = require('./role-context.cjs');

test('dossier e processi separati per tester e revisore, con un frame sintetico', (t) => {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'gps-fixture-'));
  const original = process.cwd();
  t.after(() => { process.chdir(original); fs.rmSync(repo, { recursive: true, force: true }); });
  process.chdir(repo);
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
  const write = (file, data) => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, data);
  };
  const commit = () => {
    git('add', '.');
    git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'fixture');
    return git('rev-parse', 'HEAD');
  };
  git('init', '-q');
  for (const role of ['tester', 'revisore']) {
    const profile = `.github/agents/${role}.agent.md`;
    write(profile, fs.readFileSync(path.join(original, profile)));
  }
  write('docs/rad/uc/prova.md', 'raddoppia(n) restituisce il doppio di n.');
  write('docs/test/prova.json', JSON.stringify({ TF01: { input: 4, expected: 8 } }));
  write('docs/modelli/dettagli.md', 'Modello interno per la revisione');
  write('implementazione.py', 'def raddoppia(n): return n');
  const base = commit();
  write('implementazione.py', 'def raddoppia(n): return n * 2  # sorgente-fixture');
  const head = commit();
  const issue = { number: 42, body: [
    '### Specifica (file di docs/ da leggere)', 'docs/rad/uc/prova.md', 'docs/test/prova.json', 'docs/modelli/dettagli.md',
    '### Commit delle specifiche', base, '### Category Partition, test frame ed esiti attesi', 'TF01 | 8',
    '### Criteri di accettazione', 'Quattro diventa otto.', '### Ambito (classi, componenti o endpoint da toccare)', 'raddoppia',
  ].join('\n') };
  assert.throws(() => buildContext('test', { ...issue, body: issue.body.replace('docs/modelli/dettagli.md', 'implementazione.py') }, base, head));
  const tester = buildContext('test', issue, base, head);
  const reviewer = buildContext('revisione', issue, base, head);
  assert.doesNotMatch(JSON.stringify(tester), /sorgente-fixture|Modello interno|implementazione\.py/);
  assert.match(reviewer.diff, /sorgente-fixture/);
  assert.ok(reviewer.models['docs/modelli/dettagli.md']);

  const runner = path.join(original, '.github/scripts/run-isolated-role.sh');
  const run = (code, data) => {
    const adapter = path.join(repo, 'adapter.py');
    write(adapter, code);
    return spawnSync('bash', [runner, adapter], { input: JSON.stringify(data), encoding: 'utf8', timeout: 120000 });
  };
  const sandboxChecks = [
    'import json, os, sys',
    `assert not os.path.exists(${JSON.stringify(path.join(repo, 'implementazione.py'))})`,
    'assert set(os.listdir("/sys/class/net")) == {"lo"}',
    'assert "GITHUB_TOKEN" not in os.environ',
    'packet = json.load(sys.stdin)',
  ];
  const generated = run([...sandboxChecks,
    'assert "diff" not in packet',
    'frame = json.loads(packet["models"]["docs/test/prova.json"])["TF01"]',
    'print("assert raddoppia(%r) == %r" % (frame["input"], frame["expected"]))',
  ].join('\n'), tester);
  assert.equal(generated.status, 0, generated.stderr);
  const assertion = generated.stdout.trim();
  assert.equal(assertion, 'assert raddoppia(4) == 8');
  const exercise = (revision) => run(git('show', `${revision}:implementazione.py`) + '\n' + assertion, {});
  const correct = exercise(head);
  assert.equal(correct.status, 0, correct.stderr);
  const incorrect = exercise(base);
  assert.equal(incorrect.status, 1);
  assert.match(incorrect.stderr, /AssertionError/);
  const review = run([...sandboxChecks, 'assert "sorgente-fixture" in packet["diff"]',
    'assert "docs/modelli/dettagli.md" in packet["models"]'].join('\n'), reviewer);
  assert.equal(review.status, 0, review.stderr);
});
