# Step Decomposition

1. Create the task plan for the feature before broad edits.
2. Implement a reusable plan-scaffolding module in `src/`.
3. Add a CLI script and package command for `npm run plan:new -- <task-id>`.
4. Add tests for successful scaffolding and safe failure.
5. Update repo docs and workflow docs to point to the command.
6. Run format, docs stamp, validate, and record results in `validation.md`.

## Scope Change Rule

If the work needs files outside `package.json`, `scripts/`, `src/`, `test/`, `README.md`, `docs/`, or this task plan folder, record the reason here before widening the diff.
