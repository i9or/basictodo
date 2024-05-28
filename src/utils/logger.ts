import pino from "pino";

import { isDevelopment, isProduction } from "~/utils/environment";

export type Severity = "info" | "warn" | "error" | "fatal" | "debug" | "trace";

export const logger = pino({
  level: isProduction() ? "info" : "debug",
  transport: isDevelopment() ? { target: "pino-pretty" } : undefined,
});
