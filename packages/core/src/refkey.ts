const objectIds = new WeakMap<WeakKey, string>();
let objId = 0;

function getObjectKey(value: WeakKey) {
  if (objectIds.has(value)) {
    return `${objectIds.get(value)}`;
  }

  const key = `o${objId++}`;
  objectIds.set(value, key);

  return key;
}

declare const RefkeySym: unique symbol;
export type Refkey = string & { [RefkeySym]: true };

function getKey(value: unknown): Refkey {
  if (typeof value === "object" && value !== null) {
    return getObjectKey(value) as Refkey;
  } else {
    return `s${String(value)}` as Refkey;
  }
}

export function refkey(...args: unknown[]): Refkey {
  return args.map((v) => getKey(v)).join("\u2063") as Refkey;
}
