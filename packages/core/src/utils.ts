import {} from "@vue/reactivity";
import { Child, Children, memo } from "./jsx-runtime.js";
export interface MapJoinOptions {
  joiner?: string;
}
const defaultMapJoinOptions: MapJoinOptions = {
  joiner: "\n",
};

export function mapJoin<T, U, V>(
  src: Map<T, U>,
  cb: (key: T, value: U) => V,
  options?: MapJoinOptions
): (V | string)[];
export function mapJoin<T, V>(
  src: T[],
  cb: (value: T) => V,
  options?: MapJoinOptions
): (V | string)[];
export function mapJoin<T, U, V>(
  src: Map<T, U> | T[],
  cb: (key: T, value?: U) => V,
  options: MapJoinOptions = defaultMapJoinOptions
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
      return children.map(collectChildren);
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

// todo: could probably add this to the element types...
export function keyedChild(key: string, children: Children) {
  return { key, children };
}

export function findKeyedChild(children: Child[], key: string) {
  for (const child of children) {
    if (isKeyedChild(child) && (child as any).key === key) {
      return (child as any).children;
    }
  }

  return null;
}

export function findUnkeyedChildren(children: Child[]) {
  return children.filter((child) => !isKeyedChild(child));
}

export function isKeyedChild(child: Child) {
  return (
    typeof child === "object" && child !== null && child.hasOwnProperty("key")
  );
}

export function code(
  template: TemplateStringsArray,
  ...substitutions: Child[]
) {
  let element = [];

  element.push(template[0]);
  for (let i = 0; i < substitutions.length; i++) {
    element.push(substitutions[i]);
    element.push(template[i + 1]);
  }

  return element;
}
