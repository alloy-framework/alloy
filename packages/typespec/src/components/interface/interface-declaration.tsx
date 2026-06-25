import {
  Block,
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
import { DocWhen } from "../doc/doc-comment.jsx";
import {
  TemplateParameterDescriptor,
  TemplateParameters,
} from "../template-parameters/template-parameters.jsx";

export interface InterfaceDeclarationProps {
  /** The interface name. */
  name: string | Namekey;
  /** Refkey for referencing this interface from other declarations. */
  refkey?: Refkey;
  /** Template parameters for the interface. */
  templateParameters?: (string | TemplateParameterDescriptor)[];
  /** The interfaces this interface extends. */
  extends?: Children;
  /** Doc comment rendered as `/** ... *\/` above the declaration. */
  doc?: Children;
  /** Directives (`#suppress`, `#deprecated`) to apply to the interface. */
  directives?: Children;
  /** Interface body (operations). */
  children?: Children;
}

/**
 * A TypeSpec interface declaration.
 *
 * @example
 * ```tsx
 * <InterfaceDeclaration name="PetStore" doc="Pet store API">
 *   <OperationDeclaration name="getPet" returnType="Pet" />
 * </InterfaceDeclaration>
 * ```
 * This will produce:
 * ```typespec
 * /** Pet store API *\/
 * interface PetStore {
 *   getPet(): Pet
 * }
 * ```
 */
export function InterfaceDeclaration(props: InterfaceDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "interface", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("interface"),
  });

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      {props.directives}
      <Scope value={namedTypeScope}>
        interface <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}
        {props.extends && <> extends {props.extends}</>}{" "}
        <Block>{props.children}</Block>
      </Scope>
    </Declaration>
  );
}
