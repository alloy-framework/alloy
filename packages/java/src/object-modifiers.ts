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

export function collectModifiers<T extends ObjectModifiers>(props: T) {
  const modifiers = [];
  if (props.default) modifiers.push("default");
  if (props.static) modifiers.push("static");
  if (props.final) modifiers.push("final");
  if (props.synchronized) modifiers.push("synchronized");
  if (props.abstract) modifiers.push("abstract");
  if (props.native) modifiers.push("native");
  if (props.strictfp) modifiers.push("strictfp");
  if (props.transient) modifiers.push("transient");
  if (props.volatile) modifiers.push("volatile");
  return modifiers.join(" ") + (modifiers.length > 0 ? " " : "");
}