import { toRef } from "@vue/reactivity";
import { ComponentContext, createNamedContext } from "../context.js";
import { ScopeContext, useScope } from "../context/scope.js";
import { Children } from "../jsx-runtime.js";
import { getContext } from "../reactivity.js";
import { OutputScope } from "./output-scope.js";
import { OutputSymbol } from "./output-symbol.js";

const knownLocals = new WeakMap<any, Map<string, OutputSymbol>>();

type LocalGroup = {};
export const LocalGroupContext: ComponentContext<LocalGroup> =
  createNamedContext("LocalGroup");

export function LocalGroup(props: { children?: Children }) {
  return (
    <LocalGroupContext.Provider value={{}}>
      {props.children}
    </LocalGroupContext.Provider>
  );
}

function useLocalBoundary(): OutputScope | LocalGroup | undefined {
  let current = getContext();
  while (current) {
    if (Object.hasOwn(current.context!, LocalGroupContext.id)) {
      return current.context![LocalGroupContext.id] as OutputScope;
    }
    if (Object.hasOwn(current.context!, ScopeContext.id)) {
      return current.context![ScopeContext.id] as LocalGroup;
    }
    current = current.owner;
  }
  return undefined;
}

/** Create a local variable */
export function local(name: string) {
  const boundary = useLocalBoundary();

  let scopeLocals = knownLocals.get(boundary);
  if (scopeLocals) {
    const local = scopeLocals.get(name);
    if (local) {
      return toRef(local, "name");
    }
  } else {
    scopeLocals = new Map<string, OutputSymbol>();
    knownLocals.set(boundary, scopeLocals);
  }

  const scope = useScope();

  const symbol = new OutputSymbol(name, { scope });
  scopeLocals.set(name, symbol);
  return toRef(symbol, "name");
}
