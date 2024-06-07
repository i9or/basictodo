import { describe, expect, it } from "bun:test";

import {
  isEmpty,
  isNullOrUndefined,
  notNullNorUndefined,
} from "~/utils/predicates";

describe("predicates", () => {
  describe("isEmpty", () => {
    it("should return true if array is empty", () => {
      expect(isEmpty([])).toBeTrue();
    });

    it("should return false if array is not empty", () => {
      expect(isEmpty([1, 2, 3])).toBeFalse();
      expect(isEmpty([{}, [], null])).toBeFalse();
    });
  });

  describe("isNullOrUndefined", () => {
    it("should return true if value is null or undefined", () => {
      expect(isNullOrUndefined(undefined)).toBeTrue();
      expect(isNullOrUndefined(null)).toBeTrue();
    });

    it("should return false if value is not null nor undefined", () => {
      expect(isNullOrUndefined(1)).toBeFalse();
      expect(isNullOrUndefined("hello")).toBeFalse();
      expect(isNullOrUndefined([])).toBeFalse();
      expect(isNullOrUndefined({})).toBeFalse();
      expect(isNullOrUndefined(Symbol("hello"))).toBeFalse();
      expect(isNullOrUndefined(true)).toBeFalse();
      expect(isNullOrUndefined(false)).toBeFalse();
      expect(isNullOrUndefined(NaN)).toBeFalse();
    });
  });

  describe("notNullNorUndefined", () => {
    it("should return true if value is not null nor undefined", () => {
      expect(notNullNorUndefined(1)).toBeTrue();
      expect(notNullNorUndefined("hello")).toBeTrue();
      expect(notNullNorUndefined([])).toBeTrue();
      expect(notNullNorUndefined({})).toBeTrue();
      expect(notNullNorUndefined(Symbol("hello"))).toBeTrue();
      expect(notNullNorUndefined(true)).toBeTrue();
      expect(notNullNorUndefined(false)).toBeTrue();
      expect(notNullNorUndefined(NaN)).toBeTrue();
    });

    it("should return false if value is null or undefined", () => {
      expect(notNullNorUndefined(undefined)).toBeFalse();
      expect(notNullNorUndefined(null)).toBeFalse();
    });
  });
});
