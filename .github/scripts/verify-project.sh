#!/usr/bin/env bash
set -euo pipefail

# CI iniziale: nessun runtime o dipendenza applicativa da installare.
# Estendere con il bootstrap approvato dei tre componenti.
python3 "$(dirname "$0")/verify_reports.py" --structural-only
