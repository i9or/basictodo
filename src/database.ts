import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

// FIXME: use env variable to the DB file
const sqlite = new Database("./db/main.db", { create: true });

export const database = drizzle(sqlite);
