# Flusso agentico di I-Need

La prima fase riguarda il repository pubblico e i checkpoint umani.

## 1. Bootstrap e impostazioni GitHub

Il check `ci-ok` verifica la presenza dei file della pipeline, la sintassi dei
workflow, la logica dei checkpoint e la separazione dei contesti con dati fittizi. Parte su PR verso `main`,
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
  ai PM, blocca cancellazione e force push e applica la protezione anche agli amministratori.
  Il kit richiede un merge autorizzato. La riserva ai PM è una decisione di I-Need. Verifica con un TM
  e un PM il comportamento effettivo prima di contare sulla regola.
- Quando il team può iniziare a prendere in carico task, usa Projects per
  seguire Da pianificare → Piano → Implementazione → Test → Revisione → Fatto.
  Registra assegnatario, UC, PR, esito dei test, impedimenti e revisore.

## 2. Giro di prova con i checkpoint

I workflow delle fasi leggono Issue, commenti e metadati della PR. Esiti e
motivazioni sono nei run di Actions. Il responsabile esegue i passaggi
manualmente fino al collaudo di Copilot. I job di fase sulle PR usano i
workflow e il codice di controllo del branch di base.

| Fase | Cosa fa il responsabile | Cosa controlla Actions |
| --- | --- | --- |
| Piano | Il PM apre la Issue con `task-agente`, caso d'uso, specifiche, modelli, ambito, test frame ed esiti attesi. Assegna un TM e applica `fase:piano`. Poi pubblica un commento che inizia con `## Piano` e include la riga `Input: …` fornita dal run. | Verifica ruolo del PM, Issue aperta e TM assegnato. |
| Implementazione | Il TM assegnato esamina il piano e commenta `Piano approvato: <URL del commento del piano>`. Quindi aggiunge `fase:implementazione` e apre una Draft PR sul branch del task, con `Closes #NN` su una riga a sé. | Verifica ruolo, assegnazione e approvazione del piano più recente. Se il PM cambia il piano, il TM lo approva di nuovo. |
| Test | Il TM applica `fase:test` alla Draft PR. Verifica test derivati dalla Category Partition. Riporta frame, esiti attesi e ottenuti, e annota eventuali divergenze. | Verifica che la PR sia draft, nel repository e collegata a una Issue approvata. |
| Revisione | Il TM spunta **Ho verificato i test e gli esiti attesi** e porta la PR a **Ready for review**. Il revisore confronta diff e modelli. Una persona diversa dall'autore approva su GitHub. | Verifica assegnazione, piano approvato, label di test e conferma del TM. La CI esegue separatamente `ci-ok`. |
| Merge | Il PM controlla gli esiti dei checkpoint, la Definition of Done e la review umana, poi esegue il merge. | La protezione di `main`, una volta configurata, impone review, permessi e check richiesti. |

Mantieni `fase:implementazione` sulla Issue e `fase:test` sulla PR fino al
merge. Per riprovare un evento di label dopo una correzione, rimuovi la label
e applicala di nuovo con l'account autorizzato. Per riprovare la revisione,
riporta la PR in draft e marcala di nuovo Ready for review.

### Specifiche e sospensione del task

Il PM indica nella Issue un file per riga, la revisione Git completa presente
su main, almeno un caso d’uso e una Category Partition. Elenca un frame per
riga come `TF01 | esito atteso` e compila i criteri di accettazione. Le Issue
precedenti al nuovo modulo possono essere aggiornate usando le stesse sezioni.
Prima del piano il PM verifica contenuto e coerenza dei modelli con il team.
Actions controlla la presenza dei documenti alla revisione indicata. Il valore
`Input` lega il piano al corpo della Issue. Se gli input cambiano, il PM ripete
la fase piano e il TM approva il piano aggiornato.

Quando emerge un conflitto, il TM assegnato o un PM apre un commento nella
Issue con la prima riga `## Incongruenza modelli` e descrive i riferimenti in
conflitto. Il PM discute con il team e registra la decisione con la prima riga
`## Decisione modelli`, la seconda con il link esatto al commento e le righe
successive con motivazione e azione concordata. Ogni segnalazione richiede
una decisione. Il PM pubblica il piano aggiornato e il TM lo approva prima di
riprovare il checkpoint. Gli agenti restituiscono osservazioni e lasciano al
team l'aggiornamento autorizzato delle specifiche.

### Contesti del tester e del revisore

Nel run di fase il TM trova l'artefatto `contesto-test-…` o
`contesto-revisione-…`. Il tester riceve i documenti elencati della RAD,
i frame, i contratti, gli esiti attesi e le proprie istruzioni. Le firme
pubbliche usate dai test vanno documentate nel contratto. Il revisore riceve
i modelli selezionati, l'ambito e il diff della PR alla revisione del run.
Se il branch cambia, verifica di nuovo i frame e ripeti la revisione sul
nuovo commit. I due profili hanno la lista degli strumenti vuota.

Per riprodurre il collaudo esegui dalla radice
`node --test .github/scripts/role-context.test.cjs` con Docker disponibile.
Il runner avvia per ciascuna chiamata un processo in un contenitore effimero
con filesystem in sola lettura, rete disabilitata, senza credenziali o
directory host montate. Un adattatore deterministico legge il JSON su stdin e
restituisce il risultato su stdout. La CI esegue il test proposto su due
implementazioni sintetiche in processi distinti. Il TM controlla il contenuto
delle proposte prima di integrarle. Questa prova riguarda il confine degli
input e dei permessi. Il collegamento a Copilot richiede un pilota dedicato.

## 3. Definition of Done

- [ ] Il TM assegnato ha approvato il piano prima dell'implementazione.
- [ ] La PR collega la Issue, indica gli artefatti e rispetta il piano.
- [ ] La revisione riscontra coerenza con i modelli. Se servono aggiornamenti,
      i PM li concordano e li includono nella stessa PR prima del merge.
- [ ] Nella PR ogni frame eseguibile rimanda a un test significativo,
      all'asserzione e all'esito osservato. Un frame non eseguibile riporta
      motivo ed evidenza verificabile. Il TM verifica la sostanza delle prove.
      Il checkpoint controlla ID, stato e presenza dei riferimenti.
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
4. L'avvio locale e quello nativo da Issue/commento sono possibili se il
   piano li abilita. Registra sempre identità, input, risultati e approvazione
   nella Issue e nella PR. Per tester e revisore usa sessioni nuove con i soli
   dati selezionati e senza strumenti di accesso al repository o alla rete.
   Se la modalità scelta non offre questi limiti mantieni manuale la fase.
5. Se il pilota automatico diventa fattibile, verifica prima un solo
   pianificatore. Separa il job che genera il piano dalla pubblicazione,
   limita la generazione alla lettura e dai al job che pubblica il solo
   permesso necessario per scrivere il commento. Se viene approvata una GitHub
   App dedicata alla pubblicazione, il PM può configurare il suo ID numerico
   di utente bot in `AGENTIC_PLANNER_BOT_ID`. Durante il collaudo manuale
   lascia vuota questa variabile. Il TM continua ad approvare il piano. Prova anche un evento da
   un account non autorizzato, che deve fermarsi prima della generazione.
   Estendi agli altri ruoli dopo aver verificato permessi, esiti e costi.

[Autenticazione di Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli)
