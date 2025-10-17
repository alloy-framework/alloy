import { Children, createNamedContext, Declaration, Name } from "@alloy-js/core";
import { createPropertySymbol } from "../symbols/factories.js";

export interface ModelPropertyProps {
    name: string;
    doc?: Children;
};

export function ModelProperty(props: ModelPropertyProps) {
  //   const symbol = createPropertySymbol(props.name);

  // return (
  //   <Declaration symbol={symbol}>
  //     <Name />
  //   </Declaration>
  // );
  return <></>;
}