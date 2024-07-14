import { BinderContext, OutputScope } from "../binder.js";
import { createContext, useContext } from "../context.js";
import { Children } from "../jsx-runtime.js";

export interface ScopeProps {
  kind?: string;
  name: string;
  children?: Children;
}


export const ScopeContext = createContext<OutputScope>();

export function useScope() {
  return useContext(ScopeContext)!;
}

export function Scope(props: ScopeProps) {
  const kind = props.kind ?? "file";
  const parentScope = useScope();
  const binder = useContext(BinderContext)!;
  const newScope = binder.createScope(kind, props.name, parentScope);
  return <ScopeContext.Provider value={newScope as any}>
    {props.children}
  </ScopeContext.Provider>
}