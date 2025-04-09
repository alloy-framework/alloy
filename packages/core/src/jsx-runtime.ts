// Much of the implementations in this file are inspired by vuerx-js
// See: https://github.com/ryansolid/vuerx-jsx.
import {
  computed,
  isReactive,
  pauseTracking,
  proxyRefs,
  Ref,
  resetTracking,
  shallowRef,
  stop,
  toRefs,
  effect as vueEffect,
} from "@vue/reactivity";
import { Refkey } from "./refkey.js";
import { RenderedTextTree } from "./render.js";

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
   * A cache of RenderTextTree nodes created within this context,
   * indexed by the component or function which created them.
   */
  elementCache: ElementCache;
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

export function getElementCache() {
  return getContext()!.elementCache;
}

export type ElementCacheKey =
  | ComponentCreator
  | (() => unknown)
  | CustomContext;
export type ElementCache = Map<ElementCacheKey, RenderedTextTree>;

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
  };

  const cleanupFn = (final: boolean) => {
    const d = context.disposables;
    context.disposables = [];
    for (let k = 0, len = d.length; k < len; k++) d[k]();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    final && stop(c);
  };

  onCleanup(() => cleanupFn(true));
  const c = vueEffect(() => {
    cleanupFn(false);

    const oldContext = globalContext;
    globalContext = context;
    try {
      current = fn(current);
    } finally {
      globalContext = oldContext;
    }
  }, {});
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

export type Child =
  | string
  | boolean
  | number
  | undefined
  | null
  | void
  | (() => Children)
  | Ref
  | Refkey
  | CustomContext
  | IntrinsicElement;

export type Children = Child | Children[];
export type Props = Record<string, any>;

export interface ComponentDefinition<TProps = Props> {
  (props: TProps): Children;
}
export interface Component<TProps = Props> {
  (props: TProps): Children;
  tag?: symbol;
}

export interface ComponentCreator<TProps = Props> {
  component: Component<TProps>;
  (): Children;
  props: TProps;
  tag?: symbol;
}

// debugging utilities
const renderStack: {
  component: Component<any>;
  props: Props;
}[] = [];

export function pushStack(component: Component<any>, props: Props) {
  if (!shouldDebug()) return;
  renderStack.push({ component, props });
}

export function popStack() {
  if (!shouldDebug()) return;
  renderStack.pop();
}

