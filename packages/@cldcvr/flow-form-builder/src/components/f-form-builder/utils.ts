export function isEmptyObject(obj: Object) {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

export function isNullOrUndefined(value: unknown): value is undefined | null {
  return value === null || value === undefined;
}

export function isEmptyArray(arr: unknown): boolean {
  return Array.isArray(arr) && arr.length === 0;
}

export function isValidEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function isValidHttpUrl(stringurl: string) {
  let url;

  try {
    url = new URL(stringurl);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
