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
  shallowReactive as vueShallowReactive,
  shallowRef as vueShallowRef,
  toRef as vueToRef,
  toRefs as vueToRefs,
} from "@vue/reactivity";
import { captureSourceLocation, debug, isDebugEnabled } from "./debug/index.js";
import { RenderedTextTree } from "./render.js";
import { Children, ComponentCreator } from "./runtime/component.js";
import { scheduler, setLastTriggerRef } from "./scheduler.js";
import type { OutputSymbol } from "./symbols/output-symbol.js";

if ((globalThis as any).__ALLOY__) {
  throw new Error(
    "Multiple versions of Alloy are loaded for this project. This will likely cause undesirable behavior.",
  );
}
(globalThis as any).__ALLOY__ = true;

export function getElementCache() {
  const ctx = getContext()!;
  return (ctx.elementCache ??= new Map());
}

export type ElementCacheKey =
  | ComponentCreator
  | (() => unknown)
  | CustomContext;

export type ElementCache = Map<ElementCacheKey, RenderedTextTree>;

export interface Disposable {
  (): void;
}

let contextIdCounter = 0;

export interface Context {
  /** Monotonic numeric ID for trace/debug correlation. */
  id: number;
  disposables?: Disposable[];
  owner: Context | null;

  // context providers
  context?: Record<symbol, unknown>;

  // store random info about the node
  meta?: Record<string, any>;

  /**
   * A cache of RenderTextTree nodes created within this context,
   * indexed by the component or function which created them.
   */
  elementCache?: ElementCache;
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
   * Only allocated when reactively observed (ContentSlot, mapJoin).
   */
  isEmpty?: Ref<boolean>;

  /**
   * Cheap boolean tracking the last propagated empty state.
   * Used by notifyContentState() for early-return optimization
   * without requiring a reactive ref on every context.
   */
  _lastEmpty: boolean;

  /**
   * Whether this context is a root context
   */
  isRoot: boolean;
}

let globalContext: Context | null = null;
export function getContext() {
  return globalContext;
}

/**
 * Walk up the owner chain to find the nearest ancestor context that
 * corresponds to an effect (has meta.effectId). This bridges non-effect
 * scopes (like createRoot iterations in For) so the owner chain always
 * connects effect-to-effect.
 */
function resolveOwnerEffectContextId(context: Context): number | null {
  let owner = context.owner;
  while (owner) {
    if (owner.meta?.effectId !== undefined) {
      return owner.id;
    }
    owner = owner.owner;
  }
  return context.owner?.id ?? null;
}

/**
 * Ensure that a context has an isEmpty ref, creating one if needed.
 * Only call this when you need to reactively observe isEmpty (e.g.,
 * ContentSlot, mapJoin). Most contexts don't need an isEmpty ref.
 */
export function ensureIsEmpty(context: Context): Ref<boolean> {
  context.isEmpty ??= ref(context.childrenWithContent === 0, {
    isInfrastructure: true,
  });
  return context.isEmpty;
}

export interface RootOptions {
  componentOwner?: ComponentCreator<any>;
}

