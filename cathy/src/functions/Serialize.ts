const excluded = ['_id', 'id', '__v'];

export default function Serialize(value: any, extra: Array<string> = []) {
  for (const key of [...excluded, ...extra]) {
    delete value[key];
  }

  return value;
}
