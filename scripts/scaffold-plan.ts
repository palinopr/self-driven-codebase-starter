import { scaffoldPlan } from "../src/lib/plan-scaffold.js";

async function main(): Promise<void> {
  const taskId = process.argv[2];

  if (taskId === undefined || taskId.trim().length === 0) {
    process.stderr.write("Usage: npm run plan:new -- <task-id>\n");
    process.exitCode = 1;
    return;
  }

  try {
    const result = await scaffoldPlan(process.cwd(), taskId);

    process.stdout.write(
      `Created ${result.taskDirectory} with ${result.filesCreated} file${result.filesCreated === 1 ? "" : "s"}.\n`,
    );
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
