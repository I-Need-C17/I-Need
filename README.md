# I-Need — Team C17

Progetto GPS/IS dell'Università di Salerno per la coabitazione solidale tra Host e Guest, con supervisione degli Operator.

## Struttura

- [frontend/](frontend/): SPA React/Bootstrap.
- [backend/](backend/): Java/Spring Boot, Spring Data JPA e PostgreSQL.
- [ai-service/](ai-service/): Python/FastAPI per il calcolo della compatibilità.
- [docs/](docs/): RAD, SDD, ODD, modelli, contratti e specifiche di testing; consultare l'[indice](docs/README.md).
- [AGENTS.md](AGENTS.md): contesto, convenzioni e regole comuni.
- [.github/agents/](.github/agents/): Pianificatore, Implementatore, Tester e Revisore.
- [Template task agente](.github/ISSUE_TEMPLATE/task-agente.yml), [task manuale](.github/ISSUE_TEMPLATE/task-documentale.yml) e [template PR](.github/pull_request_template.md).

I tre componenti non sono ancora inizializzati. Il bootstrap definirà versioni, manifest, dipendenze e modalità di avvio conformi al SDD; la CI applicativa sarà estesa progressivamente.

## Flusso di lavoro

1. Un PM o TM con Write crea una Issue, assegna uno o più responsabili e applica `fase:piano`.
2. Il Pianificatore verifica anche la coerenza dei modelli e pubblica il piano. Un collaboratore Write lo verifica e applica `fase:implementazione` per autorizzare.
3. L'Implementatore crea il branch del task e la Draft PR, assegnata ai responsabili della Issue; il runner pubblica le modifiche e avvia la CI.
4. Applicare `fase:test`. Il Tester indipendente deriva i test dalle specifiche, avvia o riusa la CI sul commit corrente, attende l'esito e pubblica il recap reale. Prima del bootstrap i test applicativi non sono eseguiti.
5. Verificare CI, test e Test Frame. Selezionare Ready for review; il Revisore AI è consultivo, si avvia anche per PR interne aperte Ready e per nuovi commit su PR non Draft.
6. Una persona Write diversa dall'autore e dai responsabili esamina e approva il commit corrente. Attendere la CI finale `repository-checks`, poi merge manuale.

Per iterazioni usare `AGENTE PIANO:` sulla Issue, `AGENTE CORREGGI:` e `AGENTE TEST:` sulla PR. Se il piano cambia dopo l'apertura della PR, indicare anche `PIANO APPROVATO: ID` nella richiesta di correzione. Vedi la [guida operativa](docs/agentic-workflow-iterazioni.md).

I commit agentici sono attribuiti al bot con Copilot coautore; l'assegnatario che avvia implementazione, test o correzione è coautore automatico. Tutti i responsabili, il richiedente e il run restano tracciati. Avviare la fase come assegnatario implica aver contribuito al task; l'attribuzione tecnica non prova da sola il contributo.

Lo sviluppo manuale è supportato con branch, Issue/PR, verifiche e review umana indipendente. I PM caricano ODD e diagrammi; i TM caricano Category Partition, Test Frame e Test Case con task documentali manuali. Manifest, configurazioni, workflow e artefatti approvati sono gestiti da contributi umani tracciati.

## Configurazione

- [.github/workflows/esegui-fase.yml](.github/workflows/esegui-fase.yml): runner condiviso; generazione e pubblicazione separate.
- [.github/scripts/agent_workflow.py](.github/scripts/agent_workflow.py): contesto, autorizzazioni, perimetro, commit e pubblicazione.
- [.github/workflows/ci.yml](.github/workflows/ci.yml): CI indipendente, inizialmente strutturale (whitespace, YAML, link Markdown, test del workflow, sintassi script).
- [.github/scripts/verify-project.sh](.github/scripts/verify-project.sh): punto di estensione per i controlli applicativi del bootstrap.
- Secret repository: `COPILOT_GITHUB_TOKEN`. Nessun token Copilot al codice applicativo.
- Protezioni previste per main: PR, approvazione umana, revoca delle approvazioni obsolete, conversazioni risolte, `repository-checks`, blocco force push e cancellazione; CODEOWNERS indica i reviewer. Mai merge automatico o bypass per eludere verifiche.

La CI parte sui push manuali, dopo i commit agentici e sulla review umana finale. La CI strutturale non costituisce una verifica applicativa: i componenti vuoti sono N/A; eventuali componenti inizializzati senza CI applicativa risultano non eseguiti. Con il bootstrap integrare Maven, npm, Python, PostgreSQL/Compose, report di test, coverage e SonarQube Cloud (progetto dedicato, variabili SONAR_PROJECT_KEY e SONAR_ORGANIZATION e secret SONAR_TOKEN, da configurare successivamente).
