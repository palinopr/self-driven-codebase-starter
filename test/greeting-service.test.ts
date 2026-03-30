import { describe, expect, it } from "vitest";

import { Effect } from "effect";

import {
  GreetingRuntimeTest,
  greet,
} from "../src/services/greeting-service.js";

describe("greet", () => {
  it("returns a greeting for valid input", async () => {
    const result = await Effect.runPromise(
      greet({
        name: "Jaime",
        requestId: "req-123",
      }).pipe(
        Effect.provide(GreetingRuntimeTest),
        Effect.match({
          onFailure: (error) => ({
            _tag: "Failure" as const,
            error,
          }),
          onSuccess: (value) => ({
            _tag: "Success" as const,
            value,
          }),
        }),
      ),
    );

    expect(result).toEqual({
      _tag: "Success",
      value: {
        message: "Hello, Jaime.",
        requestId: "req-123",
      },
    });
  });

  it("returns a typed failure for invalid input", async () => {
    const result = await Effect.runPromise(
      greet({
        name: "   ",
        requestId: "req-456",
      }).pipe(
        Effect.provide(GreetingRuntimeTest),
        Effect.match({
          onFailure: (error) => ({
            _tag: error._tag,
            input: error.input,
          }),
          onSuccess: (value) => ({
            _tag: "Success" as const,
            value,
          }),
        }),
      ),
    );

    expect(result).toEqual({
      _tag: "InvalidGreetingNameError",
      input: "   ",
    });
  });
});
