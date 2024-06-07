import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

export abstract class Repository {
  private readonly _db;

  protected constructor(db: BunSQLiteDatabase) {
    this._db = db;
  }

  get db() {
    return this._db;
  }
}
