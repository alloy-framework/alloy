import {
  Children,
  Declaration as CoreDeclaration,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { createAssociatedTypeSymbol } from "../symbols/factories.js";

export interface AssociatedTypeProps {
  name: string | Namekey;
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
      {props.children ?
        <>
          {" = "}
          {props.children}
        </>
      : props.constraint ?
        <>
          {": "}
          {props.constraint}
        </>
      : null}
      {";"}
    </CoreDeclaration>
  );
}
