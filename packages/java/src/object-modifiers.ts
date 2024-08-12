export interface ObjectModifiers {
  default?: boolean;
  static?: boolean;
  final?: boolean;
  synchronized?: boolean;
  abstract?: boolean;
  native?: boolean;
  strictfp?: boolean;
  transient?: boolean;
  volatile?: boolean;
}

export type AccessModifier = "public" | "protected" | "private" | "package-private";
export const accessModifierLookup: Record<AccessModifier, string> = {
  public: "public ",
  protected: "protected ",
  private: "private ",
  "package-private": ""
}

export function collectAccessModifier(accessModifier?: AccessModifier) {
  return accessModifier ? accessModifierLookup[accessModifier] : "";
}

export function collectModifiers<T extends ObjectModifiers>(props: T) {
  const modifiers = [];
  if (props.abstract) modifiers.push("abstract");
  if (props.static) modifiers.push("static");
  if (props.synchronized) modifiers.push("synchronized");
  if (props.transient) modifiers.push("transient");
  if (props.volatile) modifiers.push("volatile");
  if (props.final) modifiers.push("final");
  if (props.default) modifiers.push("default");
  if (props.native) modifiers.push("native");
  if (props.strictfp) modifiers.push("strictfp");
  return modifiers.join(" ") + (modifiers.length > 0 ? " " : "");
}