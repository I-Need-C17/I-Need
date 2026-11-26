# 3.4 Gestione dei dati persistenti

## 3.4.1 Scelta della tecnologia

Si usa un database relazionale, PostgreSQL, perché le proprietà ACID garantiscono atomicità, coerenza, isolamento e durabilità. Il dominio è fortemente relazionale (Utente, Alloggio, RichiestaAbitativa, PropostaAbbinamento, Convivenza) e vincoli come «nessuna convivenza attiva né proposta pendente» (RF_GR_1, RF_GM_3) richiedono transazioni e controllo della concorrenza. L'accesso avviene solo tramite Spring Data JPA, che mappa le entity del Class Diagram. Il supporto JSONB di PostgreSQL consente di memorizzare in modo flessibile le opzioni dei moduli dinamici dei questionari. La conservazione dello storico (RNF_A_3) è ottenuta con stati finali dei record (es. Annullata, Rifiutata, Conclusa) al posto della cancellazione fisica.

## 3.4.2 Ristrutturazione CD

La scelta principale è stata sostituire la gerarchia Host, Guest, Operator e Convivente con un'unica entità UtenteRegistrato, che ha l'attributo ruolo (enumerazione Ruolo: HOST, GUEST, OPERATOR). Le sottoclassi non avevano attributi propri. Un'entità unica semplifica la persistenza (una sola tabella, nessun join). Tutte le associazioni originali sono rimaste invariate: il nome di ruolo a ogni estremità (host, guest, operator, convivente) indica la funzione svolta dall'utente. Inoltre, gli stati delle entità descritti negli Statechart sono modellati come enumerazioni.
