import {
  isRef,
  pauseTracking,
  ReactiveEffectRunner,
  Ref,
  resetTracking,
  ShallowReactive,
  stop,
  computed as vueComputed,
  effect as vueEffect,
  ref as vueRef,
  shallowRef as vueShallowRef,
  toRef as vueToRef,
  toRefs as vueToRefs,
} from "@vue/reactivity";
import { captureSourceLocation, debug, isDevtoolsEnabled } from "./debug/index.js";
import { RenderedTextTree } from "./render.js";
import { Children, ComponentCreator } from "./runtime/component.js";
import { scheduler } from "./scheduler.js";
import type { OutputSymbol } from "./symbols/output-symbol.js";

function attachEffectWriteDebug(refValue: Ref<unknown>, kind: string) {
  if (!isDevtoolsEnabled()) return;
  const descriptor =
    Object.getOwnPropertyDescriptor(refValue, "value") ??
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(refValue), "value");
  if (!descriptor?.get || !descriptor?.set) return;
  if ((refValue as any).__alloyDebugWrapped) return;
  Object.defineProperty(refValue, "value", {
    get: descriptor.get,
    set(value: unknown) {
      descriptor.set!.call(this, value);
      const effectId = globalContext?.meta?.effectId;
      if (effectId !== undefined && effectId !== -1) {
        const id = refId(refValue);
        debug.effect.ensureRef({ id, kind });
        debug.effect.trigger({
          effectId,
          target: refValue,
          refId: id,
          location: captureSourceLocation(),
          kind: "trigger",
        });
      }
    },
    enumerable: descriptor.enumerable ?? true,
    configurable: true,
  });
  Object.defineProperty(refValue, "__alloyDebugWrapped", {
    value: true,
    enumerable: false,
    configurable: false,
  });
}

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

  /**
   * The number of child nodes that have content. When zero, this component is
   * semantically empty.
   */
  childrenWithContent: number;

  /**
   * A ref that indicates whether the component is empty.
   */
  isEmpty?: Ref<boolean>;

  /**
   * Whether this context is a root context
   */
  isRoot: boolean;
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
    childrenWithContent: 0,
    isEmpty: ref(true),
    isRoot: true,
  };

  globalContext = context;
  let ret;
  try {
    ret = untrack(() =>
      fn(() => {
        for (const d of context!.disposables) {
          untrack(d);
        }
      }),
    );
  } finally {
    globalContext = globalContext!.owner;
  }

  return ret;
}

export interface EffectDebugOptions {
  name?: string;
  type?: string;
}

export interface EffectOptions {
  debug?: EffectDebugOptions;
}

export function untrack<T>(fn: () => T): T {
  pauseTracking();
  const v = fn();
  resetTracking();
  return v;
}

export function memo<T>(fn: () => T, equal?: boolean): () => T {
  const o = shallowRef<T>();
  effect(
    (prev) => {
      const res = fn();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (!equal || prev !== res) && (o.value = res);
      return res;
    },
    undefined as T,
    {
      debug: { name: "memo" },
    },
  );
  return () => o.value as T;
}

