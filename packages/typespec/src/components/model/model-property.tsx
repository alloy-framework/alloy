import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { createModelPropertySymbol } from "../../symbols/factories.js";
import { DocWhen } from "../doc/doc-comment.jsx";

export interface ModelPropertyProps {
  name: string | Namekey;
  refkey?: Refkey;
  type: Children;
  optional?: boolean;
  /** Doc comment rendered as `/** ... *\/` above the property. */
  doc?: Children;
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
      {props.decorators}
      <Name />
      {props.optional ? "?" : ""}: {props.type}
    </Declaration>
  );
}
