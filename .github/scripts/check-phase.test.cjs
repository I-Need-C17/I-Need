'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { checkPhase, taskDigest } = require('./check-phase.cjs');

const label = (name) => ({ name });
const issue = {
  body: [
    '### Specifica (file di docs/ da leggere)', 'docs/rad/uc/prova.md', 'docs/test/prova.md',
    '### Commit delle specifiche', 'a'.repeat(40),
    '### Category Partition, test frame ed esiti attesi', 'TF01 | valido',
    '### Criteri di accettazione', 'Il valore è valido.',
  ].join('\n'),
  number: 42, state: 'open', assignees: [{ login: 'Tm' }],
  labels: ['task-agente', 'fase:implementazione'].map(label),
};
const url = 'https://github.com/I-Need-C17/I-Need/issues/42#issuecomment-100';
const date = '2026-11-20T12:00:00Z';
const plan = { id: 100, user: { login: 'Pm' }, body: `## Piano\nPiano sintetico\nInput: ${taskDigest(issue.body)}`, html_url: url, created_at: date };
const approval = { id: 101, user: { login: 'Tm' }, body: `Piano approvato: ${url}`, created_at: date };
const pr = {
  state: 'open', draft: true, labels: ['fase:test'].map(label),
  head: { repo: { id: 1 } }, base: { ref: 'main' },
  body: 'Closes #42\n## Verifica dei frame\nTF01 | superato | test_valid: assert | valido\n## Verifica prima di Ready for review\n- [x] Ho verificato i test e gli esiti attesi',
};

const input = (phase, payload = {}, overrides = {}) => ({
  phase,
  payload: {
    repository: { id: 1 },
    sender: { type: 'User', login: phase === 'piano' ? 'pm' : 'tm' },
    issue,
    ...payload,
  },
  pmLogins: 'Pm, SecondoPm',
  tmLogins: 'Tm, AltroTm',
  getIssue: async (number) => {
    assert.equal(number, 42);
    return issue;
  },
  listComments: async (number) => {
    assert.equal(number, 42);
    return [plan, approval];
  },
  ...overrides,
});

test('passano i quattro checkpoint con identità e artefatti attesi', async () => {
  await checkPhase(input('piano'));
  await checkPhase(input('implementa'));
  await checkPhase(input('test', { pull_request: pr }));
  await checkPhase(input('revisione', { pull_request: { ...pr, draft: false } }));
});

test('solo un PM umano può avviare il piano e serve un TM assegnato', async () => {
  await assert.rejects(checkPhase(input('piano', { sender: { type: 'User', login: 'Tm' } })), /Solo un PM/);
  await assert.rejects(checkPhase(input('piano', { sender: { type: 'Bot', login: 'Pm' } })), /account umano/);
  await assert.rejects(checkPhase(input('piano', {}, { tmLogins: '' })), /Assegna la Issue/);
  await assert.rejects(checkPhase(input('piano', {}, { tmLogins: 'Pm' })), /login distinti/);
});

test('l’approvazione vale per il piano più recente e il TM assegnato', async () => {
  await assert.rejects(checkPhase(input('implementa', {
    sender: { type: 'User', login: 'AltroTm' },
  })), /assegnatario/);
  const pending = (comments) => checkPhase(input('implementa', {}, { listComments: async () => comments }));
  await assert.rejects(pending([plan]), /approvare il piano/);
  await assert.rejects(pending([plan, approval, { ...plan, id: 102, html_url: url.replace('100', '102') }]), /piano più recente/);
  await assert.rejects(pending([{ ...plan, updated_at: '2026-11-20T12:01:00Z' }, approval]), /piano più recente/);
});

test('il test richiede una Draft PR interna con un collegamento univoco', async () => {
  const check = (changes) => checkPhase(input('test', { pull_request: { ...pr, ...changes } }));
  await assert.rejects(check({ draft: false }), /Draft PR/);
  await assert.rejects(check({ head: { repo: { id: 2 } } }), /stesso repository/);
  await assert.rejects(check({ body: 'Closes #42\nCloses #43' }), /una sola Issue/);
  await assert.rejects(check({ labels: [] }), /fase:test/);
});

test('la revisione richiede Ready for review e la conferma dei test', async () => {
  await assert.rejects(checkPhase(input('revisione', { pull_request: pr })), /Ready for review/);
  await assert.rejects(checkPhase(input('revisione', {
    pull_request: { ...pr, draft: false, body: pr.body.replace('[x]', '[ ]') },
  })), /verificato i test/);
});

test('le variazioni agli input e le incongruenze richiedono un nuovo piano approvato', async () => {
  const updated = { ...issue, body: issue.body.replace('TF01 | valido', 'TF01 | rifiutato') };
  await assert.rejects(checkPhase(input('implementa', { issue: updated })), /piano/);
  const report = { ...approval, id: 102, html_url: url + '2', body: '## Incongruenza modelli\nDue esiti diversi.' };
  const decision = { ...plan, id: 103, body: `## Decisione modelli\n${report.html_url}\nCon il team confermiamo il modello.` };
  const run = (extra) => checkPhase(input('implementa', {}, { listComments: async () => [plan, approval, report, ...extra] }));
  await assert.rejects(run([]), /sospeso/);
  await assert.rejects(run([decision]), /piano/);
  const newPlan = { ...plan, id: 104, html_url: url + '4' };
  await run([decision, newPlan, { ...approval, id: 105, body: `Piano approvato: ${newPlan.html_url}` }]);
});

test('un frame escluso richiede motivo ed evidenza, uno mancante blocca la revisione', async () => {
  const run = (row) => checkPhase(input('revisione', { pull_request: {
    ...pr, draft: false, body: pr.body.replace('TF01 | superato | test_valid: assert | valido', row),
  } }));
  await assert.rejects(run(''), /frame/);
  await assert.rejects(run('TF01 | non eseguibile | manca il servizio | '), /evidenza/);
  await run('TF01 | non eseguibile | servizio indisponibile | run 123, errore di connessione');
});

test('il bot dedicato può pubblicare solo se abilitato e serve ancora il TM', async () => {
  const user = { id: 1234, type: 'Bot', login: 'planner-fixture[bot]' };
  const run = (publisher, plannerBotId, approved) => checkPhase(input('implementa', {}, {
    plannerBotId, listComments: async () => [{ ...plan, user: publisher }, ...(approved ? [approval] : [])],
  }));
  await assert.rejects(run(user, '', true), /piano/);
  await assert.rejects(run(user, '1234', false), /piano/);
  await assert.rejects(run({ ...user, login: 'github-actions[bot]' }, '1234', true), /piano/);
  await run(user, '1234', true);
});
