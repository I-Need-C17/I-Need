# Uso (da PowerShell, nella cartella del repo): .\scripts\crea-issue-scheletri.ps1
# Crea le tre issue degli scheletri. Assegna poi ogni issue a un team member dal sito.
$repo = "I-Need-C17/I-Need"
gh issue create -R $repo --title "Scheletro backend (Spring Boot)" --label "task-agente,area:backend" --body-file "scripts/issues-scheletri/backend.md"
gh issue create -R $repo --title "Scheletro frontend (React + TypeScript)" --label "task-agente,area:frontend" --body-file "scripts/issues-scheletri/frontend.md"
gh issue create -R $repo --title "Scheletro ai-service (FastAPI)" --label "task-agente,area:ai-service" --body-file "scripts/issues-scheletri/ai-service.md"
