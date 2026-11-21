# UC_GM_2 — Risposta alla Proposta di Abbinamento

## Informazioni generali

| Campo | Valore |
|---|---|
| Identificativo | UC_GM_2 |
| Nome | Risposta alla Proposta di Abbinamento |
| Data | 26/10/2026 |
| Versione | 0.0.1 |
| Autore | LN |
| Descrizione | Il Convivente consulta una proposta di abbinamento ricevuta e decide se accettarla o rifiutarla. Il sistema registra la risposta e aggiorna lo stato della proposta, attivando la convivenza qualora entrambe le parti abbiano accettato. |
| Attore principale | Convivente |
| Attori secondari | Nessuno. |
| Entry Condition | Il Convivente ha effettuato l'accesso su I-Need ed è presente almeno una proposta di abbinamento in attesa della sua risposta. |
| Exit Condition (On Success) | La risposta del Convivente è registrata. In caso di accettazione da entrambe le parti, la convivenza viene attivata; in caso contrario, lo stato della proposta viene aggiornato in base alla risposta ricevuta. |
| Exit Condition (On Failure) | Non viene registrata alcuna nuova risposta, perché il Convivente interrompe l'operazione oppure si verifica un errore tecnico. |
| Rilevanza/User Priority | Alta (RF_GM_5, RF_GM_6, RF_GM_7). |
| Frequenza stimata | 200/mese. |
| Extension Point | Nessuno. |
| Generalization of | Nessuna. |

## Flusso di Eventi Principale (Main Scenario)

| Passo | Attore | Azione |
|---|---|---|
| 1 | Convivente | Accede alla sezione dedicata alle proposte di abbinamento. |
| 2 | Sistema | Mostra l'elenco delle proposte di abbinamento ricevute, con il relativo stato e il comando «Visualizza dettaglio». |
| 3 | Convivente | Individua la proposta in attesa di risposta e seleziona il comando «Visualizza dettaglio». |
| 4 | Sistema | Mostra i dettagli della proposta, comprese le informazioni sull'alloggio, sulla controparte e sul periodo di convivenza, con i comandi «Accetta proposta» e «Rifiuta proposta». |
| 5 | Convivente | Valuta positivamente la proposta e seleziona il comando «Accetta proposta» |
| 6 | Sistema | Registra l'accettazione del Convivente e verifica le risposte ricevute da entrambe le parti. |
| 7 | Sistema | Poiché anche l'altra parte ha già accettato, considera la proposta accettata da entrambi e registra la convivenza con stato «Attiva». |
| 8 | Sistema | Mostra un messaggio che conferma l'avvenuta accettazione della proposta e l'attivazione della convivenza. |

## Flussi alternativi

### I — Mancanza della risposta

| Passo | Attore | Azione |
|---|---|---|
| 7.a.1 | Sistema | Rileva che l'altra parte non ha ancora espresso la propria risposta alla proposta di abbinamento. |
| 7.a.2 | Sistema | Mantiene la proposta nello stato «In attesa delle risposte», conservando l'accettazione registrata e senza attivare la convivenza. |
| 7.a.3 | Sistema | Mostra un messaggio che conferma l'avvenuta registrazione dell'accettazione e informa il Convivente che è ancora necessaria la risposta dell'altra parte. |

### II — Rifiuto della proposta

| Passo | Attore | Azione |
|---|---|---|
| 5.b.1 | Convivente | Valuta negativamente la proposta e seleziona il comando «Rifiuta proposta». |
| 5.b.2 | Sistema | Richiede al Convivente di confermare il rifiuto della proposta di abbinamento. |
| 5.b.3 | Convivente | Conferma la decisione di rifiutare la proposta. |
| 5.b.4 | Sistema | Registra il rifiuto, aggiorna lo stato della proposta a «Rifiutata» e rende nuovamente disponibile la richiesta abitativa del Guest. |
| 5.b.5 | Sistema | Mostra un messaggio che conferma l'avvenuta registrazione del rifiuto. |

### III — Il Convivente interrompe la consutlazione senza rispondere

| Passo | Attore | Azione |
|---|---|---|
| 5.c.1 | Convivente | Decide di non esprimere una risposta e seleziona il comando «Torna all'elenco». |
| 5.c.2 | Sistema | Interrompe la consultazione senza registrare alcuna risposta alla proposta di abbinamento. |
| 5.c.3 | Sistema | Mostra nuovamente l'elenco delle proposte, mantenendo la proposta nello stato precedente. |

## Flussi di errore

### I — Mancata registrazione della risposta per errore tecnico

| Passo | Attore | Azione |
|---|---|---|
| 6.d.1 | Sistema | Non riesce a completare la registrazione della risposta a causa di un errore tecnico. |
| 6.d.2 | Sistema | Non registra la risposta e mantiene invariato lo stato della proposta. |
| 6.d.3 | Sistema | Mostra un messaggio che informa il Convivente dell'impossibilità di completare l'operazione e lo invita a riprovare. |

## Note

Nessuna

## Special Requirements

RNF_U_2, RNF_A_1
