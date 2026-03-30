<!-- drift path=".github/pull_request_template.md" hash="32ab999f896c68ad" -->
<!-- drift path=".github/ISSUE_TEMPLATE/ai-build-request.yml" hash="f636073cf4435fa4" -->
<!-- drift path="package.json" hash="95d490ab524987ac" -->
<!-- drift path="plans/README.md" hash="b610c225ea6994cb" -->
# Non-Coder Workflow

This guide is for someone who wants to build with AI but does not deeply know how to read code.

The assumption here is that you talk to Codex in chat. Codex should operate the repo workflow for you.

## The Safe Workflow

1. If this is a new repo from the template, read `docs/template-setup.md` first.
2. Start with one issue using the `AI Build Request` template.
3. Tell Codex the issue and the result you want.
4. Expect Codex to create a task plan before broad edits and keep it updated as the work evolves.
5. If you want a quick status check, ask Codex what task plans are ready. Codex should run `npm run plans:list` and summarize it for you.
6. Expect Codex to solve only that issue and that plan.
7. Require a pull request, not direct changes on `main`.
8. Read the PR in plain English before thinking about the code.
9. Check the plan and the AI disclosure:
   - did the PR point to the plan path
   - did the plan explain the key concepts behind the change
   - did the changed files stay near the expected file scope
   - did the PR say what the AI did and what a human checked
10. Check the evidence:
   - did `npm run validate` pass
   - is there demo output you can understand
   - if this was experiment or benchmark work, did the PR separate visible metrics from held-out evaluation
   - did the PR explain risks and rollback
11. If the work is ready to publish, tell Codex to publish it. Codex should run `npm run task:publish -- <task-id>` instead of leaving the work only in the local repo.
12. Ask what could still be wrong.
13. Merge only after the evidence is clear enough for you.

## Questions You Should Always Ask

- What changed in plain English?
- Which concepts actually matter for this change?
- Did the diff stay inside the planned files?
- How do I test this as a user?
- What proof says it works?
- Which parts were AI-assisted?
- What is still risky?
- How do I undo it?

## What You Should Not Do

- Do not ask for giant multi-feature prompts.
- Do not merge a PR that skipped the plan files or the AI disclosure.
- Do not merge because the AI sounds confident.
- Do not trust a benchmark win unless the PR also shows held-out evaluation.
- Do not skip the demo or the validation output.
- Do not treat code review as optional just because the PR is small.
