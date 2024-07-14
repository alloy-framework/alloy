import { OutputSymbol, BinderContext } from "../binder.js";
import { createContext, useContext } from "../context.js";
import { Children } from "../jsx-runtime.js";
import { ScopeContext } from "./Scope.js";

const DeclarationContext = createContext<OutputSymbol>();

export interface DeclarationProps {
  name?: string;
  refkey?: unknown;
  symbol?: OutputSymbol;
  children?: Children;
}
export function Declaration(props: DeclarationProps) {
  const currentDeclaration = useContext(DeclarationContext);
  if (currentDeclaration) {
    throw new Error("Cannot nest declarations");
  }

  const binder = useContext(BinderContext)
  if (!binder) {
    throw new Error("Need binder context to create declarations");
  }
  const scope = useContext(ScopeContext);
  if (!scope) {
    throw new Error("Need scope to create declaration");
  }
  
  let declaration;
  if (props.symbol) {
    declaration = props.symbol
  } else {
    const refkey = props.refkey ? props.refkey : props.name;
    declaration = binder.createSymbol(props.name!, scope, refkey);
  }
  
  return <DeclarationContext.Provider value={declaration}>
    {props.children}
  </DeclarationContext.Provider>
}