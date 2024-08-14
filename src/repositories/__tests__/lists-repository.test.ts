import { describe, expect, it } from "bun:test";

import { selectAllLists } from "../lists-repository.ts";

// FIXME: write proper test
describe("Lists Repository", () => {
  it("should be all the task lists", () => {
    expect(selectAllLists("1")).toStrictEqual([
      {
        name: "mock list 1",
      },
    ]);
  });
});
