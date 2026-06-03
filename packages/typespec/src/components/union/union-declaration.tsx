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

export interface UnionDeclarationProps {
  /** The union name. */
  name: string | Namekey;
  /** Refkey for referencing this union from other declarations. */
  refkey?: Refkey;
  /** Template parameters for the union. */
  templateParameters?: (string | TemplateParameterDescriptor)[];
  /** Doc comment rendered as `/** ... *\/` above the declaration. */
  doc?: Children;
  /** Decorators to apply to the union. */
  decorators?: Children;
  /** Union body (variants). */
  children?: Children;
}

/**
 * A TypeSpec union declaration.
 *
 * @example
 * ```tsx
 * <UnionDeclaration name="Pet" doc="A pet type">
 *   <List comma hardline enderPunctuation>
 *     <UnionVariant name="cat" type="Cat" />
 *     <UnionVariant name="dog" type="Dog" />
 *   </List>
 * </UnionDeclaration>
 * ```
 * This will produce:
 * ```typespec
 * /** A pet type *\/
 * union Pet {
 *   cat: Cat,
 *   dog: Dog,
 * }
 * ```
 */
export function UnionDeclaration(props: UnionDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "union", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("union"),
  });

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      {props.decorators}
      <Scope value={namedTypeScope}>
        union <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}{" "}
        <Block>{props.children}</Block>
      </Scope>
    </Declaration>
  );
}
