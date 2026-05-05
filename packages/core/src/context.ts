import { shallowRef } from "@vue/reactivity";
import { effect, getContext } from "./reactivity.js";
import type { Children, ComponentDefinition } from "./runtime/component.js";
import type { StcSignature } from "./stc.js";

export interface ComponentContext<T> {
  id: symbol;
  default: T | undefined;
  Provider: ComponentDefinition<ContextProviderProps<T>>;
  ProviderStc: StcSignature<ContextProviderProps<T>>;
  name?: string;
}

let _stcImpl:
  | (<T extends {}>(Component: ComponentDefinition<T>) => StcSignature<T>)
  | null = null;

/**
 * Registers the {@link stc} factory used to lazily build `ProviderStc`.
 * Called once by `stc.ts` at module initialization to break the
 * `context.ts ↔ stc.ts` import cycle.
 *
 * @internal
 */
export function _registerStcImpl(
  impl: <T extends {}>(Component: ComponentDefinition<T>) => StcSignature<T>,
): void {
  _stcImpl = impl;
}

export interface ContextProviderProps<T = unknown> {
  value?: T;
  children?: Children;
}

export function useContext<T>(context: ComponentContext<T>): T | undefined {
  // context must come from a parent
  let current = getContext();
  while (current) {
    if (current.context && Object.hasOwn(current.context, context.id)) {
      return current.context[context.id] as T | undefined;
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
    const contextName = name ?? "anonymous";

    const rendered = shallowRef();
    effect(
      () => {
        (context!.context ??= {})[id] = props.value;
        rendered.value = () => props.children;
      },
      undefined,
      {
        debug: {
          name: `context:provider:${contextName}`,
          type: "context",
        },
      },
    );

    return rendered.value;
  }
  const ctx: ComponentContext<T> = {
    id,
    default: defaultValue,
    name,
    Provider,
  } as ComponentContext<T>;
  Object.defineProperty(ctx, "ProviderStc", {
    configurable: true,
    enumerable: true,
    get() {
      if (_stcImpl === null) {
        throw new Error("ProviderStc accessed before stc module initialized.");
      }
      const value = _stcImpl(Provider);
      Object.defineProperty(this, "ProviderStc", {
        value,
        enumerable: true,
        writable: true,
        configurable: true,
      });
      return value;
    },
  });
  (Provider as any).contextName = name;
  contextsByKey.set(id, ctx);
  return ctx;
}

export function createNamedContext<T>(name: string, defaultValue?: T) {
  return createContext<T>(defaultValue, name);
}
