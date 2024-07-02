import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { database } from "~/database.ts";

migrate(database, { migrationsFolder: "./db/migrations" });
