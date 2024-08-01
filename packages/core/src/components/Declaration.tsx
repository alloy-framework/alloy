import { OutputSymbol, BinderContext } from "../binder.js";
import { createContext, useContext } from "../context.js";
import { Children } from "../jsx-runtime.js";
import { Refkey, refkey } from "../refkey.js";
import { ScopeContext } from "./Scope.js";

export const DeclarationContext = createContext<OutputSymbol>();

export interface DeclarationProps {
  name?: string;
  refkey?: Refkey;
  symbol?: OutputSymbol;
  children?: Children;
}
export function Declaration(props: DeclarationProps) {
  const binder = useContext(BinderContext)
  if (!binder) {
    throw new Error("Need binder context to create declarations");
  }
  
  let declaration;
  if (props.symbol) {
    declaration = props.symbol
  } else {
    const rk = props.refkey ? props.refkey : refkey(props.name);
    declaration = binder.createSymbol({
      name: props.name!,
      refkey: rk
    });
  }
  
  return <DeclarationContext.Provider value={declaration}>
    {props.children}
  </DeclarationContext.Provider>
}