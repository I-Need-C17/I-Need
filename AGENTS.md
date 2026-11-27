# I-Need — Team C17

## Contesto

Progetto universitario GPS/IS dell'Università di Salerno per la coabitazione solidale. Host offre uno spazio abitativo, Guest cerca una sistemazione e Operator supervisiona abbinamenti e convivenze; rispettare anche gli altri attori e generalizzazioni definiti nel RAD. Usare soltanto dati fittizi. La documentazione versionata in [docs/](docs/) è la baseline del progetto: consultare gli artefatti pertinenti, non inventare requisiti.

## Ruoli e autorizzazioni

- PM e TM con Write possono aprire Issue, assegnare responsabili e avviare gli agenti. La label `fase:implementazione` applicata dopo il piano costituisce autorizzazione esplicita.
- Il Tester deriva i test dalle specifiche, l'Implementatore non modifica test. Il Revisore AI è consultivo, non può approvare una PR.
- Una persona Write diversa dall'autore e dai responsabili del task verifica e approva il commit corrente. Merge manuale con CI positiva e review indipendente. Mai push diretto su main o auto-merge.

## Stack, architettura e comandi

- Client Layer: SPA React, JavaScript, Bootstrap; componenti Boundary coerenti con mockup e navigazione RAD.
- Business Layer: Java 17+, Spring Boot 3, Spring Security e JWT; Control REST/JSON (API sotto /api/v1/), Service per logica applicativa.
- Data Layer: Spring Data JPA/Hibernate; repository ed entity; PostgreSQL 15 accessibile dal Data Layer, non dal frontend o dal modulo AI.
- Modulo AI separato: Python 3.11+, FastAPI, Pydantic, scikit-learn, sentence-transformers e modello paraphrase-multilingual-MiniLM-L12-v2 come da SDD. Riceve dati JSON dal backend, non accede direttamente a PostgreSQL.
- Deployment SDD: Docker Compose con frontend-web (Nginx/HTTPS), backend-api, ai-service e db su rete interna ineed-network; solo il reverse proxy esposto in produzione. Rispettare i contratti e le responsabilità del deployment approvato.

Le versioni puntuali, i manifest, lockfile e i comandi applicativi saranno definiti durante il bootstrap umano. Non importare versioni o dipendenze da altri progetti. La CI iniziale controlla whitespace, YAML, link Markdown, test deterministici del workflow e sintassi degli script; build, test applicativi, DB, coverage e SonarQube non sono ancora configurati. Non dichiarare verifiche non svolte.

## Struttura e fonti

- `backend/`, `frontend/`, `ai-service/`: componenti applicativi. Creare solo i file necessari al task autorizzato.
- `docs/rad/`: requisiti, attori, scenari, UC, UI e modelli RAD.
- `docs/sdd/`: architettura, sottosistemi, persistenza, deployment e Class Diagram ristrutturato.
- `docs/odd/`: Class Diagram di sottosistema e Design Pattern.
- `docs/test/`: Category Partition, Test Frame, Test Case e altre specifiche di testing quando disponibili.
- `docs/contratti/`: contratti e interfacce approvati.
- `.github/agents/`: quattro profili Copilot. Il runner include nel prompt AGENTS.md e il profilo approvato.

Non spostare, rinominare, riscrivere o eliminare gli artefatti progettuali. I PM caricano ODD e diagrammi; i TM gestiscono manualmente Category Partition, Test Frame e Test Case. Gli agenti consultano queste fonti, non le modificano. Le modifiche alle regole del workflow sono umane.

## Convenzioni di implementazione

Usare esattamente nomi, ID, tipi, firme, attributi, operazioni e responsabilità dei modelli approvati; il Class Diagram ristrutturato SDD e i Class Diagram ODD definiscono il riferimento per il codice. Verificare Sequence Diagram, UC, contratti e pattern applicabili. Segnalare incoerenze al team, non correggere autonomamente le specifiche.

I sottosistemi funzionali del SDD sono Autenticazione, Gestione richieste abitative, Gestione abitazione, Gestione matching, Gestione proposte e Gestione convivenza; Interfacciamento dati persistenti è trasversale, Modulo AI è separato, Storage è PostgreSQL.

