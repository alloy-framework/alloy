import { markRaw } from "@vue/reactivity";

const objectIds = new WeakMap<WeakKey, string>();
let objId = 0;

function getObjectKey(value: WeakKey): string {
  if (objectIds.has(value)) {
    return objectIds.get(value)!;
  }

  const key = `o${objId++}`;
  objectIds.set(value, key);

  return key;
}

const RefkeySym: unique symbol = Symbol();

export type RefkeyBase = {
  [RefkeySym]: true;
};

export type Refkey = SymbolRefkey | MemberRefkey | Namekey;

export interface SymbolRefkey extends RefkeyBase {
  key: string;
}

export interface NamekeyOptions {
  ignoreNamePolicy?: boolean;
  ignoreNameConflict?: boolean;
}

export interface Namekey<TOptions extends NamekeyOptions = NamekeyOptions>
  extends SymbolRefkey {
  name: string;
  options: TOptions;
}

export interface MemberRefkey extends RefkeyBase {
  base: Refkey;
  member: Refkey;
}

function createSymbolRefkey(key: string): SymbolRefkey {
  const refkey: SymbolRefkey = {
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

export function isSymbolRefkey(value: unknown): value is SymbolRefkey {
  return isRefkey(value) && Object.hasOwn(value, "key");
}

export function isMemberRefkey(value: unknown): value is MemberRefkey {
  return (
    isRefkey(value) &&
    Object.hasOwn(value, "base") &&
    Object.hasOwn(value, "member")
  );
}

export function isNamekey(value: unknown): value is Namekey {
  return isRefkey(value) && Object.hasOwn(value, "name");
}

/**
 * This gets the key for a symbol refkey based on the value provided. Refkey values
 * return the key of that refkey, objects get a unique key for that specific object,
 * and otherwise the key is based on the value.
 */
function getKey(value: unknown): SymbolRefkey["key"] {
  if (isSymbolRefkey(value)) {
    return value.key;
  } else if (typeof value === "object" && value !== null) {
    return getObjectKey(value);
  } else {
    return `s${String(value)}`;
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

  const compositeKey = keys.join("\u2063");
  if (knownRefkeys.has(compositeKey)) {
    return knownRefkeys.get(compositeKey)!;
  }

  const key = createSymbolRefkey(compositeKey);
  knownRefkeys.set(compositeKey, key);
  return key;
}

/**
 * Create a namekey with the given name. The namekey is a unique refkey that
 * represents a single symbol with the given name and the provided
 * naming-related options.
 *
 * @example
 * ```tsx
 * const myClass = namekey("MyClass");
 *
 * return <>
 *   <ClassDeclaration name={myClass} />
 *   {myClass}
 * </>
 * ```
 *
 * Renders a class and a reference to that class.
 */
export function namekey(name: string, options: NamekeyOptions = {}): Namekey {
  return {
    key: getObjectKey({}),
    name,
    options,
    [RefkeySym]: true,
  };
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
 * class `rk2`, the refkey for the instantiated static member is
 * `refkey(rk1, rk2)`. This function will return the same refkey given those
 * same parameters.
 *
 * When a static member symbol `rk3` is owned by another static or instance
 * member symbol (i.e. the outer symbol is itself a member container), the
 * refkey of the instaniated static member is still just the composite of the
 * instantiated variable refkey and the refkey of the inner member
 * `refkey(rk1, rk3)`.
 */
export function memberRefkey(
  base: Refkey,
  ...members: [Refkey, ...Refkey[]]
): MemberRefkey {
  if (members.length < 1) {
    throw new Error("memberRefkey needs at least one member");
  }

  if (members.length === 1) {
    return {
      base,
      member: members[0],
      [RefkeySym]: true,
    };
  }

  return {
    base: memberRefkey(
      base,
      ...(members.slice(0, -1) as [Refkey, ...Refkey[]]),
    ),
    member: members.at(-1)!,
    [RefkeySym]: true,
  };
}
