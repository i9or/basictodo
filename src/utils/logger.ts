import pino from "pino";

import { isDevelopment, isProduction } from "~/utils/environment.ts";

export type Severity = "info" | "warn" | "error" | "fatal" | "debug" | "trace";

export const logger = pino({
  level: isProduction() ? "warn" : "info",
  transport: isDevelopment() ? { target: "pino-pretty" } : undefined,
});
