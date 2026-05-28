import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { createModelPropertySymbol } from "../../symbols/factories.js";

export interface ModelPropertyProps {
  /** The property name. */
  name: string | Namekey;
  /** Refkey for referencing this property from other declarations. */
  refkey?: Refkey;
  /** The type of the property. */
  type: Children;
  /** Whether the property is optional (`?`). */
  optional?: boolean;
  /** Default value for the property. */
  default?: Children;
  /** Decorators to apply to the property. */
  decorators?: Children;
}

/**
 * A TypeSpec model property.
 *
 * @example
 * ```tsx
 * <ModelDeclaration name="Dog">
 *   <ModelProperty name="name" type="string" />
 *   <ModelProperty name="age" type="uint8" optional default="0" />
 * </ModelDeclaration>
 * ```
 * This will produce:
 * ```typespec
 * model Dog {
 *   name: string;
 *   age?: uint8 = 0;
 * }
 * ```
 */
export function ModelProperty(props: ModelPropertyProps) {
  const sym = createModelPropertySymbol(props.name, {
    refkeys: props.refkey,
  });

  return (
    <Declaration symbol={sym}>
      {props.decorators}
      <Name />
      {props.optional ? "?" : ""}: {props.type}
      {props.default && <> = {props.default}</>}
    </Declaration>
  );
}
