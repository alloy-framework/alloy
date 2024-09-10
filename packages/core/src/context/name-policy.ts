import { ComponentContext, createContext, useContext } from "../context.js";
import { NamePolicy } from "../name-policy.js";

export const NamePolicyContext: ComponentContext<NamePolicy<string>> =
  createContext<NamePolicy<string>>({
    getName(name) {
      return name;
    },
  });

export function useNamePolicy() {
  return useContext(NamePolicyContext)!;
}
