<!-- drift path=".github/pull_request_template.md" hash="32ab999f896c68ad" -->
<!-- drift path=".github/ISSUE_TEMPLATE/ai-build-request.yml" hash="f636073cf4435fa4" -->
<!-- drift path="package.json" hash="95d490ab524987ac" -->
<!-- drift path="plans/README.md" hash="6342bffe4ad1e807" -->
# Non-Coder Workflow

This guide is for someone who wants to build with AI but does not deeply know how to read code.

## The Safe Workflow

1. If this is a new repo from the template, read `docs/template-setup.md` first.
2. Start with one issue using the `AI Build Request` template.
3. Ask the agent to run `npm run plan:new -- <task-id>` and create a task plan before broad edits.
4. If you want a quick status check, ask the agent to run `npm run plans:list` so you can see which task plans are actually ready.
5. Ask the agent to solve only that issue and that plan.
6. Require a pull request, not direct changes on `main`.
7. Read the PR in plain English before thinking about the code.
8. Check the plan and the AI disclosure:
   - did the PR point to the plan path
   - did the plan explain the key concepts behind the change
   - did the changed files stay near the expected file scope
   - did the PR say what the AI did and what a human checked
9. Check the evidence:
   - did `npm run validate` pass
   - is there demo output you can understand
   - if this was experiment or benchmark work, did the PR separate visible metrics from held-out evaluation
   - did the PR explain risks and rollback
10. If the work is ready to publish, ask the agent to run `npm run task:publish -- <task-id>` so it creates a draft PR instead of leaving the change only in the local repo.
11. Ask what could still be wrong.
12. Merge only after the evidence is clear enough for you.

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
