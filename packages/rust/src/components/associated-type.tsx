import { Children, Declaration as CoreDeclaration, Refkey } from "@alloy-js/core";
import { createAssociatedTypeSymbol } from "../symbols/factories.js";

export interface AssociatedTypeProps {
  name: string;
  refkey?: Refkey;
  constraint?: Children;
  children?: Children;
}

export function AssociatedType(props: AssociatedTypeProps) {
  const associatedTypeSymbol = createAssociatedTypeSymbol(props.name, {
    refkeys: props.refkey ? [props.refkey] : [],
  });

  return (
    <CoreDeclaration symbol={associatedTypeSymbol}>
      {"type "}
      {associatedTypeSymbol.name}
      {props.children ? (
        <>
          {" = "}
          {props.children}
        </>
      ) : props.constraint ? (
        <>
          {": "}
          {props.constraint}
        </>
      ) : null}
      {";"}
    </CoreDeclaration>
  );
}
