import { Child, Children, code } from "@alloy-js/core";
import { passGenerics } from "../generics.js";

export interface GenericsProps {
  types?: (Child | Record<"?", Children>)[];
}

export function Generics(props: GenericsProps) {
  if (!props.types) return "<>";
  const generics = passGenerics(props.types);
  return code`<${generics}>`;
}
