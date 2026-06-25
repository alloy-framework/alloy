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

export interface ModelDeclarationProps {
  /** The model name. */
  name: string | Namekey;
  /** Refkey for referencing this model from other declarations. */
  refkey?: Refkey;
  /** Template parameters for the model. */
  templateParameters?: (string | TemplateParameterDescriptor)[];
  /** The base model this model extends. */
  extends?: Children;
  /** The model this declaration aliases via `is`. */
  is?: Children;
  /** Doc comment rendered as `/** ... *\/` above the declaration. */
  doc?: Children;
  /** Directives (`#suppress`, `#deprecated`) to apply to the model. */
  directives?: Children;
  /** Decorators to apply to the model. */
  decorators?: Children;
  /** Model body (properties, spread expressions, etc.). */
  children?: Children;
}

/**
 * A TypeSpec model declaration.
 *
 * @example
 * ```tsx
 * <ModelDeclaration name="Pet" doc="A pet in the store">
 *   <StatementList>
 *     <ModelProperty name="name" type="string" />
 *   </StatementList>
 * </ModelDeclaration>
 * ```
 * This will produce:
 * ```typespec
 * /** A pet in the store *\/
 * model Pet {
 *   name: string;
 * }
 * ```
 */
export function ModelDeclaration(props: ModelDeclarationProps) {
  if (props.is && (props.extends || props.children)) {
    throw new Error(
      "A model declaration cannot have both 'is' and 'extends'/'children' properties.",
    );
  }

  const sym = createNamedTypeSymbol(props.name, "model", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("model"),
  });

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      {props.directives}
      {props.decorators}
      <Scope value={namedTypeScope}>
        model <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}
        {props.is && <> is {props.is}</>}
        {!props.is && (
          <>
            {props.extends && <> extends {props.extends}</>}{" "}
            <Block>{props.children}</Block>
          </>
        )}
      </Scope>
    </Declaration>
  );
}
