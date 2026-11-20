# Uso (da PowerShell, nella cartella del repo): .\scripts\crea-label.ps1
$repo = "I-Need-C17/I-Need"
$labels = @(
  @("task-agente", "0E8A16", "Task svolto con agenti"),
  @("fase:piano", "FBCA04", "Il pianificatore produce il piano"),
  @("fase:implementazione", "1D76DB", "Piano approvato: implementazione"),
  @("fase:test", "0052CC", "Scrittura dei test dalla category partition"),
  @("fase:revisione", "5319E7", "PR pronta per la revisione"),
  @("area:backend", "C5DEF5", "Componente backend"),
  @("area:frontend", "BFD4F2", "Componente frontend"),
  @("area:ai-service", "D4C5F9", "Componente ai-service")
)
foreach ($l in $labels) {
  gh label create $l[0] -R $repo --color $l[1] --description $l[2] --force
}
