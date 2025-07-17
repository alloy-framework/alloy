import {
  pauseTracking,
  ReactiveEffectRunner,
  resetTracking,
  ShallowReactive,
  shallowRef,
  stop,
  effect as vueEffect,
} from "@vue/reactivity";
import type { RenderedTextTree } from "./render.js";
import type { Children, ComponentCreator } from "./runtime/component.js";
import { scheduler } from "./scheduler.js";
import type { OutputSymbol } from "./symbols/output-symbol.js";
import { trace, TracePhase } from "./tracer.js";

// check for multiple versions of alloy here.
if ((globalThis as any).__ALLOY__) {
  throw new Error(
    "Multiple versions of Alloy are loaded for this project. This will likely cause undesirable behavior.",
  );
}
(globalThis as any).__ALLOY__ = true;

export function getElementCache() {
  return getContext()!.elementCache;
}

export type ElementCacheKey =
  | ComponentCreator
  | (() => unknown)
  | CustomContext;

export type ElementCache = Map<ElementCacheKey, RenderedTextTree>;

export interface Disposable {
  (): void;
}

export interface Context {
  disposables: Disposable[];
  owner: Context | null;

  // context providers
  context?: Record<symbol, unknown>;

  // store random info about the node
  meta?: Record<string, any>;

  /**
   * A cache of RenderTextTree nodes created within this context,
   * indexed by the component or function which created them.
   */
  elementCache: ElementCache;
  /**
   * When this context was created by a component, this will
   * be the component that created it.
   */
  componentOwner?: ComponentCreator<unknown>;

  /**
   * Whether this context will take an emitted symbol.
   */
  takesSymbols: boolean;

  /**
   * The symbol that this component has taken.
   */
  takenSymbols?: ShallowReactive<Set<OutputSymbol>>;
}

let globalContext: Context | null = null;
export function getContext() {
  return globalContext;
}

export interface RootOptions {
  componentOwner?: ComponentCreator<any>;
}

export function root<T>(fn: (d: Disposable) => T, options?: RootOptions): T {
  const context: Context = {
    componentOwner: options?.componentOwner,
    disposables: [],
    owner: globalContext,
    context: {},
    elementCache: new Map(),
    takesSymbols: false,
    takenSymbols: undefined,
  };

  globalContext = context;
  let ret;
  try {
    ret = untrack(() =>
      fn(() => {
        for (const d of context!.disposables) {
          d();
        }
      }),
    );
  } finally {
    globalContext = globalContext!.owner;
  }

  return ret;
}

export function untrack<T>(fn: () => T): T {
  pauseTracking();
  const v = fn();
  resetTracking();
  return v;
}

export function memo<T>(fn: () => T, equal?: boolean): () => T {
  const o = shallowRef();
  effect((prev) => {
    const res = fn();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (!equal || prev !== res) && (o.value = res);
    return res;
  }, undefined as T);
  return () => o.value;
}

export function effect<T>(fn: (prev?: T) => T, current?: T) {
  const context: Context = {
    context: {},
    disposables: [] as (() => void)[],
    owner: globalContext,
    elementCache: new Map(),
    takesSymbols: false,
    takenSymbols: undefined,
  };

  const cleanupFn = (final: boolean) => {
    const d = context.disposables;
    context.disposables = [];
    for (let k = 0, len = d.length; k < len; k++) d[k]();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    final && stop(runner);
  };

  onCleanup(() => cleanupFn(true));
  const runner: ReactiveEffectRunner<void> = vueEffect(
    () => {
      cleanupFn(false);

      const oldContext = globalContext;
      globalContext = context;
      try {
        current = fn(current);
      } finally {
        globalContext = oldContext;
      }
    },
    {
      scheduler: scheduler(() => runner),
      onTrack(event) {
        trace(TracePhase.effect.track, () => {
          return `tracking ${event.target}, ${String(event.key)}`;
        });
      },
      onTrigger(event) {
        trace(TracePhase.effect.trigger, () => {
          return `triggering ${event.target}, ${String(event.key)}`;
        });
      },
    },
  );

  // allow recursive effects (recursive option does nothing, possible bug)
  (runner as any).effect.flags |= 1 << 5;
}

/**
 * Register a cleanup function which is called when the current reactive scope
 * is recalculated or disposed. This is useful to clean up any side effects
 * created in the reactive scope.
 *
 * @remarks
 *
 * When onCleanup is called inside a component definition, the provided function
 * is called when the component is removed from the tree. This can be useful to
 * clean up any side effects created as a result of rendering the component. For
 * example, if rendering a component creates a symbol, `onCleanup` can be used
 * to remove the symbol when the component is removed from the tree.
 *
 * When onCleanup is called inside a memo or effect, the function is called when
 * the effect is refreshed (e.g. when a memo or computed recalculates) or
 * disposed (e.g. it is no longer needed because it is attached to a component
 * which was removed).
 */
export function onCleanup(fn: Disposable) {
  if (globalContext != null) {
    globalContext.disposables.push(fn);
  }
}

/**
 * Create a custom reactive context for the children returned by
 * the provided context.
 */
export interface CustomContext {
  [CUSTOM_CONTEXT_SYM]: true;
  useCustomContext: (useCb: CustomContextChildrenCallback) => void;
}

export type CustomContextChildrenCallback = (child: Children) => void;
const CUSTOM_CONTEXT_SYM = Symbol();

export function createCustomContext(
  useCallback: (useChildren: CustomContextChildrenCallback) => void,
): CustomContext {
  return {
    [CUSTOM_CONTEXT_SYM]: true,
    useCustomContext(useCb: (children: Children) => void): void {
      useCallback(useCb);
    },
  };
}

export function isCustomContext(child: Children): child is CustomContext {
  return (
    typeof child === "object" &&
    child !== null &&
    Object.hasOwn(child, CUSTOM_CONTEXT_SYM)
  );
}
