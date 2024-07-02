import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import { ENV } from "~/env.ts";

const sqlite = new Database(ENV.dbPath, { create: true });

export const database = drizzle(sqlite);
