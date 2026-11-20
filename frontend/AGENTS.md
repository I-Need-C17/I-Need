# frontend

React, TypeScript, Vite, Bootstrap, Vitest. Node 22.
Comando da questa cartella: `npm ci && npm run lint && npm test -- --run && npm run build`

## Struttura
Componenti e pagine come nei modelli in docs/modelli/ e docs/sdd/.
Le chiamate al backend stanno solo in `src/services/`.

## Regole
- Nessuna chiamata HTTP fuori da `src/services/`; l'URL del backend viene da una variabile d'ambiente.
- Il token JWT non va scritto nel codice né nei test.
- Schermate come nei mockup indicati dal task (docs/rad/).
- Test con Vitest, nome che inizia con il frame (tf10_...).
Chiedi prima: nuove dipendenze npm; nuove pagine non previste; modifiche al routing.
Mai: segreti o URL di produzione nel codice.
