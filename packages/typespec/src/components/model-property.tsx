import { Children, Declaration, Name } from "@alloy-js/core";
import { createFieldSymbol } from "../symbols/factories.js";

export interface ModelPropertyProps {
    name: string;
    doc?: Children;
};

export function ModelProperty(props: ModelPropertyProps) {
    const symbol = createFieldSymbol(props.name);
  return (
    <Declaration symbol={symbol}>
      <Name>{props.name}</Name>
    </Declaration>
  );
}