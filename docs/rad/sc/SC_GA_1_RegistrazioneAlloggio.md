# SC_GA_1: RegistrazioneAlloggio

**ATTORI:** Host : Emanuele Russo

## Flusso di Eventi

| ATTORE | SISTEMA |
| --- | --- |
| Emanuele Russo già registrato e autenticato su I-Need con il ruolo Host, desidera mettere a disposizione una stanza del proprio appartamento nel quartiere Navigli di Milano dal 1° febbraio al 30 giugno 2027. Si trova nella pagina “Dashboard Host”. |  |
|  | Il sistema mostra la dashboard personale di Emanuele, con il menu di navigazione contenente le sezioni “Il mio profilo”, “La mia abitazione”, “Proposte di abbinamento” e “Le mie convivenze”. |
| Emanuele seleziona la voce “La mia abitazione” dal menu di navigazione. |  |
|  | Il sistema apre la pagina “La mia abitazione”. Poiché Emanuele non ha ancora registrato alcun alloggio, visualizza il messaggio “Non hai ancora inserito un’abitazione” e il pulsante “Inserisci abitazione”. |
| Emanuele clicca sul pulsante “Inserisci abitazione”. |  |
|  | Il sistema apre la pagina “Inserisci abitazione”, contenente un modulo con sei campi obbligatori: “Città” (menu a tendina), “Zona o quartiere” (menu a tendina), “Indirizzo” (campo di testo), “Tipologia di alloggio” (menu a tendina), “Data di inizio disponibilità” (selettore data) e “Data di fine disponibilità” (selettore data). In fondo al modulo sono presenti i pulsanti “Conferma inserimento” e “Annulla”. |
| Emanuele apre il menu a tendina “Città” e seleziona “Milano”. |  |
|  | Il sistema mostra “Milano” come città selezionata e rende disponibili le relative zone nel menu “Zona o quartiere”. |
| Emanuele apre il menu “Zona o quartiere” e seleziona “Navigli”. |  |
|  | Il sistema mostra “Navigli” come zona selezionata. |
| Emanuele clicca sul campo “Indirizzo” e digita “Via Ripa di Porta Ticinese 25”. |  |
|  | Il sistema visualizza nel campo il valore “Via Ripa di Porta Ticinese 25”. |
| Emanuele apre il menu “Tipologia di alloggio” e seleziona “Stanza singola in appartamento condiviso”. |  |
|  | Il sistema mostra “Stanza singola in appartamento condiviso” come tipologia selezionata. |
| Emanuele clicca sul campo “Data di inizio disponibilità” e seleziona dal calendario il giorno 1° febbraio 2027. |  |
|  | Il sistema visualizza nel campo il valore “01/02/2027”. |
| Emanuele clicca sul campo “Data di fine disponibilità” e seleziona dal calendario il giorno 30 giugno 2027. |  |
|  | Il sistema visualizza nel campo il valore “30/06/2027”. |
| Emanuele verifica che il modulo riporti i valori “Milano”, “Navigli”, “Via Ripa di Porta Ticinese 25”, “Stanza singola in appartamento condiviso”, “01/02/2027” e “30/06/2027”, quindi clicca sul pulsante “Conferma inserimento”. |  |
|  | Il sistema verifica che tutti i campi obbligatori siano compilati, che le date siano valide e che la data di fine disponibilità sia successiva a quella di inizio. |
|  | Superati i controlli, il sistema registra l’alloggio associandolo al profilo Host di Emanuele Russo, assegnandogli l’identificativo “AL-2027-0001” e lo stato “Disponibile”, e salva il periodo di disponibilità indicato. |
|  | Il sistema visualizza il messaggio “Abitazione inserita con successo”, accompagnato dal riepilogo: “AL-2027-0001 – Milano, Navigli, Via Ripa di Porta Ticinese 25 – Stanza singola in appartamento condiviso – Dal 01/02/2027 al 30/06/2027 – Stato: Disponibile”. |
|  | Il sistema reindirizza Emanuele alla pagina “La mia abitazione”, dove il nuovo alloggio compare con i dati inseriti e lo stato “Disponibile”. |
