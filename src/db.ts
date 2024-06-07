import { Database } from "bun:sqlite";

import { ENV } from "~/env";
import { logger } from "~/utils/logger";

logger.debug(`Using database: ${ENV.dbPath}`);

export const db = new Database(ENV.dbPath, { create: true, strict: true });
