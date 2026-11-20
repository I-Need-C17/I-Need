'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { checkPhase } = require('./check-phase.cjs');

const label = (name) => ({ name });
const issue = {
  number: 42, state: 'open', assignees: [{ login: 'Tm' }],
  labels: ['task-agente', 'fase:implementazione'].map(label),
};
const url = 'https://github.com/I-Need-C17/I-Need/issues/42#issuecomment-100';
const date = '2026-11-20T12:00:00Z';
const plan = { id: 100, user: { login: 'Pm' }, body: '## Piano\n\nPiano sintetico', html_url: url, created_at: date };
const approval = { id: 101, user: { login: 'Tm' }, body: `Piano approvato: ${url}`, created_at: date };
const pr = {
  state: 'open', draft: true, labels: ['fase:test'].map(label),
  head: { repo: { id: 1 } }, base: { ref: 'main' },
  body: 'Closes #42\n\n- [x] Ho verificato i test e gli esiti attesi',
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
