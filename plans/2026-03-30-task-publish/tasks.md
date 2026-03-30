# Implementation Tasks

## Must Do

- add reusable task-publish logic that reads plan artifacts and produces branch, commit, and PR metadata
- add a CLI command for `npm run task:publish -- <task-id>`
- support `--dry-run` so the publish flow can be reviewed safely
- reject incomplete task plans
- reject untouched template placeholder plans
- document the publish step in repo workflow docs

## Optional Follow-Ups

- support publishing only the files named in `plans/<task-id>/files.md`
- add a future automation wrapper that runs the publish step after green validation

## Open Questions And Assumptions

- assumption: users still decide when a task is ready; the command should not guess readiness beyond plan completeness and validation
- assumption: `gh` is installed and authenticated in environments that want real PR creation
- open question: whether the command should refuse to run from a dirty branch that is not `main`
