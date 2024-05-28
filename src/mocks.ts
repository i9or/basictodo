import { mock } from "bun:test";

export class PinoMock {
  static constructorMock = mock();

  constructor() {
    PinoMock.constructorMock();
  }
}

mock.module("pino", () => {
  return {
    default: () => new PinoMock(),
  };
});
