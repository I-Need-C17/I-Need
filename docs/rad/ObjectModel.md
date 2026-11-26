# 3.4.3 Object Model

## 3.4.3.1 Tabelle oggetti

### UC_GR_1 - PRESENTAZIONE RICHIESTA ABITATIVA

| Oggetto | Tipo | Descrizione |
| --- | --- | --- |
| Guest | Entity | Utente registrato sulla piattaforma alla ricerca di una sistemazione abitativa. |
| RichiestaAbitativa | Entity | Richiesta presentata da un Guest che specifica l'area geografica e il periodo di permanenza desiderati per una sistemazione abitativa. |
| AreaGeografica | Entity | Area territoriale individuata da una città e da una specifica zona o quartiere di quella città. |
| PresentazioneRichiestaAbitativaControl | Control | Gestisce la funzione di presentazione di una richiesta abitativa da parte del Guest. |
| RichiesteAbitativeView | Boundary | Schermata del Guest con l'elenco delle proprie richieste abitative, accesso alla creazione di una nuova richiesta e conferma della registrazione. |
| RichiestaAbitativaForm | Boundary | Form del Guest per inserire i dati della richiesta abitativa (città, zona/quartiere, data inizio e fine permanenza); consente conferma o annullamento e segnala dati invalidi o errori tecnici di registrazione. |

### AVVIO PROPOSTA DI ABBINAMENTO

| Oggetto | Tipo | Descrizione |
| --- | --- | --- |
| Operator | Entity | Operatore della FHS che supervisiona il processo di abbinamento e monitora le convivenze. |
| RichiestaAbitativa | Entity | Richiesta presentata da un Guest che specifica l'area geografica e il periodo di permanenza desiderati per una sistemazione abitativa. |
| Host | Entity | Utente registrato sulla piattaforma che mette a disposizione uno spazio abitativo. |
| Guest | Entity | Utente registrato sulla piattaforma alla ricerca di una sistemazione abitativa. |
| Alloggio | Entity | Spazio abitativo messo a disposizione da un Host, caratterizzato dai dati dell'immobile e dal relativo periodo di disponibilità. |
| QuestionarioPreferenze | Entity | Modello utilizzato per raggruppare le domande che verranno poste ad un convivente |
| Domanda | Entity | Domanda appartenente al questionario delle preferenze |
| Risposta | Entity | Risposta specifica di un Convivente ad una Domanda del questionario delle preferenze |
| PropostaAbbinamento | Entity | Proposta di coabitazione formulata dall'Operator che mette in relazione un Guest e un Host compatibili per un determinato periodo. |
| AreaGeografica | Entity | Area territoriale individuata da una città e da una specifica zona o quartiere di quella città. |
| AvvioPropostaAbbinamentoControl | Control | Gestisce la funzione di avvio di una proposta di abbinamento da parte dell'Operator. |
| ElencoRichiesteAbitativeView | Boundary | Schermata per l'Operator con le richieste attive: consente di selezionare una richiesta, avviare la ricerca degli Host e ritornare alle richieste. |
| GraduatoriaHostView | Boundary | Schermata che presenta gli Host idonei ordinati per compatibilità, consente la selezione e la consultazione del dettaglio e mostra l'assenza di risultati o errori di elaborazione. |
| DettaglioHostView | Boundary | Schermata che mostra profilo, alloggio e preferenze dell'Host selezionato, consente l'invio della proposta e presenta conferma o errore di invio/registrazione. |

### RISPOSTA ALLA PROPOSTA DI ABBINAMENTO