- Java: package in minuscolo, classi/interfacce PascalCase, metodi e attributi camelCase, costanti UPPER_SNAKE_CASE. Organizzare Control e Service per sottosistema e persistenza in repository/entity; rispettare le firme ODD. Evitare duplicazioni di DAO e Repository. Il package radice e la disposizione definitiva sono concordati nel bootstrap.
- React: componenti e pagine PascalCase, file JSX omonimi; variabili, funzioni e moduli camelCase, hook con prefisso use. Usare Bootstrap e rispettare Boundary, mockup e navigazione. Le chiamate REST passano dai servizi frontend, non replicare logica di business nel browser. Nessuna introduzione di TypeScript o PWA senza decisione del team.
- Python: moduli, funzioni e variabili snake_case, classi PascalCase, costanti UPPER_SNAKE_CASE. Separare API FastAPI, validazione Pydantic e calcolo della compatibilità secondo i contratti. Non introdurre accesso diretto al database. Sorgenti in ai-service/app/ o ai-service/src/ secondo il bootstrap approvato.
- Test: backend/src/test/, frontend/tests/ o file .test/.spec e __tests__ in frontend/src/, ai-service/test/, ai-service/tests/ o ai-service/src/test/. Anche i file Python test_*.py, *_test.py, conftest.py e le sottocartelle test/tests in ai-service/app/ e ai-service/src/ sono riservati al Tester. Identificare i Test Frame coperti; test indipendenti, nessun cambio del codice applicativo da parte del Tester. Framework, percorsi dei report e comandi definitivi saranno fissati con il bootstrap.

### Design Pattern approvati (ODD)

- **Façade**: le classi Service espongono l'interfaccia dei rispettivi sottosistemi. I Control invocano i Service, senza accesso diretto a repository o entity; le collaborazioni tra sottosistemi passano dai rispettivi Service. Le transazioni e il controllo per ruolo competono ai Service secondo l'ODD.
- **Adapter**: MatchingService usa ModuloAIAdapter per convertire domande e risposte in DTO, serializzarle in JSON, inviare la richiesta HTTP POST al microservizio e convertire la risposta nel punteggio Double. Rispettare le firme approvate; non accoppiare direttamente MatchingService al formato del Modulo AI.

Fonte: [Design Pattern ODD, sezioni 2.1 e 2.2](docs/odd/DesignPattern.md).

Manifest, lockfile e configurazioni di build, runtime e infrastruttura (ad esempio application*.yml/properties, configurazioni Vite/Vitest, Nginx e Gunicorn) sono gestiti manualmente, anche se collocati in directory di codice o test. Le normali classi e i moduli di codice applicativo che implementano configurazioni restano modificabili nel perimetro autorizzato; non introdurre dipendenze o modifiche infrastrutturali senza intervento umano.

## Regole operative

