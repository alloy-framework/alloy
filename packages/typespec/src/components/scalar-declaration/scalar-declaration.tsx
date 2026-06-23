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
  /** Directives (`#suppress`, `#deprecated`) to apply to the scalar. */
  directives?: Children;
  /** Decorators to apply to the scalar. */
  decorators?: Children;
  /** Body content such as `ScalarConstructor` components. */
  children?: Children;
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
 *
 * @example Scalar with initializers
 * ```tsx
 * <ScalarDeclaration name="ipv4" extends="string">
 *   <ScalarConstructor name="fromInt" parameters={[{ name: "value", type: "uint32" }]} />
 * </ScalarDeclaration>
 * ```
 * This will produce:
 * ```typespec
 * scalar ipv4 extends string {
 *   init fromInt(value: uint32);
 * }
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

  if (props.is && props.children) {
    throw new Error(
      "A scalar declaration cannot have both 'is' and 'children' properties.",
    );
  }

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      {props.directives}
      {props.decorators}
      <Scope value={namedTypeScope}>
        scalar <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}
        {props.is && <> is {props.is}</>}
        {props.extends && <> extends {props.extends}</>}
        {props.children && (
          <>
            {" "}
            <Block>{props.children}</Block>
          </>
        )}
      </Scope>
    </Declaration>
  );
}
