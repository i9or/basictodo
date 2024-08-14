import { afterEach, describe, expect, it } from "bun:test";

import { PinoMock } from "~/test-utils/mocks.ts";
import { logger } from "~/utils/logger.ts";

describe("logger", () => {
  afterEach(() => {
    PinoMock.constructorMock.mockReset();
  });

  it("should return a logger instance", () => {
    expect(logger).toBeInstanceOf(PinoMock);
    expect(PinoMock.constructorMock).toBeCalled();
  });
});
