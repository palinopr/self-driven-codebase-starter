import { normalizePlanTaskId } from "../src/lib/plan-scaffold.js";
import { publishTask } from "../src/lib/task-publish.js";

async function main(): Promise<void> {
  const [taskId, ...flags] = process.argv.slice(2);

  if (taskId === undefined || taskId.trim().length === 0) {
    process.stderr.write(
      "Usage: npm run task:publish -- <task-id> [--dry-run] [--skip-validate]\n",
    );
    process.exitCode = 1;
    return;
  }

  const allowedFlags = new Set(["--dry-run", "--skip-validate"]);
  const unknownFlags = flags.filter((flag) => !allowedFlags.has(flag));

  if (unknownFlags.length > 0) {
    process.stderr.write(`Unknown flag(s): ${unknownFlags.join(", ")}\n`);
    process.stderr.write(
      "Usage: npm run task:publish -- <task-id> [--dry-run] [--skip-validate]\n",
    );
    process.exitCode = 1;
    return;
  }

  const dryRun = flags.includes("--dry-run");
  const skipValidate = flags.includes("--skip-validate");

  try {
    const normalizedTaskId = normalizePlanTaskId(taskId);
    const result = await publishTask(process.cwd(), normalizedTaskId, {
      dryRun,
      skipValidate,
    });

    process.stdout.write(
      `${dryRun ? "Planned" : "Published"} task ${result.taskId} on ${result.branchName}.\n`,
    );
    process.stdout.write(`Commit: ${result.commitMessage}\n`);
    process.stdout.write(`PR title: ${result.prTitle}\n`);

    if (dryRun) {
      process.stdout.write("Planned commands:\n");

      for (const command of result.plannedCommands) {
        process.stdout.write(
          `- ${command.command} ${command.args.join(" ")}\n`,
        );
      }
    } else if (result.prUrl !== null) {
      process.stdout.write(`Draft PR: ${result.prUrl}\n`);
    }
  } catch (error) {
    if (error instanceof Error) {
      process.stderr.write(`${error.message}\n`);
      process.exitCode = 1;
      return;
    }

    throw error;
  }
}

await main();
