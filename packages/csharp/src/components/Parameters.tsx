import * as core from "@alloy-js/core";
import { code } from "@alloy-js/core";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { useCSharpScope } from "../symbols/scopes.js";
import { Name } from "./Name.js";

export interface ParameterProps {
  name: string;
  type: core.Children;
  /** If the parmaeter is optional(without default value) */
  optional?: boolean;
  /** Default value for the parameter */
  default?: core.Children;
  refkey?: core.Refkey;
  symbol?: core.OutputSymbol;
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
    refkeys: props.refkey ?? core.refkey(props.name),
  });

  return (
    <core.Declaration symbol={memberSymbol}>
      {props.type}
      {props.optional ? "?" : ""} <Name />
      {props.default ? code` = ${props.default}` : ""}
    </core.Declaration>
  );
}

export interface ParametersProps {
  // param name and type
  parameters: ParameterProps[];
}

// a collection of parameters
export function Parameters(props: ParametersProps) {
  return (
    <core.For each={props.parameters} joiner={", "}>
      {(param) => <Parameter {...param} />}
    </core.For>
  );
}
