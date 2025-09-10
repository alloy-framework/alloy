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

export const REFKEYABLE: unique symbol = Symbol("Alloy.REFKEYABLE");

export type RefkeyableObject = {
  [REFKEYABLE](): Refkey;
};

export function toRefkey(refkey: Refkeyable) {
  return refkey[REFKEYABLE]();
}

export type Refkeyable = RefkeyableObject | Refkey;
export type Refkey = SymbolRefkey | MemberRefkey | Namekey;

export interface SymbolRefkey extends RefkeyableObject {
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

export interface MemberRefkey extends RefkeyableObject {
  base: Refkey;
  member: Refkey | string;
}

function createSymbolRefkey(key: string): SymbolRefkey {
  const refkey: SymbolRefkey = {
    key,
    [REFKEYABLE]() {
      return this;
    },
  };

  markRaw(refkey);

  return refkey;
}

export function isRefkeyable(value: unknown): value is RefkeyableObject {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.hasOwn(value, REFKEYABLE)
  );
}
export function isRefkey(value: unknown): value is Refkey {
  return (
    isRefkeyable(value) && (value as RefkeyableObject)[REFKEYABLE]() === value
  );
}

export function isSymbolRefkey(value: unknown): value is SymbolRefkey {
  return isRefkey(value) && Object.hasOwn(value, "key");
}

export function isMemberRefkey(value: unknown): value is MemberRefkey {
  return isRefkey(value) && Object.hasOwn(value, "base");
}

export function isNamekey(value: unknown): value is Namekey {
  return isRefkey(value) && Object.hasOwn(value, "name");
}

/**
 * This gets the key for a symbol refkey based on the value provided. Refkey values
 * return the key of that refkey, objects get a unique key for that specific object,
 * and otherwise the key is based on the value.
 */
function getKey(value: unknown): string {
  if (isRefkeyable(value)) {
    const refkey = toRefkey(value);
    if (isSymbolRefkey(refkey)) {
      return refkey.key;
    } else {
      return getObjectKey(value);
    }
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
    [REFKEYABLE]() {
      return this;
    },
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
  base: Refkeyable,
  ...members: [Refkeyable | string, ...(Refkeyable | string)[]]
): MemberRefkey {
  if (members.length < 1) {
    throw new Error("memberRefkey needs at least one member");
  }

  if (members.length === 1) {
    return {
      base: toRefkey(base),
      member:
        typeof members[0] === "string" ? members[0] : toRefkey(members[0]),
      [REFKEYABLE]() {
        return this;
      },
    };
  }

  const lastMember = members.at(-1)!;

  return {
    base: memberRefkey(
      base,
      ...(members.slice(0, -1) as [Refkeyable, ...Refkeyable[]]),
    ),
    member: typeof lastMember === "string" ? lastMember : toRefkey(lastMember),
    [REFKEYABLE]() {
      return this;
    },
  };
}

export function inspectRefkey(refkey: Refkey): string {
  const unwrapped = refkey[REFKEYABLE]();

  const text =
    isMemberRefkey(unwrapped) ?
      `memberRefkey[${inspectRefkey(unwrapped.base)} -> ${
        typeof unwrapped.member === "string" ?
          unwrapped.member
        : inspectRefkey(unwrapped.member)
      }]`
    : `refkey[${unwrapped.key}]`;

  return text;
}

export function unresolvedRefkey(refkey: Refkey): string {
  return `<Unresolved Symbol: ${inspectRefkey(refkey)}>`;
}
