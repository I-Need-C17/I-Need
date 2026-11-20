# Task: scheletro frontend (React + TypeScript)

Obiettivo: progetto React minimo nella cartella `frontend/`, con lint, test e build verdi.

## Passi
1. Dalla radice del repo: `npm create vite@latest frontend -- --template react-ts`
   (rispondi No a installa e avvia).
2. In `frontend/`: `npm install`, `npm install -D vitest`, `npm pkg set scripts.test="vitest"`.
3. Crea `frontend/src/smoke.test.ts` con un test banale che passa.
4. Da `frontend/`: `npm run lint`, `npm test -- --run`, `npm run build` senza errori.
5. Branch `scheletro-frontend`, PR verso `main` con il template.

## Criteri di accettazione
- `frontend/package.json` e `frontend/package-lock.json` presenti; niente `node_modules/`.
- Il controllo CI `ci-ok` è verde.
