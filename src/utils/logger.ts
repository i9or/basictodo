import pino from "pino";

export type Severity = "info" | "warn" | "error" | "fatal" | "debug" | "trace";

export const logger = pino({
  level: "debug",
  transport: {
    target: "pino-pretty",
  },
});