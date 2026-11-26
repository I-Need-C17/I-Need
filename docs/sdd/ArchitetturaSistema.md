# 1.1 Scopo del Sistema

I-Need nasce per fornire un ambiente centralizzato volto a facilitare l'organizzazione e il monitoraggio dei programmi di coabitazione solidale, agevolando il lavoro dell'operator e semplificando l'adesione al programma di coabitazione solidale da parte di Host e Guest. Le principali funzionalità che il sistema deve includere sono:

- Supportare l'individuazione di possibili abbinamenti tra Host e Guest attraverso un sistema di valutazione della compatibilità, supportato da un modulo di intelligenza artificiale;
- Consentire agli Operator di supervisionare il processo di abbinamento e gestire le proposte di coabitazione;
- Garantire la tracciabilità delle decisioni dei partecipanti e dello stato delle proposte, fino alla conferma dell'abbinamento;
- Supportare il monitoraggio delle convivenze e la raccolta di feedback utili a valutarne l'andamento e l'esito.

# 2 Architettura software del sistema corrente

FHS dispone di soluzioni digitali come SpaceH, dedicata all'organizzazione degli ambienti comuni e delle attività della comunità, ma non di uno strumento per gestire candidature e percorsi di coabitazione. Nel programma pilota il processo è manuale: Host e Guest compilano moduli e questionari cartacei, l'Operator incrocia a mano i documenti confrontando un Host alla volta con il Guest, propone la convivenza alle parti e, a fine percorso, analizza i questionari di gradimento. Gli strumenti sono frammentati e non integrati, quindi non è possibile ricavare un'architettura software da riutilizzare o estendere. I-Need sostituisce l'intero flusso con un'unica piattaforma web.

# 3 Architettura software del sistema proposto

## 3.1 Panoramica

I-Need adotta un'architettura a strati (Layered Architecture) a tre livelli (Three-Tier), affiancata da due moduli esterni dedicati alla persistenza fisica e al calcolo della compatibilità. La scelta risponde a RNF_S_1 (modularità), RNF_IN_1 (scambio dati in JSON) e DG_10 (modificabilità). I tre livelli sono:

- Client Layer (presentazione): Single Page Application in React con Bootstrap. Contiene gli oggetti boundary del RAD (es. GraduatoriaHostView, RichiestaAbitativaForm) e rispetta i mockup MU_GUEST, MU_HOST e MU_OPERATOR.
- Business Layer (logica applicativa): realizzato con Spring Boot 3 (Java 17+, Jakarta EE 10) e Spring Security. Ospita gli oggetti control ed entity, gestisce autenticazione e autorizzazione e coordina l'orchestrazione del matching.
- Data Layer (accesso ai dati): gestito tramite Spring Data JPA, si occupa della mappatura, del salvataggio e del recupero dei dati applicativi, disaccoppiando la logica di business dalla base di dati.

Oltre ai tre livelli applicativi, si individuano due moduli esterni ai tre layer:

- Database: PostgreSQL, incaricato della conservazione persistente dei dati e accessibile esclusivamente dal Data Layer tramite JDBC.
- Modulo AI: microservizio Python 3.11+ con FastAPI dedicato al calcolo della graduatoria di compatibilità; non ha accesso diretto al database e riceve i dati necessari dal Business Layer.

Tutte le comunicazioni usano HTTP(S) con payload JSON (Client Layer ↔ Business Layer e Business Layer ↔ Modulo AI) o JDBC su TCP/IP (Data Layer ↔ Database).

## 3.2 Decomposizione in sottosistemi

Partendo dai raggruppamenti funzionali del RAD (GU, GA, GR, GM, GC) sono stati individuati i seguenti sottosistemi.

- Autenticazione: gestisce l’accesso e l’uscita degli utenti registrati, l’emissione e la validazione del token JWT e la verifica del ruolo.
- Gestione richieste abitative: gestisce la presentazione di una richiesta abitativa da parte del Guest e la visualizzazione dell’elenco delle sue richieste.
- Gestione abitazione: gestisce la registrazione dell’alloggio e del periodo di disponibilità da parte dell’Host e la visualizzazione dei dettagli dell’alloggio.
- Gestione matching: individua gli Host idonei a una richiesta abitativa e ne restituisce la graduatoria per punteggio di compatibilità.
- Gestione proposte: gestisce l’intero ciclo di vita della proposta di abbinamento (consultazione delle richieste abitative e della graduatoria, visualizzazione del dettaglio dell’Host, invio della proposta da parte dell’Operator, consultazione e risposta da parte del Convivente).
- Gestione convivenza: gestisce la consultazione e il filtraggio dell’elenco delle convivenze da parte dell’Operator e la visualizzazione del loro dettaglio e stato.
- Modulo AI: calcola il punteggio di compatibilità tra un Guest e gli Host idonei, combinando il punteggio sul questionario strutturato e quello semantico sui testi liberi, e ordina gli Host.
- Interfacciamento dati persistenti: si occupa della gestione dei dati persistenti facendo da tramite tra i vari sottosistemi e lo storage.
- Storage: il database PostgreSQL, a cui si accede solo tramite repository.

### 3.2.1 Diagrammi dei Sottosistemi

Le frecce rappresentano un collegamento di tipo Cliente -> Fornitore di un servizio

### 3.2.2 Diagramma Architetturale e delle Componenti

Come già descritto in precedenza, il seguente Diagramma Architetturale riporta a una divisione del sistema in tre livelli distinti (Client Layer, Business Layer e Data Layer), ai quali si affianca il Modulo AI come servizio separato. Ogni livello utilizza esclusivamente i servizi del livello immediatamente sottostante. Più in particolare, per i sottosistemi funzionali si è deciso di distinguere:

- GUI: sviluppa il livello delle interfacce con componenti React e Bootstrap, corrispondenti agli oggetti boundary del RAD.
- Control: espone le API REST/JSON tramite Spring @RestController, valida le richieste e applica i permessi per ruolo verificando il token JWT, delegando poi l’elaborazione al Service; corrisponde agli oggetti control del RAD.
- Service: implementa la logica di business tramite Spring @Service, gestendo le transazioni e coordinando l’accesso ai dati persistenti attraverso i Repository.

L’accesso ai dati è invece comune a tutti i sottosistemi ed è affidato a:

- Interfacciamento dati persistenti: comprende i repository Spring Data JPA, che espongono i metodi per le operazioni CRUD e le query sul database, e le entity JPA, che mappano le tabelle del database in classi Java.
- Storage: il database PostgreSQL, a cui si accede solo tramite i repository.

Le dipendenze puntuali tra Service e repository sono riportate nella tabella seguente:

| Service\Repository | Utente Registrato Repository | Host Repository | Guest Repository | Operator Repository | Alloggio Repository | Area Geografica Repository | Richiesta Abitativa Repository | Questionario Preferenze Repository | Domanda Repository | Risposta Repository | Proposta Abbinamento Repository | Convivenza Repository | Modulo AI (servizio esterno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RichiestaAbitativaService |  |  | X |  |  | X | X |  |  |  | X | X |  |
| AlloggioService |  | X |  |  | X | X |  |  |  |  |  |  |  |
| MatchingService |  | X | X |  | X | X | X | X | X | X | X |  | X |
| PropostaAbbinamentoService |  | X | X | X | X |  | X | X | X | X | X | X |  |
| ConvivenzaService |  | X | X | X | X |  |  |  |  |  |  | X |  |
| AutenticazioneService | X |  |  |  |  |  |  |  |  |  |  |  |  |
