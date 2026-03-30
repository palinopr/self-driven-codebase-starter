<!-- drift path=".agents/experimenter.md" hash="ff1dcf37254bc475" -->
<!-- drift path=".github/pull_request_template.md" hash="32ab999f896c68ad" -->
<!-- drift path="plans/_template/concepts.md" hash="9103fccb7ffc9ed2" -->
<!-- drift path="plans/_template/validation.md" hash="c7efb2ad57069bdf" -->
# Agent Evaluation Workflow

This workflow exists for tasks where an agent is optimizing against a measurable target, such as experiments, red-teaming, benchmarks, or autonomous improvement loops.

## Core Rule

Never trust a strong visible metric by itself.

Keep these separate:

- development metric
- held-out evaluation
- merge decision

## Minimum Evaluation Plan

Before the loop runs, write down:

- what metric the agent is optimizing
- what held-out check the agent does not see during optimization
- the stop condition
- the budget or iteration limit
- the likely reward-hacking paths

These belong in `plans/<task-id>/concepts.md` and `validation.md`.

## Typical Reward-Hacking Signs

- optimizing seeds or initial conditions instead of the method
- leaking held-out cases into the visible training loop
- reusing previous best artifacts in a way that breaks the intended budget
- widening the task definition after the metric improves
- reporting development metrics as if they were final evaluation

## Pull Request Expectations

For experiment-heavy work, the pull request should say:

- visible training or development metric
- held-out evaluation result
- whether the held-out result improved too
- what anti-cheating checks were used

## When To Use This Workflow

Use it when the repo is doing:

- benchmark optimization
- red-team or adversarial evaluation
- automated search over prompts, heuristics, or algorithms
- any loop where an agent can overfit a measurable score
