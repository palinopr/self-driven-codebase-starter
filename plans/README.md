# Task Plans

Use `plans/_template/` for any feature or multi-file change.

## How To Use This Folder

1. Run `npm run plan:new -- <task-id>`.
2. Fill `goal.md`, `concepts.md`, `files.md`, `tasks.md`, `steps.md`, and `validation.md` before broad edits.
3. Keep the plan updated if the scope changes.
4. Reference the plan path in the pull request.

The command copies the current `plans/_template/` files and refuses to overwrite an existing plan folder.

When the task is ready to publish, run:

```bash
npm run task:publish -- <task-id>
```

That command validates the repo, creates a `codex/<task-id>` branch, commits the current changes, pushes the branch, and opens a draft PR. Use `--dry-run` to preview the Git and GitHub commands without publishing.

## What `concepts.md` Is For

Use `concepts.md` to name the domain or evaluation ideas that the task depends on before code changes begin.

Examples:

- auth concepts: permission boundary, session state, failure mode
- billing concepts: idempotency, refund path, audit trail
- experiment concepts: development metric, held-out evaluation, reward hacking, stop condition

## When You Can Skip It

You can usually skip a full task plan for:

- tiny typo fixes
- narrow docs-only updates
- mechanical dependency bumps with no behavior change

If the change touches multiple files or changes behavior, use the plan.

## Suggested Naming

- `plans/2026-03-30-login-copy-fix/`
- `plans/2026-03-30-health-report-memory-check/`
