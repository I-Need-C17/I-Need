"""Temporary report for issue #30; only Java is initialized."""
import os
from pathlib import Path
import xml.etree.ElementTree as ET
from verify_reports import count_reports, failed_test_names, structural_status

output = structural_status()
reports = sorted(Path("backend/target/surefire-reports").glob("TEST-*.xml"))
output["backend"] = "Non disponibile"
output["backend_failed"] = ""
failed = False
try:
    if reports:
        executed, skipped, errors, _ = count_reports(reports)
        output["backend"] = f"{executed - errors} superati, {errors} falliti/errori, {skipped} saltati"
        output["backend_failed"] = failed_test_names(reports)
        failed = not executed or bool(errors)
    elif any(Path("backend/src/test/java").rglob("*.java")):
        failed = True
except (OSError, ET.ParseError):
    failed = True
lines = ["## Collaudo temporaneo Java", ""]
lines.extend(f"- {name}: {value}" for name, value in output.items() if name != "backend_failed")
if not reports:
    lines.append("Nessun report JUnit disponibile; nessun test dichiarato superato.")
if output["backend_failed"]:
    lines.append("Test falliti: " + output["backend_failed"])
print("\n".join(lines))
if os.environ.get("GITHUB_STEP_SUMMARY"):
    with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as stream:
        stream.write("\n".join(lines) + "\n")
if os.environ.get("GITHUB_OUTPUT"):
    with open(os.environ["GITHUB_OUTPUT"], "a") as stream:
        for name, value in output.items():
            stream.write(f"{name}={value}\n")
raise SystemExit(int(failed))
