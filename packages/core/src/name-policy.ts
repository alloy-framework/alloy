export interface NamePolicy<TElements extends string> {
  getName(originalName: string, element: TElements): string;
}

export function createNamePolicy<T extends string>(
  namer: (name: string, elements: T) => string,
): NamePolicy<T> {
  return {
    getName(name, element) {
      return namer(name, element);
    },
  };
}
