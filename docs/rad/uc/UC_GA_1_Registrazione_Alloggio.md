# UC_GA_1 — Registrazione Alloggio

## Informazioni generali

| Campo | Valore |
|---|---|
| Identificativo | UC_GA_1 |
| Nome | Registrazione Alloggio |
| Data | 25/10/2026 |
| Versione | 0.0.1 |
| Autore | EP |
| Descrizione | L'Host registra sulla piattaforma I-Need il proprio alloggio, inserendo le informazioni richieste e il relativo periodo di disponibilità. |
| Attore principale | Host. |
| Attori secondari | Nessuno. |
| Entry Condition | L'Host ha effettuato l’accesso sulla piattaforma I-Need e accede alla pagina di Registrazione Alloggio. |
| Exit Condition (On Success) | L'alloggio è stato registrato e associato all'account dell'Host. |
| Exit Condition (On Failure) | L'alloggio non viene registrato. |
| Rilevanza/User Priority | Alta (RF_GA_1). |
| Frequenza stimata | 100/mese |
| Extension Point | Nessuno. |
| Generalization of | Nessuna. |

## Flusso di Eventi Principale (Main Scenario)

| Passo | Attore | Azione |
|---|---|---|
| 1 | Host | Seleziona «Inserisci abitazione». |
| 2 | Sistema | Mostra il modulo per inserire le informazioni dell'alloggio e il relativo periodo di disponibilità. |
| 3 | Host | Compila il modulo con le informazioni richieste e indica un periodo di disponibilità valido. |
| 4 | Host | Seleziona «Conferma inserimento». |
| 5 | Sistema | Verifica la completezza e la validità dei dati inseriti, quindi registra l'alloggio associandolo all'account dell’Host. |
| 6 | Sistema | Mostra un messaggio di conferma dell'avvenuta registrazione dell'alloggio. |

## Flussi alternativi

### I — Annullamento dell’inserimento

| Passo | Attore | Azione |
|---|---|---|
| 4.a.1 | Host | Decide di non procedere con la compilazione. |
| 4.a.2 | Host | Seleziona il comando «Annulla». |
| 4.a.3 | Sistema | Interrompe l'inserimento senza registrare l'alloggio. |
| 4.a.4 | Sistema | Ritorna alla sezione dedicata alla gestione dell'abitazione. |

## Flussi di errore

### I — Informazioni mancanti o non valide

| Passo | Attore | Azione |
|---|---|---|
| 5.b.1 | Sistema | Rileva dati mancanti o non validi. |
| 5.b.2 | Sistema | Mostra un messaggio che indica i campi da correggere o da valorizzare. |
| 5.b.3 | Sistema | Mantiene disponibile il modulo per effettuare la correzione. L’ alloggio non è registrato. |

### II — Mancata registrazione per un errore tecnico

| Passo | Attore | Azione |
|---|---|---|
| 5.c.1 | Sistema | Non riesce a completare il salvataggio della richiesta per un errore tecnico |
| 5.c.2 | Sistema | Mostra un messaggio che informa l’Host della mancata registrazione dell’abitazione e lo invita a riprovare. |

## Note

Nessuna.

## Special Requirements

RNF_U_2, RNF_A_1, RNF_A_2
