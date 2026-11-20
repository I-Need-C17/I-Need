# i-Need

## Contesto
Piattaforma web per la coabitazione solidale promossa da Fondazione Housing Sociale:
mette in relazione Host (offrono uno spazio) e Guest (cercano sistemazione), con la
supervisione degli Operator. Progetto del corso di Gestione dei Progetti Software (Unisa).

## Architettura (monorepo)
- `frontend/`: React + TypeScript + Bootstrap, parla solo con il backend (REST JSON).
- `backend/`: Spring Boot 3, Spring Data JPA, PostgreSQL, Spring Security con JWT.
- `ai-service/`: FastAPI + Python, calcola la compatibilità Guest/Host.
- Il servizio AI non accede mai al database: il backend raccoglie i dati e li invia in JSON.
- Gli scambi tra backend e servizio AI sono solo JSON.
- Ogni componente ha il proprio `AGENTS.md` con stack, comandi e regole: leggi quello della
  cartella in cui lavori.

## Specifica
Tutto in `docs/`: casi d'uso in docs/rad/uc/, modelli in docs/modelli/, architettura in
docs/sdd/, category partition in docs/test/, contratti API in docs/contratti/.
Il task indica quali file usare. Se manca un'informazione, chiedi: non inventarla.

## Convenzioni
Branch: `ucNN-componente-nome`. Commit: "UCNN: descrizione".
Un task riguarda un solo componente.

## Regole
Sempre: lavora nel branch del task; cita nella PR i file di `docs/` usati;
un test per ogni test frame indicato nel task.
Chiedi prima: nuove dipendenze; modifiche ai contratti in docs/contratti/;
classi, endpoint o componenti non presenti nei modelli.
Mai: push su `main`; modificare test esistenti per farli passare; credenziali, chiavi
o dati personali nel codice (il repository è pubblico); modificare `AGENTS.md`,
`.github/` e `docs/`; fare il merge di una PR.

## Fasi del lavoro
1. Piano (label `fase:piano`): scrivi il piano e non modificare il codice.
2. Implementazione (`fase:implementazione`): lavora sul branch del task, apri una Draft PR.
3. Test (`fase:test`): test scritti dalla category partition, senza guardare l'implementazione.
4. Revisione (`fase:revisione`): confronto con i modelli. L'approvazione è delle persone.

## Quando un task è finito
I comandi di build e test del componente passano; ogni test frame ha un test;
nessun file è stato modificato fuori dal piano approvato; la PR usa il template.
