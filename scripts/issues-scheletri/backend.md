# Task: scheletro backend (Spring Boot)

Obiettivo: progetto Spring Boot minimo nella cartella `backend/`, con build verde.

## Passi
1. Su start.spring.io: Maven, Java, Java 21, Group `com.ineed`, Artifact `backend`,
   Packaging Jar, Configuration Properties, solo la dipendenza **Spring Web**.
2. Estrai il contenuto dello zip dentro `backend/` (il `pom.xml` deve stare in `backend/pom.xml`).
3. Da `backend/`: `mvn -B verify` (oppure `.\mvnw.cmd -B verify`) deve finire con BUILD SUCCESS.
4. Branch `scheletro-backend`, PR verso `main` con il template.

## Criteri di accettazione
- `backend/pom.xml`, `backend/src/` presenti; niente `target/` nel repository.
- Il controllo CI `ci-ok` è verde.
