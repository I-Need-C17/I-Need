# I-Need (C-17)

I-Need è il progetto GPS/IS dell'Università di Salerno per la coabitazione
solidale. Il monorepo pubblico predispone [backend](backend/),
[frontend](frontend/) e [servizio AI](ai-service/). Le aree contengono solo
`.gitkeep` in questa fase. RAD, SDD e fonti per i test saranno versionati
secondo l'[indice in docs](docs/README.md). Le [regole comuni](AGENTS.md)
valgono per tutti i contributi.

## Dalla Issue al merge

1. Il **PM** apre una Issue con [Task agente](.github/ISSUE_TEMPLATE/task-agente.yml),
   assegna un TM con **Assignees**, aggiunge la label `area:*` coerente e
   applica `fase:piano`. Il Pianificatore pubblica un commento per ciclo.
2. Il **TM assegnato** verifica fonti, passi e rischi. Se il piano è pronto,
   risponde con il formato seguente e applica `fase:implementazione`.
   L'Implementatore lavora sul perimetro approvato. Actions crea la Draft PR
   verso `main` da `agent/issue-<N>-implementazione`.
3. Il **TM o il PM** applica `fase:test` alla Draft PR. Il Tester crea solo nuovi
   test, partendo da frame e firme approvate. Actions esegue i comandi
   approvati e pubblica il risultato per frame e SHA. Un task documentale
   o di governance riceve un report N/A senza invocare il Tester.
4. Il **TM o il PM** apre il report e verifica che lo SHA sia quello corrente.
   Il TM completa la checklist della PR e la porta a **Ready for review**.
   Si avviano CI e Revisore. La review AI è informativa e indica lo SHA
   esaminato. Una persona diversa dall'autore e dal TM responsabile approva
   la PR. Il PM verifica
   stato, test e review sul commit finale ed esegue il merge.

Prendi l'ID numerico del piano dal link del commento (`#issuecomment-123456789`).
Pubblica un commento nuovo, senza testo aggiuntivo. L'elenco deve coincidere
con i percorsi distinti del piano, uno per riga.

```text
APPROVO PIANO 123456789
File autorizzati:
- docs/README.md
```

GitHub verifica l'identità del TM assegnato e il suo accesso Write o
superiore. Il workflow richiede Maintain o Admin per avviare un piano e
per intervenire su una PR al posto del TM assegnato. La corrispondenza tra
questi permessi operativi e i team PM/TM si gestisce in organizzazione.
Le assegnazioni e le label si fanno nell'interfaccia GitHub. Il form
popola solo `task-agente`. Le issue libere restano disponibili.

### Campi della Issue

- **Ambito** contiene una riga `File: percorso` per ogni candidato. Un task
  applicativo elenca anche una riga `Test: percorso` per ogni nuovo file
  di test. I percorsi sono relativi alla root ed esatti, senza backtick o
  wildcard. Gli agenti documentali operano su `README.md`, `docs/README.md`
  e guide Markdown sotto `docs/guide/`. Le modifiche a pipeline, istruzioni,
  contratti, modelli, stack e policy passano da PR umane.
- **Specifiche e revisione**, per un task applicativo, contiene una riga
  per ciascuno di `Snapshot:` (SHA completo su `main`), `UC:`,
  `Sequence:`, `Class Diagram:` (SDD ristrutturato) e `Firme pubbliche:`,
  seguite dai percorsi dove applicabile. Usa `Modello: percorso` per
  Design Goal, Component, Deployment o altri modelli pertinenti. Indica
  l'ID originale nel campo **UC o requisito**.
- **Category Partition e Test Frame** contiene `CP: percorso`,
  `TF: percorso` e una riga `Frame: ID` per ogni frame pertinente.
  L'ID deve apparire nella fonte. Rendilo selezionabile separatamente dal
  comando di test approvato.
- Un task documentale o di governance motiva `N/A - motivo` per UC e frame.
  Nel campo delle specifiche può usare `N/A - motivo` o una riga
  `Riferimento: percorso` per ogni documento del repository.

### Quando un passaggio si blocca

Apri **Actions**, seleziona il run e controlla il primo passo fallito.
Per Test e Revisione il segnale PR e il job autorizzato su `main` sono due
run. Il job autorizzato appare sotto **Piano**. Per origini, quote e secret
controlla il passo Copilot. Per un esito dei frame consulta il commento con
gli exit code. I commenti tecnici hanno un marcatore verificato contro il
digest nel log del run attendibile. Conserva i log fino a chiusura del
task. Se sono scaduti, concorda con il PM una nuova Issue e un nuovo ciclo.

Correggi i dati con il TM o il PM prima di riapplicare la label. Riapplicare
`fase:piano` invalida l'approvazione precedente. Per una Draft PR già aperta,
il PM risolve eventuali conflitti di branch o di ambito. I retry possono
recuperare un commit già preparato. Con un nuovo SHA, riporta la PR in
Draft, rimuovi e riapplica `fase:test`, poi ripeti Ready for review. I test
indipendenti già presenti vengono rieseguiti. Un run in corso deve
terminare prima del passaggio successivo.