| Oggetto | Tipo | Descrizione |
| --- | --- | --- |
| Convivente | Entity | Generalizzazione degli utenti registrati direttamente coinvolti in un percorso di coabitazione, che comprende i ruoli di Host e Guest. |
| PropostaAbbinamento | Entity | Proposta di coabitazione formulata dall'Operator che mette in relazione un Guest e un Host compatibili per un determinato periodo. |
| Alloggio | Entity | Spazio abitativo messo a disposizione da un Host, caratterizzato dai dati dell'immobile e dal relativo periodo di disponibilità. |
| QuestionarioPreferenze | Entity | Insieme comune di domande relative alle esigenze e alle preferenze personali, utilizzate per il calcolo della compatibilità tra Host e Guest. |
| Domanda | Entity | Singola domanda appartenente al questionario delle preferenze. |
| Risposta | Entity | Risposta fornita da uno specifico Convivente a una specifica Domanda del questionario delle preferenze. |
| Convivenza | Entity | Percorso di coabitazione tra un Host e un Guest presso un alloggio, per un determinato periodo. |
| RichiestaAbitativa | Entity | Richiesta presentata da un Guest che specifica l'area geografica e il periodo di permanenza desiderati per una sistemazione abitativa. |
| RispostaPropostaAbbinamentoControl | Control | Gestisce la funzione di risposta alla proposta di abbinamento da parte del Convivente. |
| ProposteAbbinamentoView | Boundary | Schermata del Convivente per accedere e consultare l'elenco delle proposte ricevute, selezionare il dettaglio e tornare all'elenco senza rispondere. |
| DettaglioPropostaView | Boundary | Schermata con informazioni sulla proposta e sulla controparte, comandi di accettazione/rifiuto e notifiche di prima accettazione, doppia accettazione, rifiuto ed errore tecnico. |
| ConfermaRifiutoDialog | Boundary | Finestra di conferma del rifiuto, con azioni esplicite per confermare oppure annullare senza modificare la proposta. |

### REGISTRAZIONE ALLOGGIO

| Oggetto | Tipo | Descrizione |
| --- | --- | --- |
| Host | Entity | Utente registrato sulla piattaforma che mette a disposizione uno spazio abitativo. |
| Alloggio | Entity | Spazio abitativo messo a disposizione da un Host, caratterizzato dai dati dell'immobile e dal relativo periodo di disponibilità. |
| AreaGeografica | Entity | Area territoriale individuata da una città e da una specifica zona o quartiere di quella città. |
| RegistrazioneAlloggioControl | Control | Gestisce la funzione di registrazione di un alloggio da parte dell’Host. |
| AbitazioneView | Boundary | Schermata «La mia abitazione» dell’Host: visualizza le informazioni disponibili, consente di avviare una registrazione e conferma l’avvenuta registrazione dell’alloggio. |
| AlloggioForm | Boundary | Schermata per inserire dati e periodo di disponibilità dell’alloggio; consente conferma o annullamento e segnala dati invalidi o errori tecnici di registrazione. |

### CONSULTAZIONE STATO CONVIVENZE

| Oggetto | Tipo | Descrizione |
| --- | --- | --- |
| Operator | Entity | Operatore della FHS che supervisiona il processo di abbinamento e monitora le convivenze. |
| Convivenza | Entity | Percorso di coabitazione tra un Host e un Guest presso un alloggio, per un determinato periodo. |
| Host | Entity | Utente registrato sulla piattaforma che mette a disposizione uno spazio abitativo. |
| Guest | Entity | Utente registrato sulla piattaforma alla ricerca di una sistemazione abitativa. |
| Alloggio | Entity | Spazio abitativo messo a disposizione da un Host, caratterizzato dai dati dell'immobile e dal relativo periodo di disponibilità. |
| ConsultazioneStatoConvivenzeControl | Control | Gestisce la funzione di consultazione dello stato delle convivenze da parte dell’Operator. |
| ConvivenzeView | Boundary | Schermata di consultazione delle convivenze dell’Operator: accesso, elenco, impostazione/applicazione/reset dei filtri, selezione del dettaglio, nessun risultato ed errori di recupero. |
| DettaglioConvivenzaView | Boundary | Schermata con i dettagli della convivenza selezionata (partecipanti, alloggio, periodo e stato) e il comando di ritorno all’elenco. |

### TABELLA OGGETTI GENERALE

