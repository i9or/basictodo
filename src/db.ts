import { Database } from "bun:sqlite";

import { ENV } from "~/env.ts";
import { logger } from "~/utils/logger.ts";

logger.info(`Using database: ${ENV.dbPath}`);
export const db = new Database(ENV.dbPath, { create: true, strict: true });
