# ai-service

Python 3.12, FastAPI, Pydantic, scikit-learn, sentence-transformers, pytest.
Comando da questa cartella: `pip install -r requirements.txt -r requirements-dev.txt && pytest -q`

## Struttura
`app/` con routers/ (endpoint), schemas/ (modelli Pydantic del contratto), services/
(calcolo di compatibilità); `tests/` per i test.

## Regole
- Endpoint, payload e risposte esattamente come in docs/contratti/. Solo JSON.
- Il servizio non accede al database né ad altri servizi.
- Algoritmo, pesi e modello semantico come descritti in docs/sdd/ (punteggio ibrido:
  similarità coseno pesata sulle risposte chiuse e similarità semantica sui testi liberi).
  I pesi sono costanti con nome, non numeri sparsi nel codice.
- Il modello di embedding si carica una volta all'avvio, mai a ogni richiesta.
- Nei test non si scarica il modello vero: si usa un finto calcolo di embedding.
- Test con pytest, nome che inizia con il frame (test_tf10_...).
Chiedi prima: nuove dipendenze (alcune sono molto pesanti); modifiche al contratto; cambio di modello.
Mai: chiavi o credenziali nel codice.
