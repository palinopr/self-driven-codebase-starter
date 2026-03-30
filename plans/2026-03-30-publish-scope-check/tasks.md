# Implementation Tasks

## Must Do

- parse allowed file paths from `Confirmed Files` and `Candidate Files` in `files.md`
- compare the current git diff against those allowed paths before staging
- automatically allow the current task plan folder
- fail with a clear error when unexpected files are present
- add tests for both allowed and blocked scope cases
- update the workflow docs to describe the new gate

## Optional Follow-Ups

- support partial staging of only the allowed files
- surface a machine-readable scope summary in the draft PR body

## Open Questions And Assumptions

- assumption: bullet items in `files.md` will use backticked file paths or clear file-path bullets
- assumption: `Candidate Files` should be treated as allowed scope at publish time
- open question: whether `Files To Avoid` should become a separate hard error category later
