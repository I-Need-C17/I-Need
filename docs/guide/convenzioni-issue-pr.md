# Convenzioni per Issue e Pull Request

Questa guida riassume il processo definito nel repository per passare da una
Issue Task agente al merge di una Pull Request.

## Compilare una Issue Task agente

Aprire la Issue dall'[Issue Task agente](../../.github/ISSUE_TEMPLATE/task-agente.yml).
Il **PM** assegna un solo **TM**, applica una sola label di area
(`area:frontend`, `area:backend` o `area:ai-service`) e avvia il processo con
`fase:piano`. L'Issue richiede:

- **Tipo:** `Applicativo`, `Documentazione` o `Governance`.
- **Obiettivo e criteri:** risultato atteso, criteri di accettazione, limiti,
  dipendenze ed eventuali blocchi.
- **File:** una riga `File: percorso` per ciascun candidato da autorizzare,
  usando percorsi relativi esatti. Per test nuovi, usare `Test: percorso`
  nei percorsi consentiti dal progetto.
- **Fonti e frame:** i riferimenti pertinenti, con `Requisito: ID`,
  `Riferimento: percorso` e, per il Tester, `CP:`, `TF:` e `Frame:` distinti
  nei rispettivi percorsi.
- **TM assegnato:** indicato come assegnatario GitHub dalla Issue, non in un
  campo separato del template.

Il tipo `Documentazione` o `Governance` e i task applicativi privi di manifest
usano `N/A` per i test non applicabili, quando previsto dalle fonti.

## Piano e implementazione

Il Pianificatore pubblica il piano sulla Issue e il **TM assegnato** approva
esplicitamente con un nuovo commento. L'approvazione contiene:

```text
APPROVO PIANO
File autorizzati:
- docs/guide/convenzioni-issue-pr.md
```

L'approvazione del piano avviene sulla Issue ed autorizza soltanto i file
necessari tra i candidati approvati. L'approvazione dell'implementazione è
invece una **review GitHub** sulla Pull Request; non coincide con
l'approvazione del piano.

## Fasi operative

1. **Pianificazione:** il PM apre la Issue con `fase:piano`; il Pianificatore
   propone il piano e il TM assegnato lo approva o richiede revisioni.
2. **Implementazione:** il TM passa alla fase `fase:implementazione`;
   l'Implementatore modifica i soli file autorizzati e apre la Draft PR
   `agent/issue-N-implementazione` con il collegamento `Closes #N`.
3. **Testing:** il TM applica `fase:test` alla Draft PR; il Tester indipendente
   deriva i test dalle fonti e pubblica il report sullo SHA risultante.
4. **Revisione AI:** il TM rende la PR pronta per la review e il Revisore
   confronta il diff con i modelli approvati pubblicando il proprio report.
5. **Approvazione umana:** un **Code Owner umano** esamina la PR dopo i report
   e approva il commit corrente sul suo GitHub review.
6. **Merge:** il PM esegue il merge dopo i controlli richiesti.

Nelle PR agentiche il Code Owner umano deve essere diverso sia dall'autore
della PR sia dal **TM assegnato**. Le label e i passaggi `Ready for review`
restano azioni umane.

## Fonti

- [README del progetto](../../README.md)
- [Indice delle fonti](../README.md)
- [Template Issue Task agente](../../.github/ISSUE_TEMPLATE/task-agente.yml)
