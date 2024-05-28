import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database(":memory:", { create: true });

export const db = drizzle(sqlite);
