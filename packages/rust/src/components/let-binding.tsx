import { Children } from "@alloy-js/core";

export interface LetBindingProps {
  name: string;
  mutable?: boolean;
  type?: Children;
  children?: Children;
}

export function LetBinding(props: LetBindingProps) {
  const hasType = typeof props.type !== "undefined";
  const hasInitializer = typeof props.children !== "undefined";

  return (
    <>
      {"let "}
      {props.mutable ? "mut " : ""}
      {props.name}
      {hasType ?
        <>
          {": "}
          {props.type}
        </>
      : null}
      {hasInitializer ?
        <>
          {" = "}
          {props.children}
        </>
      : null}
      {";"}
    </>
  );
}
