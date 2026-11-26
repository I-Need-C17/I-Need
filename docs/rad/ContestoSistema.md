# 1 Introduzione

## 1.1 Obiettivi del sistema

Il sistema I-Need ha come scopo principale quello di realizzare un sistema che faciliti la gestione dei programmi di coabitazione solidale, mettendo in relazione persone che dispongono di uno spazio abitativo (Host) e persone alla ricerca di una sistemazione (Guest).

Attraverso la piattaforma, sarà possibile gestire le candidature, raccogliere informazioni sulle esigenze e sulle preferenze dei partecipanti e individuare possibili abbinamenti sulla base di criteri di compatibilità.

Il sistema supporterà gli Operatori durante l’intero percorso, dalla valutazione degli abbinamenti fino alla selezione di questi, continuando poi con il monitoraggio della convivenza, mantenendo sempre la supervisione umana sulle decisioni finali.

In modo particolare, il sistema si propone di:
- Semplificare la gestione delle candidature e dei profili, centralizzando le informazioni relative a Host e Guest in un'unica piattaforma.
- Facilitare l'individuazione di abbinamenti compatibili, utilizzando criteri, preferenze e, ove previsto, tecniche di intelligenza artificiale per suggerire le soluzioni più adeguate.
- Supportare il lavoro degli Operator, riducendo le attività manuali e fornendo strumenti per valutare le compatibilità e gestire le diverse fasi del percorso.
- Migliorare la tracciabilità e il monitoraggio, rendendo il processo più strutturato, efficiente e uniforme e raccogliendo informazioni utili alla valutazione dei risultati delle iniziative di housing sociale.

## 1.2 Ambito del sistema

I-Need nasce per fornire un ambiente centralizzato volto a facilitare l'organizzazione e il monitoraggio dei programmi di coabitazione solidale, agevolando il lavoro dell'operator e semplificando l'adesione al programma di coabitazione solidale da parte di Host e Guest.

Le principali funzionalità che il sistema deve includere sono:
- Supportare l'individuazione di possibili abbinamenti tra Host e Guest attraverso un sistema di valutazione della compatibilità, supportato da un modulo di intelligenza artificiale;
- Consentire agli Operator di supervisionare il processo di abbinamento e gestire le proposte di coabitazione;
- Garantire la tracciabilità delle decisioni dei partecipanti e dello stato delle proposte, fino alla conferma dell'abbinamento;
- Supportare il monitoraggio delle convivenze e la raccolta di feedback utili a valutarne l'andamento e l'esito.

## 1.3 Obiettivo e criteri di successo

Gli obiettivi del sistema sono:
- Centralizzare la gestione delle informazioni relative a Host, Guest e convivenze, semplificando l'accesso e il monitoraggio dei dati.
- Ridurre il carico operativo degli Operatori, supportandoli nella gestione delle richieste abitative e nell'individuazione di abbinamenti compatibili.
- Digitalizzare il processo di coabitazione, garantendo tracciabilità delle attività e mantenendo la supervisione umana sulle decisioni finali.

I criteri di successo sono:
- Rispetto delle scadenze: il progetto deve essere consegnato entro i termini concordati.
- Funzionalità: il sistema deve implementare tutti i requisiti funzionali ad alta priorità.
- Usabilità: la piattaforma deve consentire a Host, Guest e Operatori di utilizzare le funzionalità previste in modo semplice e intuitivo.
- Efficacia del matching: il sistema deve supportare l'individuazione di abbinamenti pertinenti, lasciando all'Operatore la decisione finale.
- Qualità e affidabilità: il software deve essere strutturato, documentato e verificato, limitando errori e malfunzionamenti.

# 3 Sistema proposto

## 3.1 Panoramica

Il sistema proposto, denominato I-Need, è una piattaforma web volta a digitalizzare e centralizzare la gestione dei programmi di coabitazione solidale promossi da FHS. Il sistema sostituisce la modulistica cartacea e gli strumenti non integrati del sistema attuale, offrendo un unico ambiente in cui Host e Guest possono presentare la propria candidatura online e l’Operator può gestire l’intero percorso di coabitazione, dall’individuazione dell’abbinamento fino alla valutazione finale della convivenza.

La piattaforma supporta l’Operator nella ricerca dell’abbinamento mostrando, per ogni richiesta abitativa attiva, gli Host Idonei che soddisfano le condizioni geografiche, temporali e di disponibilità, insieme al relativo punteggio di compatibilità calcolato a partire dai questionari delle preferenze. Il sistema non effettua abbinamenti vincolanti in modo autonomo: l’invio della proposta resta sempre una decisione dell’Operator e ogni abbinamento diventa effettivo solo dopo l’accettazione di entrambe le parti.

Gli attori principali della piattaforma sono Host, Guest, Operator e Admin.
- Host: registra la propria abitazione e il periodo di disponibilità, compila il questionario delle preferenze e risponde alle proposte di abbinamento ricevute.
- Guest: compila il questionario delle preferenze, presenta le richieste abitative e risponde alle proposte di abbinamento ricevute.
- Operator: consulta richieste, profili e questionari, seleziona gli Host compatibili e invia le proposte di abbinamento. Monitora poi le convivenze e consulta i feedback.
- Admin: gestisce gli account (creazione degli Operator, disattivazione).
