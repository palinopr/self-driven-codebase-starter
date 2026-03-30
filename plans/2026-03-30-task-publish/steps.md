# Step Decomposition

1. Create the task plan with `npm run plan:new -- 2026-03-30-task-publish`.
2. Implement reusable publish logic in `src/lib/task-publish.ts`.
3. Add a CLI wrapper and package script for `npm run task:publish -- <task-id>`.
4. Add tests for metadata generation, dry-run planning, and safe failure cases.
5. Tighten the flow so placeholder task plans cannot be published.
6. Update workflow docs to show the end-to-end path from plan creation to draft PR.
7. Run format, docs stamp, validate, and record results in `validation.md`.

## Scope Change Rule

If a new file or task becomes necessary outside `package.json`, `scripts/`, `src/lib/`, `test/`, `README.md`, `docs/`, or this task plan folder, record the reason here before widening the diff.
