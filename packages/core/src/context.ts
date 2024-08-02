import { shallowRef } from "@vue/reactivity";
import {
  Children,
  ComponentDefinition,
  getContext,
  effect,
  untrack,
} from "./jsx-runtime.js";

export interface ComponentContext<T> {
  id: symbol;
  default: T | undefined;
  Provider: ComponentDefinition<ContextProviderProps<T>>;
}

export interface ContextProviderProps<T = unknown> {
  value?: T;
  children?: Children;
}

export function useContext<T>(context: ComponentContext<T>): T | undefined {
  // context must come from a parent
  let current = getContext();
  while (current !== null) {
    const currentContextValue = current?.context?.[context.id];
    if (currentContextValue) {
      return currentContextValue as T;
    }
    current = current?.owner;
  }

  return context.default;
}

export function createContext<T = unknown>(
  defaultValue?: T
): ComponentContext<T> {
  const id = Symbol("context");
  return {
    id,
    default: defaultValue,
    Provider(props: ContextProviderProps<T>) {
      const context = getContext();

      let rendered = shallowRef();
      effect(() => {
        context!.context![id] = props.value;
        rendered.value = untrack(() => props.children);
      });

      return () => props.children;
    },
  };
}
