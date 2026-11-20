'use strict';

const labelsOf = (item) => item.labels.map((label) => label.name);
const hasLabel = (item, label) => labelsOf(item).includes(label);
const logins = (value = '') =>
  new Set(value.toLowerCase().split(/[\s,]+/).filter(Boolean));

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function approvedPlan(comments, pm, actor) {
  const plan = comments
    .filter((comment) => pm.has(comment.user?.login.toLowerCase()) &&
      /^## Piano[ \t]*\r?\n\s*\S/.test(comment.body ?? ''))
    .reduce((latest, comment) => !latest || comment.id > latest.id ? comment : latest, null);

  if (!plan) return false;
  return comments.some((comment) =>
    comment.user?.login.toLowerCase() === actor &&
    comment.id > plan.id &&
    Date.parse(comment.created_at) >= Date.parse(plan.updated_at ?? plan.created_at) &&
    comment.body?.trim() === `Piano approvato: ${plan.html_url}`
  );
}

async function checkPhase({ phase, payload, pmLogins, tmLogins, getIssue, listComments }) {
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
  if (phase === 'piano') {
    requireCondition(assignees.some((login) => tm.has(login)), 'Assegna la Issue a un TM abilitato.');
    return 'Il PM può pubblicare il piano nella Issue.';
  }

  requireCondition(assignees.includes(actor), 'Il TM deve essere assegnatario della Issue.');
  requireCondition(hasLabel(issue, 'fase:implementazione'), 'Manca fase:implementazione sulla Issue.');
  requireCondition(approvedPlan(await listComments(issue.number), pm, actor),
    'Il TM deve approvare il piano più recente pubblicato da un PM.');
  if (phase === 'implementa') return 'Il TM può procedere sul branch del task e aprire una Draft PR.';

  requireCondition(pr && hasLabel(pr, 'fase:test'), 'Serve la label fase:test sulla PR.');
  if (phase === 'test') {
    requireCondition(pr.draft, 'La fase test si avvia su una Draft PR.');
    return 'Il TM può verificare i frame di test della Draft PR.';
  }

  requireCondition(phase === 'revisione' && !pr.draft, 'La PR deve essere Ready for review.');
  requireCondition(/^- \[[xX]\] Ho verificato i test e gli esiti attesi[ \t]*\r?$/m.test(pr.body ?? ''),
    'Il TM deve confermare nel template di avere verificato i test e gli esiti attesi.');
  return 'Il TM può richiedere la revisione umana della PR.';
}

module.exports = { checkPhase };
