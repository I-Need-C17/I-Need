# backend

Spring Boot 3, Java 21, Maven, Spring Data JPA (PostgreSQL), Spring Security (JWT), JUnit 5.
Comando da questa cartella: `mvn -B verify`

## Struttura
Package base `com.ineed.backend`. Livelli come nel class diagram in
docs/modelli/: controller, service, repository, model (nomi esatti dal diagramma).

## Regole
- Il controller riceve e risponde, non contiene logica e non usa i repository.
- La logica sta nei service; l'accesso ai dati solo nei repository.
- Le richieste e le risposte REST usano DTO, non le entità JPA.
- L'URL del servizio AI è una proprietà di configurazione, mai scritto nel codice.
- Il servizio AI si chiama con POST JSON come da docs/contratti/.
- Test con JUnit 5 e nome che inizia con il frame (tf10_...). Il servizio AI nei test si simula.
Chiedi prima: nuove dipendenze Maven; cambi alle entità o allo schema del database;
cambi alla sicurezza (ruoli, JWT).
Mai: credenziali nei file di configurazione versionati.