| Oggetto | Tipo | Descrizione |
| --- | --- | --- |
| UtenteRegistrato | Entity | Generalizzazione degli utenti registrati; comprende gli attributi anagrafici comuni. |
| Guest | Entity | Utente registrato sulla piattaforma alla ricerca di una sistemazione abitativa. |
| RichiestaAbitativa | Entity | Richiesta presentata da un Guest che specifica l'area geografica e il periodo di permanenza desiderati per una sistemazione abitativa. |
| AreaGeografica | Entity | Area territoriale individuata da una città e da una specifica zona o quartiere di quella città. |
| Operator | Entity | Operatore della FHS che supervisiona il processo di abbinamento e monitora le convivenze. |
| Host | Entity | Utente registrato sulla piattaforma che mette a disposizione uno spazio abitativo. |
| Alloggio | Entity | Spazio abitativo messo a disposizione da un Host, caratterizzato dai dati dell'immobile e dal relativo periodo di disponibilità. |
| QuestionarioPreferenze | Entity | Insieme comune di domande relative alle esigenze e preferenze personali, utilizzate per il calcolo della compatibilità tra Host e Guest. |
| Domanda | Entity | Singola domanda appartenente al questionario delle preferenze. |
| Risposta | Entity | Risposta fornita da uno specifico Convivente a una specifica Domanda del questionario delle preferenze. |
| PropostaAbbinamento | Entity | Proposta di coabitazione formulata dall'Operator che mette in relazione un Guest e un Host compatibili per un determinato periodo. |
| Convivenza | Entity | Percorso di coabitazione tra un Host e un Guest presso un alloggio, per un determinato periodo. |
| Convivente | Entity | Generalizzazione degli utenti registrati direttamente coinvolti in un percorso di coabitazione, che comprende i ruoli di Host e Guest. |
| PresentazioneRichiestaAbitativaControl | Control | Gestisce la funzione di presentazione di una richiesta abitativa da parte del Guest. |
| AvvioPropostaAbbinamentoControl | Control | Gestisce la funzione di avvio di una proposta di abbinamento da parte dell'Operator. |
| RegistrazioneAlloggioControl | Control | Gestisce la funzione di registrazione di un alloggio da parte dell'Host. |
| ConsultazioneStatoConvivenzeControl | Control | Gestisce la funzione di consultazione dello stato delle convivenze da parte dell'Operator. |
| RispostaPropostaAbbinamentoControl | Control | Gestisce la funzione di risposta alla proposta di abbinamento da parte del Convivente. |
| RichiesteAbitativeView | Boundary | Schermata del Guest con l'elenco delle proprie richieste abitative, accesso alla creazione di una nuova richiesta e conferma della registrazione. |
| RichiestaAbitativaForm | Boundary | Form del Guest per inserire i dati della richiesta abitativa (città, zona/quartiere, data inizio e fine permanenza); consente conferma o annullamento e segnala dati invalidi o errori tecnici di registrazione. |
| AbitazioneView | Boundary | Pagina "La mia abitazione" dell'Host, per la gestione dell'abitazione; consente l'avvio della registrazione di un alloggio e la conferma dell'avvenuta registrazione. |
| AlloggioForm | Boundary | Form dell'Host per inserire i dati dell'alloggio e il relativo periodo di disponibilità; consente conferma o annullamento e segnala dati invalidi o errori tecnici di registrazione. |
| ElencoRichiesteAbitativeView | Boundary | Schermata dell'Operator con l'elenco delle richieste abitative attive; consente di selezionare una richiesta e avviare il processo di abbinamento. |
| GraduatoriaHostView | Boundary | Schermata con l'elenco degli Host idonei ordinati per punteggio di compatibilità decrescente; consente la selezione e la consultazione del dettaglio e mostra l'assenza di risultati o errori di elaborazione. |
| DettaglioHostView | Boundary | Schermata che mostra profilo, alloggio e preferenze dell'Host selezionato, consente l'invio della proposta e presenta conferma o errore di invio/registrazione. |
| ProposteAbbinamentoView | Boundary | Schermata del Convivente per accedere e consultare l'elenco delle proposte ricevute, selezionare il dettaglio e tornare all'elenco senza rispondere. |
| DettaglioPropostaView | Boundary | Schermata con informazioni sulla proposta e sulla controparte, comandi di accettazione/rifiuto e notifiche di prima accettazione, doppia accettazione, rifiuto ed errore tecnico. |
| ConfermaRifiutoDialog | Boundary | Finestra di conferma del rifiuto, con azioni esplicite per confermare oppure annullare senza modificare la proposta. |
| ConvivenzeView | Boundary | Schermata di consultazione delle convivenze dell'Operator: accesso, elenco, impostazione/applicazione/reset dei filtri, selezione del dettaglio, nessun risultato ed errori di recupero. |
| DettaglioConvivenzaView | Boundary | Schermata con i dettagli della convivenza selezionata (partecipanti, alloggio, periodo e stato) e il comando di ritorno all'elenco. |
