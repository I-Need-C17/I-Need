# I-Need

I-Need è un progetto del corso di Gestione dei Progetti Software dell'Università
di Salerno. Il repository è pubblico. Usa dati fittizi nei task, negli esempi e
nei test. Tieni credenziali, chiavi e dati personali fuori da file, Issue e PR.

## Ambito corrente

La priorità è la pipeline GitHub. I task per gli scheletri applicativi sono
rinviati. Le note tecniche nei componenti e il contratto OpenAPI sono materiale
da riesaminare quando il team riprenderà lo stack.

## Lavoro su un task

- Leggi il caso d'uso, i modelli, la Category Partition e gli esiti attesi
  indicati nell'Issue. Segnala informazioni mancanti o incoerenti.
- Rimani nell'ambito del piano approvato. Lavora nel branch del task e cita
  nella PR i file di `docs/` usati. Chiedi prima di aggiungere dipendenze,
  cambiare contratti o estendere l'ambito.
- Gli agenti di un task applicativo devono lasciare ai PM le modifiche a
  `AGENTS.md`, `.github/` e `docs/`. Segnala nella PR le modifiche ai modelli
  da concordare prima del merge. Sospendi il task per una decisione esplicita
  del PM con il team se codice e modelli sono in conflitto.
- Collega ogni frame eseguibile a un test con asserzioni derivate dagli esiti attesi.
  Per i frame non eseguibili registra motivo ed evidenza verificabile. In caso di divergenza,
  riporta frame, risultato atteso e risultato ottenuto. Mantieni i test
  esistenti e chiedi una revisione esplicita se serve aggiornarli.
- Lascia l'approvazione a un revisore umano diverso dall'autore della PR.
  Il merge su `main` spetta ai PM.

## Fasi

1. Il PM apre il task, assegna un TM e applica `fase:piano`. Il piano va
   pubblicato in un commento della Issue che inizi con `## Piano`.
2. Il TM assegnato approva quel commento come indicato nella
   [procedura](docs/flusso-agentico.md), quindi applica `fase:implementazione`.
   Il lavoro confluisce in una Draft PR verso `main`.
3. Il TM assegna `fase:test` alla Draft PR. Il tester usa la Category Partition,
   i risultati attesi e le firme pubbliche del codice.
4. Il TM verifica i test e porta la PR a **Ready for review**. Il revisore
   confronta il diff con i modelli e la CI esegue i controlli disponibili.
5. Un'altra persona approva la PR. Il PM verifica la Definition of Done e fa
   il merge.

I workflow attuali validano i passaggi e scrivono il loro esito in Actions.
Per le attività riservate agli agenti il PM o il TM pubblica manualmente
l'artefatto concordato durante il collaudo.
