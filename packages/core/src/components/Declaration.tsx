import { OutputDeclaration, BinderContext } from "../binder.js";
import { createContext, useContext } from "../context.js";
import { Children } from "../jsx-runtime.js";
import { ScopeContext } from "./Scope.js";

const DeclarationContext = createContext<OutputDeclaration>();

export interface DeclarationProps {
  name: string;
  refkey?: unknown;
  children?: Children;
}
export function Declaration(props: DeclarationProps) {
  const refkey = props.refkey ? props.refkey : props.name;

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
  const declaration = binder.createDeclaration(props.name, scope, refkey);
  return <DeclarationContext.Provider value={declaration}>
    {props.children}
  </DeclarationContext.Provider>
}