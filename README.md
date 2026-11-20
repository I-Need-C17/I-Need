# I-Need (C-17)

Progetto GPS/IS dell’Università di Salerno per la coabitazione solidale.
Il monorepo pubblico predispone [backend](backend/), [frontend](frontend/) e
[servizio AI](ai-service/). Le aree contengono solo `.gitkeep`. Le fonti
approvate seguono l’[indice in docs](docs/README.md) e le
[regole comuni](AGENTS.md).

## Dalla Issue al merge

1. Il **PM** apre una [Issue Task agente](.github/ISSUE_TEMPLATE/task-agente.yml),
   assegna un TM con **Assignees**, aggiunge una label `area:*` e applica
   `fase:piano`. Il Pianificatore pubblica un piano riferito a quella Issue e
   a una snapshot di `main`.
2. Il **TM assegnato** controlla il piano, pubblica l’approvazione come
   nuovo commento e applica `fase:implementazione`. Actions verifica
   identità, permessi e perimetro, applica le modifiche autorizzate e apre
   la Draft PR `agent/issue-<N>-implementazione`.
3. Il **TM** applica `fase:test` alla Draft PR. Per un task applicativo, il
   Tester usa fonti e firme pubbliche per produrre i nuovi test. Il commento
   registra frame e SHA da verificare in CI. Per documentazione e governance
   registra **N/A**.
4. Il **TM** verifica il commento relativo allo SHA corrente, completa la
   checklist PR e seleziona **Ready for review**. Partono `ci-ok` e una
   revisione AI informativa. Un'altra persona approva la PR e il **PM**
   verifica gli esiti sul commit finale prima di eseguire il merge.

Pubblica l’approvazione dopo il piano vigente. Indica tutti e soli i suoi
file, uno per riga.

```text
APPROVO PIANO
File autorizzati:
- docs/README.md
```

Il workflow usa i permessi del repository. L’avvio del piano richiede
Maintain/Admin. L’approvazione e l’avvio dell’implementazione spettano al
TM assegnato con almeno Write. Il PM con Maintain/Admin può avviare anche
Test e Revisione.

### Compilare la Issue

- In **File** indica i candidati con una riga `File: percorso` ciascuno.
  Per la fase Test aggiungi `Test: percorso` per ogni nuovo test. Scrivi
  percorsi relativi esatti, senza wildcard. I sorgenti agentici stanno in
  `src/` o `app/` dell’area. I nuovi test stanno in `test/`, `tests/` o
  `src/test/` dell’area.
- Per un task applicativo, in **Fonti e frame** usa `Requisito: ID` e
  `Riferimento: percorso` per gli artefatti approvati pertinenti, già
  versionati su `main`. Puoi usare `UC:`, `Sequence:`, `Class:`,
  `Firme:` e `Modello:` per specificare il tipo della fonte.
- Prepara i dati del Tester prima di avviare un task applicativo da portare
  fino alla revisione. Il Tester richiede `CP: percorso`, `TF: percorso`,
  `Frame: ID` e le righe `Test: percorso` dei nuovi file. Cita anche le
  firme pubbliche se necessarie per derivare i test.
- Per documentazione e governance usa `Riferimento: percorso` oppure
  `N/A - motivo`. L’ambito agentico comprende `README.md`,
  `docs/README.md` e guide Markdown in `docs/guide/`. Pipeline, modelli,
  contratti, stack e policy passano da PR umane.

### Diagnosticare e ripetere una fase

Apri **Actions** e leggi il primo passo fallito. Correggi la Issue o le
fonti con il PM e riapplica `fase:piano` per ottenere un nuovo piano.
Un nuovo ciclo richiede un nuovo commento di approvazione. Se esiste un
branch senza Draft PR, il PM verifica l’esito dell’apertura prima di
intervenire sul branch.

Quando cambia lo SHA dopo il test, riporta la PR in Draft, rimuovi e
riapplica `fase:test` e ripeti Ready for review. Il job riusa i test
precedenti se sono identici a quelli del report verificato.

GitHub può sospendere i run di apertura o aggiornamento di una PR
generati da `GITHUB_TOKEN`. I passaggi umani `fase:test` e Ready for
review avviano i job sullo stato corrente. Test e Revisione usano
`pull_request_target`, caricano la configurazione di `main` e leggono
metadati, file e diff della PR via API. Il Tester scrive in un workspace
separato per evitare il checkout della PR nel job privilegiato. La CI usa `pull_request` con
permessi di lettura. Il check GitHub vale per il commit di merge di prova
o per il relativo head secondo lo stato della PR. [Eventi di GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)

## Attivazione PM

1. In **Organization → Teams** verifica gli slug `project-managers` e
   `tech-members`, la visibilità e Write esplicito per CODEOWNERS.
   Garantisci un revisore diverso dal TM responsabile. In **Settings →
   Actions → General** consenti le Action usate e **Allow GitHub Actions
   to create and approve pull requests**, necessario per aprire la Draft PR.
2. Fai revisionare la PR di configurazione e attendi `ci-ok`. In
   **Settings → Rules → Rulesets → New branch ruleset** rendi attivo un
   ruleset sul default branch `main`, con PR obbligatoria, almeno
   un’approvazione umana, Code Owner review, revoca delle approvazioni stale,
   `ci-ok` da GitHub Actions, blocco cancellazioni e force push, senza bypass.
   Aggiungi `ci-ok` appena selezionabile. Solo un merge umano autorizzato
   attiva i quattro workflow su `main`. [Ruleset](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
3. Dopo il via libera del PM, usa un account Student e crea una credenziale
   fine-grained con **Copilot Requests**. In **Settings → Environments**
   crea `copilot-student`, limita **Deployment branches and tags** al
   branch `main` e salva `COPILOT_GITHUB_TOKEN` come secret dell’ambiente.
   Tieni la credenziale fuori da Issue, PR, chat e file.
4. Prova una Issue documentale fino a Ready for review, poi prova i blocchi
   per scope estraneo, approvazione obsoleta e fork. Controlla che un nuovo
   commit richieda nuovi esiti. Il collaudo completo del Tester richiede
   stack, fonti, Category Partition e frame reali.

Il merge è riservato ai PM come regola del team. Per imporlo con GitHub
mantenendo Write ai TM, collauda un secondo ruleset con **Restrict
updates** e bypass per il solo team PM **For pull requests only**.
Il ruleset principale deve continuare a imporre CI e review anche ai PM.

### Bootstrap applicativo

`ci-ok` riporta N/A per ogni area con solo `.gitkeep`. Quando il team
approva uno stack, la PR di bootstrap introduce manifest, dipendenze e
i relativi comandi nel job `ci-ok`, sostituendo il ramo N/A per quell’area.
I comandi dei test devono selezionare i frame pertinenti e fallire se
manca un test applicabile o un’asserzione fallisce. Il job Test privilegiato
genera e versiona i test. Gli esiti di esecuzione spettano alla CI.
