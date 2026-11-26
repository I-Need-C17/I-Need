# SC_GR_1: CreazioneRichiestaAbitativaValida

**ATTORI:** Guest : Marco Rossi

## Flusso di Eventi

| ATTORE | SISTEMA |
| --- | --- |
| Marco Rossi, 25 anni, già registrato e autenticato su I-Need con il ruolo Guest, desidera cercare una sistemazione nel quartiere Navigli di Milano dal 1° febbraio al 30 giugno 2027. Si trova nella pagina “Dashboard Guest”. |  |
|  | Il sistema mostra la dashboard personale di Marco, con il menu di navigazione contenente le sezioni “Il mio profilo”, “Le mie richieste”, “Proposte di abbinamento” e “Le mie convivenze”. |
| Marco seleziona la voce “Le mie richieste” dal menu di navigazione. |  |
|  | Il sistema apre la pagina “Le mie richieste abitative”. Poiché Marco non ha ancora registrato richieste, mostra il messaggio “Non hai ancora inserito richieste abitative” e il pulsante “Nuova richiesta”. |
| Marco clicca sul pulsante “Nuova richiesta”. |  |
|  | Il sistema apre la pagina “Crea richiesta abitativa”, contenente un modulo con quattro campi obbligatori: “Città” (menu a tendina), “Zona o quartiere” (menu a tendina), “Data di inizio permanenza” (selettore data) e “Data di fine permanenza” (selettore data). In fondo al modulo sono presenti i pulsanti “Conferma richiesta” e “Annulla”. |
| Marco apre il menu a tendina “Città” e seleziona “Milano”. |  |
|  | Il sistema mostra “Milano” come città selezionata e rende disponibili le relative zone nel menu “Zona o quartiere”. |
| Marco apre il menu “Zona o quartiere” e seleziona “Navigli”. |  |
|  | Il sistema mostra “Navigli” come zona selezionata. |
| Marco clicca sul campo “Data di inizio permanenza” e seleziona dal calendario il giorno 1 febbraio 2027. |  |
|  | Il sistema mostra nel campo il valore “01/02/2027”. |
| Marco clicca sul campo “Data di fine permanenza” e seleziona dal calendario il giorno 30 giugno 2027. |  |
|  | Il sistema mostra nel campo il valore “30/06/2027”. |
| Marco verifica che il modulo riporti i valori “Milano”, “Navigli”, “01/02/2027” e “30/06/2027”, quindi clicca sul pulsante “Conferma richiesta”. |  |
|  | Il sistema verifica che tutti i campi obbligatori siano compilati, che le date siano valide e che la data di fine sia successiva a quella di inizio. |
|  | Superati i controlli, il sistema registra la richiesta abitativa associandola al profilo Guest di Marco Rossi, assegnandole l’identificativo “RA-2027-0001” e lo stato “Attiva”. |
|  | Il sistema mostra il messaggio “Richiesta abitativa creata con successo”, accompagnato dal riepilogo: “RA-2027-0001 – Milano, Navigli – Dal 01/02/2027 al 30/06/2027 – Stato: Attiva”. |
|  | Il sistema reindirizza Marco alla pagina “Le mie richieste abitative”, dove la nuova richiesta compare nell’elenco con i dati inseriti e lo stato “Attiva”. |
