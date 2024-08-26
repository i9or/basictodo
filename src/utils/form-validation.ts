export const isInvalid = <T extends Set<unknown>>(
  invalidFields: T | undefined,
  singleField: T extends Set<infer U> ? U : never,
) => {
  if (!invalidFields) {
    return undefined;
  }

  return invalidFields.has(singleField) ? "is-invalid" : "is-valid";
};
