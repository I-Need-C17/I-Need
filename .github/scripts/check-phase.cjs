'use strict';

const { createHash } = require('node:crypto');
const { checkEvidence, taskInputs } = require('./role-context.cjs');

function taskDigest(body) {
  return createHash('sha256').update(body.replace(/\r\n/g, '\n')).digest('hex');
}

const labelsOf = (item) => item.labels.map((label) => label.name);
const hasLabel = (item, label) => labelsOf(item).includes(label);
const logins = (value = '') =>
  new Set(value.toLowerCase().split(/[\s,]+/).filter(Boolean));

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function approvedPlan(comments, pm, actor, digest, decisionId, plannerBotId) {
  const isPublisher = ({ user }) => pm.has(user?.login.toLowerCase()) ||
    (user?.type === 'Bot' && user.login !== 'github-actions[bot]' &&
      String(user.id) === plannerBotId && /^[1-9]\d*$/.test(plannerBotId));
  const plan = comments
    .filter((comment) => isPublisher(comment) &&
      /^## Piano[ \t]*\r?\n\s*\S/.test(comment.body ?? ''))
    .reduce((latest, comment) => !latest || comment.id > latest.id ? comment : latest, null);

  if (!plan || plan.id <= decisionId || !plan.body.split(/\r?\n/).includes(`Input: ${digest}`)) return false;
  return comments.some((comment) =>
    comment.user?.login.toLowerCase() === actor &&
    comment.id > plan.id &&
    Date.parse(comment.created_at) >= Date.parse(plan.updated_at ?? plan.created_at) &&
    comment.body?.trim() === `Piano approvato: ${plan.html_url}`
  );
}

async function checkPhase({ phase, payload, pmLogins, tmLogins, plannerBotId, getIssue, listComments }) {
  const pm = logins(pmLogins);
  const tm = logins(tmLogins);
  const actor = payload.sender?.login.toLowerCase();
  requireCondition(pm.size > 0, 'Configura AGENTIC_PM_LOGINS con i login dei PM.');
  requireCondition(![...pm].some((login) => tm.has(login)), 'Usa login distinti per PM e TM.');
  requireCondition(payload.sender?.type === 'User', 'Il checkpoint richiede un account umano.');
  requireCondition(phase === 'piano' ? pm.has(actor) : tm.has(actor),
    phase === 'piano' ? 'Solo un PM può avviare il piano.' : 'Solo un TM abilitato può avanzare il task.');

  const pr = payload.pull_request;
  let issue = payload.issue;
  if (pr) {
    requireCondition(pr.state === 'open' && pr.base.ref === 'main' &&
      pr.head.repo?.id === payload.repository.id,
    'Serve una PR aperta verso main con branch nello stesso repository.');
    const links = [...(pr.body ?? '').matchAll(/^Closes #([1-9]\d*)[ \t]*\r?$/gim)];
    requireCondition(links.length === 1, 'Indica una sola Issue con Closes #NN su una riga a sé.');
    const issueNumber = Number(links[0][1]);
    requireCondition(Number.isSafeInteger(issueNumber), 'Numero di Issue fuori intervallo.');
    issue = await getIssue(issueNumber);
  }

  requireCondition(issue && !issue.pull_request && issue.state === 'open' &&
    hasLabel(issue, 'task-agente'), 'Serve una Issue aperta con la label task-agente.');
  const assignees = issue.assignees.map((user) => user.login.toLowerCase());
  const { frames } = taskInputs(issue.body);
  const digest = taskDigest(issue.body);
  if (phase === 'piano') {
    requireCondition(assignees.some((login) => tm.has(login)), 'Assegna la Issue a un TM abilitato.');
    return { issue, message: `Includi nel commento del piano una riga esatta «Input: ${digest}».` };
  }

  requireCondition(assignees.includes(actor), 'Il TM deve essere assegnatario della Issue.');
  requireCondition(hasLabel(issue, 'fase:implementazione'), 'Manca fase:implementazione sulla Issue.');
  const comments = await listComments(issue.number);
  const authorized = new Set([...pm, ...assignees.filter(login => tm.has(login))]);
  const reports = comments.filter(c => authorized.has(c.user?.login.toLowerCase()) &&
    /^## Incongruenza modelli[ \t]*\r?\n\s*\S/.test(c.body));
  let decisionId = 0;
  for (const report of reports) {
    const decision = comments.find(c => pm.has(c.user?.login.toLowerCase()) && c.id > report.id &&
      c.body?.replace(/\r\n/g, '\n').startsWith(`## Decisione modelli\n${report.html_url}\n`) &&
      c.body.slice(c.body.indexOf(report.html_url) + report.html_url.length).trim());
    requireCondition(decision, 'Task sospeso: serve la decisione del PM con il team nella Issue.');
    decisionId = Math.max(decisionId, decision.id);
  }
  requireCondition(approvedPlan(comments, pm, actor, digest, decisionId, plannerBotId),
    'Il TM deve approvare il piano più recente del PM o del pianificatore autorizzato.');
  if (phase === 'implementa') return { issue, message: 'Il TM può procedere sul branch del task e aprire una Draft PR.' };

  requireCondition(pr && hasLabel(pr, 'fase:test'), 'Serve la label fase:test sulla PR.');
  if (phase === 'test') {
    requireCondition(pr.draft, 'La fase test si avvia su una Draft PR.');
    return { issue, message: 'Il TM può verificare i frame di test della Draft PR.' };
  }

  requireCondition(phase === 'revisione' && !pr.draft, 'La PR deve essere Ready for review.');
  requireCondition(/^- \[[xX]\] Ho verificato i test e gli esiti attesi[ \t]*\r?$/m.test(pr.body ?? ''),
    'Il TM deve confermare nel template di avere verificato i test e gli esiti attesi.');
  checkEvidence(pr.body, frames);
  return { issue, message: 'Il TM può richiedere la revisione umana della PR.' };
}

module.exports = { checkPhase, taskDigest };
