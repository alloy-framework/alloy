// the possible C# access modifiers
// https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers

/** Access modifiers. Can only be one */
export interface AccessModifiers {
  readonly public?: boolean;
  readonly protected?: boolean;
  readonly private?: boolean;
  readonly internal?: boolean;
  readonly file?: boolean;
}
export type AccessModifier = keyof AccessModifiers;

export function getAccessModifier(
  data: AccessModifiers,
): AccessModifier | undefined {
  return (
    data.public ? "public"
    : data.protected ? "protected"
    : data.private ? "private"
    : data.internal ? "internal"
    : data.file ? "file"
    : undefined
  );
}

/** Method modifiers. Can only be one. */
export interface MethodModifiers {
  readonly abstract?: boolean;
  readonly sealed?: boolean;
  readonly static?: boolean;
  readonly virtual?: boolean;
}
export type MethodModifier = keyof MethodModifiers;

export function getMethodModifier(
  data: MethodModifiers,
): MethodModifier | undefined {
  return (
    data.abstract ? "abstract"
    : data.sealed ? "sealed"
    : data.static ? "static"
    : data.virtual ? "virtual"
    : undefined
  );
}

export function getAsyncModifier(async?: boolean): string {
  return async ? "async" : "";
}

/** Resolve the modifier prefix */
export function computeModifiersPrefix(
  modifiers: Array<string | undefined>,
): string {
  const resolved = modifiers.filter((x) => x);
  return resolved.length > 0 ? resolved.join(" ") + " " : "";
}
