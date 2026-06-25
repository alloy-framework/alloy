import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { createModelPropertySymbol } from "../../symbols/factories.js";
import { DocWhen } from "../doc/doc-comment.jsx";

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
  /** Doc comment rendered as `/** ... *\/` above the property. */
  doc?: Children;
  /** Directives (`#suppress`, `#deprecated`) to apply to the property. */
  directives?: Children;
  /** Decorators to apply to the property. */
  decorators?: Children;
}

/**
 * A TypeSpec model property.
 *
 * @example
 * ```tsx
 * <ModelDeclaration name="Dog">
 *   <StatementList>
 *     <ModelProperty name="name" type="string" doc="The dog's name" />
 *     <ModelProperty name="age" type="uint8" optional default="0" />
 *   </StatementList>
 * </ModelDeclaration>
 * ```
 * This will produce:
 * ```typespec
 * model Dog {
 *   /** The dog's name *\/
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
      <DocWhen doc={props.doc} />
      {props.directives}
      {props.decorators}
      <Name />
      {props.optional ? "?" : ""}: {props.type}
      {props.default && <> = {props.default}</>}
    </Declaration>
  );
}
