const objectIds = new WeakMap<WeakKey, Refkey>();
let objId = 0;

function getObjectKey(value: WeakKey) {
  if (objectIds.has(value)) {
    return objectIds.get(value)!;
  }

  const key = createRefkey(`o${objId++}`);
  objectIds.set(value, key);

  return key;
}

const RefkeySym: unique symbol = Symbol();

export type Refkey = { key: string; [RefkeySym]: true };

function createRefkey(key: string): Refkey {
  return {
    key,
    [RefkeySym]: true,
  };
}
export function isRefkey(value: unknown): value is Refkey {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.hasOwn(value, RefkeySym)
  );
}

function getKey(value: unknown): Refkey {
  if (isRefkey(value)) {
    return value;
  } else if (typeof value === "object" && value !== null) {
    return getObjectKey(value);
  } else {
    return createRefkey(`s${String(value)}`);
  }
}

const knownRefkeys = new Map<string, Refkey>();
export function refkey(...args: unknown[]): Refkey {
  const keys = args.length === 0 ? [getKey({})] : args.map((v) => getKey(v));

  const compositeKey = keys.map((v) => v.key).join("\u2063");
  if (knownRefkeys.has(compositeKey)) {
    return knownRefkeys.get(compositeKey)!;
  }

  const key = createRefkey(compositeKey);
  knownRefkeys.set(compositeKey, key);
  return key;
}
