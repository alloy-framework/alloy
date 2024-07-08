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
  options: MapJoinOptions = defaultMapJoinOptions
): (V | string)[] {
  let mapped: (V | string)[] = [];
  const entries = [...src.entries()];
  for (const [index, [key, value]] of entries.entries()) {
    mapped.push(cb(key, value));
    if (index !== entries.length - 1) {
      mapped.push(options.joiner!);
    }
  }

  return mapped;
}

/**
 * Returns a memo which is a flattened list of all the provided children.
 * If you want this as an array, see childrenArray.
 */
export function children(fn: () => Children) {
  return memo(() => collectChildren(fn()));

  function collectChildren(children: Children): Children {
    if (Array.isArray(children)) {
      return (children.map(collectChildren) as any).flat(Infinity);
    } else if (typeof children === "function") {
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
