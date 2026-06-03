import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { createUnionVariantSymbol } from "../../symbols/factories.js";
import { DocWhen } from "../doc/doc-comment.jsx";

export interface UnionVariantProps {
  /** The variant type. */
  type: Children;
  /** Optional variant name. When omitted, renders just the type. */
  name?: string | Namekey;
  /** Refkey for referencing this variant from other declarations. */
  refkey?: Refkey;
  /** Doc comment rendered as `/** ... *\/` above the variant. */
  doc?: Children;
  /** Decorators to apply to the variant. */
  decorators?: Children;
}

/**
 * A TypeSpec union variant.
 *
 * @example
 * ```tsx
 * <UnionVariant name="cat" type="Cat" doc="A cat variant" />
 * ```
 * This will produce:
 * ```typespec
 * /** A cat variant *\/
 * cat: Cat
 * ```
 */
export function UnionVariant(props: UnionVariantProps) {
  if (props.name === undefined) {
    return <>{props.type}</>;
  }

  const sym = createUnionVariantSymbol(props.name, {
    refkeys: props.refkey,
  });

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      {props.decorators}
      <Name />: {props.type}
    </Declaration>
  );
}
