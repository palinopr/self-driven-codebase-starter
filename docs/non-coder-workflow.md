<!-- drift path=".github/pull_request_template.md" hash="90eaca6568cb51b0" -->
<!-- drift path=".github/ISSUE_TEMPLATE/ai-build-request.yml" hash="5d6f2502f89b4809" -->
<!-- drift path="package.json" hash="1d933e9d9d3cdd9a" -->
# Non-Coder Workflow

This guide is for someone who wants to build with AI but does not deeply know how to read code.

## The Safe Workflow

1. If this is a new repo from the template, read `docs/template-setup.md` first.
2. Start with one issue using the `AI Build Request` template.
3. Ask the agent to solve only that issue.
4. Require a pull request, not direct changes on `main`.
5. Read the PR in plain English before thinking about the code.
6. Check the evidence:
   - did `npm run validate` pass
   - is there demo output you can understand
   - did the PR explain risks and rollback
7. Ask what could still be wrong.
8. Merge only after the evidence is clear enough for you.

## Questions You Should Always Ask

- What changed in plain English?
- How do I test this as a user?
- What proof says it works?
- What is still risky?
- How do I undo it?

## What You Should Not Do

- Do not ask for giant multi-feature prompts.
- Do not merge because the AI sounds confident.
- Do not skip the demo or the validation output.
- Do not treat code review as optional just because the PR is small.
