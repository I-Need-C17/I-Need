# Flusso agentico di I-Need

La prima fase riguarda il repository pubblico e i checkpoint umani. Le Issue
degli scheletri applicativi (#1, #2 e #3) restano in backlog. La loro apertura
e le note nei componenti non autorizzano l'avvio del lavoro sullo stack.

## 1. Bootstrap e impostazioni GitHub

Il check `ci-ok` verifica la presenza dei file della pipeline, la sintassi dei
workflow e la logica dei checkpoint con dati fittizi. Parte su PR verso `main`,
su push a `main` e su avvio manuale. In questa fase il check riguarda la
pipeline. Build e test applicativi saranno introdotti quando esisteranno i
relativi componenti.

- Mantieni le label predefinite di GitHub. Usa `task-agente`, `fase:piano`,
  `fase:implementazione` e `fase:test` nel flusso. Le label `area:*` sono
  filtri facoltativi. `fase:revisione` è una label storica e può rimanere.
  La revisione parte quando la PR passa a **Ready for review**.
- In **Settings → Secrets and variables → Actions → Variables**, un PM
  configura `AGENTIC_PM_LOGINS` e `AGENTIC_TM_LOGINS` con i login GitHub reali,
  separati da virgole. Sono variabili non segrete. Mantieni distinti i due
  elenchi. Inserisci un TM dopo che ha accettato l'invito ed è assegnabile nel
  repository. Finché manca un TM assegnato, la pipeline e la CI possono essere
  esaminate e il giro operativo resta sospeso.
- Controlla che gli account di `CODEOWNERS` abbiano accesso in scrittura al
  repository. Dopo aver visto `ci-ok` su una PR, configura la protezione di
  `main` con PR obbligatoria, almeno un'approvazione distinta dall'autore,
  invalidazione delle approvazioni obsolete, review dei code owner per i
  percorsi coperti e `ci-ok` richiesto. Riserva il push e il merge su `main`
  ai PM e applica la protezione anche agli amministratori. Verifica con un TM
  e un PM il comportamento effettivo prima di contare sulla regola.
- Quando il team può iniziare a prendere in carico task, usa Projects per
  tenere visibili assegnatario, fase e link a Issue e PR.

## 2. Giro di prova con i checkpoint

I workflow delle fasi leggono Issue, commenti e metadati della PR. Esiti e
motivazioni sono nei run di Actions. Il responsabile esegue i passaggi
manualmente fino al collaudo di Copilot. I job di fase sulle PR usano i
workflow e il codice di controllo del branch di base.

| Fase | Cosa fa il responsabile | Cosa controlla Actions |
| --- | --- | --- |
| Piano | Il PM apre la Issue con `task-agente`, caso d'uso, specifiche, modelli, ambito, test frame ed esiti attesi. Assegna un TM e applica `fase:piano`. Poi pubblica un commento che inizia con `## Piano`. | Verifica ruolo del PM, Issue aperta e TM assegnato. |
| Implementazione | Il TM assegnato esamina il piano e commenta `Piano approvato: <URL del commento del piano>`. Quindi aggiunge `fase:implementazione` e apre una Draft PR sul branch del task, con `Closes #NN` su una riga a sé. | Verifica ruolo, assegnazione e approvazione del piano più recente. Se il PM cambia il piano, il TM lo approva di nuovo. |
| Test | Il TM applica `fase:test` alla Draft PR. Verifica test derivati dalla Category Partition. Riporta frame, esiti attesi e ottenuti, e annota eventuali divergenze. | Verifica che la PR sia draft, nel repository e collegata a una Issue approvata. |
| Revisione | Il TM spunta **Ho verificato i test e gli esiti attesi** e porta la PR a **Ready for review**. Il revisore confronta diff e modelli. Una persona diversa dall'autore approva su GitHub. | Verifica assegnazione, piano approvato, label di test e conferma del TM. La CI esegue separatamente `ci-ok`. |
| Merge | Il PM controlla gli esiti dei checkpoint, la Definition of Done e la review umana, poi esegue il merge. | La protezione di `main`, una volta configurata, impone review, permessi e check richiesti. |

Mantieni `fase:implementazione` sulla Issue e `fase:test` sulla PR fino al
merge. Per riprovare un evento di label dopo una correzione, rimuovi la label
e applicala di nuovo con l'account autorizzato. Per riprovare la revisione,
riporta la PR in draft e marcala di nuovo Ready for review.

## 3. Definition of Done

- [ ] Il TM assegnato ha approvato il piano prima dell'implementazione.
- [ ] La PR collega la Issue, indica gli artefatti e rispetta il piano.
- [ ] La revisione riscontra coerenza con i modelli. Se servono aggiornamenti,
      i PM li concordano e li includono nella stessa PR prima del merge.
- [ ] Ogni test frame ha un test con l'esito atteso della specifica.
- [ ] Le modifiche a test esistenti sono motivate e le nuove dipendenze sono approvate.
- [ ] La CI ha eseguito i controlli previsti per il cambiamento e sono passati.
- [ ] L'autore sa spiegare le modifiche e una persona diversa ha approvato la PR.

Per il bootstrap e le PR di manutenzione, applica i punti pertinenti al
cambiamento. Il requisito di copertura dei frame vale per i task applicativi.

## 4. Pilota dopo l'attivazione di Copilot Student

1. Verifica che il piano Student sia attivo sull'account del pilota, le policy
   sul repository e il budget. Usa una Issue con specifiche e dati fittizi e
   limita il primo tentativo alla generazione di un piano.
2. Prova Copilot CLI in modalità interattiva con accesso OAuth supportato,
   se disponibile per l'account. Usa le istruzioni del pianificatore e limita
   gli strumenti alla lettura. Il PM controlla e pubblica il risultato nella
   Issue, quindi il TM prova il checkpoint di approvazione.
3. Valuta l'invocazione automatica solo dopo aver dimostrato un'identità
   compatibile con Actions, con quote e spesa controllate, senza introdurre
   token personali. Il token predefinito di Actions serve qui per leggere i
   metadati GitHub. La sua presenza non dimostra l'accesso al servizio Copilot.
   Mantieni il passaggio manuale se manca un'autenticazione supportata.
4. Se il pilota automatico diventa fattibile, verifica prima un solo
   pianificatore. Separa il job che genera il piano dalla pubblicazione,
   limita la generazione alla lettura e dai al job che pubblica il solo
   permesso necessario per scrivere il commento. Prova anche un evento da
   un account non autorizzato, che deve fermarsi prima della generazione.
   Estendi agli altri ruoli dopo aver verificato permessi, esiti e costi.

Il caso del team C-01 suggerisce di verificare versione della CLI, modello
disponibile, autenticazione e percorso della richiesta come prerequisiti
distinti. In caso di 502, conserva l'esito e riprova un'operazione di lettura
con input fittizio. La pipeline di I-Need non introduce `gh-aw` né richieste AI.

[Autenticazione di Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli)
