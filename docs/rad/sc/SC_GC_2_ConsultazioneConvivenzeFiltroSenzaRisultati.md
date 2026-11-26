# SC_GC_2: ConsultazioneConvivenzeFiltroSenzaRisultati

**ATTORI:** Operator : Jean Claude

## Flusso di Eventi

| ATTORE | SISTEMA |
| --- | --- |
| Jean Claude, 41 anni, Operator della Fondazione Housing Sociale, è già registrato e autenticato su I-Need con il ruolo Operator. Vuole individuare le convivenze già concluse che sono iniziate a febbraio 2027. Si trova nella pagina “Dashboard Operator”. |  |
|  | Il sistema mostra la dashboard personale di Jean Claude, con il menu di navigazione contenente le sezioni “Il mio profilo”, “Richieste abitative”, “Proposte di abbinamento”, “Convivenze” e “Questionari di gradimento”. |
| Jean Claude seleziona la voce “Convivenze” dal menu di navigazione. |  |
|  | Il sistema apre la pagina “Elenco convivenze”, contenente una tabella con le colonne “Codice”, “Host”, “Guest”, “Periodo” e “Stato”, in cui sono presenti le righe “CV-2027-0001 – Marta Verdi (Host) – Andrea Neri (Guest) – 01/02/2027 – 31/07/2027 – Attiva” e “CV-2027-0002 – Chiara Galli (Host) – Davide Moretti (Guest) – 01/03/2027 – 31/08/2027 – Attiva”. Per ogni convivenza è presente il pulsante “Visualizza dettaglio”. Sopra la tabella è presente il modulo dei filtri, che contiene: “Stato” (menu a tendina con le voci “Tutti”, “Attiva” e “Conclusa”), “Periodo di inizio” (due selettori data “dal” e “al”), “Periodo di fine” (due selettori data “dal” e “al”), “Host” e “Guest” (campi di testo), insieme ai pulsanti “Applica filtri” e “Reimposta filtri”. |
| Jean Claude apre il menu a tendina “Stato” e seleziona “Conclusa”. |  |
|  | Il sistema mostra “Conclusa” come stato selezionato. |
| Jean Claude clicca sul campo “Periodo di inizio – dal” e seleziona dal calendario il giorno 1 febbraio 2027. |  |
|  | Il sistema mostra nel campo il valore “01/02/2027”. |
| Jean Claude clicca sul campo “Periodo di inizio – al” e seleziona dal calendario il giorno 28 febbraio 2027. |  |
|  | Il sistema mostra nel campo il valore “28/02/2027”. |
| Jean Claude lascia vuoti gli altri filtri, verifica che il modulo riporti i valori “Conclusa”, “01/02/2027” e “28/02/2027”, quindi clicca sul pulsante “Applica filtri”. |  |
|  | Il sistema verifica la validità dei criteri inseriti, controllando che la data finale del periodo non preceda quella iniziale, e ricerca le convivenze che li soddisfano. |
|  | Il sistema rileva che nessuna convivenza soddisfa i criteri selezionati: nessuna convivenza risulta ancora conclusa: le due convivenze presenti hanno entrambe stato “Attiva”. Mostra la tabella vuota e, sopra di essa, il messaggio “Nessuna convivenza trovata per i criteri selezionati. Modifica i filtri e riprova.”, mantenendo compilati i valori dei filtri inseriti e disponibili i pulsanti “Applica filtri” e “Reimposta filtri”. |
| Jean Claude si accorge che le convivenze iniziate a febbraio 2027 sono ancora in corso. Apre il menu a tendina “Stato” e seleziona “Attiva”, mantenendo invariato il periodo di inizio. |  |
|  | Il sistema mostra “Attiva” come stato selezionato, lasciando invariato il periodo di inizio dal “01/02/2027” al “28/02/2027”. |
| Jean Claude clicca nuovamente sul pulsante “Applica filtri”. |  |
|  | Il sistema verifica nuovamente la validità dei criteri inseriti e ricerca le convivenze che li soddisfano. |
|  | Il sistema mostra l’elenco filtrato, composto da una sola convivenza: “CV-2027-0001 – Marta Verdi (Host) – Andrea Neri (Guest) – 01/02/2027 – 31/07/2027 – Attiva”, con il relativo pulsante “Visualizza dettaglio”. La convivenza “CV-2027-0002”, iniziata il 01/03/2027, non compare perché esterna al periodo di inizio indicato. |
| Jean Claude clicca sul pulsante “Visualizza dettaglio” associato alla convivenza “CV-2027-0001”. |  |
|  | Il sistema apre la pagina “Dettaglio convivenza”, che mostra: codice “CV-2027-0001”, nominativi di Host (Marta Verdi) e Guest (Andrea Neri), abitazione (Milano, Navigli), data di inizio “01/02/2027”, data di fine prevista “31/07/2027” e stato “Attiva”. In fondo alla pagina è presente il pulsante “Torna all’elenco”. |
| Jean Claude consulta lo stato e le informazioni della convivenza tra Marta Verdi e Andrea Neri, verificando che sia in corso e iniziata il 01/02/2027. |  |
