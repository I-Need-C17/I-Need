# 1.2 Design Goals

| Rank | ID | Design Goals | Descrizione | Categoria | RNF di origine |
| --- | --- | --- | --- | --- | --- |
| 1 | DG_1 | Usabilità | Il sistema deve risultare facile da usare per l'utente, garantendo il completamento dell'inserimento di una richiesta in massimo 7 passaggi e fornendo notifiche esplicite sull'esito di ogni operazione. | End user criteria | RNF_U_1, RNF_U_2 |
| 2 | DG_2 | Security | Il sistema deve resistere ad accessi non autorizzati, garantendo la stretta separazione dei permessi affinché ciascun utente acceda solo alle funzioni del proprio ruolo. | Dependability | RNF_A_1 |
| 3 | DG_3 | Robustness | Il sistema deve sopravvivere ad input non validi immessi dall'utente, validando formalmente e temporalmente tutti i dati prima del loro salvataggio. | Dependability | RNF_A_2 |
| 4 | DG_4 | Reliability | Il sistema deve comportarsi in modo conforme a quanto specificato, conservando lo storico di richieste proposte e convivenze; la conformità al comportamento specificato è verificata tramite test di unità progettati tramite la tecnica di Category Partition. | Dependability | RNF_A_3, RNF_I_3 |
| 5 | DG_6 | Estensibilità e Leggibilità | Il sistema deve essere strutturato in moduli indipendenti, così da poter aggiungere nuove funzionalità e riusare i componenti, e il codice deve essere facilmente comprensibile, superando la verifica di qualità di SonarQube. | Maintenance | RNF_S_1, RNF_S_2 |
| 6 | DG_7 | Portabilità | Il sistema deve poter essere portato facilmente su differenti piattaforme client, essendo realizzato come applicazione web compatibile con i browser che supportano HTML5, CSS e JavaScript. | Maintenance | RNF_I_1 |
| 7 | DG_10 | Modificabilità | Il modulo di Intelligenza Artificiale dovrebbe comunicare con il sistema tramite un’interfaccia JSON, così da poter essere modificato o sostituito. | Maintenance | RNF_I_2, RNF_IN_1 |
| 8 | DG_8 | Development Cost | Lo sviluppo deve concludersi con un effort massimo di 350 ore e un costo del personale di €12.000. | Cost | Business Case |
| 9 | DG_5 | Tempo di risposta | Il sistema dovrebbe soddisfare le richieste in tempi ridotti, restituendo la graduatoria di compatibilità entro 10 secondi dalla richiesta dell'Operator. | Performance | RNF_P_1 |
| 10 | DG_9 | Maintenance Cost | I costi di correzione degli errori e di aggiornamento del software devono restare entro €3.000 annui. | Cost | Business Case |
