import * as core from "@alloy-js/core";
import { useCSharpNamePolicy } from "../name-policy.js";
import { useMethodScope } from "../scopes/method-scope.js";
import { CSharpSymbol } from "../symbols/csharp.js";
import { Name } from "./Name.js";

export interface ParameterProps {
  name: string;
  type: core.Children;
  refkey?: core.Refkey;
  symbol?: core.OutputSymbol;
}

// a constructor/method parameter
export function Parameter(props: ParameterProps) {
  const name = useCSharpNamePolicy().getName(props.name, "parameter");
  const scope = useMethodScope();
  const memberSymbol = new CSharpSymbol(name, scope.parameters, {
    refkeys: props.refkey,
  });

  return (
    <core.Declaration symbol={memberSymbol}>
      {props.type} <Name />
    </core.Declaration>
  );
}

export interface ParametersProps {
  // param name and type
  parameters: Array<ParameterProps>;
}

// a collection of parameters
export function Parameters(props: ParametersProps) {
  return (
    <core.For each={props.parameters} joiner={", "}>
      {(param) => <Parameter {...param} />}
    </core.For>
  );
}
