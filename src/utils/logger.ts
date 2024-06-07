import pino from "pino";

import { isDevelopment, isProduction } from "~/utils/environment.ts";

export type Severity = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export const logger = pino({
  level: isProduction() ? "warn" : "info",
  transport: isDevelopment() ? { target: "pino-pretty" } : undefined,
});
