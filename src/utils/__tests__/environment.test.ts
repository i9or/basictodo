import { describe, expect, mock, test } from "bun:test";

import { isDevelopment, isProduction } from "~/utils/environment.ts";

describe("Environment", () => {
  test("production environment", () => {
    mock.module("~/env", () => {
      return {
        ENV: { mode: "production" },
      };
    });

    expect(isProduction()).toBeTrue();
    expect(isDevelopment()).toBeFalse();
  });

  test("development environment", () => {
    mock.module("~/env", () => {
      return {
        ENV: { mode: "development" },
      };
    });

    expect(isProduction()).toBeFalse();
    expect(isDevelopment()).toBeTrue();
  });
});
