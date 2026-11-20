"""Local tests for the deterministic guardrails. No Copilot or GitHub requests."""

import json
from contextlib import redirect_stdout
import io
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import workflow as w


AREA = "backend"
SOURCE = "backend/src/Service.java"
TEST = "backend/tests/ServiceTest.java"
RUNNER = {
    "manifest": "backend/pom.xml",
    "image": "local/ci@sha256:" + "a" * 64,
    "source_roots": ["backend/src/"],
    "test_roots": ["backend/tests/"],
    "source_exts": [".java"],
    "test_exts": [".java"],
    "ci": ["runner"],
    "frame": ["runner", "{frame}"],
}
TM = {"type": "User", "id": 17, "login": "tm-fixture"}


def issue():
    values = ["Documentazione", "backend", "N/A - editoriale", "Chiarire il flusso",
              "N/A - editoriale", "File: docs/README.md", "Il percorso è leggibile",
              "N/A - editoriale", "Nessuna"]
    return {
        "number": 42, "title": "Task", "state": "open", "assignees": [TM],
        "labels": [{"name": "task-agente"}, {"name": "area:backend"}],
        "body": "\n\n".join(f"### {key}\n\n{value}" for key, value in zip(w.FIELDS, values)),
    }


class ScopeTests(unittest.TestCase):
    def test_path_safety(self):
        self.assertEqual(w.path(SOURCE), SOURCE)
        for value in ("../README.md", "backend/../README.md", "/etc/passwd", "backend/*",
                      "backend/src/./Service.java", "backend/.git/config", "a//b", "a\\b", "a:stream", "foo\nbar"):
            with self.subTest(value=value), self.assertRaises(w.Blocked):
                w.path(value)

    def test_incomplete_issue_or_missing_assignee_is_blocked(self):
        complete = issue()
        fields, assigned, _ = w.issue_form(complete)
        self.assertEqual(fields["Tipo"], "Documentazione")
        self.assertEqual(assigned, TM)
        for patch_data in ({"assignees": []}, {"body": "testo libero"}, {"labels": []},
                           {"state": "closed"}, {"pull_request": {}}):
            with self.subTest(patch_data=patch_data), self.assertRaises(w.Blocked):
                w.issue_form({**complete, **patch_data})

    def test_issue_fingerprint_tracks_scope_and_assignee_not_phase_labels(self):
        current = issue()
        _fields, _assigned, before = w.issue_form(current)
        current["labels"].append({"name": "fase:piano"})
        self.assertEqual(w.issue_form(current)[2], before)
        current["body"] += " diverse"
        self.assertNotEqual(w.issue_form(current)[2], before)

    def test_approval_binds_exact_paths_and_plan(self):
        addressed = "APPROVO PIANO 1337\nFile autorizzati:\n- " + SOURCE
        self.assertEqual(w.approval(addressed, 1337, [SOURCE]), [SOURCE])
        for bad in ("", addressed.replace("1337", "1336"), addressed + "\n- " + SOURCE,
                    addressed + "\n- README.md", addressed.replace(SOURCE, "backend/src/*"),
                    addressed.replace(SOURCE, "backend/src/../pom.xml")):
            with self.subTest(bad=bad), self.assertRaises(w.Blocked):
                w.approval(bad, 1337, [SOURCE])

    def test_workflow_checks_permissions_from_api(self):
        with patch.object(w, "api", return_value={"user": TM, "permission": "write", "role_name": "write"}):
            w.permission(TM)
            with self.assertRaises(w.Blocked):
                w.permission(TM, pm=True)
        with patch.object(w, "api", return_value=None), self.assertRaises(w.Blocked):
            w.permission(TM)

    def test_plan_provenance_requires_bot_and_log_digest(self):
        bot = {"type": "Bot", "login": w.BOT}
        data = {"result": {"stato": "pronto"}, "provenienza": [123, 1, 42]}
        with (patch.dict(os.environ, {"GITHUB_RUN_ID": "123", "GITHUB_RUN_ATTEMPT": "1"}),
              redirect_stdout(io.StringIO())):
            comment = {"user": bot, "created_at": "now", "updated_at": "now",
                       "body": w.marker("piano", 42, data)}
        proof = w.digest(["piano", data]).encode()
        with patch.object(w, "proofs", return_value={proof}):
            self.assertEqual(w.comment_data(comment, "piano", 42), data)
            self.assertIsNone(w.comment_data(comment, "piano", 43))
            self.assertIsNone(w.comment_data({**comment, "user": TM}, "piano", 42))
            self.assertIsNone(w.comment_data({**comment, "updated_at": "later"}, "piano", 42))
        with patch.object(w, "proofs", return_value=set()):
            self.assertIsNone(w.comment_data(comment, "piano", 42))

    def test_stale_phase_is_blocked(self):
        entry = {"actor": TM, "created_at": "2026-11-20T10:00:00Z"}
        run = {"actor": TM, "created_at": "2026-11-20T10:00:10Z"}
        w.verify_trigger(entry, run)
        for created in ("2026-11-20T09:00:00Z", "2026-11-20T11:00:00Z"):
            with self.assertRaises(w.Blocked):
                w.verify_trigger(entry, {**run, "created_at": created})
        with self.assertRaises(w.Blocked):
            w.verify_trigger(entry, {**run, "actor": {**TM, "id": 83}})

    def test_latest_plan_needs_a_new_approval_from_the_assigned_tm(self):
        plan_comment = {"id": 167}
        context = {"sources": {}, "runner": None, "blockers": []}
        record = {"label": 88, "issue": "fingerprint", "sources": w.digest({}), "config": w.digest(None),
                  "result": {"stato": "pronto", "passi": [{"file": SOURCE}]}}
        approval = {"id": 168, "user": TM, "created_at": "2026-11-20T10:00:15Z", "updated_at": "2026-11-20T10:00:15Z",
                    "body": f"APPROVO PIANO 167\nFile autorizzati:\n- {SOURCE}"}
        with patch.object(w, "annotations", return_value=[(plan_comment, record)]):
            with patch.object(w, "pages", return_value=[approval]):
                self.assertEqual(w.plan_and_approval(42, {"id": 88}, TM, "fingerprint", context)[:3],
                                 (167, 168, [SOURCE]))
                with self.assertRaises(w.Blocked):
                    w.plan_and_approval(42, {"id": 89}, TM, "fingerprint", context)
                with self.assertRaises(w.Blocked):
                    w.plan_and_approval(42, {"id": 88}, TM, "fingerprint", context, "2026-11-20T10:00:00Z")
            other = {**approval, "user": {**TM, "id": 23}}
            with patch.object(w, "pages", return_value=[other]), self.assertRaises(w.Blocked):
                w.plan_and_approval(42, {"id": 88}, TM, "fingerprint", context)

    def test_source_and_test_scope_are_separate(self):
        w.edit_path(SOURCE, AREA, "Applicativo", RUNNER)
        w.edit_path(TEST, AREA, "Applicativo", RUNNER, test=True)
        for file, is_test in ((TEST, False), (SOURCE, True), (RUNNER["manifest"], False),
                              ("frontend/src/Service.java", False), ("backend/src/AGENTS.java", False),
                              ("docs/contratti/a.md", False)):
            with self.subTest(file=file), self.assertRaises(w.Blocked):
                w.edit_path(file, AREA, "Applicativo", RUNNER, is_test)
        with self.assertRaises(w.Blocked):
            w.edit_path("docs/rad/uc/a.md", AREA, "Governance")

    def test_missing_application_sources_are_explicitly_blocking(self):
        fields, _, _ = w.issue_form(issue())
        result = w.task_context("a" * 40, {**fields, "Tipo": "Applicativo", "UC o requisito": "UC01"})
        self.assertEqual(result["blockers"], ["Indicare una sola riga Snapshot: nel campo previsto."])

    def test_frame_association_rejects_missing_or_duplicated_frames(self):
        w.validate_frames({"t1": "TF-1", "t2": "TF-2"}, ["TF-1", "TF-2"])
        for files in ({"t1": "TF-11"}, {"t1": "TF-1", "t2": "TF-1"}, {"t1": "TF-1", "t2": "unrelated"}):
            with self.assertRaises(w.Blocked):
                w.validate_frames(files, ["TF-1"])

    def test_external_pr_is_blocked_before_accessing_api(self):
        event = {"action": "completed", "workflow_run": {"event": "pull_request", "conclusion": "success",
                 "path": ".github/workflows/test.yml", "head_repository": {"full_name": "fork/I-Need"}}}
        with patch.object(w, "api") as api, self.assertRaises(w.Blocked):
            w.prepare_pr("tester", event, "a" * 40)
        api.assert_not_called()

    def test_review_cannot_publish_as_approval(self):
        state = {"head": "a" * 40, "plan": 123, "pr": 42, "files": [SOURCE], "task": {"tests": [TEST]}}
        answer = {"sha": state["head"], "sintesi": "Sintesi", "rilievi": []}
        with (patch.object(w, "model_answer", return_value=answer),
              patch.object(w, "api") as api,
              redirect_stdout(io.StringIO()),
              patch.dict(os.environ, {"GITHUB_RUN_ID": "12", "GITHUB_RUN_ATTEMPT": "1"})):
            w.finish_review(state)
        self.assertEqual(api.call_args.args[2]["event"], "COMMENT")
        self.assertEqual(api.call_args.args[2]["commit_id"], state["head"])


