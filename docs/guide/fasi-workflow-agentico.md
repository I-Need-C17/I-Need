# Fasi del workflow agentico

Questa guida sintetizza il passaggio dalla Issue al merge secondo il
[README del repository](../../README.md), nella sezione
“Dalla Issue al merge”, e usa l'[indice delle fonti](../README.md) come
riferimento ai documenti approvati.

## Fasi principali

| Fase | Responsabile principale | Risultato atteso |
| --- | --- | --- |
| **Pianificazione** | PM, TM assegnato e Pianificatore | Il PM apre la Issue, assegna il TM e avvia `fase:piano`; il Pianificatore propone il piano e il TM lo approva con i file autorizzati. |
| **Implementazione** | TM assegnato e Implementatore | Il TM passa a `fase:implementazione`; l'Implementatore modifica soltanto i percorsi approvati ed apre la Draft PR `agent/issue-N-implementazione`. |
| **Testing** | TM e Tester indipendente | Il TM applica `fase:test`; il Tester deriva le verifiche dai frame disponibili, registra l'esito sullo SHA risultante e usa `N/A` quando i test applicativi non sono pertinenti. |
| **Revisione AI** | TM e Revisore AI | Il TM controlla diff e report del Tester, seleziona **Ready for review** e il Revisore AI pubblica il proprio report sullo SHA esaminato; la CI `repository-checks` verifica la PR. |
| **Approvazione umana e merge** | Code Owner umano e PM | Un Code Owner diverso dall'autore approva il commit corrente; per una PR agentica il revisore è anche diverso dal TM assegnato. Il PM completa il merge dopo i controlli richiesti. |

## Ruoli

- **PM:** apre e assegna la Issue, avvia il piano con `fase:piano` e fa il
  merge dopo i controlli.
- **TM assegnato:** approva il piano e i file autorizzati, gestisce
  implementazione e correzioni, attiva il Tester e prepara la PR per la review.
- **Pianificatore:** propone il piano nella Issue.
- **Implementatore:** realizza il perimetro approvato e apre la Draft PR.
- **Tester:** esegue le verifiche applicabili e pubblica il report sullo SHA.
- **Revisore AI:** confronta il diff con i modelli approvati e pubblica il
  report.
- **Code Owner umano:** nelle PR agentiche approva la PR ed è diverso sia
  dall'autore della PR sia dal TM assegnato.

## Due approvazioni distinte

L'**approvazione del piano** e l'**approvazione della Pull Request** avvengono
in momenti e con effetti diversi:

1. Il TM assegnato approva prima il piano vigente e l'elenco esatto dei file
   autorizzati; questa approvazione abilita l'implementazione.
2. Dopo testing e revisione AI, un Code Owner umano diverso dall'autore
   approva la PR sul commit corrente; questa approvazione è separata
   dall'approvazione del piano.

Eventuali richieste di revisione o correzione possono riportare il lavoro allo
stato precedente e richiedono nuovi controlli sul nuovo SHA.
