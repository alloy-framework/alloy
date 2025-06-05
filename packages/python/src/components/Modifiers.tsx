import { For } from "@alloy-js/core";

/**
 * Objects extend this interface to allow to take modifiers as boolean props.
 *
 * Error will be thrown if try to specify multiple access modifiers
 */
export interface ModifierProps {
  async?: boolean;
}

const modifiers = [
  "async",
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
