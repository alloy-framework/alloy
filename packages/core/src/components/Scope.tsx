import { Children } from "@alloy-js/core/jsx-runtime";
import { OutputScope } from "../binder.js";
import { useContext } from "../context.js";
import { BinderContext } from "../context/binder.js";
import { ScopeContext } from "../context/scope.js";

export interface ScopeProps {
  kind?: string;
  name?: string;
  value?: OutputScope;
  children?: Children;
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
