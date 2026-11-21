# Workflow agentico da Issue a merge

Il workflow I-Need collega una Issue Task agente a una Draft PR e al merge su `main`.
Ogni passaggio è gestito dai ruoli indicati nel [README](../../README.md).

## Responsabilità

- Il **PM** apre la Issue, assegna un solo TM, aggiunge la label di area e applica `fase:piano`.
  Al termine dei controlli richiesti, effettua il merge.
- Il **Pianificatore** legge la snapshot di `main` in sola lettura e pubblica il piano sulla Issue.
- Il **TM assegnato** verifica e approva il piano, gestisce le fasi successive e può chiedere
  ripianificazioni o correzioni.
- L’**Implementatore** realizza solo i file autorizzati dal TM e apre la Draft PR.
- Il **Tester** indipendente deriva i test dai frame e pubblica il report sullo SHA verificato.
  Per attività documentali o di governance registra `N/A` per i test applicativi.
- Il **Revisore AI** esamina il diff e pubblica un report sullo SHA risultante.
- Il **Code Owner umano**, diverso dall’autore e, nelle PR agentiche, dal Revisore e dal TM,
  approva il commit corrente.

## Fasi

1. **Pianificazione.** Il PM apre la Issue con `fase:piano`. Il Pianificatore pubblica il piano;
   il TM approva esplicitamente i soli file necessari, quindi passa a `fase:implementazione`.
2. **Implementazione.** L’Implementatore verifica l’approvazione, modifica il perimetro autorizzato,
   esegue i controlli disponibili e apre la Draft PR `agent/issue-N-implementazione` con `Closes #N`.
3. **Testing.** Il TM applica `fase:test` sulla Draft PR. Il Tester esegue le verifiche disponibili
   e pubblica il report sullo SHA risultante.
4. **Revisione.** Il TM verifica diff e report del Tester, quindi seleziona **Ready for review**.
   La CI `repository-checks` controlla la PR e il Revisore AI pubblica il proprio report.
   Il Code Owner approva il commit corrente; `governance-gate` verifica review, report e run.
   Infine il PM completa il merge dopo i controlli richiesti.

In caso di ripianificazione sulla Issue o di correzione sulla Draft PR, il TM registra la richiesta,
attende la nuova versione o il nuovo report e riapplica i gate necessari prima di rimandare la PR
in review.
