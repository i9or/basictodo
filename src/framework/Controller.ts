import { Hono } from "hono";
import { createFactory } from "hono/factory";

export abstract class Controller {
  private readonly _router = new Hono();
  private readonly _factory = createFactory();

  get router() {
    return this._router;
  }

  get factory() {
    return this._factory;
  }

  static get path(): string {
    throw new Error(`${this.name}#path is not implemented`);
  }
}
