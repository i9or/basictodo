import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import { ENV } from "~/env.ts";
import { logger } from "~/utils/logger.ts";

logger.info(`Database: ${ENV.dbPath}`);
const sqlite = new Database(ENV.dbPath, { create: true });

export const database = drizzle(sqlite);
