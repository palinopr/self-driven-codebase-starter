# Implementation Tasks

## Must Do

- add repository memory, role prompts, workflow docs, and evaluation docs
- add stage-aware plan templates and the `plan:new` command
- add the `task:publish` command with dry-run support and placeholder-plan rejection
- wire the new scaffolding into repo health, README, setup docs, issue intake, and PR review
- verify the full repo with validation and manual command checks

## Optional Follow-Ups

- enforce staged file scope from `plans/<task-id>/files.md` during publish
- add a higher-level automation wrapper after the manual publish step is stable

## Open Questions And Assumptions

- assumption: the current working tree belongs to one coherent foundation rollout and can ship in one draft PR
- assumption: dry-run plus full validation are enough evidence for this rollout PR
- open question: whether publish should switch to file-scope staging in the next pass
