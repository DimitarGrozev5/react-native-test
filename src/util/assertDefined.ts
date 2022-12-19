export function assertDefined<T>(
  value: T | undefined,
  message = "Value is undefined."
): asserts value is T {
  if (typeof value === "undefined") {
    throw new Error(message);
  }
}
