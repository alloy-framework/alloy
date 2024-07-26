import { refkey, Refkey, useBinder, useScope, Declaration as CoreDeclaration, Children } from "@alloy-js/core";
import { TSOutputScope, TSOutputSymbol } from "../symbols.js";

export interface DeclarationProps {
  name: string;
  refkey?: Refkey;
  export?: boolean;
  default?: boolean;
  children?: Children;
}

export function Declaration(props: DeclarationProps) {
  const sym = createTsSymbol(props);
  return <CoreDeclaration symbol={sym}>
    {props.export ? "export " : ""}{props.default ? "default " : ""}{props.children}
  </CoreDeclaration>
}

export function createTsSymbol(props: DeclarationProps) {
  const binder = useBinder();
  const scope = useScope() as TSOutputScope;

  const sym = binder.createSymbol<TSOutputSymbol>(
    props.name,
    scope,
    props.refkey ?? refkey(props.name),
    {
      export: !!props.export,
      default: !!props.default,
    }
  );

  if (props.export && scope.kind === "module") {
    scope.exportedSymbols.set(sym.refkey, sym);
  }

  return sym;
}