class SnapshotTests(unittest.TestCase):
    def setUp(self):
        self.repo = tempfile.TemporaryDirectory()
        self.addCleanup(self.repo.cleanup)
        previous = Path.cwd()
        os.chdir(self.repo.name)
        self.addCleanup(os.chdir, previous)
        w.git("init", "-q")
        w.git("config", "user.name", "Fixture")
        w.git("config", "user.email", "fixture@example.org")
        self.write(SOURCE, "class Service {}\n")
        self.write(RUNNER["manifest"], "<project/>\n")
        self.base = self.commit("base")

    def write(self, filename, data):
        location = Path(filename)
        location.parent.mkdir(parents=True, exist_ok=True)
        location.write_text(data)

    def commit(self, message):
        w.git("add", "-A")
        w.git("commit", "-qm", message)
        return w.git("rev-parse", "HEAD").decode().strip()

    def test_diff_rejects_unapproved_change(self):
        self.write(SOURCE, "class Service { int changed; }\n")
        self.write("docs/README.md", "unexpected\n")
        head = self.commit("changes")
        with self.assertRaises(w.Blocked):
            w.validate_diff(self.base, head, [SOURCE])

    def test_diff_rejects_symlink_and_deletion(self):
        Path(SOURCE).unlink()
        Path(SOURCE).symlink_to("/etc/passwd")
        symlink_commit = self.commit("symlink")
        with self.assertRaises(w.Blocked):
            w.validate_diff(self.base, symlink_commit, [SOURCE])
        Path(SOURCE).unlink()
        deletion_commit = self.commit("deletion")
        with self.assertRaises(w.Blocked):
            w.validate_diff(self.base, deletion_commit, [SOURCE])

    def test_diff_accepts_new_tests_and_rejects_changes_to_existing_tests(self):
        self.write(TEST, "TF-1\n")
        with_test = self.commit("add test")
        self.assertEqual(w.validate_diff(self.base, with_test, [TEST], [TEST]), {TEST})
        self.write(TEST, "TF-2\n")
        change = self.commit("modify existing test")
        with self.assertRaises(w.Blocked):
            w.validate_diff(with_test, change, [TEST], [TEST])

    def test_git_tree_update_rejects_ancestor_collision(self):
        with patch.object(w, "api") as api, self.assertRaises(w.Blocked):
            w.create_commit(self.base, {SOURCE + "/child.java": "new"}, "collision")
        api.assert_not_called()

    def test_app_commands_receive_clean_snapshot_per_frame(self):
        invoked = []

        def check(directory, area, config, frame, single_frame):
            self.assertEqual(area, AREA)
            self.assertTrue(single_frame)
            self.assertEqual(Path(directory, SOURCE).read_text(), "class Service {}\n")
            self.assertEqual(Path(directory, TEST).read_text(), "TF-1 TF-2")
            Path(directory, SOURCE).write_text("mutable container fixture")
            invoked.append(frame)
            return {"esito": "passato", "exit": 0}

        with patch.object(w, "run_container", side_effect=check):
            result = w.run_component(self.base, AREA, RUNNER, {TEST: "TF-1 TF-2"}, ["TF-1", "TF-2"])
        self.assertEqual(invoked, ["TF-1", "TF-2"])
        self.assertEqual(set(result), set(invoked))

    def test_runner_command_does_not_inherit_github_credentials(self):
        token_env = {"GH_TOKEN": "fixture", "COPILOT_GITHUB_TOKEN": "fixture"}
        with patch.dict(os.environ, token_env), patch.object(w.subprocess, "run") as execute:
            execute.return_value.returncode = 1
            result = w.run_container(self.repo.name, AREA, RUNNER, "TF-1", True)
        self.assertEqual(result, {"esito": "fallito", "exit": 1})
        self.assertTrue(token_env.keys().isdisjoint(execute.call_args.kwargs["env"]))
        command = execute.call_args.args[0]
        self.assertIn("--network=none", command)
        self.assertEqual(command[-1], "TF-1")

    def test_tester_workspace_has_no_implementation_or_plan(self):
        self.write("AGENTS.md", "Regole affidabili")
        self.write(".github/agents/tester.agent.md", "Profilo affidabile")
        head = self.commit("test profile")
        root = Path(self.repo.name) / "scratch"
        task = {"sources": {"docs/test/TF.md": "TF-1"}, "ref": head, "frames": ["TF-1"],
                "tests": [TEST], "area": AREA, "runner": RUNNER}
        state = {"task": task, "main": head, "head": head,
                 "input": {"UC o requisito": "UC01", "piano": "testo riservato", "diff": "int changes;"}}
        w.build_workspace("tester", state, root)
        prompt = (root / "prompt.txt").read_text()
        self.assertIn("TF-1", prompt)
        self.assertNotIn("class Service", prompt)
        self.assertNotIn("testo riservato", prompt)
        self.assertNotIn("int changes", prompt)
        self.assertFalse((root / "context" / SOURCE).exists())

    def test_write_guard_detects_worktree_file_outside_allowlist(self):
        root = Path.cwd() / "scratch"
        context = root / "context"
        profile = context / ".github/agents/implementatore.agent.md"
        profile.parent.mkdir(parents=True)
        profile.write_text("trusted profile")
        (context / "extra.md").write_text("unauthorized change")
        (root / "writable.json").write_text(json.dumps({"README.md": None}))
        (root / "answer.json").write_text(json.dumps({"stato": "pronto", "nota": "changed"}))
        with (patch.object(w, "scratch", return_value=root), patch.object(w, "at", return_value="trusted profile"),
              patch.object(w, "read_state", return_value={"main": self.base}), self.assertRaises(w.Blocked)):
            w.written_files("implementatore")


if __name__ == "__main__":
    unittest.main()
