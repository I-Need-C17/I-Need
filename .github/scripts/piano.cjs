const fs = require('node:fs');

function readPlanMarkdown(path) {
  const value = fs.readFileSync(path, 'utf8');
  if (Buffer.byteLength(value) > 100000 || /gh[pousr]_[\w]{20,}|github_pat_[\w]{20,}/i.test(value)) {
    throw new Error('Risposta troppo grande o contenente una possibile credenziale.');
  }
  const markdown = value.trim();
  if (!markdown || markdown.length > 10000) {
    throw new Error('Il piano deve contenere da 1 a 10.000 caratteri.');
  }
  return markdown;
}

async function approvedPlan(github, repo, number) {
  const bot = user => user?.login === 'github-actions[bot]' && user.type === 'Bot';
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  const {data: issue} = await github.rest.issues.get({...repo, issue_number: number});
  const labels = issue.labels.map(label => label.name);
  const tm = issue.assignees[0];
  check(issue.state === 'open' && !issue.pull_request && issue.assignees.length === 1 && tm.type === 'User' &&
    labels.includes('task-agente'), 'Issue aperta, label task-agente e TM assegnato sono obbligatori.');
  const {data: access} = await github.rest.repos.getCollaboratorPermissionLevel({...repo, username: tm.login});
  check(['write', 'admin', 'maintain'].includes(access.permission), 'Il TM assegnato deve avere almeno Write.');

  const events = await github.paginate(github.rest.issues.listEvents, {...repo, issue_number: number});
  const cycle = events.filter(event => event.event === 'labeled' && event.label?.name === 'fase:piano').at(-1);
  const comments = await github.paginate(github.rest.issues.listComments, {...repo, issue_number: number});
  const marker = `<!-- i-need:piano ${cycle?.id} `;
  const plans = comments.filter(c => bot(c.user) && c.created_at === c.updated_at && c.body?.startsWith(marker));
  const selected = plans.at(-1);
  check(cycle && selected, 'Serve il piano del ciclo corrente.');
  const plan = JSON.parse(selected.body.split('\n', 1)[0].slice(marker.length, -4));
  check(['pronto', 'da-approvare'].includes(plan.status) && plan.assigned === tm.id && plan.title === issue.title && plan.body === issue.body &&
    labels.filter(name => name.startsWith('area:')).join() === `area:${plan.area}`, 'Issue o piano obsoleti.');
  const handled = plan.feedback?.at(-1) ?? selected.id;
  check(!comments.some(c => c.id > handled && c.user.id === tm.id && c.user.type === 'User' &&
    c.created_at === c.updated_at && c.body?.startsWith('RICHIESTA REVISIONE PIANO:') &&
    c.body.slice('RICHIESTA REVISIONE PIANO:'.length).trim() && c.body.length <= 6000),
    'Ripianificazione pendente. Attendere il nuovo piano e approvarlo.');
  const approval = comments.filter(c => c.user.id === tm.id && c.id > selected.id && c.created_at >= selected.created_at &&
    c.body?.trim().startsWith('APPROVO PIANO')).at(-1);
  check(approval && approval.created_at === approval.updated_at, 'Serve un nuovo commento di approvazione del TM assegnato.');
  const [header, list, ...lines] = approval.body.trim().split(/\r?\n/);
  const paths = lines.filter(line => line.startsWith('- ')).map(line => line.slice(2));
  check((header === 'APPROVO PIANO' || header === `APPROVO PIANO ${selected.id}`) && list === 'File autorizzati:' &&
    paths.length === lines.length && paths.length > 0 && new Set(paths).size === paths.length,
    'Usare APPROVO PIANO e un elenco di percorsi esatti distinti.');
  if (plan.status === 'pronto') {
    check(paths.length === plan.files.length && paths.every(name => plan.files.includes(name)),
      'L’approvazione deve elencare esattamente i file del piano pubblicato con il formato precedente.');
  } else {
    check(paths.every(name => plan.candidates.includes(name)),
      'L’approvazione può indicare solo file candidati nella Issue.');
  }
  return {plan: {...plan, files: paths}, selected, approval, tm, events, labels};
}

module.exports = {approvedPlan, readPlanMarkdown};
