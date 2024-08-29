import {
  Children,
  ComponentDefinition,
  effect,
  getContext,
  untrack,
} from "@alloy-js/core/jsx-runtime";
import { shallowRef } from "@vue/reactivity";

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
  while (current) {
    if (Object.hasOwn(current.context!, context.id)) {
      return current.context![context.id] as T | undefined;
    }
    current = current.owner;
  }

  return context.default;
}

export function createContext<T = unknown>(
  defaultValue?: T,
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

      return rendered.value;
    },
  };
}
