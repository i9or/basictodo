import { describe, expect, it } from "bun:test";

import { generateToken } from "~/utils/generate-token";

describe("generateToken", () => {
  it("should generate a random encoded token 32 characters long", () => {
    const firstToken = generateToken();

    expect(typeof firstToken).toBe("string");
    expect(firstToken.length).toBe(32);

    const secondToken = generateToken();

    expect(firstToken).not.toBe(secondToken);
  });
});
