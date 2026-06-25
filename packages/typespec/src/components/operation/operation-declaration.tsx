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
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import { DocWhen } from "../doc/doc-comment.jsx";
import {
  TemplateParameterDescriptor,
  TemplateParameters,
} from "../template-parameters/template-parameters.jsx";
import { type ParameterEntry, Parameters } from "./parameters.jsx";

export type {
  ParameterDescriptor,
  ParameterEntry,
  SpreadParameterDescriptor,
} from "./parameters.jsx";

export interface OperationDeclarationProps {
  /** The operation name. */
  name: string | Namekey;
  /** Refkey for referencing this operation from other declarations. */
  refkey?: Refkey;
  /** Template parameters for the operation. */
  templateParameters?: (string | TemplateParameterDescriptor)[];
  /** Operation parameters. */
  parameters?: ParameterEntry[];
  /** The return type of the operation. */
  returnType?: Children;
  /** The operation this declaration aliases via `is`. */
  is?: Children;
  /** Doc comment rendered as `/** ... *\/` above the declaration. */
  doc?: Children;
  /** Directives (`#suppress`, `#deprecated`) to apply to the operation. */
  directives?: Children;
  /** Decorators to apply to the operation. */
  decorators?: Children;
}

/**
 * A TypeSpec operation declaration.
 *
 * @example
 * ```tsx
 * <OperationDeclaration
 *   name="getPet"
 *   doc="Get a pet by ID"
 *   parameters={[{ name: "id", type: "string" }]}
 *   returnType="Pet"
 * />
 * ```
 * This will produce:
 * ```typespec
 * /** Get a pet by ID *\/
 * op getPet(id: string): Pet
 * ```
 */
export function OperationDeclaration(props: OperationDeclarationProps) {
  if (props.is && (props.parameters || props.returnType)) {
    throw new Error(
      "An operation declaration cannot have both 'is' and 'parameters'/'returnType' properties.",
    );
  }

  const sym = createNamedTypeSymbol(props.name, "operation", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("operation"),
  });

  const parentScope = useScope();
  const namedTypeScope = new NamedTypeScope(sym, parentScope);
  const isInsideInterface =
    parentScope instanceof NamedTypeScope &&
    parentScope.ownerSymbol.kind === "interface";

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      {props.directives}
      {props.decorators}
      <Scope value={namedTypeScope}>
        {!isInsideInterface && <>op </>}
        <Name />
        {props.templateParameters && (
          <TemplateParameters parameters={props.templateParameters} />
        )}
        {props.is && <> is {props.is}</>}
        {!props.is && (
          <>
            <Parameters parameters={props.parameters} />:{" "}
            {props.returnType ?? "void"}
          </>
        )}
      </Scope>
    </Declaration>
  );
}
