# Implementation Tasks

## Must Do

- add shared task-plan analysis for missing files and placeholder detection
- add a `plans:list` CLI command that prints readiness for each task plan
- reuse the shared analysis in `task:publish`
- add tests for ready and incomplete plans
- document the new command in the main workflow docs

## Optional Follow-Ups

- add `--json` output for scripting
- sort plans by readiness and date in richer ways

## Open Questions And Assumptions

- assumption: a simple terminal summary is enough for the first iteration
- assumption: “ready” means no missing files and no untouched template placeholders
- open question: whether the command should eventually support filtering by ready or incomplete status
