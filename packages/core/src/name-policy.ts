export interface NamePolicyGetter {
  (originalName: string): string;
}
export interface NamePolicy<TElements extends string> {
  /**
   * Apply the language policy to the provided name for the provided element
   * type.
   */
  getName(originalName: string, element: TElements): string;
  /**
   * Get a function that takes a name and applies the naming policy to it.
   */
  for(element: TElements): NamePolicyGetter;
}

export function createNamePolicy<T extends string>(
  namer: (name: string, elements: T) => string,
): NamePolicy<T> {
  return {
    getName(name, element) {
      return namer(name, element);
    },
    for(element) {
      return (name) => namer(name, element);
    },
  };
}
