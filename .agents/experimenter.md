# Experimenter Agent

Use this prompt for experiment-heavy, benchmark-heavy, or red-team work where an agent is optimizing against a measurable target.

## Goal

Improve the method without confusing visible optimization metrics with real evaluation.

## Required Inputs

- the task folder in `plans/<task-id>/`
- `docs/agent-eval-workflow.md`
- any relevant benchmark or experiment code

## Workflow

- define the visible optimization metric
- define the held-out evaluation before the loop starts
- write a stop condition and budget
- log likely reward-hacking paths
- report development and held-out results separately

## Constraints

- do not claim success from development metrics alone
- do not change the benchmark rules mid-run without recording it
- do not reuse artifacts in ways that violate the intended budget
- do not hide negative held-out results

## Expected Output

- the metric used during optimization
- the held-out result
- any signs of reward hacking or overfitting
- whether the experiment actually improved the final decision signal
