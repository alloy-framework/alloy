import {
  Children,
  Declaration,
  For,
  Indent,
  Name,
  Namekey,
  Refkey,
  Scope,
  useScope,
} from "@alloy-js/core";
import { useTypeSpecNamePolicy } from "../../name-policy.js";
import { NamedTypeScope } from "../../scopes/named-type.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import { DocWhen } from "../doc/doc-comment.jsx";

export interface DecoratorParameterDescriptor {
  /** The parameter name. */
  name: string;
  /** The type constraint for the parameter. */
  type: Children;
  /** Whether the parameter is optional. */
  optional?: boolean;
  /** Whether this is a rest parameter. */
  rest?: boolean;
}

export interface DecoratorDeclarationProps {
  /** The decorator name (without the `@` prefix). */
  name: string | Namekey;
  /** Refkey for referencing this decorator from other declarations. */
  refkey?: Refkey;
  /**
   * The target parameter type constraint.
   * Defaults to `unknown` if not specified.
   */
  target: Children;
  /** Additional parameters beyond target. */
  parameters?: DecoratorParameterDescriptor[];
  /** Doc comment rendered as `/** ... *\/` above the declaration. */
  doc?: Children;
  /** Directives (`#suppress`, `#deprecated`) to apply to the declaration. */
  directives?: Children;
}

/**
 * A TypeSpec decorator declaration (`extern dec`).
 *
 * @example
 * ```tsx
 * <DecoratorDeclaration
 *   name="doc"
 *   target="unknown"
 *   parameters={[
 *     { name: "value", type: "valueof string" },
 *     { name: "formatArgs", type: "valueof unknown", optional: true },
 *   ]}
 * />
 * ```
 * This will produce:
 * ```typespec
 * extern dec doc(target: unknown, value: valueof string, formatArgs?: valueof unknown);
 * ```
 */
export function DecoratorDeclaration(props: DecoratorDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "decorator", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("decorator"),
  });

  const parentScope = useScope();

  return (
    <Declaration symbol={sym}>
      <Scope value={new NamedTypeScope(sym, parentScope)}>
        <DocWhen doc={props.doc} />
        {props.directives}
        extern dec <Name />
        <DecoratorParameters
          target={props.target}
          parameters={props.parameters}
        />
        ;
      </Scope>
    </Declaration>
  );
}

function DecoratorParameters(props: {
  target: Children;
  parameters?: DecoratorParameterDescriptor[];
}) {
  const allParams: DecoratorParameterDescriptor[] = [
    { name: "target", type: props.target },
    ...(props.parameters ?? []),
  ];

  return (
    <group>
      (
      <Indent softline trailingBreak>
        <For each={allParams} comma line>
          {(param) => (
            <>
              {param.rest && "..."}
              {param.name}
              {param.optional ? "?" : ""}: {param.type}
            </>
          )}
        </For>
      </Indent>
      )
    </group>
  );
}
