const DEFAULT_PORT = 3000;

export const ENV = {
  port: process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT,
  mode: process.env.NODE_ENV ?? "development",
  dbPath: process.env.DB_PATH ?? ":memory:",
} as const;