- Seguire RAD, SDD, ODD, UC, Class Diagram ristrutturato e di sottosistema, Sequence Diagram, contratti, Category Partition e Test Frame approvati. Se una fonte è assente o illeggibile, dichiarare il limite; non inventare requisiti.
- Creare una Issue, assegnare responsabili, applicare `fase:piano`, verificare il piano e applicare `fase:implementazione`. L'Implementatore pubblica una Draft PR con Closes #N e responsabilità tracciate. Per ripianificare scrivere `AGENTE PIANO:`. Il controllo di coerenza dei modelli fa parte del piano.
- Applicare `fase:test` alla PR. Il Tester crea o aggiorna i test dai frame approvati. Se non servono modifiche, non produce commit fittizi. La fase Tester avvia la CI indipendente e attende l'esito reale prima di concludere, pubblicando anche eventuali errori. Prima del bootstrap dichiarare i test applicativi N/A o non eseguiti; una CI strutturale verde non equivale a test applicativi superati. Se una CI valida esiste gia per lo stesso commit, la riusa senza duplicare i test; se manca, la avvia. Un test saltato non è superato. Una CI fallita o non disponibile rende la fase Tester non superata, senza modificare automaticamente il codice.
- Usare `AGENTE CORREGGI:` per correggere il task sulla PR esistente, `AGENTE TEST:` per rieseguire il Tester. Nessuna obbligatorietà di alternare Draft/Ready per ogni correzione.
- I ruoli sono separati: Pianificatore e Revisore in sola lettura; Implementatore/Correttore limitati a codice applicativo e documentazione ordinaria; Tester limitato ai file di test. Nessuna shell libera, Git, GitHub o credenziali al modello. Pubblicazione tramite runner separato con controllo di percorsi e SHA. Le modifiche a manifest, dipendenze, workflow, documenti approvati, PDF e test frame sono umane e tracciate.
- Le modifiche applicative devono rispettare lo stesso obiettivo autorizzato. Per un requisito diverso modificare la Issue e far approvare un nuovo piano o creare un nuovo task. Non indebolire o eliminare test per ottenere verde; i test esistenti si aggiornano con motivazione e copertura equivalente o migliore.
- La CI parte sui push manuali (anche main) e dopo ogni commit agente. Il riepilogo dei test viene aggiornato nella PR, anche se fallisce un controllo; consultare Actions per il dettaglio. La review umana finale avvia il check obbligatorio sulla PR; non occorre autorizzare CI duplicate. La CI iniziale esegue solo controlli strutturali; build, test applicativi, PostgreSQL e SonarQube verranno integrati con il bootstrap. Non passare token Copilot al codice applicativo. In caso di errore, leggere i log, correggere il problema reale e ripetere il controllo. Non usare bypass amministrativi per eludere verifiche.
- I commit AI mantengono l'autore bot, includono Copilot come coautore e riportano il vero richiedente, gli assegnatari e il run. Il runner aggiunge automaticamente il trailer Co-authored-by per l'assegnatario umano che avvia implementazione, test o correzione (assegnatari della Issue collegata, oppure della PR se non esiste una Issue). Non serve un commento aggiuntivo. Avviare la fase come assegnatario implica aver contribuito effettivamente al task; l'attribuzione tecnica non prova da sola il contributo. Gli altri assegnatari e i richiedenti non assegnati non diventano coautori automatici. Le PR agentiche ereditano gli assegnatari della Issue. Lo sviluppo manuale è consentito: branch per task, PR tracciata, Test Frame verificati, CI verde, review umana. Non è necessario invocare AI per ogni modifica.

## Pull Request e merge

GitHub richiede CI repository-checks verde e almeno un'approvazione umana; CODEOWNERS indirizza le richieste di review. Il revisore deve essere diverso dall'autore e dai responsabili del task; il team verifica questa indipendenza. La review umana è responsabile di esaminare e risolvere i rilievi reali e di verificare la copertura dei Test Frame prima di approvare. Dopo un nuovo commit le approvazioni precedenti non valgono. Per modificare un piano dopo l'apertura della PR, aggiornare la Issue, usare AGENTE PIANO: e poi AGENTE CORREGGI: nella PR con una riga PIANO APPROVATO: ID numerico del nuovo commento del bot. Non cambiare il riferimento senza approvazione. Il Revisore AI resta uno strumento di supporto e parte all'apertura di una PR non Draft, quando si seleziona Ready for review e dopo ogni nuovo commit su una PR non Draft.

## Quando un task è finito

Modifiche conformi al requisito e ai modelli, Test Frame coperti da test o prove manuali motivate, CI positiva, review umana indipendente e merge manuale. Il responsabile deve saper spiegare il risultato. I limiti delle verifiche devono essere dichiarati, non nascosti.

## Documenti di riferimento

- [Indice degli artefatti](docs/README.md).
- [RAD](docs/rad/C17_RequirementsAnalysisDocument_RAD.pdf), [SDD](docs/sdd/C17_SystemDesignDocument_SDD.pdf), [ODD](docs/odd/C17_ObjectDesignDocument_ODD.pdf).
- [Architettura SDD](docs/sdd/ArchitetturaSistema.md), [deployment SDD](docs/sdd/MappingHardwareSoftware.md), [indice ODD](docs/odd/README.md).
- [Guida operativa](docs/agentic-workflow-iterazioni.md).

Se manca una fonte leggibile, dichiarare il limite e richiedere verifica umana. Non trascrivere PDF o dedurre contratti dai soli nomi dei file.
