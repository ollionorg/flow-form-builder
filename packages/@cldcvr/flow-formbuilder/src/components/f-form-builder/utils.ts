export function isEmptyObject(obj: Object) {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

export function isNullOrUndefined(value: unknown): value is undefined | null {
  return value === null || value === undefined;
}

export function isEmptyArray(arr: unknown): boolean {
  return Array.isArray(arr) && arr.length === 0;
}
