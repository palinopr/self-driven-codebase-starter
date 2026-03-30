import { randomUUID } from "node:crypto";

import { Effect } from "effect";

import {
  GreetingRuntimeLive,
  greet,
} from "../src/services/greeting-service.js";

async function main(): Promise<void> {
  const name = process.argv[2] ?? "world";
  const requestId = randomUUID();

  const program = greet({
    name,
    requestId,
  }).pipe(
    Effect.provide(GreetingRuntimeLive),
    Effect.match({
      onFailure: (error) => `Greeting failed: ${error._tag}`,
      onSuccess: (greeting) => greeting.message,
    }),
  );

  const result = await Effect.runPromise(program);

  process.stdout.write(`${result}\n`);
}

await main();
