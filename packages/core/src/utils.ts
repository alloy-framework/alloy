import {
  Child,
  Children,
  ComponentCreator,
  ComponentDefinition,
  isComponentCreator,
  memo,
} from "@alloy-js/core/jsx-runtime";
import { code } from "./code.js";
export interface MapJoinOptions {
  joiner?: string;
}
const defaultMapJoinOptions: MapJoinOptions = {
  joiner: "\n",
};

export function mapJoin<T, U, V>(
  src: Map<T, U>,
  cb: (key: T, value: U) => V,
  options?: MapJoinOptions,
): (V | string)[];
export function mapJoin<T, V>(
  src: T[],
  cb: (value: T) => V,
  options?: MapJoinOptions,
): (V | string)[];
export function mapJoin<T, U, V>(
  src: Map<T, U> | T[],
  cb: (key: T, value?: U) => V,
  options: MapJoinOptions = defaultMapJoinOptions,
): (V | string)[] {
  let mapped: (V | string)[] = [];
  if (Array.isArray(src)) {
    for (const [index, item] of src.entries()) {
      mapped.push(cb(item));
      if (index !== src.length - 1) {
        mapped.push(options.joiner!);
      }
    }
  } else {
    const entries = [...src.entries()];
    for (const [index, [key, value]] of entries.entries()) {
      mapped.push(cb(key, value));
      if (index !== entries.length - 1) {
        mapped.push(options.joiner!);
      }
    }
  }

  return mapped;
}

/**
 * Returns a memo which is a list of all the provided children.
 * If you want this as an array, see childrenArray.
 */
export function children(fn: () => Children) {
  return memo(() => collectChildren(fn()));

  function collectChildren(children: Children): Children {
    if (Array.isArray(children)) {
      return children.map(collectChildren).flat();
    } else if (
      typeof children === "function" &&
      !isComponentCreator(children)
    ) {
      return collectChildren(children());
    } else {
      return children;
    }
  }
}

export function childrenArray(fn: () => Children) {
  const c = children(fn)();
  if (Array.isArray(c)) {
    return c;
  } else if (c === undefined) {
    return [];
  } else {
    return [c];
  }
}

export function findKeyedChild(children: Child[], tag: Symbol) {
  for (const child of children) {
    if (isKeyedChild(child) && child.tag === tag) {
      return child;
    }
  }

  return null;
}

export function findUnkeyedChildren(children: Child[]) {
  return children.filter((child) => !isKeyedChild(child));
}

export function isKeyedChild(child: Child): child is ComponentCreator {
  return isComponentCreator(child) && !!child.tag;
}

export function stc<T extends {}>(Component: ComponentDefinition<T>) {
  return (
    ...args: unknown extends T ? []
    : {} extends Omit<T, "children"> ? [props?: T]
    : [props: T]
  ) => {
    const fn: ComponentCreator<T> & {
      code(
        template: TemplateStringsArray,
        ...substitutions: Children[]
      ): ComponentCreator<T>;
      children(...children: Children[]): ComponentCreator<T>;
    } = () => Component(args[0]!);
    fn.component = Component;

    fn.code = (
      template: TemplateStringsArray,
      ...substitutions: Children[]
    ): ComponentCreator<T> => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children: code(template, ...substitutions),
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      return fn;
    };

    fn.children = (...children: Children[]): ComponentCreator<T> => {
      const propsWithChildren = {
        ...(args[0] ?? {}),
        children,
      };

      const fn = () => Component(propsWithChildren as any);
      fn.component = Component;
      return fn;
    };

    return fn;
  };
}
