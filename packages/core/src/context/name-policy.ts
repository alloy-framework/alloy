import {
  ComponentContext,
  createNamedContext,
  useContext,
} from "../context.js";
import type { NamePolicy } from "../name-policy.js";

export const NamePolicyContext: ComponentContext<NamePolicy<string>> =
  createNamedContext<NamePolicy<string>>("NamePolicy", {
    getName(name) {
      return name;
    },
    for(element) {
      return (name) => name;
    },
  });

export function useNamePolicy() {
  return useContext(NamePolicyContext)!;
}
