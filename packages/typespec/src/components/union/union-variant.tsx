import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { createUnionVariantSymbol } from "../../symbols/factories.js";

export interface UnionVariantProps {
  type: Children;
  name?: string | Namekey;
  refkey?: Refkey;
}

export function UnionVariant(props: UnionVariantProps) {
  if (props.name === undefined) {
    return <>{props.type}</>;
  }

  const sym = createUnionVariantSymbol(props.name, {
    refkeys: props.refkey,
  });

  return (
    <Declaration symbol={sym}>
      <Name />: {props.type}
    </Declaration>
  );
}
