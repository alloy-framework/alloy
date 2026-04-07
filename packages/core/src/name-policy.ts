/**
 * A function that transforms a name according to a naming policy for a
 * specific element kind. Obtained from {@link NamePolicy.for}.
 */
export interface NamePolicyGetter {
  (originalName: string): string;
}
export interface NamePolicy<TElements extends string> {
  /**
   * Apply the language policy to the provided name for the provided element type.
   * When `element` is `undefined`, returns `originalName` unchanged.
   */
  getName(originalName: string, element: TElements | undefined): string;
  /**
   * Get a function that takes a name and applies the naming policy to it.
   * When `element` is `undefined`, returns an identity function.
   */
  for(element: TElements | undefined): NamePolicyGetter;
}

/**
 * Creates a name policy that transforms symbol names based on element kind.
 *
 * @example
 * ```ts
 * const policy = createNamePolicy((name, element) => {
 *   if (element === "value") return toCamelCase(name);
 *   if (element === "type")  return toPascalCase(name);
 *   return name;
 * });
 * <Output namePolicy={policy}>...</Output>
 * ```
 *
 * @remarks
 * `element` identifies the kind of declaration (e.g., `"value"`, `"type"`).
 * The set of valid element strings is defined by the language package.
 *
 * When `element` is `undefined` (outside a declaration context), {@link NamePolicy.getName}
 * and {@link NamePolicy.for} short-circuit and return the original name unchanged — the
 * namer callback is **not** invoked. The namer therefore always receives a defined `T`.
 * This means names outside a declaration context cannot be transformed by the policy.
 */
export function createNamePolicy<T extends string>(
  namer: (name: string, element: T) => string,
): NamePolicy<T> {
  const forCache = new Map<string, NamePolicyGetter>();
  const noopGetter = (name: string) => name;

  return {
    getName(name, element) {
      if (!element) {
        return name;
      }

      return namer(name, element);
    },

    for(element) {
      if (!element) {
        return noopGetter;
      }

      if (forCache.has(element)) {
        return forCache.get(element)!;
      }

      const getter = (name: string) => namer(name, element);
      forCache.set(element, getter);

      return getter;
    },
  };
}
