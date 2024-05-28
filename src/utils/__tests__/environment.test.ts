import { afterAll, describe, expect, test } from "bun:test";

import { isDevelopment, isProduction } from "~/utils/environment";

describe("Environment", () => {
  afterAll(() => {
    process.env.NODE_ENV = "test";
  });

  test("production environment", () => {
    process.env.NODE_ENV = "production";

    expect(isProduction()).toBeTrue();
    expect(isDevelopment()).toBeFalse();
  });

  test("development environment", () => {
    process.env.NODE_ENV = "development";

    expect(isProduction()).toBeFalse();
    expect(isDevelopment()).toBeTrue();
  });
});
