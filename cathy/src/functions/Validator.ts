export function hasOwnProperty(obj: any, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function Keys(keys: Array<string>, obj: any) {
  for (const key in obj) {
    if (!keys.includes(key)) {
      return false;
    }
  }

  return true;
}
