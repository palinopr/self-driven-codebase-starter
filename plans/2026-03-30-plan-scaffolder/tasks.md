# Implementation Tasks

## Must Do

- add reusable logic that copies `plans/_template/` into a named task folder
- add a CLI command that accepts a task id
- fail safely when the destination folder already exists
- add tests for success and safe failure
- update repo docs to show the new command

## Optional Follow-Ups

- prefill task ids from the current date
- add a command to list existing plans

## Open Questions And Assumptions

- assumption: the command should require an explicit task id rather than invent one
- assumption: copying exact file contents from the template is preferable to templating text substitutions
- open question: whether the CLI should validate task-id format beyond non-empty text
