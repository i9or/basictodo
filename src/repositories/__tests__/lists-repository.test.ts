import { describe, expect, it } from "bun:test";

import { selectAllLists } from "../lists-repository";

// FIXME: write proper test
describe("Lists Repository", () => {
  it("should be all the task lists", () => {
    expect(selectAllLists("1")).toStrictEqual([
      {
        name: "some list for 1",
      },
    ]);
  });
});
