import {
  Child,
  Children,
  ComponentCreator,
  ComponentDefinition,
  isComponentCreator,
  memo,
} from "@alloy-js/core/jsx-runtime";
import { code } from "./code.js";

export interface JoinOptions {
  /**
   * The string to place between each element.
   */
  joiner?: string;

  /**
   * When true, the joiner is placed at the end of the array. When a string,
   * that string is placed at the end of the array. The ender is only emitted
   * when the array has at least one element.
   */
  ender?: string | boolean;
}
const defaultJoinOptions: JoinOptions = {
  joiner: "\n",
  ender: false,
};

/**
 * Map a Map to an array using a mapper and place a joiner between each element.
 * Defaults to joining with a newline.
 *
 * @see {@link join} for joining without mapping.
 * @param src Source map.
 * @param cb Mapper function.
 * @param options Join options.
 * @returns The mapped and joined array.
 */
export function mapJoin<T, U, V>(
  src: Map<T, U>,
  cb: (key: T, value: U) => V,
  options?: JoinOptions,
): (V | string)[];

/**
 * Map a array to another array using a mapper and place a joiner between each
 * element. Defaults to joining with a newline.
 *
 * @see {@link join} for joining without mapping.
 * @param src Source array.
 * @param cb Mapper function.
 * @param options Join options.
 * @returns The mapped and joined array.
 */
export function mapJoin<T, V>(
  src: T[],
  cb: (value: T) => V,
  options?: JoinOptions,
): (V | string)[];
export function mapJoin<T, U, V>(
  src: Map<T, U> | T[],
  cb: (key: T, value?: U) => V,
  rawOptions: JoinOptions = {},
): (V | string)[] {
  const options = { ...defaultJoinOptions, ...rawOptions };
  const ender = options.ender === true ? options.joiner : options.ender;

  let mapped: (V | string)[] = [];
  if (Array.isArray(src)) {
    for (const [index, item] of src.entries()) {
      mapped.push(cb(item));
      if (index !== src.length - 1) {
        mapped.push(options.joiner!);
      }
    }
    if (src.length > 0 && ender) {
      mapped.push(ender);
    }
  } else {
    const entries = [...src.entries()];
    for (const [index, [key, value]] of entries.entries()) {
      mapped.push(cb(key, value));
      if (index !== entries.length - 1) {
        mapped.push(options.joiner!);
      }
    }
    if (entries.length > 0 && ender) {
      mapped.push(ender);
    }
  }

  return mapped;
}

/**
 * Place a joiner between each element of an array. Defaults to joining with a
 * newline.
 *
 * @see {@link mapJoin} for mapping before joining.
 * @param src
 * @param rawOptions
 * @returns The joined array
 */
export function join<T>(
  src: T[],
  rawOptions: JoinOptions = {},
): (T | string)[] {
  const options = { ...defaultJoinOptions, ...rawOptions };
  const joined = [];
  const ender = options.ender === true ? options.joiner : options.ender;

  for (const [index, item] of src.entries()) {
    joined.push(item);
    if (index !== src.length - 1) {
      joined.push(options.joiner!);
    }
  }

  if (src.length > 0 && ender) {
    joined.push(ender);
  }

  return joined;
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

export function findKeyedChild(children: Child[], tag: symbol) {
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
