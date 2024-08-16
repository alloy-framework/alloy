import { ComponentContext, createContext, useContext } from "./context.js";

export interface NamePolicy<TElements extends string> {
  getName(originalName: string, element: TElements): string;
}

export const NamePolicyContext = createContext<NamePolicy<string>>({
  getName(name) {
    return name;
  },
});

export function useNamePolicy() {
  return useContext(NamePolicyContext)!;
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
