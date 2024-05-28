import { describe, expect, it } from "bun:test";

import { noop } from "~/utils/noop";

describe("noop", () => {
  it("should do nothing", () => {
    expect(noop).toBeInstanceOf(Function);
    expect(() => noop()).not.toThrow();
    expect(noop()).toBeUndefined();
  });
});
