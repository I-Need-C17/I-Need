# I-Need (C-17)

## Contesto

I-Need è il progetto GPS/IS dell'Università di Salerno per la coabitazione
solidale. Il repository è pubblico. Usa solo dati fittizi.
Consulta [l'indice delle specifiche](docs/README.md) e la Issue del task.

## Stack e comandi

Lo stack applicativo è da inizializzare. Usa solo versioni e comandi
approvati e presenti nel repository. Segnala le verifiche non configurate.

## Struttura

`backend/`, `frontend/` e `ai-service/` ospitano i tre componenti.
`docs/` raccoglie fonti e modelli approvati.
I profili dei ruoli sono in [.github/agents](.github/agents/).

## Convenzioni

Lavora nel branch del task. Collega Issue, revisione delle fonti, file
modificati, ID dei frame e risultati nel piano e nella PR. Usa percorsi
relativi esatti. Segui nomi e interfacce dei modelli approvati.

## Regole

- **Sempre** rispetta l'ambito approvato e riporta gli esiti effettivi. Se una
  fonte manca, è ambigua o contraddice il codice, sospendi la fase, indica
  l'evidenza e chiedi al TM o al PM una decisione.
- **Chiedi prima** di estendere l'ambito o intervenire su dipendenze,
  modelli, contratti, test esistenti e configurazione.
- **Mai** inserire credenziali o dati personali reali, alterare modelli o
  test senza autorizzazione, cambiare test per farli passare, inviare push
  a `main` o automatizzare approvazione e merge.

## Quando un task è finito (DoD)

La PR collega Issue e approvazione TM, rispetta l'ambito, documenta le
verifiche eseguite e le omissioni motivate. Ogni frame applicabile ha un
esito tracciabile. CI e revisione si riferiscono al commit finale e
l'approvazione proviene da una persona diversa dall'autore.
