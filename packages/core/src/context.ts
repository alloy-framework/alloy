import { shallowRef } from "@vue/reactivity";
import { effect, getContext } from "./reactivity.js";
import type { Children, ComponentDefinition } from "./runtime/component.js";
import { stc, type StcSignature } from "./stc.js";

export interface ComponentContext<T> {
  id: symbol;
  default: T | undefined;
  Provider: ComponentDefinition<ContextProviderProps<T>>;
  ProviderStc: StcSignature<ContextProviderProps<T>>;
  name?: string;
}

export interface ContextProviderProps<T = unknown> {
  value?: T;
  children?: Children;
}

export function useContext<T>(context: ComponentContext<T>): T | undefined {
  // context must come from a parent
  let current = getContext();
  while (current) {
    if (Object.hasOwn(current.context!, context.id)) {
      return current.context![context.id] as T | undefined;
    }
    current = current.owner;
  }

  return context.default;
}

export const contextsByKey = new Map<symbol, ComponentContext<any>>();

export function createContext<T = unknown>(
  defaultValue?: T,
  name?: string,
): ComponentContext<T> {
  const id = Symbol(name ?? "context");
  function Provider(props: ContextProviderProps<T>) {
    const context = getContext();

    const rendered = shallowRef();
    effect(() => {
      context!.context![id] = props.value;
      rendered.value = () => props.children;
    }, undefined);

    return rendered.value;
  }
  const ctx = {
    id,
    default: defaultValue,
    name,
    Provider,
    ProviderStc: stc(Provider),
  };
  contextsByKey.set(id, ctx);
  return ctx;
}

export function createNamedContext<T>(name: string, defaultValue?: T) {
  return createContext<T>(defaultValue, name);
}
