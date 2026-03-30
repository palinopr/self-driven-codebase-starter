import { listTaskPlans } from "../src/lib/task-plan.js";

async function main(): Promise<void> {
  const plans = await listTaskPlans(process.cwd());

  if (plans.length === 0) {
    process.stdout.write("No task plans found.\n");
    return;
  }

  for (const plan of plans) {
    const parts = [plan.status.toUpperCase().padEnd(10), plan.taskId];

    if (plan.missingFiles.length > 0) {
      parts.push(`missing: ${plan.missingFiles.join(", ")}`);
    }

    if (plan.unfilledFiles.length > 0) {
      parts.push(`template: ${plan.unfilledFiles.join(", ")}`);
    }

    process.stdout.write(`${parts.join("  ")}\n`);
  }
}

await main();
