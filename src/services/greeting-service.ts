import { Context, Data, Effect, Layer } from "effect";

import {
  AppLogger,
  AppLoggerLive,
  AppLoggerNoop,
} from "../observability/app-logger.js";

export interface Greeting {
  readonly message: string;
  readonly requestId: string;
}

export interface GreetingRequest {
  readonly name: string;
  readonly requestId: string;
}

export class InvalidGreetingNameError extends Data.TaggedError(
  "InvalidGreetingNameError",
)<{
  readonly input: string;
}> {}

export interface GreetingServiceShape {
  readonly greet: (
    request: GreetingRequest,
  ) => Effect.Effect<Greeting, InvalidGreetingNameError>;
}

export class GreetingService extends Context.Tag("GreetingService")<
  GreetingService,
  GreetingServiceShape
>() {}

export const GreetingServiceLive = Layer.effect(
  GreetingService,
  Effect.gen(function* () {
    const logger = yield* AppLogger;

    return {
      greet: (request: GreetingRequest) =>
        Effect.gen(function* () {
          const trimmedName = request.name.trim();

          if (trimmedName.length === 0) {
            yield* logger.error("greeting.rejected", {
              input: request.name,
              requestId: request.requestId,
            });

            return yield* Effect.fail(
              new InvalidGreetingNameError({
                input: request.name,
              }),
            );
          }

          yield* logger.info("greeting.generated", {
            name: trimmedName,
            requestId: request.requestId,
          });

          return {
            message: `Hello, ${trimmedName}.`,
            requestId: request.requestId,
          };
        }),
    } satisfies GreetingServiceShape;
  }),
);

export const GreetingRuntimeLive = GreetingServiceLive.pipe(
  Layer.provide(AppLoggerLive),
);

export const GreetingRuntimeTest = GreetingServiceLive.pipe(
  Layer.provide(AppLoggerNoop),
);

export const greet = (request: GreetingRequest) =>
  Effect.flatMap(GreetingService, (service) => service.greet(request));
