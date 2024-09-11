/**
 * Objects extend this interface to allow to take modifiers as boolean props.
 * Then can declare components like so
 *
 * `<Class public final abstract />`
 *
 * Error will be thrown if try to specify multiple access modifiers
 */
export interface ObjectModifiers {
  public?: boolean;
  protected?: boolean;
  private?: boolean;

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

  // If more than one access modifier is specified, throw an error
  if (
    [props.public, props.protected, props.private].filter(Boolean).length > 1
  ) {
    throw new Error("Cannot specify multiple access modifiers");
  }

  if (props.public) modifiers.push("public");
  if (props.protected) modifiers.push("protected");
  if (props.private) modifiers.push("private");
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
