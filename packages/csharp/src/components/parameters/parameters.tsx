import {
  Children,
  code,
  Declaration,
  For,
  Indent,
  OutputSymbol,
  refkey,
  Refkey,
} from "@alloy-js/core";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpOutputSymbol } from "../../symbols/csharp-output-symbol.js";
import { useCSharpScope } from "../../symbols/scopes.js";
import { Name } from "../Name.jsx";

export interface ParameterProps {
  name: string;
  type: Children;
  /** If the parmaeter is optional(without default value) */
  optional?: boolean;
  /** Default value for the parameter */
  default?: Children;
  refkey?: Refkey;
  symbol?: OutputSymbol;
}

/** Define a parameter to be used in class or interface method. */
export function Parameter(props: ParameterProps) {
  const name = useCSharpNamePolicy().getName(props.name, "parameter");
  const scope = useCSharpScope();
  if (
    scope.kind !== "member" ||
    (scope.name !== "constructor-decl" && scope.name !== "method-decl")
  ) {
    throw new Error(
      "can't define a parameter outside of a constructor-decl or method-decl scope",
    );
  }

  const memberSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? refkey(props.name),
  });

  return (
    <Declaration symbol={memberSymbol}>
      {props.type}
      {props.optional ? "?" : ""} <Name />
      {props.default ? code` = ${props.default}` : ""}
    </Declaration>
  );
}

export interface ParametersProps {
  parameters: ParameterProps[] | undefined;
}

/** Render a collection of parameters */
export function Parameters(props: ParametersProps) {
  return (
    <group>
      {"("}
      {props.parameters && (
        <Indent softline>
          <For each={props.parameters} joiner={", "}>
            {(param) => <Parameter {...param} />}
          </For>
        </Indent>
      )}
      <softline />
      {")"}
    </group>
  );
}
