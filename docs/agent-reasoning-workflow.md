<!-- drift path=".github/ISSUE_TEMPLATE/ai-build-request.yml" hash="f636073cf4435fa4" -->
<!-- drift path=".github/pull_request_template.md" hash="32ab999f896c68ad" -->
<!-- drift path=".agents/manager.md" hash="ba30a21a5c5dec2e" -->
<!-- drift path=".agents/worker.md" hash="916f6abd526f8800" -->
<!-- drift path=".agents/reviewer.md" hash="9b53865660406b4f" -->
<!-- drift path="plans/_template/goal.md" hash="0fdc083a2703c4c5" -->
<!-- drift path="plans/_template/concepts.md" hash="9103fccb7ffc9ed2" -->
<!-- drift path="plans/_template/files.md" hash="a232e9e40c3be55b" -->
<!-- drift path="plans/_template/tasks.md" hash="f6bdc593d2e9e38e" -->
<!-- drift path="plans/_template/steps.md" hash="02588b73fc4f5fbb" -->
<!-- drift path="plans/_template/validation.md" hash="c7efb2ad57069bdf" -->
# Agent Reasoning Workflow

This repository does not let an agent jump straight from issue to patch on meaningful work.

## Required Stages

For feature work or any multi-file change, write the plan before broad edits:

1. Issue understanding
2. Concepts
3. File localization
4. Implementation tasks
5. Step decomposition
6. Validation

Those stages live in `plans/<task-id>/`.

## Required Artifacts

Run `npm run plan:new -- <task-id>` and fill:

- `goal.md`
- `concepts.md`
- `files.md`
- `tasks.md`
- `steps.md`
- `validation.md`

Keep the plan small, concrete, and reviewable.

## Why This Exists

Agents often understand the high-level request but still fail by:

- touching too many files
- missing the actual domain concepts that should drive the implementation
- inventing extra work
- skipping hidden constraints
- producing a patch that looks clean but does not match the actual need

The plan catches those problems before the code diff gets large.

## Role Split

- `manager.md` creates or tightens the plan
- `worker.md` implements only the approved plan
- `reviewer.md` checks the diff against the plan and the evidence

## Pull Request Requirements

The pull request must include:

- the plan path
- the domain concepts or evaluation concepts that mattered
- the expected file scope
- any deviations from that scope
- the AI tools used
- the human checks that actually happened

If the change drifted outside the expected file set, the PR should say so directly.

## Publish Step

When implementation and validation are done, publish the task with:

```bash
npm run task:publish -- <task-id>
```

Use `--dry-run` first if you want to preview the Git and GitHub actions without creating the branch or PR.

The publish step also checks the current diff against `plans/<task-id>/files.md`. If the diff includes files outside `Confirmed Files` and `Candidate Files`, the command refuses to stage and publish the task until the plan and the code match again.