export function printRenderStack() {
  if (!shouldDebug()) return;

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
export function isComponentCreator<TProps = any>(
  item: unknown,
  component?: Component<TProps>,
): item is ComponentCreator<TProps> {
  if (!component) {
    return typeof item === "function" && (item as any).component;
  }
  return typeof item === "function" && (item as any).component === component;
}

/**
 * This namespace is predominantly for interop with React tooling in VSCode
 * and controls the type of JSX elements, components, and the like.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JSX {
  export interface IntrinsicElements {
    /**
     * Attempt to render the children on a single line if possible. If a group
     * contains `<breakParent />` or a hard line, or if the group exceeds the
     * print width, all linebreaks in the group will be broken.
     */
    group: { shouldBreak?: boolean; id?: symbol; children: Children };

    /**
     * A regular line break. This will break if the line exceeds the print
     * width, otherwise it will be a space.
     */
    line: {};

    /**
     * A regular line break. This will break if the line exceeds the print
     * width, otherwise it will be a space.
     */
    br: {};

    /**
     * A hard line break. This is a line that will always break, even if the
     * group does not exceed print width.
     */
    hardline: {};

    /**
     * A hard line break. This is a line that will always break, even if the
     * group does not exceed print width.
     */
    hbr: {};

    /**
     * A soft line break. This will break if the line exceeds the print width,
     * otherwise it will be be nothing.
     */
    softline: {};

    /**
     * A soft line break. This will break if the line exceeds the print width,
     * otherwise it will be be nothing.
     */
    sbr: {};

    /**
     * A literal line break. This will always break, even if the group does not
     * exceed print width. The new line will ignore indentation.
     */
    literalline: {};

    /**
     * A literal line break. This will always break, even if the group does not
     * exceed print width. The new line will ignore indentation.
     */
    lbr: {};

    /**
     * Increase the indentation level of the children of this component.
     * Indentation is determined by the print options provided to the Output
     * component or source file.
     */
    indent: { children: Children };

    /**
     * Indent the children of this component if the group specified by `groupId`
     * is broken (or not broken if `negate` is passed). The specified group must
     * already be printed.
     */
    indentIfBreak: { children: Children; groupId: symbol; negate?: boolean };

    /**
     * Similar to `group`, but will only place a line break before the last
     * segment to exceed the print width. This is useful for formatting
     * paragraphs of text where breaks are inserted prior to words which would
     * otherwise exceed the print width.
     */
    fill: { children: Children };

    /**
     * Force the parent group to break.
     */
    breakParent: {};

    /**
     * Print children if the current group or already printed group specified by
     * `groupId` is broken. Otherwise, `flatContents` is printed instead.
     */
    ifBreak: { children: Children; flatContents?: Children; groupId?: symbol };

    /**
     * Print this content at the end of the line. Useful for things like line
     * comments.
     */
    lineSuffix: { children: Children };

    /**
     * Force any line suffixes to print at this point.
     */
    lineSuffixBoundary: {};

    /**
     * Decrease the indentation level of the children of this component.
     * Indentation is determined by the print options provided to the Output
     * component or source file.
     */
    dedent: { children: Children };

    /**
     * Indent the children of this component by either the number of characters
     * indicated by the `width` prop, or by the provided string indicated by the
     * `string` prop.
     */
    align:
      | { children: Children; width: number }
      | { children: Children; string: string };

    /**
     * Mark the current indentation level as "root" for the purposes of literal
     * line breaks and `dedentToRoot`.
     */
    markAsRoot: { children: Children };

    /**
     * Decrease the indentation level to the root level specified by
     * `<markAsRoot />`, or else to no indentation.
     */
    dedentToRoot: { children: Children };
  }
  export type ElementType = string | ComponentDefinition<any>;
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
): Component<TProps> & Required<Pick<Component<TProps>, "tag">> {
  component.tag = tag;
  return component as any;
}

export const intrinsicElementKey = Symbol();

export type IndentIntrinsicElement = IntrinsicElementBase<"indent">;
export type IndentIfBreakIntrinsicElement =
  IntrinsicElementBase<"indentIfBreak">;
export type BrIntrinsicElement = IntrinsicElementBase<"br">;
export type LineIntrinsicElement = IntrinsicElementBase<"line">;
export type HbrIntrinsicElement = IntrinsicElementBase<"hbr">;
export type HardlineIntrinsicElement = IntrinsicElementBase<"hardline">;
export type SbrIntrinsicElement = IntrinsicElementBase<"sbr">;
export type SoftlineIntrinsicElement = IntrinsicElementBase<"softline">;
export type GroupIntrinsicElement = IntrinsicElementBase<"group">;
export type AlignIntrinsicElement = IntrinsicElementBase<"align">;
export type FillIntrinsicElement = IntrinsicElementBase<"fill">;
export type BreakParentIntrinsicElement = IntrinsicElementBase<"breakParent">;
export type LineSuffixIntrinsicElement = IntrinsicElementBase<"lineSuffix">;
export type LineSuffixBoundaryIntrinsicElement =
  IntrinsicElementBase<"lineSuffixBoundary">;
export type DedentIntrinsicElement = IntrinsicElementBase<"dedent">;
export type DedentToRootIntrinsicElement = IntrinsicElementBase<"dedentToRoot">;
export type MarkAsRootIntrinsicElement = IntrinsicElementBase<"markAsRoot">;
export type LiterallineIntrinsicElement = IntrinsicElementBase<"literalline">;
export type LbrIntrinsicElement = IntrinsicElementBase<"lbr">;
export type IfBreakIntrinsicElement = IntrinsicElementBase<"ifBreak">;

export type IntrinsicElement =
  | IndentIntrinsicElement
  | IndentIfBreakIntrinsicElement
  | BrIntrinsicElement
  | LineIntrinsicElement
  | HbrIntrinsicElement
  | HardlineIntrinsicElement
  | SbrIntrinsicElement
  | SoftlineIntrinsicElement
  | GroupIntrinsicElement
  | AlignIntrinsicElement
  | FillIntrinsicElement
  | BreakParentIntrinsicElement
  | LineSuffixIntrinsicElement
  | LineSuffixBoundaryIntrinsicElement
  | DedentIntrinsicElement
  | LiterallineIntrinsicElement
  | LbrIntrinsicElement
  | DedentToRootIntrinsicElement
  | MarkAsRootIntrinsicElement
  | IfBreakIntrinsicElement;

