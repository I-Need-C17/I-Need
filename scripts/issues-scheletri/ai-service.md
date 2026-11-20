# Task: scheletro ai-service (FastAPI)

Obiettivo: servizio FastAPI minimo nella cartella `ai-service/`, con un test verde.
Le librerie AI pesanti (scikit-learn, sentence-transformers) NON vanno aggiunte in questo task.

## Passi
1. In `ai-service/` crea: `app/__init__.py`, `app/main.py` con un endpoint `GET /health`
   che risponde `{"status": "ok"}`, `tests/test_health.py` che lo verifica con TestClient.
2. `requirements.txt` con `fastapi` e `uvicorn`; `requirements-dev.txt` con `pytest` e `httpx`;
   `pytest.ini` con `pythonpath = .`; `.gitignore` con `.venv/` e `__pycache__/`.
3. Da `ai-service/`: crea un ambiente virtuale, installa i requirements e lancia `pytest -q`.
4. Branch `scheletro-ai-service`, PR verso `main` con il template.

## Criteri di accettazione
- `pytest -q` dà `1 passed`; niente `.venv/` nel repository.
- Il controllo CI `ci-ok` è verde.
