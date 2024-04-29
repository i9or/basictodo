import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database("db/main.db", { create: true });

export const db = drizzle(sqlite);
