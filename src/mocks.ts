import { mock } from "bun:test";

export class PinoMock {
  static constructorMock = mock();

  constructor(...params: unknown[]) {
    PinoMock.constructorMock(...params);
  }
}

mock.module("pino", () => {
  return {
    default: (...params: unknown[]) => new PinoMock(...params),
  };
});
