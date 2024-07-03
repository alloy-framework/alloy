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
  context?: Record<symbol, unknown>;
}

let globalContext: Context | null = null;
export function getContext() {
  return globalContext;
}

export function root<T>(fn: (d: Disposable) => T): T {
  globalContext = {
    disposables: [],
    owner: globalContext,
    context: {},
  };
  const ret = untrack(() =>
    fn(() => {
      for (const d of globalContext!.disposables) {
        d();
      }
    })
  );
  globalContext = globalContext.owner;
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
  const context = {
    context: {},
    disposables: [] as (() => void)[],
    owner: globalContext,
  };

  const cleanupFn = (final: boolean) => {
    const d = context.disposables;
    context.disposables = [];
    for (let k = 0, len = d.length; k < len; k++) d[k]();
    final && stop(c);
  };

  const c = vueEffect(() => {
    cleanupFn(false);
    globalContext = context;
    current = fn(current);
    globalContext = globalContext.owner;
  });

  cleanup(() => cleanupFn(true));
}

function cleanup(fn: Disposable) {
  if (globalContext != null) {
    globalContext.disposables.push(fn);
  }
}

export type Child = string | boolean | number | (() => Child | Children);
export type Children = Child[];
export type Props = Record<string, unknown>;

export interface ComponentDefinition<TProps = Props> {
  (props: TProps): Child | Children;
}
export interface Component<TProps = Props> {
  component: true;
  (props: TProps): Child | Children;
}
export function isComponent(item: unknown): item is Component {
  return typeof item === "function" && (item as any).component;
}

export function createComponent(C: Component, props: Props): Component {
  const creator = () => /* */ C(props);
  creator.component = true as const;
  return creator;
}