export function effect<T>(
  fn: (prev?: T) => T,
  current?: T,
  options?: EffectOptions,
) {
  const context: Context = {
    context: {},
    disposables: [] as (() => void)[],
    owner: globalContext,
    elementCache: new Map(),
    takesSymbols: false,
    takenSymbols: undefined,
    childrenWithContent: 0,
    isRoot: false,
  };

  const debugInfo = options?.debug;
  const effectId = debug.effect.register({
    name: debugInfo?.name ?? fn.name,
    type: debugInfo?.type,
    createdAt: captureSourceLocation(),
  });

  context.meta ??= {};
  if (effectId !== -1) {
    context.meta.effectId = effectId;
  }

  const cleanupFn = (final: boolean) => {
    const d = context.disposables;
    context.disposables = [];
    for (let k = 0, len = d.length; k < len; k++) untrack(d[k]);

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
      // allow recursive effects with 32, 1 and 4 are default flags
      // @ts-expect-error flags is a vue internal thing
      flags: 1 | 4 | 32,
      scheduler: scheduler(),
      onTrack(event) {
        if (effectId !== -1) {
          const targetKey =
            typeof event.key === "symbol" ? event.key.toString() : event.key;
          if (isRef(event.target)) {
            const id = refId(event.target);
            debug.effect.ensureRef({ id, kind: "ref" });
            debug.effect.track({
              effectId,
              target: event.target,
              refId: id,
              targetKey,
              location: captureSourceLocation(),
            });
          } else {
            debug.effect.track({
              effectId,
              target: event.target,
              targetKey,
              location: captureSourceLocation(),
            });
          }
        }
        // track edge emitted via recordEffectTrack
      },
      onTrigger(event) {
        if (effectId !== -1) {
          const targetKey =
            typeof event.key === "symbol" ? event.key.toString() : event.key;
          if (isRef(event.target)) {
            const id = refId(event.target);
            debug.effect.ensureRef({ id, kind: "ref" });
            debug.effect.trigger({
              effectId,
              target: event.target,
              refId: id,
              targetKey,
              location: captureSourceLocation(),
              kind: "triggered-by",
            });
          } else {
            debug.effect.trigger({
              effectId,
              target: event.target,
              targetKey,
              location: captureSourceLocation(),
              kind: "triggered-by",
            });
          }
        }
        // trigger edge emitted via recordEffectTrigger
      },
    },
  );
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

export function ref<T>(value?: T): Ref<T> {
  const result = vueRef(value) as Ref<T>;
  attachEffectWriteDebug(result, "ref");
  debug.effect.registerRef({
    id: refId(result),
    kind: "ref",
    createdAt: captureSourceLocation(),
    createdByEffectId: globalContext?.meta?.effectId,
  });
  return result;
}

export function shallowRef<T>(value?: T): Ref<T> {
  const result = vueShallowRef(value) as Ref<T>;
  attachEffectWriteDebug(result, "shallowRef");
  debug.effect.registerRef({
    id: refId(result),
    kind: "shallowRef",
    createdAt: captureSourceLocation(),
    createdByEffectId: globalContext?.meta?.effectId,
  });
  return result;
}

export function computed<T>(getter: () => T): Ref<T> {
  const result = vueComputed(getter) as Ref<T>;
  debug.effect.registerRef({
    id: refId(result),
    kind: "computed",
    createdAt: captureSourceLocation(),
    createdByEffectId: globalContext?.meta?.effectId,
  });
  return result;
}

export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue?: T[K],
): Ref<T[K]> {
  const result =
    defaultValue === undefined ?
      (vueToRef(object, key) as Ref<T[K]>)
    : (vueToRef(object, key, defaultValue) as Ref<T[K]>);
  attachEffectWriteDebug(result, "toRef");
  debug.effect.registerRef({
    id: refId(result),
    kind: "toRef",
    createdAt: captureSourceLocation(),
    createdByEffectId: globalContext?.meta?.effectId,
  });
  return result;
}

export function toRefs<T extends object>(
  object: T,
): { [K in keyof T]: Ref<T[K]> } {
  const result = vueToRefs(object) as { [K in keyof T]: Ref<T[K]> };
  for (const refValue of Object.values(result) as Ref<unknown>[]) {
    attachEffectWriteDebug(refValue, "toRef");
    debug.effect.registerRef({
      id: refId(refValue),
      kind: "toRef",
      createdAt: captureSourceLocation(),
      createdByEffectId: globalContext?.meta?.effectId,
    });
  }
  return result;
}

const seenRefs = new WeakMap<Ref<unknown>, number>();
let refIdCounter = 1;

export function refId(ref: Ref<unknown>): number {
  let id = seenRefs.get(ref);
  if (id === undefined) {
    id = refIdCounter++;
    seenRefs.set(ref, id);
  }
  return id;
}
