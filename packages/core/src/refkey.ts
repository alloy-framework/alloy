import { markRaw } from "@vue/reactivity";

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
  const refkey: Refkey = {
    key,
    [RefkeySym]: true,
  };

  markRaw(refkey);

  return refkey;
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

/**
 * Create a refkey for the provided arguments. Passing no arguments returns a
 * fresh refkey that is guaranteed to be unique. Otherwise, the arguments passed
 * will be used to create a refkey for those values. Providing the same
 * arguments will always return the same refkey.
 *
 * @remarks
 *
 * Values are compared using the SameValueZero algorithm, which considers
 * objects the same if they are reference identical, and primitives the same if
 * they are the same value, with the exception of `NaN`, which is always considered
 * equal to other `NaN` values, and `-0`, which is considered identical to `+0`
 */
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

/**
 * Create a refkey for an instantiation of a symbol.
 *
 * @param base - The refkey of the symbol holding the instantiation.
 * @param member - The refkey of the non-instantiated member symbol (either the
 * instance or static member symbol)
 *
 * @remarks
 *
 * Refkeys for instantiated and copied members are a composite refkey of the
 * owner's refkey and the member's refkey. So for example, given a refkey for an
 * instantiation of a class `rk1`, and a refkey for the instance member of that
 * class `rk2`, the refkey for the instantiated static member is `refkey(rk1,
 * rk2)`. This function will return the same refkey given those same parameters.
 *
 * When a static member symbol `rk3` is owned by another static or instance
 * member symbol (i.e. the outer symbol is itself a member container), the
 * refkey of the instaniated static member is still just the composite of the
 * instantiated variable refkey and the refkey of the inner member `refkey(rk1,
 * rk3)`.
 */
export function memberRefkey(base: Refkey, member: Refkey): Refkey {
  return refkey(base, member);
}
