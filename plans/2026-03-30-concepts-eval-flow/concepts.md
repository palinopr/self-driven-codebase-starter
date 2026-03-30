# Concepts

## Domain Concepts For This Feature

- intermediate reasoning artifact
  why it matters: the planning workflow should tell agents which semantic ideas matter before coding
- development metric vs held-out evaluation
  why it matters: autonomous optimization work can otherwise overfit visible checks
- reward hacking
  why it matters: experiment loops need explicit anti-cheating guidance
- file-scope discipline
  why it matters: the feature should extend the existing workflow without broad unrelated changes

## Concepts The Repo Should Surface After This Change

- product or domain concepts relevant to a task
- evaluation concepts relevant to autonomous experiments:
  - development metric
  - held-out evaluation
  - stop condition
  - signs of reward hacking

## Concepts That Stay Out Of Scope

- benchmark-specific attack details
- product-specific concepts for a domain that this starter repo does not yet have
