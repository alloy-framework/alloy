import { BinderContext, OutputScope } from "../binder.js";
import { createContext, useContext } from "../context.js";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface ScopeProps {
  kind?: string;
  name?: string;
  value?: OutputScope;
  children?: Children;
}

export const ScopeContext = createContext<OutputScope>();

export function useScope() {
  return useContext(ScopeContext)!;
}

export function Scope(props: ScopeProps) {
  let scope: OutputScope;
  if (props.value) {
    scope = props.value;
  } else {
    const kind = props.kind ?? "file";
    const binder = useContext(BinderContext)!;
    scope = binder.createScope({ kind, name: props.name! });
  }

  return <ScopeContext.Provider value={scope}>
      {props.children}
    </ScopeContext.Provider>;
}
