import { For } from "@alloy-js/core";

/**
 * Objects extend this interface to allow to take modifiers as boolean props.
 * Then can declare components like so
 *
 * `<Class public final abstract />`
 *
 * Error will be thrown if try to specify multiple access modifiers
 */
export interface ModifierProps {
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

const modifiers = [
  "public",
  "protected",
  "private",
  "abstract",
  "static",
  "synchronized",
  "transient",
  "volatile",
  "final",
  "default",
  "native",
  "strictfp",
];

/**
 * Renders the modifiers based on the provided props.
 **/
export function Modifiers(props: ModifierProps) {
  const modifierList = modifiers.filter(
    (modifier) => props[modifier as keyof ModifierProps],
  );

  return (
    <For each={modifierList} joiner=" " ender=" ">
      {(modifier) => modifier}
    </For>
  );
}
