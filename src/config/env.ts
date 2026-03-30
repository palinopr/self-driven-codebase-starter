export interface AppEnv {
  appName: string;
}

export function loadEnv(): AppEnv {
  return {
    appName: process.env.APP_NAME ?? "self-driven-codebase-starter",
  };
}
