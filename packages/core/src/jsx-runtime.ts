// Much of the implementations in this file are inspired by vuerx-js
// See: https://github.com/ryansolid/vuerx-jsx.
import {
  pauseTracking,
  Ref,
  resetTracking,
  shallowRef,
  stop,
  effect as vueEffect,
} from "@vue/reactivity";
import { Refkey } from "./refkey.js";

if ((globalThis as any).ALLOY) {
  throw new Error(
    "Multiple versions of the JSX Runtime have been loaded. This will likely cause undesirable behavior.",
  );
}
(globalThis as any).ALLOY = true;

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
   * When this context was created by a component, this will
   * be the component that created it.
   */
  componentOwner?: ComponentCreator<unknown>;
}

let globalContext: Context | null = null;
export function getContext() {
  return globalContext;
}

export function root<T>(
  fn: (d: Disposable) => T,
  componentOwner?: ComponentCreator<any>,
): T {
  globalContext = {
    componentOwner,
    disposables: [],
    owner: globalContext,
    context: {},
  };
  let ret;
  try {
    ret = untrack(() =>
      fn(() => {
        for (const d of globalContext!.disposables) {
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
  });
  return () => o.value;
}

export function effect<T>(fn: (prev?: T) => T, current?: T) {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    final && stop(c);
  };

  const c = vueEffect(() => {
    cleanupFn(false);
    const oldContext = globalContext;
    globalContext = context;
    try {
      current = fn(current);
    } finally {
      globalContext = oldContext;
    }
  });

  cleanup(() => cleanupFn(true));
}

export function cleanup(fn: Disposable) {
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
  | void
  | (() => Children)
  | Child[]
  | Ref
  | Refkey;

export type Children = Child | Child[];
export type Props = Record<string, any>;

export interface ComponentDefinition<TProps = Props> {
  (props: TProps): Child | Children;
}
export interface Component<TProps = Props> {
  (props: TProps): Child | Children;
  tag?: symbol;
}
export interface ComponentCreator<TProps = Props> {
  component: Component<TProps>;
  (): Child | Children;
  props: Props;
  tag?: symbol;
}

// debugging utilities
const renderStack: {
  component: Component<any>;
  props: Props;
}[] = [];

export const shouldDebug = !!process.env.ALLOY_DEBUG;

export function pushStack(component: Component<any>, props: Props) {
  if (!shouldDebug) return;
  renderStack.push({ component, props });
}

export function popStack() {
  if (!shouldDebug) return;
  renderStack.pop();
}

export function printRenderStack() {
  if (!shouldDebug) return;

  // eslint-disable-next-line no-console
  console.error("Error rendering:");
  for (let i = renderStack.length - 1; i >= 0; i--) {
    const { component, props } = renderStack[i];
    // eslint-disable-next-line no-console
    console.error(`    at ${component.name}(${inspectProps(props)})`);
  }
}

function inspectProps(props: Props) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(props).map(([key, value]) => {
        let safeValue;
        switch (typeof value) {
          case "string":
          case "number":
          case "boolean":
            safeValue = value;
            break;
          case "undefined":
            safeValue = "undefined";
            break;
          case "object":
            safeValue = value ? "{...}" : null;
            break;
          case "function":
            safeValue = "function";
            break;
        }
        return [key, safeValue];
      }),
    ),
  );
}

// These can be removed with a smarter transform that encodes the information we
// need in the compiled JSX output.
export function isComponentCreator(item: unknown): item is ComponentCreator {
  return typeof item === "function" && (item as any).component;
}

/**
 * This namespace is predominantly for interop with React tooling in VSCode
 * and controls the type of JSX elements, components, and the like.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JSX {
  export interface IntrinsicElements {}
  export type ElementType = ComponentDefinition<any>;
  export type Element = Children;
  export interface ElementChildrenAttribute {
    children: {};
  }
  export interface ElementAttributesProperty {
    props: {};
  }
}

export function jsx(type: Component<any>, props: Record<string, unknown>) {
  return createComponent(type, props);
}

export const jsxs = jsx;

export function createComponent<TProps extends Props = Props>(
  C: Component<TProps>,
  props: TProps,
): ComponentCreator<TProps> {
  const creator: ComponentCreator<TProps> = () => /* */ C(props);
  creator.props = props;
  creator.component = C;
  if (C.tag) {
    creator.tag = C.tag;
  }

  return creator;
}

export function taggedComponent<TProps = Props>(
  tag: symbol,
  component: Component<TProps>,
): Component<TProps> {
  component.tag = tag;
  return component;
}

export function mergeProps<T, U>(source: T, source1: U): T & U;
export function mergeProps<T, U, V>(
  source: T,
  source1: U,
  source2: V,
): T & U & V;
export function mergeProps<T, U, V, W>(
  source: T,
  source1: U,
  source2: V,
  source3: W,
): T & U & V & W;
export function mergeProps(...sources: any): any {
  const target = {};
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i];
    if (typeof source === "function") source = source();
    if (source) {
      const descriptors = Object.getOwnPropertyDescriptors(source);
      for (const key in descriptors) {
        if (key in target) continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i = sources.length - 1; i >= 0; i--) {
              let s = sources[i];
              if (typeof s === "function") s = s();
              const v = (s || {})[key];
              if (v !== undefined) return v;
            }
          },
        });
      }
    }
  }
  return target;
}
