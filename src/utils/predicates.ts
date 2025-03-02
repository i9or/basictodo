export const isEmpty = (arr: unknown[]) => arr.length === 0;

export const notNullNorUndefined = <T>(
  value: T | null | undefined,
): value is T => {
  return value !== null && value !== undefined;
};

export const isNullOrUndefined = <T>(
  value: undefined | null | T,
): value is null | undefined => {
  return value === null || value === undefined;
};
