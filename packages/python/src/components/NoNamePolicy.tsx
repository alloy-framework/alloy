import { NamePolicyContext } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface NoNamePolicyProps {
  children: Children;
}

/**
 * A wrapper component that disables name policy transformation for its children.
 *
 * This is useful for components that need to preserve exact names without applying
 * naming conventions, such as Python dunder methods like `__init__`, `__str__`, etc.
 *
 * @example
 * ```tsx
 * <NoNamePolicy>
 *   <MethodDeclaration name="__init__">
 *     // Function content
 *   </MethodDeclaration>
 * </NoNamePolicy>
 * ```
 *
 * This ensures `__init__` stays as `__init__` without name policy transformation.
 */
export function NoNamePolicy(props: NoNamePolicyProps) {
  return (
    <NamePolicyContext.Provider value={undefined}>
      {props.children}
    </NamePolicyContext.Provider>
  );
}
