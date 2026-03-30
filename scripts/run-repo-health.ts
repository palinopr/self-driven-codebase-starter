import { Effect } from "effect";

import {
  RepositoryHealthRuntimeQuiet,
  inspectRepositoryHealth,
} from "../src/services/repository-health-service.js";

async function main(): Promise<void> {
  const rootDir = process.argv[2] ?? process.cwd();

  const report = await Effect.runPromise(
    inspectRepositoryHealth(rootDir).pipe(
      Effect.provide(RepositoryHealthRuntimeQuiet),
    ),
  );

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

await main();
