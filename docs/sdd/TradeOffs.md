# 1.2.1 Trade-Offs

| Trade-Off | Descrizione |
| --- | --- |
| Development Cost Vs Estensibilità e Leggibilità | Sviluppare moduli indipendenti, in particolare il modulo AI, e codice pulito (verificato tramite SonarQube) richiede un elevato effort iniziale. Questo investimento di tempo si scontra con il limite di budget e tempistiche, che fissano lo sviluppo a un massimo di 350 ore e €12.000. |
| Maintenance Cost Vs Portabilità | Sviluppare un'app web portabile su diverse piattaforme richiede test continui su molteplici browser e risoluzioni. Mantenere questa compatibilità nel tempo genera un effort costante che sfida il limite di €3.000 annui per i costi di manutenzione. |
| Robustezza vs Tempo di risposta | La validazione formale e temporale di tutti gli input introduce controlli aggiuntivi che possono allungare marginalmente i tempi di risposta. |
