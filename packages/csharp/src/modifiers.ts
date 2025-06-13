// the possible C# access modifiers
// https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers
export type AccessModifier =
  | "public"
  | "protected"
  | "private"
  | "internal"
  | "protected-internal"
  | "private-protected"
  | "file";

// maps the above access modifier value to its C# syntax.
// note that the C# keyword includes a trailing space
const accessModifierLookup: Record<AccessModifier, string> = {
  public: "public ",
  protected: "protected ",
  private: "private ",
  internal: "internal ",
  "protected-internal": "protected internal ",
  "private-protected": "private protected ",
  file: "file ",
};

// returns the C# syntax for the specified access modifier.
// if no access modifier is specified, the empty string is returned.
export function getAccessModifier(accessModifier?: AccessModifier): string {
  return accessModifier ? accessModifierLookup[accessModifier] : "";
}

export type MethodModifier = "abstract" | "sealed" | "static" | "virtual";

// maps the above method modifier value to its C# syntax.
// note that the C# keyword includes a trailing space
const methodModifierLookup: Record<MethodModifier, string> = {
  abstract: "abstract ",
  sealed: "sealed ",
  static: "static ",
  virtual: "virtual ",
};

// returns the C# syntax for the specified method modifier.
// if no method modifier is specified, the empty string is returned.
export function getMethodModifier(methodModifier?: MethodModifier): string {
  return methodModifier ? methodModifierLookup[methodModifier] : "";
}

export function getAsyncModifier(async?: boolean): string {
  return async ? "async " : "";
}

/** Resolve the modifier prefix */
export function computeModifiersPrefix(
  modifiers: Array<string | undefined>,
): string {
  const resolved = modifiers.filter((x) => x);
  return resolved.length > 0 ? resolved.join("") : "";
}
