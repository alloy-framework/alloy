import { refkey, Refkey, useBinder, useScope, Declaration as CoreDeclaration, Children } from "@alloy-js/core";
import { createTsSymbol, TSOutputScope, TSOutputSymbol } from "../symbols.js";
import { TypeScriptElements, useTSNamePolicy } from "../name-policy.js";

export interface DeclarationProps {
  name: string;
  refkey?: Refkey;
  export?: boolean;
  default?: boolean;
  children?: Children;
  kind: TypeScriptElements;
}

export function Declaration(props: DeclarationProps) {
  const namePolicy = useTSNamePolicy();
  const sym = createTsSymbol({
    name: namePolicy.getName(props.name, props.kind),
    refkey: props.refkey ?? refkey(props.name),
    export: props.export,
    default: props.default,
  });
  return <CoreDeclaration symbol={sym}>
    {props.export ? "export " : ""}{props.default ? "default " : ""}{props.children}
  </CoreDeclaration>
}


