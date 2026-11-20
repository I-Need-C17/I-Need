#!/usr/bin/env bash
set -euo pipefail

required_files=(
  README.md AGENTS.md docs/flusso-agentico.md
  .github/CODEOWNERS .github/copilot-instructions.md
  .github/ISSUE_TEMPLATE/{config,task-agente}.yml .github/pull_request_template.md
  .github/scripts/{check-phase,role-context}{,.test}.cjs .github/scripts/run-isolated-role.sh
  .github/agents/{pianificatore,implementatore,tester,revisore}.agent.md
  .github/workflows/{ci,piano,implementa,test,revisione,controllo-fase}.yml
)
for file in "${required_files[@]}"; do
  test -s "$file" || { printf 'File richiesto mancante o vuoto: %s\n' "$file" >&2; exit 1; }
done

version=1.7.7
archive="actionlint_${version}_linux_amd64.tar.gz"
checksum=023070a287cd8cccd71515fedc843f1985bf96c436b7effaecce67290e7e0757
lint_dir=$(mktemp -d)
trap 'rm -rf -- "$lint_dir"' EXIT
(
  cd "$lint_dir"
  curl --fail --silent --show-error --location --max-time 60 --proto '=https' \
    "https://github.com/rhysd/actionlint/releases/download/v${version}/${archive}" \
    --output "$archive"
  printf '%s  %s\n' "$checksum" "$archive" | sha256sum --check --strict
  tar -xzf "$archive" actionlint
)
"$lint_dir/actionlint" -color
