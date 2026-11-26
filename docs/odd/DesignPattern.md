# 2 Design Pattern

## 2.1 Façade

Il design pattern Façade è un tipo di design pattern strutturale avente lo scopo di fornire un’interfaccia unificata e di più alto livello per un insieme di funzioni di un determinato sottosistema.

Problema. Ogni sottosistema (Autenticazione, Gestione richieste abitative, Gestione abitazione, Gestione matching, Gestione proposte, Gestione convivenza) è composto da più repository ed entity. Il layer Control e gli altri sottosistemi non devono conoscere questa organizzazione interna, altrimenti aumentano le dipendenze tra le classi. Questo andrebbe contro RNF_S_1 e DG_6.

Obiettivo. Fornire per ogni sottosistema un'interfaccia unificata e di più alto livello che incapsuli la complessità interna. Così si disaccoppiano i client dai dettagli di implementazione.

Implementazione: Il ruolo di Façade è svolto dalle classi «service» di ogni sottosistema.

I Control invocano solo i metodi dei Service. I Control non accedono mai a repository o entity in modo diretto. Quando un sottosistema ha bisogno di un altro, passa esclusivamente dal suo Service e non dai suoi repository. Per esempio, PropostaAbbinamentoService usa MatchingService per ottenere la graduatoria e RichiestaAbitativaService per aggiornare la richiesta. I metodi dei Service sono anche il punto in cui si applicano le transazioni e il controllo per ruolo (DG_2).

Beneficio: le modifiche interne a un sottosistema, come un cambio di repository o di query, non si propagano ai client (DG_6, DG_9). Inoltre ogni sottosistema si testa attraverso un'unica interfaccia (RNF_I_3).

## 2.2 Adapter

Il design pattern Adapter è un tipo di design pattern strutturale avente lo scopo di permettere ad oggetti con diverse interfacce di collaborare tra loro, attraverso la classe “adapter” che permette di convertire i dati in oggetti comprensibili dal sistema.

Problema: Il MatchingService lavora con le entity del dominio. Il Modulo AI invece è un microservizio esterno che espone un'interfaccia diversa: una richiesta HTTP POST con payload JSON, che non conosce le entity Java. Inoltre il modulo AI deve poter essere modificato o sostituito senza impatti sulla logica di business (DG_10, RNF_IN_1).

Obiettivo. Permettere a componenti con interfacce diverse di collaborare. Una classe Adapter converte gli oggetti del dominio nel formato richiesto dal servizio esterno e la sua risposta in oggetti comprensibili dal sistema.

Implementazione:
Adapter: ModuloAIAdapter che svolge tre compiti:

- converte domande e risposte in DTO e li serializza in JSON;
- invia la richiesta POST al servizio;
- converte la risposta JSON nel punteggio Double restituito al MatchingService.

Beneficio: Il MatchingService non dipende dal formato né dalla tecnologia del Modulo AI. Per sostituire il modulo basta un nuovo Adapter, senza modificare il resto del sistema (DG_10, DG_6).
