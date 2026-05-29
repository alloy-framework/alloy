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

export interface ScalarDeclarationProps {
  /** The scalar name. */
  name: string | Namekey;
  /** Refkey for referencing this scalar from other declarations. */
  refkey?: Refkey;
  /** Template parameters for the scalar. */
  templateParameters?: (string | TemplateParameterDescriptor)[];
  /** The scalar this declaration aliases via `is`. */
  is?: Children;
  /** The base scalar this scalar extends. */
  extends?: Children;
  /** Doc comment rendered as `/** ... *\/` above the declaration. */
  doc?: Children;
  /** Decorators to apply to the scalar. */
  decorators?: Children;
}

/**
 * A TypeSpec scalar declaration.
 *
 * @example
 * ```tsx
 * <ScalarDeclaration name="ipv4" extends="string" doc="An IPv4 address" />
 * ```
 * This will produce:
 * ```typespec
 * /** An IPv4 address *\/
 * scalar ipv4 extends string
 * ```
 */
export function ScalarDeclaration(props: ScalarDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "scalar", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("scalar"),
  });
  if (props.is && props.extends) {
    throw new Error(
      "A scalar declaration cannot have both 'is' and 'extends' properties.",
    );
  }

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      {props.decorators}
      <Scope value={namedTypeScope}>
        scalar <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}
        {props.is && <> is {props.is}</>}
        {props.extends && <> extends {props.extends}</>}
      </Scope>
    </Declaration>
  );
}
