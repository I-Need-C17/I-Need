# UC_GR_1 — Presentazione richiesta abitativa

## Informazioni generali

| Campo | Valore |
|---|---|
| Identificativo | UC_GR_1 |
| Nome | Presentazione richiesta abitativa |
| Data | 25/10/2026 |
| Versione | 0.0.1 |
| Autore | MM |
| Descrizione | Il Guest presenta una richiesta abitativa indicando l’area geografica (città + zona/quartiere) e il periodo di permanenza. Il sistema verifica i dati e registra la richiesta abitativa solo se completa e valida. |
| Attore principale | Guest |
| Attori secondari | Nessuno. |
| Entry Condition | Il Guest ha effettuato l’accesso su I-Need, ha compilato il questionario delle preferenze e accede alla sezione dedicata alle proprie richieste abitative. Il Guest non ha né convivenze o richieste attive né proposte pendenti. |
| Exit Condition (On Success) | La richiesta abitativa è registrata e associata al Guest. Il sistema mostra la conferma dell’avvenuta registrazione. |
| Exit Condition (On Failure) | Non viene registrata alcuna nuova richiesta abitativa. |
| Rilevanza/User Priority | Alta (RF_GR_1). |
| Frequenza stimata | 120/mese |
| Extension Point | Nessuno. |
| Generalization of | Nessuna. |

## Flusso di Eventi Principale (Main Scenario)

| Passo | Attore | Azione |
|---|---|---|
| 1 | Guest | Seleziona il comando per creare una nuova richiesta abitativa. |
| 2 | Sistema | Mostra il modulo per indicare area geografica, data di inizio e data di fine del periodo di permanenza, con i comandi per confermare o annullare l’inserimento. |
| 3 | Guest | Compila il modulo. |
| 4 | Guest | Seleziona il comando per confermare l’inserimento dei dati della richiesta. |
| 5 | Sistema | Verifica la completezza, la validità formale e la coerenza temporale dei dati. |
| 6 | Sistema | Poiché i dati sono validi, registra la richiesta abitativa associandola al Guest. |
| 7 | Sistema | Mostra un messaggio che conferma l’avvenuta registrazione della richiesta abitativa. |

## Flussi alternativi

### I — Il Guest annulla l’inserimento prima della conferma

| Passo | Attore | Azione |
|---|---|---|
| 3.a.1 | Guest | Decide di non procedere con la compilazione. |
| 3.a.2 | Guest | Seleziona il comando per annullare l’inserimento. |
| 3.a.3 | Sistema | Interrompe la compilazione senza registrare una nuova domanda. |
| 3.a.4 | Sistema | Mostra nuovamente la sezione delle richieste abitative. |

## Flussi di errore

### I — Informazioni mancanti o non valide

| Passo | Attore | Azione |
|---|---|---|
| 5.b.1 | Sistema | Rileva dati mancanti o non validi. |
| 5.b.2 | Sistema | Impedisce la registrazione della domanda. |
| 5.b.3 | Sistema | Mostra un messaggio che indica i campi da correggere o da valorizzare. |
| 5.b.4 | Sistema | Mantiene disponibile il modulo per la correzione. La domanda non è registrata. |

### II — Mancata registrazione per errore tecnico

| Passo | Attore | Azione |
|---|---|---|
| 6.c.1 | Sistema | Non riesce a completare il salvataggio della richiesta per un errore tecnico. |
| 6.c.2 | Sistema | Mostra un messaggio che informa il Guest della mancata registrazione e lo invita a riprovare. |

## Note

—

## Special Requirements

RNF_U_1, RNF_U_2, RNF_A_1, RNF_A_2
