# 3.3 Requisiti Non Funzionali

## 3.3.1 Usabilità

**RNF_U: Usabilità**

| Identificativo | Nome | Descrizione | Priorità | Difficoltà |
| --- | --- | --- | --- | --- |
| RNF_U_1 | Rapidità di inserimento richiesta | Il sistema deve permettere al Guest di completare l'inserimento di una richiesta abitativa in, al più, 7 passaggi. | Alta | Facile |
| RNF_U_2 | Chiarezza dei riscontri | Al termine di ognuna delle seguenti operazioni [creazione, modifica, invio, accettazione e rifiuto] eseguita dall'utente, il sistema deve mostrare una notifica esplicita che ne indichi l'esito. | Alta | Facile |

## 3.3.2 Affidabilità

**RNF_A: Affidabilità**

| Identificativo | Nome | Descrizione | Priorità | Difficoltà |
| --- | --- | --- | --- | --- |
| RNF_A_1 | Separazione dei permessi | Il sistema deve consentire a ciascun utente l'accesso esclusivamente alle funzionalità associate al proprio ruolo. | Alta | Facile |
| RNF_A_2 | Validazione degli input | Prima del salvataggio, il sistema deve verificare la validità formale e temporale di tutti i dati inseriti dall'utente. | Alta | Normale |
| RNF_A_3 | Conservazione dello storico | Il sistema dovrebbe conservare lo storico delle richieste, delle proposte e delle convivenze registrate sulla piattaforma. | Alta | Facile |

## 3.3.3 Prestazioni

**RNF_P: Prestazioni**

| Identificativo | Nome | Descrizione | Priorità | Difficoltà |
| --- | --- | --- | --- | --- |
| RNF_P_1 | Tempo di calcolo compatibilità | A seguito della richiesta dell'Operator, il sistema dovrebbe restituire la graduatoria degli Host compatibili entro 10 secondi. | Media | Normale |

## 3.3.4 Sostenibilità

**RNF_S: Sostenibilità**

| Identificativo | Nome | Descrizione | Priorità | Difficoltà |
| --- | --- | --- | --- | --- |
| RNF_S_1 | Modularità del codice | Il sistema deve essere strutturato in moduli indipendenti, per favorire il riuso e l'estendibilità del software. | Alta | Normale |
| RNF_S_2 | Conformità agli standard di qualità | Il codice sorgente del sistema deve superare la verifica degli standard di qualità effettuata tramite SonarQube. | Alta | Normale |

## 3.3.5 Implementazione

**RNF_I: Implementazione (Pseudo-requisiti)**

| Identificativo | Nome | Descrizione | Priorità | Difficoltà |
| --- | --- | --- | --- | --- |
| RNF_I_1 | Piattaforma Web | Il sistema deve essere realizzato come applicazione web compatibile con i browser che supportano HTML5, CSS e JavaScript. | Alta | Facile |
| RNF_I_2 | Modulo di Intelligenza Artificiale | Il sistema deve integrare un modulo di intelligenza artificiale per l’individuazione di Host e Guest idonei rispetto a una richiesta abitativa attiva. | Alta | Difficile |
| RNF_I_3 | Copertura di Unit Testing | I test di unità del sistema devono essere realizzati mediante la tecnica di Category Partition. | Alta | Normale |

## 3.3.6 Interfacce

**RNF_IN: Interfacce (Pseudo-requisiti)**

| Identificativo | Nome | Descrizione | Priorità | Difficoltà |
| --- | --- | --- | --- | --- |
| RNF_IN_1 | Formato di scambio dati | Il sistema dovrebbe scambiare i dati con il modulo di intelligenza artificiale utilizzando il formato JSON. | Media | Facile |

## 3.3.7 Operazione

**RNF_O: Operazione (Pseudo-requisiti)**

| Identificativo | Nome | Descrizione | Priorità | Difficoltà |
| --- | --- | --- | --- | --- |
| RNF_O_1 | Manutenzione | La manutenzione del sistema è delegata agli sviluppatori | Alta | Facile |

## 3.3.8 Packaging

**RNF_PA: Packaging (Pseudo-requisiti)**

| Identificativo | Nome | Descrizione | Priorità | Difficoltà |
| --- | --- | --- | --- | --- |
| RNF_PA_1 | Distribuzione su Server Web | Il sistema deve essere installato su un server web e risultare fruibile agli utenti tramite browser. | Media | Facile |
