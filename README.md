# I-Need (C-17)

Progetto GPS/IS dell’Università di Salerno per la coabitazione solidale.
Lo stack previsto è React/Bootstrap per il frontend, Java/Spring Boot e
PostgreSQL per il backend, Python/FastAPI per il servizio AI. Versioni,
dipendenze e comandi definitivi seguiranno l’approvazione dell’SDD.

- [frontend](frontend/), [backend](backend/) e [ai-service](ai-service/) ospitano i componenti applicativi.
- [Indice delle fonti](docs/README.md) raccoglie i riferimenti al RAD, all’SDD e ai test.
- [Regole comuni](AGENTS.md) e [profili degli agenti](.github/agents/) definiscono compiti e limiti.

Il workflow adatta le fasi di NeighborCare (C01) e del kit GPS/IS a I-Need.
Usa Copilot CLI per i quattro ruoli e comandi deterministici per i controlli.

## Dalla Issue al merge

1. Il **PM** apre una [Issue Task agente](.github/ISSUE_TEMPLATE/task-agente.yml),
   assegna un solo TM, aggiunge la label di area e applica `fase:piano`.
   Il Pianificatore legge il checkout della snapshot di `main` in sola lettura
   e pubblica il piano in Markdown sulla Issue.
2. Il **TM assegnato** verifica il piano e lo approva in un nuovo commento.
   Poi rimuove `fase:piano` e applica `fase:implementazione`. L’Implementatore
   verifica l’approvazione, modifica i file autorizzati, esegue i controlli
   disponibili e apre la Draft PR `agent/issue-N-implementazione` con `Closes #N`.
3. Il **TM** applica `fase:test` sulla Draft PR. Il Tester indipendente deriva
   i test dai frame, esegue le verifiche disponibili e pubblica un report
   sullo SHA risultante. Per una PR documentale o di governance
   registra **N/A** per i test applicativi.
4. Il **TM** controlla il diff e il report del Tester, quindi seleziona **Ready
   for review**. La CI `repository-checks` verifica il contenuto della PR.
   Il Revisore AI pubblica un report sullo SHA esaminato.
5. Un **Code Owner umano diverso dall’autore** esamina la PR dopo i report
   e la approva sul commit corrente. Per le PR agentiche il revisore è
   anche diverso dal TM assegnato. `governance-gate` verifica review,
   report e run associati. Il **PM** fa il merge dopo i controlli richiesti.

L’approvazione del piano spetta al TM assegnato con almeno Write. Il commento
deve seguire la versione vigente del piano ed elencare uno per riga i soli
file necessari tra i candidati della Issue. L’ID del commento del piano è
facoltativo. Se presente, deve riferirsi alla versione vigente.

```text
APPROVO PIANO
File autorizzati:
- README.md
```

## Compilare la Issue

- Usa una sola label `area:frontend`, `area:backend` o `area:ai-service`.
  Indica obiettivo, comportamento atteso, limiti e dipendenze pertinenti.
- Nel campo **File** usa `File: percorso` per i candidati e `Test: percorso`
  per i test nuovi. Usa percorsi relativi esatti. I sorgenti agentici stanno
  in `src/` o `app/` dell’area. Il Tester usa `backend/src/test/`,
  `frontend/tests/` o file `.test.*` e `.spec.*` in `frontend/src/`, e
  `ai-service/test/`, `ai-service/tests/` o `ai-service/src/test/`.
- In **Fonti e frame** indica `Requisito: ID` e `Riferimento: percorso` per le
  fonti testuali UTF-8 versionate. Sono disponibili anche `UC:`, `Sequence:`, `Class:`,
  `Firme:` e `Modello:`. Per il Tester aggiungi `CP: percorso`,
  `TF: percorso` (file distinti in `docs/test/`) e una riga `Frame: ID`
  per ogni frame pertinente.
- Per attività documentali usa `Riferimento: percorso` oppure `N/A - motivo`.
  L’Implementatore può modificare README, l’indice delle fonti e le guide
  Markdown in `docs/guide/`. Modelli, dipendenze e configurazione passano
  da PR umane.

## Ripianificazione e correzione

- Con `fase:piano` sulla Issue, il TM può pubblicare
  `RICHIESTA REVISIONE PIANO:` seguito dal feedback. Attende la nuova
  versione e la approva con un nuovo commento.
- Sulla Draft PR il TM usa `RICHIESTA CORREZIONE TM:` per correggere il
  lavoro entro il perimetro approvato. Se la PR è già in review, la riporta
  in Draft. Dopo la correzione rimuove e riapplica `fase:test`, verifica
  il nuovo report e seleziona di nuovo **Ready for review**.
- Dopo tre richieste valide si ferma il ciclo. Per modifiche ai requisiti
  o al perimetro, il TM segnala il blocco e il PM apre una nuova Issue
  quando la nuova attività è definita.

## CI e bootstrap

`repository-checks` verifica diff, workflow, collegamenti Markdown e
regressioni del controllo di approvazione. Per backend e frontend prevede rispettivamente
`mvn -B verify` e `npm ci`, `npm run build`, `npm run test:ci`,
quando le PR di bootstrap approvano i manifest, i lockfile e le versioni.
Il bootstrap del servizio AI introdurrà i comandi Python approvati
nell’[azione condivisa](.github/actions/verifiche-app/action.yml).
Fino al bootstrap, i componenti senza manifest risultano **N/A**.
Una PR applicativa usa `Closes #N` o `Fixes #N`. Per la prima PR che
introduce il manifest di un componente, il gate richiede CI, report del
Revisore e approvazione umana. Il report del Tester applicativo è
facoltativo. La PR di bootstrap Python può aggiornare anche l’azione
condivisa per introdurre i comandi approvati.

## Configurazione GitHub e collaudo

- I team `project-managers` e `tech-members` servono a
  [CODEOWNERS](.github/CODEOWNERS). Verificare che abbiano accesso Write.
  Il PM avvia `fase:piano` con Maintain o Admin.
- Abilitare in GitHub Actions la creazione delle Draft PR. Configurare
  il secret `COPILOT_GITHUB_TOKEN` nell’ambiente `copilot-student`,
  limitato a `main`. Test e Revisione usano i trigger su PR interne
  con configurazione del branch base. Le label e **Ready for review**
  sono passaggi umani, anche quando la PR è aperta dal bot.
- Sul ruleset di `main` richiedere PR, approvazione del Code Owner,
  revoca delle approvazioni obsolete, risoluzione delle conversazioni
  e `repository-checks`. Aggiungere `governance-gate` dopo il collaudo
  e verificare che entrambi i check provengano da GitHub Actions.
  Bloccare cancellazioni e force push. Per riservare tecnicamente il merge
  ai PM, usare una regola separata **Restrict updates** con il team PM
  abilitato **For pull requests only**.
- Dopo l’aggiornamento di `main`, aprire una nuova Issue documentale
  di collaudo e applicare `fase:piano`. La prova deve arrivare fino
  alla Draft PR, al Tester e al Revisore. Se la modifica è temporanea,
  chiudere la PR dopo la review e verificare il merge protetto con una
  successiva PR destinata a restare.
- Se il gate parte prima della conclusione di un run, attendere i report
  sullo SHA esatto e la review umana. Se serve, rieseguire il gate dopo
  che le evidenze sono disponibili.
