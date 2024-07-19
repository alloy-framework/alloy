// Much of the implementations in this file are inspired by vuerx-js
// See: https://github.com/ryansolid/vuerx-jsx.
import {
  pauseTracking,
  resetTracking,
  shallowRef,
  effect as vueEffect,
  stop,
} from "@vue/reactivity";

interface Disposable {
  (): void;
}

export interface Context {
  disposables: Disposable[];
  owner: Context | null;

  // context providers
  context?: Record<symbol, unknown>;

  // store random info about the node
  meta?: Record<string, any>;
}

let globalContext: Context | null = null;
export function getContext() {
  return globalContext;
}

export function root<T>(fn: (d: Disposable) => T, src?: string): T {
  globalContext = {
    src,
    disposables: [],
    owner: globalContext,
    context: {},
  } as any;
  const ret = untrack(() =>
    fn(() => {
      for (const d of globalContext!.disposables) {
        d();
      }
    })
  );
  globalContext = globalContext!.owner;

  return ret;
}

export function untrack<T>(fn: () => T): T {
  pauseTracking();
  const v = fn();
  resetTracking();
  return v;
}

export function memo<T>(fn: () => T, equal?: boolean): () => T {
  const o = shallowRef(untrack(fn));
  effect((prev) => {
    const res = fn();
    (!equal || prev !== res) && (o.value = res);
    return res;
  });
  return () => o.value;
}

export function effect<T>(fn: (prev?: T) => T, current?: T) {
  const owner = globalContext;
  const context = {
    src: "effect",
    context: {},
    disposables: [] as (() => void)[],
    owner: globalContext,
  } as any;

  const cleanupFn = (final: boolean) => {
    const d = context.disposables;
    context.disposables = [];
    for (let k = 0, len = d.length; k < len; k++) d[k]();
    final && stop(c);
  };

  const c = vueEffect(() => {
    cleanupFn(false);
    const oldContext = globalContext;
    globalContext = context;
    current = fn(current);
    globalContext = oldContext;
  });

  cleanup(() => cleanupFn(true));
}

function cleanup(fn: Disposable) {
  if (globalContext != null) {
    globalContext.disposables.push(fn);
  }
}

export type Child =
  | string
  | boolean
  | number
  | undefined
  | null
  | (() => Child | Children)
  | Child[];
export type Children = Child | Child[];
export type Props = Record<string, unknown>;

export interface ComponentDefinition<TProps = Props> {
  (props: TProps): Child | Children;
}
export interface Component<TProps = Props> {
  (props: TProps): Child | Children;
}
export interface ComponentCreator<TProps = Props> {
  component: Component<TProps>;
  (): Child | Children;
}

// These can be removed with a smarter transform that encodes the information we
// need in the compiled JSX output.
export function isComponentCreator(item: unknown): item is ComponentCreator {
  return typeof item === "function" && (item as any).component;
}

export function createComponent<TProps = Props>(
  C: Component<TProps>,
  props: TProps
): ComponentCreator<TProps> {
  const creator = () => /* */ C(props);
  creator.component = C;
  return creator;
}
