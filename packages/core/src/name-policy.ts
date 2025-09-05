export interface NamePolicyGetter {
  (originalName: string): string;
}
export interface NamePolicy<TElements extends string> {
  /**
   * Apply the language policy to the provided name for the provided element
   * type.
   */
  getName(originalName: string, element: TElements | undefined): string;
  /**
   * Get a function that takes a name and applies the naming policy to it.
   */
  for(element: TElements | undefined): NamePolicyGetter;
}

export function createNamePolicy<T extends string>(
  namer: (name: string, elements: T) => string,
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
