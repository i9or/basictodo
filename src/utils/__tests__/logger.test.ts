import { afterEach, describe, expect, it } from "bun:test";

import { PinoMock } from "~/mocks";
import { logger } from "~/utils/logger";

describe("logger", () => {
  afterEach(() => {
    PinoMock.constructorMock.mockReset();
  });

  it("should return a logger instance", () => {
    expect(logger).toBeInstanceOf(PinoMock);
    expect(PinoMock.constructorMock).toBeCalledWith({
      level: "debug",
      transport: {
        target: "pino-pretty",
      },
    });
  });
});
