import { Children, Declaration, Name, Namekey, Refkey } from "@alloy-js/core";
import { createModelPropertySymbol } from "../../symbols/factories.js";

export interface ModelPropertyProps {
  name: string | Namekey;
  refkey?: Refkey;
  type: Children;
  optional?: boolean;
}

export function ModelProperty(props: ModelPropertyProps) {
  const sym = createModelPropertySymbol(props.name, {
    refkeys: props.refkey,
  });

  return (
    <Declaration symbol={sym}>
      <Name />
      {props.optional ? "?" : ""}: {props.type}
    </Declaration>
  );
}
