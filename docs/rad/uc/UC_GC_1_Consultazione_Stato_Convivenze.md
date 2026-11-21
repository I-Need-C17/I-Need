# UC_GC_1 — Consultazione stato convivenze

## Informazioni generali

| Campo | Valore |
|---|---|
| Identificativo | UC_GC_1 |
| Nome | Consultazione stato convivenze |
| Data | 25/10/2026 |
| Versione | 0.0.1 |
| Autore | JCC |
| Descrizione | L’Operator consulta l’elenco delle convivenze e visualizza lo stato e i dettagli di una convivenza selezionata. |
| Attore principale | Operator |
| Attori secondari | Nessuno. |
| Entry Condition | L’Operator ha effettuato l’accesso su I-Need e accede alla pagina di elenco convivenze. |
| Exit Condition (On Success) | Il sistema mostra all’Operator lo stato e i dettagli della convivenza selezionata. |
| Exit Condition (On Failure) | L’operazione non ha avuto successo e l’Operator non è riuscito a visualizzare lo stato e i dettagli di una convivenza selezionata. |
| Rilevanza/User Priority | Alta (RF_GC_2). |
| Frequenza stimata | 300/mese |
| Extension Point | Nessuno. |
| Generalization of | Nessuna. |

## Flusso di Eventi Principale (Main Scenario)

| Passo | Attore | Azione |
|---|---|---|
| 1 | Operator | Richiede la visualizzazione dell’elenco delle convivenze tra Host e Guest |
| 2 | Sistema | Mostra l’elenco delle convivenze con indicato Host e Guest, insieme al comando per visualizzarne il dettaglio. |
| 3 | Operator | Individua nell’elenco la convivenza di interesse e seleziona il comando per visualizzarne il dettaglio. |
| 4 | Sistema | Mostra il dettaglio della convivenza: nominativi di Host e Guest, abitazione, data di inizio, data di fine prevista e stato, con il comando per tornare all’elenco. |
| 5 | Operator | Consulta lo stato e le informazioni della convivenza. |

## Flussi alternativi

### I — L’Operator filtra l’elenco delle convivenze

| Passo | Attore | Azione |
|---|---|---|
| 3.a.1 | Operator | Imposta uno o più dei seguenti filtri [stato, periodo di inizio, periodo di fine, Host, Guest e seleziona il comando per applicare i filtri. |
| 3.a.2 | Sistema | Verifica la validità dei criteri inseriti e ricerca le convivenze che li soddisfano. |
| 3.a.3 | Sistema | Mostra l’elenco filtrato delle convivenze con indicato Host e Guest. |
| 3.a.4 | Operator | Seleziona la convivenza di interesse e ne visualizza il dettaglio. |

### II — L’Operator modifica i criteri dopo una ricerca senza risultati

| Passo | Attore | Azione |
|---|---|---|
| 3.b.1 | Sistema | Restituisce una lista di convivenze vuota a seguito di una ricerca filtrata |
| 3.b.2 | Operator | Modifica uno o più filtri impostati o ne aggiunge di nuovi e seleziona il comando per applicare i filtri |
| 3.b.3 | Sistema | Ripete la verifica dei criteri e la ricerca. |
| 3.b.4 | Sistema | Mostra l’elenco delle convivenze filtrato |
| 3.b.5 | Operator | Seleziona la convivenza di interesse e ne visualizza il dettaglio |

## Flussi di errore

### I — Impossibilità di recuperare i dati per errore tecnico

| Passo | Attore | Azione |
|---|---|---|
| 2.c.1 | Sistema | A seguito di una ricerca il Sistema non riesce a restituire la lista delle convivenze per motivi tecnici. |
| 2.c.2 | Sistema | Mostra un messaggio che informa l’Operator dell’impossibilità di consultare i dati e lo invita a riprovare. |

## Note

—

## Special Requirements

RNF_U_2, RNF_A_1, RNF_A_3
