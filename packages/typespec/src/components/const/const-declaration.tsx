import {
  Children,
  Declaration,
  Name,
  Namekey,
  Refkey,
  Scope,
  useScope,
} from "@alloy-js/core";
import { useTypeSpecNamePolicy } from "../../name-policy.js";
import { NamedTypeScope } from "../../scopes/named-type.js";
import { NamespaceScope } from "../../scopes/namespace.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";

export interface ConstDeclarationProps {
  /** The const name. */
  name: string | Namekey;
  /** Refkey for referencing this const from other declarations. */
  refkey?: Refkey;
  /** Optional type annotation. */
  type?: Children;
  /** The value expression. */
  value: Children;
}

/**
 * A TypeSpec const declaration.
 *
 * @example
 * ```tsx
 * <ConstDeclaration name="maxAge" type="uint8" value="255" />
 * ```
 * This will produce:
 * ```typespec
 * const maxAge: uint8 = 255
 * ```
 */
export function ConstDeclaration(props: ConstDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "const", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("const"),
  });

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <Scope value={namedTypeScope}>
        const <Name />
        {props.type && <>: {props.type}</>}
        {" "}= {props.value}
      </Scope>
    </Declaration>
  );
}
