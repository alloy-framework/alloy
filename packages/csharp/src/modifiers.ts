// the possible C# access modifiers
// https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers

/** Access modifiers.  */
export interface AccessModifiers {
  readonly public?: boolean;
  readonly protected?: boolean;
  readonly private?: boolean;
  readonly internal?: boolean;
  readonly file?: boolean;
}

export const getAccessModifier = makeModifiers<AccessModifiers>([
  "public",
  "protected",
  "private",
  "internal",
  "file",
]);

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

export function makeModifiers<T>(obj: Array<keyof T>) {
  return (data: T) => {
    return obj
      .map((key) => (data[key] ? key : undefined))
      .filter((x) => x)
      .join(" ");
  };
}