`GITHUB_TOKEN` può non avviare automaticamente CI quando Actions apre la
PR o aggiorna il branch. Se GitHub chiede un'approvazione per quei run,
un collaboratore con Write può darla. Il passaggio umano **Ready for review**
avvia comunque una nuova CI sullo stato corrente della PR. I controlli di
GitHub si riferiscono al commit di merge di prova della PR, se presente,
oppure al nuovo head. Un nuovo commit richiede nuovi esiti, review e
approvazione.

## Attivazione a cura del PM

1. In **Organization → Teams** verifica gli slug `project-managers` e
   `tech-members`, che entrambi i team siano visibili e abbiano Write
   esplicito su I-Need. Verifica i membri effettivi, un PM con
   Maintain/Admin, i TM con Write e almeno un revisore umano indipendente.
   Controlla le label esistenti in **Issues → Labels**.
2. In **Settings → Actions → General** consenti le Actions usate dal
   repository e abilita **Allow GitHub Actions to create and approve pull
   requests**. L'opzione è necessaria per aprire la Draft PR con il token
   Actions. Il workflow pubblica solo review `COMMENT`. Se l'organizzazione
   impone una policy più restrittiva, serve un amministratore.
3. Dopo il via libera al collaudo, usa un solo account Student abilitato
   a Copilot CLI. In **Settings personali → Developer settings →
   Personal access tokens → Fine-grained tokens** crea una credenziale
   individuale con il permesso **Copilot Requests**. In **Settings del
   repository → Environments → New environment** crea `copilot-student`.
   In **Deployment branches and tags** scegli **Selected branches and
   tags** e aggiungi una sola regola di tipo branch per `main`. Aggiungi
   lì l'**Environment secret** `COPILOT_GITHUB_TOKEN`. Non creare una copia
   tra i repository secret. Mantieni il token fuori da file, Issue, PR,
   chat e log. Verifica quota e policy al primo collaudo autorizzato.
4. Apri e fai revisionare la PR da `allineamento-flusso-agentico` verso
   `main`. Attendi `ci-ok` sulla PR di bootstrap prima di selezionarlo
   come check obbligatorio. Se serve proteggere il primo merge prima che
   il check sia selezionabile, attiva le altre protezioni e aggiungi il
   check appena compare. Esegui il merge umano della sola configurazione.
   I workflow Issue e il ricevitore trusted di Test/Revisione risiedono
   su `main`. Il collaudo agentico parte dopo quel merge.
5. In **Settings → Rules → Rulesets → New branch ruleset** imposta
   **Enforcement status: Active** e **Target branches: Include default
   branch** (verifica che sia `main`). Lascia vuota la bypass list.
   Abilita **Restrict deletions**, **Block force pushes** e **Require
   a pull request before merging**. Imposta 1 approval, **Dismiss stale
   pull request approvals when new commits are pushed** e **Require
   review from Code Owners**. Se opportuno abilita **Require approval
   of the most recent reviewable push** per separare anche l'ultimo
   autore di push dal revisore. In **Require status checks to pass before
   merging** seleziona `ci-ok` con origine **GitHub Actions**.
   CODEOWNERS richiede review ai proprietari. Il ruleset attivo rende
   quel requisito vincolante. Queste regole sono disponibili per
   repository pubblici su GitHub Free.
6. Il merge spetta ai PM per accordo del team finché esistono altri
   collaboratori con Write. Per imporlo tecnicamente mantenendo Write ai
   TM, verifica nella UI la disponibilità di un **secondo** ruleset su
   `main` con **Restrict updates** e soltanto il team PM in bypass
   **For pull requests only**. Mantieni il primo ruleset senza bypass per
   applicare review e CI anche ai PM. Collauda l'effetto con un TM.
   In alternativa serve un assetto di permessi senza Write ai TM sul
   repository base e un flusso diverso da quello degli agent branch
   interni. Evita di ridurre Write ai TM durante questo collaudo.
7. Con il PM presente, prova i blocchi per Issue incompleta, approvazione
   assente o obsoleta, TM non assegnato, file fuori perimetro e PR da fork.
   Prova poi una piccola guida in `docs/guide/` con Piano, approvazione,
   Implementazione, Draft, fase Test N/A, Ready, CI e Revisione. Chiudi
   la PR pilota senza merge se il contenuto è temporaneo. Per certificare
   anche il Tester usa separatamente uno stack inizializzato con UC,
   modelli, firme, Category Partition e frame reali. Verifica un caso
   che passa e uno che fallisce, quindi cambia lo SHA e controlla
   rinnovo di test, CI, review e approvazione umana.

### Dopo il bootstrap applicativo

Prima di aggiungere uno stack, approva con una PR umana il registro
`docs/test/esecuzione.json`. Ogni chiave di area contiene `manifest`
(percorso dalla root), `source_roots` e `test_roots` (liste di
sottodirectory distinte con slash finale), `source_exts` e `test_exts`,
`image` (immagine con digest SHA-256), `ci` e `frame` (array argv).
I comandi si avviano dalla directory dell'area in un contenitore senza
rete. L'immagine contiene gli strumenti e le dipendenze approvati.
Il comando `frame` sostituisce `{frame}` con l'ID, esegue le asserzioni
del frame e fallisce se non trova un test per quell'ID. Il workflow legge il registro
approvato su `main`. Prima del bootstrap, CI verifica
Actions, file e link e registra N/A per ciascuna area vuota.

Documentazione GitHub per
[CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners),
[ruleset](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets),
[ambienti](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) e
[Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli).
