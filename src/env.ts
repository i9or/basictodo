const DEFAULT_PORT = 3000;

export const ENV = {
  port: process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT,
  mode: process.env.BUN_ENV ?? "development",
  dbPath: process.env.DB_PATH ?? ":memory:",
  secret: process.env.SECRET ?? "no_secret",
  showRoutes: (process.env.SHOW_ROUTES ?? false) === "true",
} as const;