export interface IntrinsicElementBase<
  TKey extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> {
  [intrinsicElementKey]: true;
  name: TKey;
  props: JSX.IntrinsicElements[TKey];
}
export function createIntrinsic<TKey extends keyof JSX.IntrinsicElements>(
  name: TKey,
  props: JSX.IntrinsicElements[TKey],
): IntrinsicElementBase<TKey> {
  return {
    [intrinsicElementKey]: true,
    name,
    props,
  };
}

export function isIntrinsicElement(type: unknown): type is IntrinsicElement {
  return (
    typeof type === "object" && type !== null && intrinsicElementKey in type
  );
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

export type SplitProps<T, K extends (readonly (keyof T)[])[]> = [
  ...{
    [P in keyof K]: P extends `${number}` ?
      Pick<T, Extract<K[P], readonly (keyof T)[]>[number]>
    : never;
  },
  { [P in keyof T as Exclude<P, K[number][number]>]: T[P] },
];

export function splitProps<
  T extends Record<any, any>,
  K extends [readonly (keyof T)[], ...(readonly (keyof T)[])[]],
>(props: T, ...keys: K): SplitProps<T, K> {
  if (isReactive(props)) {
    const refs = untrack(() => toRefs(props));
    const remainingKeys = new Set(Object.keys(refs));

    const result: any = keys.map((keySet) => {
      const resultSet: any = {};
      for (const key of keySet) {
        resultSet[key] = refs[key];
        remainingKeys.delete(key as string);
      }
      return proxyRefs(resultSet);
    });

    const remaining: any = {};
    for (const key of remainingKeys) {
      remaining[key] = refs[key];
    }

    return [...result, proxyRefs(remaining)] as any;
  }

  const descriptors = Object.getOwnPropertyDescriptors(props);
  const remainingKeys = new Set(Object.keys(descriptors));
  const result: any = keys.map((keySet) => {
    const resultSet: any = {};
    for (const key of keySet) {
      if (key in descriptors) {
        Object.defineProperty(resultSet, key, descriptors[key]);
        remainingKeys.delete(key as string);
      }
    }
    return resultSet;
  });

  const remaining: any = {};
  for (const key of remainingKeys) {
    Object.defineProperty(remaining, key, descriptors[key]);
  }

  return [...result, remaining] as any;
}

/**
 * Applies default values to a props object. Reactive props are handled properly
 * by ensuring that their value is not accessed by `defaultProps`, avoiding any
 * unintended side effects.
 */
export function defaultProps<T extends {}>(props: T, defaults: Partial<T>): T {
  if (isReactive(props)) {
    const refs = untrack(() => toRefs(props));
    for (const key in defaults) {
      const originalRef = refs[key];
      refs[key] = computed(() =>
        originalRef.value === undefined ? defaults[key] : originalRef.value,
      ) as any;
    }

    return proxyRefs(refs);
  }
  const withDefaults = {} as T;
  const copied = new Set<string>();
  for (const key in defaults) {
    copied.add(key);
    const desc = Object.getOwnPropertyDescriptor(props, key);
    if (!desc) {
      withDefaults[key] = defaults[key]!;
      continue;
    }

    if (desc.get) {
      const originalGet = desc.get;
      desc.get = function () {
        const value = originalGet.call(this);
        return value === undefined ? defaults[key as keyof T] : value;
      };
      Object.defineProperty(withDefaults, key, desc);
    } else {
      desc.value =
        desc.value === undefined ? defaults[key as keyof T] : desc.value;
      Object.defineProperty(withDefaults, key, desc);
    }
  }

  const descriptors = Object.getOwnPropertyDescriptors(props);
  for (const key in descriptors) {
    if (copied.has(key)) {
      continue;
    }

    Object.defineProperty(withDefaults, key, descriptors[key]);
  }

  return withDefaults;
}

function shouldDebug() {
  return typeof process !== "undefined" && !!process.env?.ALLOY_DEBUG;
}
