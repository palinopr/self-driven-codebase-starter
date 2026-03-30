# Step Decomposition

1. Add a concrete task plan for this feature before broad repo edits.
2. Introduce a `concepts.md` planning artifact and update the planning docs and prompts around it.
3. Add an experiment and evaluation workflow doc plus a matching agent prompt for autonomous evaluation work.
4. Update repo instructions, PR templates, and supporting docs so the new flow is visible to humans and agents.
5. Extend repository health checks and fixtures to require the new files.
6. Run format, stamp drift anchors, validate, and record the results in `validation.md`.

## Scope Change Rule

If the work requires new files outside `plans/`, `.agents/`, `docs/`, `.github/`, `README.md`, `CLAUDE.md`, `AGENTS.md`, `src/services/repository-health-service.ts`, or `test/repository-health-service.test.ts`, record the reason here before widening the diff.
