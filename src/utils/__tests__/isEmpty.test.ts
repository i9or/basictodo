import { describe, expect, it } from "bun:test";

import { isEmpty } from "~/utils/is-empty.ts";

describe("isEmpty", () => {
  it("should return true if array is empty", () => {
    expect(isEmpty([])).toBeTrue();
  });

  it("should return false if array is not empty", () => {
    expect(isEmpty([1, 2, 3])).toBeFalse();
    expect(isEmpty([{}, [], null])).toBeFalse();
  });
});
