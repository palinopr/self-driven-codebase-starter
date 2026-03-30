import { Context, Effect, Layer } from "effect";

export type LogLevel = "error" | "info";

export type LogFields = Readonly<
  Record<string, boolean | number | string | undefined>
>;

export interface AppLoggerService {
  readonly error: (event: string, fields: LogFields) => Effect.Effect<void>;
  readonly info: (event: string, fields: LogFields) => Effect.Effect<void>;
}

export class AppLogger extends Context.Tag("AppLogger")<
  AppLogger,
  AppLoggerService
>() {}

const writeLog = (
  level: LogLevel,
  event: string,
  fields: LogFields,
): Effect.Effect<void> =>
  Effect.sync(() => {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      event,
      ...fields,
    });

    process.stdout.write(`${entry}\n`);
  });

export const AppLoggerLive = Layer.succeed(AppLogger, {
  error: (event: string, fields: LogFields) => writeLog("error", event, fields),
  info: (event: string, fields: LogFields) => writeLog("info", event, fields),
});

export const AppLoggerNoop = Layer.succeed(AppLogger, {
  error: () => Effect.succeed(undefined),
  info: () => Effect.succeed(undefined),
});
