# UC_GM_1 — Avvio Proposta di Abbinamento

## Informazioni generali

| Campo | Valore |
|---|---|
| Identificativo | UC_GM_1 |
| Nome | Avvio Proposta di Abbinamento |
| Data | 25/10/2026 |
| Versione | 0.0.1 |
| Autore | LB |
| Descrizione | L'Operator seleziona una richiesta abitativa attiva di un Guest, consulta la graduatoria degli Host idonei ordinati per punteggio di compatibilità e invia una proposta di abbinamento all'Host selezionato e al Guest. |
| Attore principale | Operator |
| Attori secondari | Nessuno. |
| Entry Condition | L'Operator è autenticato su I-Need ed è presente almeno una richiesta abitativa attiva. |
| Exit Condition (On Success) | La proposta di abbinamento tra l'Host selezionato e il Guest è registrata nel sistema con stato «In attesa delle risposte» ed è resa consultabile a entrambe le parti. |
| Exit Condition (On Failure) | Non viene registrata né inviata alcuna proposta di abbinamento se nessun Host soddisfa i vincoli della richiesta, se l'Operator annulla l'operazione o se si verifica un errore tecnico. |
| Rilevanza/User Priority | Alta (RF_GM_1, RF_GM_2, RF_GM_3). |
| Frequenza stimata | 150/mese |
| Extension Point | Nessuno |
| Generalization of | Nessuna. |

## Flusso di Eventi Principale (Main Scenario)

| Passo | Attore | Azione |
|---|---|---|
| 1 | Operator | Accede alla propria area operativa e seleziona la sezione dedicata alle richieste abitative dei Guest. |
| 2 | Sistema | Mostra l'elenco delle richieste abitative attive dei Guest e, per ciascuna, il comando «Cerca Host Idonei». |
| 3 | Operator | Individua la richiesta abitativa di interesse e seleziona il comando «Cerca Host Idonei». |
| 4 | Sistema | Individua gli Host idonei, calcola il punteggio di compatibilità e mostra la graduatoria ordinata per punteggio decrescente, con i comandi «Visualizza dettaglio» e «Invia proposta di abbinamento». |
| 5 | Operator | Seleziona il comando «Visualizza dettaglio» associato a un Host Idoneo della graduatoria. |
| 6 | Sistema | Mostra i dettagli del profilo dell'Host, dell'abitazione, del questionario delle preferenze e il comando «Invia proposta di abbinamento». |
| 7 | Operator | Valuta positivamente la compatibilità e seleziona il comando «Invia proposta di abbinamento». |
| 8 | Sistema | Verifica la disponibilità di Host e Guest, registra la proposta di abbinamento con stato «In attesa delle risposte», la rende visibile a entrambe le parti e mostra all'Operator un messaggio di conferma dell'invio. |

## Flussi alternativi

### I — L'Operator consulta più Host della graduatoria prima di inviare la proposta

| Passo | Attore | Azione |
|---|---|---|
| 6.a.1 | Operator | Dopo aver consultato il dettaglio dell'Host, seleziona il comando per tornare alla graduatoria degli Host Idonei. |
| 6.a.2 | Sistema | Mostra nuovamente la graduatoria degli Host idonei ordinati per punteggio di compatibilità. |
| 6.a.3 | Operator | Seleziona il comando «Visualizza dettaglio» relativo a un diverso Host presente in graduatoria. |
| 6.a.4 | Sistema | Mostra i dettagli del nuovo Host selezionato. |

### II — L'Operator interrompe la valutazione senza inviare alcuna proposta

| Passo | Attore | Azione |
|---|---|---|
| 7.b.1 | Operator | Decide di non procedere con l'invio e seleziona il comando «Torna alle richieste». |
| 7.b.2 | Sistema | Interrompe la selezione dell'abbinamento senza registrare alcuna proposta. |
| 7.b.3 | Sistema | Mantiene la richiesta abitativa del Guest nello stato «Attiva» e mostra nuovamente l'elenco delle richieste abitative. |

## Flussi di errore

### I — Nessun Host idoneo trovato per la richiesta abitativa

| Passo | Attore | Azione |
|---|---|---|
| 4.c.1 | Sistema | Rileva che nessun Host soddisfa contemporaneamente le condizioni geografiche, temporali e di disponibilità della richiesta del Guest, per cui non vi sono Host Idonei. |
| 4.c.2 | Sistema | Inibisce la generazione della graduatoria e l'invio di proposte. |
| 4.c.3 | Sistema | Mostra all'Operator un messaggio che segnala l'assenza di Host Idonei. |

### II — Mancato calcolo della compatibilità o mancato invio per errore tecnico

| Passo | Attore | Azione |
|---|---|---|
| 8.d.1 | Sistema | Non riesce a elaborare la graduatoria di compatibilità o a salvare la proposta di abbinamento a causa di un errore tecnico. |
| 8.d.2 | Sistema | Non registra alcuna proposta di abbinamento e lascia invariato lo stato della richiesta del Guest e della disponibilità dell'Host. |
| 8.d.3 | Sistema | Mostra un messaggio di errore che informa l'Operator dell'impossibilità di completare l'operazione e lo invita a riprovare. |

## Note

—

## Special Requirements

RNF_U_2, RNF_A_1, RNF_I_2
