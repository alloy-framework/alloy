import { computed, isReactive, proxyRefs, toRefs } from "@vue/reactivity";
import { untrack } from "./reactivity.js";

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
