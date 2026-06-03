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
import { DocWhen } from "../doc/doc-comment.jsx";
import {
  TemplateParameterDescriptor,
  TemplateParameters,
} from "../template-parameters/template-parameters.jsx";

export interface AliasDeclarationProps {
  /** The name of the alias. */
  name: string | Namekey;
  /** Refkey for referencing this alias from other declarations. */
  refkey?: Refkey;
  /**
   * Template parameters for the alias.
   *
   * @example
   * ```tsx
   * <AliasDeclaration name="Response" templateParameters={["T"]} type="T" />
   * ```
   * This will produce:
   * ```typespec
   * alias Response<T> = T
   * ```
   */
  templateParameters?: (string | TemplateParameterDescriptor)[];
  /** The type expression the alias is bound to. */
  type: Children;
  /** Doc comment rendered as `/** ... *\/` above the declaration. */
  doc?: Children;
}

/**
 * A TypeSpec alias declaration.
 *
 * @example
 * ```tsx
 * <AliasDeclaration name="Options" type={'"one" | "two"'} doc="Available options" />
 * ```
 * This will produce:
 * ```typespec
 * /** Available options *\/
 * alias Options = "one" | "two"
 * ```
 */
export function AliasDeclaration(props: AliasDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "alias", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("alias"),
  });

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      <Scope value={namedTypeScope}>
        alias <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}{" "}
        = {props.type}
      </Scope>
    </Declaration>
  );
}
