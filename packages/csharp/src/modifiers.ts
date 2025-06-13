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

export function getAccessModifier(data: AccessModifiers): string {
  return [
    data.public && "public",
    data.protected && "protected",
    data.private && "private",
    data.internal && "internal",
    data.file && "file",
  ]
    .filter((x) => x)
    .join(" ");
}

/** Method modifiers. Can only be one. */
export interface MethodModifiers {
  readonly abstract?: boolean;
  readonly sealed?: boolean;
  readonly static?: boolean;
  readonly virtual?: boolean;
}

export function getMethodModifier(data: MethodModifiers): string {
  return [
    data.abstract && "abstract",
    data.sealed && "sealed",
    data.static && "static",
    data.virtual && "virtual",
  ]
    .filter((x) => x)
    .join(" ");
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
