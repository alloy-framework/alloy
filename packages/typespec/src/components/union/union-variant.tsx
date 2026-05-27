import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { createUnionVariantSymbol } from "../../symbols/factories.js";

export interface UnionVariantProps {
  type: Children;
  name?: string | Namekey;
  refkey?: Refkey;
  decorators?: Children;
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
      {props.decorators}
      <Name />: {props.type}
    </Declaration>
  );
}