export function root<T>(fn: (d: Disposable) => T, options?: RootOptions): T {
  const context: Context = {
    id: contextIdCounter++,
    componentOwner: options?.componentOwner,
    owner: globalContext,
    takesSymbols: false,
    takenSymbols: undefined,
    childrenWithContent: 0,
    _lastEmpty: true,
    isRoot: true,
  };

  globalContext = context;
  let ret;
  try {
    ret = untrack(() =>
      fn(() => {
        for (const d of context!.disposables ?? []) {
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

/**
 * Walk up the context owner chain to find the nearest effect ID.
 * Used to attribute reactive mutations to the effect that caused them.
 */
export function findCurrentEffectId(): number | undefined {
  let ctx = globalContext;
  while (ctx) {
    const id = ctx.meta?.effectId;
    if (id !== undefined && id !== -1) return id;
    ctx = ctx.owner;
  }
  return undefined;
}

export function memo<T>(fn: () => T, equal?: boolean, name?: string): () => T {
  const memoLabel = name ? `memo:${name}` : "memo";
  const o = shallowRef<T>(undefined as T, {
    label: memoLabel,
  });
  effect(
    (prev) => {
      const res = fn();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (!equal || prev !== res) && (o.value = res);
      return res;
    },
    undefined as T,
    {
      debug: { name: name ? `memo:${name}` : "memo" },
    },
  );
  const getter = (() => o.value as T) as () => T;
  if (name) {
    Object.defineProperty(getter, "name", { value: name, configurable: true });
  }
  return getter;
}

export function effect<T>(
  fn: (prev?: T) => T,
  current?: T,
  options?: EffectOptions,
) {
  const context: Context = {
    id: contextIdCounter++,
    owner: globalContext,
    takesSymbols: false,
    takenSymbols: undefined,
    childrenWithContent: 0,
    _lastEmpty: true,
    isRoot: false,
  };

  const debugInfo = options?.debug;
  const effectId = debug.effect.register({
    name: debugInfo?.name ?? fn.name,
    type: debugInfo?.type,
    createdAt: captureSourceLocation(),
    contextId: context.id,
    ownerContextId: resolveOwnerEffectContextId(context),
  });

  if (effectId !== -1) {
    context.meta ??= {};
    context.meta.effectId = effectId;
  }

  const cleanupFn = (final: boolean) => {
    const d = context.disposables;
    context.disposables = undefined;
    if (d) {
      for (let k = 0, len = d.length; k < len; k++) untrack(d[k]);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    final && stop(runner);
  };

  onCleanup(() => cleanupFn(true));
  const effectOpts: Record<string, unknown> = {
    // allow recursive effects with 32, 1 and 4 are default flags
    flags: 1 | 4 | 32,
    scheduler: scheduler(),
  };

  if (effectId !== -1) {
    effectOpts.onTrack = (event: any) => {
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
        });
      } else if (
        typeof event.target === "object" &&
        event.target !== null &&
        targetKey !== undefined
      ) {
        const id = reactivePropertyRefId(event.target, targetKey);
        debug.effect.ensureReactivePropertyRef({
          id,
          target: event.target,
          key: targetKey,
        });
        debug.effect.track({
          effectId,
          target: event.target,
          refId: id,
          targetKey,
        });
      } else {
        debug.effect.track({
          effectId,
          target: event.target,
          targetKey,
        });
      }
    };
    effectOpts.onTrigger = (event: any) => {
      if (!("target" in event)) {
        // Vue Dep.notify() chain propagation — no actual reactive target.
        // Skip recording: these are computed→subscriber notifications without
        // a meaningful target reference.
        return;
      }
      const targetKey =
        typeof event.key === "symbol" ? event.key.toString() : event.key;
      // findCurrentEffectId() works because onTrigger fires synchronously
      // during the mutation, so globalContext still points to the producer.
      const producerEffectId = findCurrentEffectId();
      const causedBy =
        producerEffectId !== undefined && producerEffectId !== effectId ?
          producerEffectId
        : undefined;
      if (isRef(event.target)) {
        const id = refId(event.target);
        debug.effect.ensureRef({ id, kind: "ref" });
        debug.effect.trigger({
          effectId,
          target: event.target,
          refId: id,
          targetKey,
          causedBy,
        });
        setLastTriggerRef(effectId, id);
      } else if (
        typeof event.target === "object" &&
        event.target !== null &&
        targetKey !== undefined
      ) {
        const id = reactivePropertyRefId(event.target, targetKey);
        debug.effect.ensureReactivePropertyRef({
          id,
          target: event.target,
          key: targetKey,
        });
        debug.effect.trigger({
          effectId,
          target: event.target,
          refId: id,
          targetKey,
          causedBy,
        });
        setLastTriggerRef(effectId, id);
      } else {
        debug.effect.trigger({
          effectId,
          target: event.target,
          targetKey,
          causedBy,
        });
      }
    };
  }

  const runner: ReactiveEffectRunner<void> = vueEffect(() => {
    cleanupFn(false);

    const oldContext = globalContext;
    globalContext = context;
    try {
      current = fn(current);
    } finally {
      globalContext = oldContext;
    }
  }, effectOpts as any);

  if (effectId !== -1) {
    effectIdMap.set(runner.effect, effectId);
  }
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
    (globalContext.disposables ??= []).push(fn);
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

export function ref<T>(
  value?: T,
  options?: { isInfrastructure?: boolean },
): Ref<T> {
  const result = vueRef(value) as Ref<T>;
  debug.effect.registerRef({
    id: refId(result),
    kind: "ref",
    createdAt: captureSourceLocation(),
    createdByEffectId: globalContext?.meta?.effectId,
    isInfrastructure: options?.isInfrastructure,
  });
  return result;
}

// Stores creation location for shallowReactive objects so registerNonRefTarget
// can look it up later (since targets are lazily registered on first track/trigger).
const reactiveCreationLocations = new WeakMap<
  object,
  ReturnType<typeof captureSourceLocation>
>();

export function getReactiveCreationLocation(target: object) {
  return reactiveCreationLocations.get(target);
}

export function shallowReactive<T extends object>(
  target: T,
): ShallowReactive<T> {
  const result = vueShallowReactive(target);
  if (isDebugEnabled()) {
    // Store by raw target — Vue's onTrack/onTrigger events pass the raw object, not the proxy.
    reactiveCreationLocations.set(target, captureSourceLocation());
  }
  return result;
}

export function shallowRef<T>(
  value?: T,
  options?: { label?: string },
): Ref<T> {
  const result = vueShallowRef(value) as Ref<T>;
  debug.effect.registerRef({
    id: refId(result),
    kind: "shallowRef",
    label: options?.label,
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
const effectIdMap = new WeakMap<object, number>();

// Stable ID mapping for (reactive, key) pairs — each property acts as a virtual ref.
const reactivePropertyIds = new WeakMap<object, Map<string | number, number>>();

export function refId(ref: Ref<unknown>): number {
  let id = seenRefs.get(ref);
  if (id === undefined) {
    id = refIdCounter++;
    seenRefs.set(ref, id);
  }
  return id;
}

/**
 * Get a stable ref ID for a property of a reactive object.
 * Each (target, key) pair gets a unique positive ID from the same counter as refs.
 */
export function reactivePropertyRefId(
  target: object,
  key: string | number,
): number {
  let keys = reactivePropertyIds.get(target);
  if (!keys) {
    keys = new Map();
    reactivePropertyIds.set(target, keys);
  }
  let id = keys.get(key);
  if (id === undefined) {
    id = refIdCounter++;
    keys.set(key, id);
  }
  return id;
}

/**
 * Build a human-readable label for a reactive property like `symbolName.prop`.
 */
export function formatReactivePropertyLabel(
  target: object,
  key: string | number,
): string {
  let ownerLabel: string;
  try {
    const str = String(target);
    // OutputSymbol toString() returns something like: TSOutputSymbol "MyInterface"[42]
    // Trim to just the meaningful part
    ownerLabel = str.length > 60 ? str.slice(0, 57) + "..." : str;
  } catch {
    ownerLabel = "reactive";
  }
  if (Array.isArray(target)) {
    ownerLabel = "[]";
  }
  return `${ownerLabel}.${key}`;
}

/** Allocate a unique reactive target ID from the same counter space as ref IDs. */
export function nextReactiveId(): number {
  return refIdCounter++;
}

export function resetRefIdCounter(): void {
  refIdCounter = 1;
}

export function getEffectDebugId(effect: object): number | undefined {
  return effectIdMap.get(effect);
}
