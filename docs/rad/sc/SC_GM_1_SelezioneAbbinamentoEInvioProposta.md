# SC_GM_1: SelezioneAbbinamentoEInvioProposta

**ATTORI:** Operator : Luigi

## Flusso di Eventi

| ATTORE | SISTEMA |
| --- | --- |
| Luigi è un Operator della Fondazione Housing Sociale registrato sulla piattaforma I-Need. Dopo aver effettuato l'accesso, accede alla sezione dedicata alle richieste abitative dei Guest per individuare un alloggio compatibile con la richiesta attiva di Marco, che cerca una sistemazione a Milano dal 01/02/2027 al 30/06/2027. |  |
|  | Il sistema mostra l'elenco delle richieste abitative attive presentate dai Guest (tra cui il Guest Marco) e, per ciascuna richiesta, il comando «Cerca Host compatibili». |
| Luigi individua la richiesta abitativa di Marco e seleziona il comando «Cerca Host compatibili». |  |
|  | Il sistema individua gli Host idonei che soddisfano le condizioni geografiche, temporali e di disponibilità della richiesta di Marco, calcola il punteggio di compatibilità sulla base dei questionari delle preferenze e mostra la graduatoria degli Host compatibili ordinata per punteggio decrescente (tra cui l'Host Emanuele), insieme ai comandi «Visualizza dettaglio» e «Invia proposta». |
| Luigi seleziona il comando «Visualizza dettaglio» associato all'Host Emanuele per verificare le informazioni del profilo, dell'alloggio e del questionario delle preferenze. |  |
|  | Il sistema mostra il dettaglio del profilo di Emanuele, i dati dell'abitazione situata a Milano, i principali fattori di compatibilità con la richiesta di Marco e il comando «Invia proposta di abbinamento». |
| Luigi valuta positivamente l'abbinamento e seleziona il comando «Invia proposta di abbinamento». |  |
|  | Il sistema verifica che né Marco né Emanuele siano impegnati in altre proposte pendenti o convivenze, registra la proposta di abbinamento con stato «In attesa delle risposte» e la rende consultabile a entrambi. |
|  | Il sistema mostra a Luigi un messaggio di conferma dell'avvenuto invio della proposta di abbinamento. |
