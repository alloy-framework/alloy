import * as core from "@alloy-js/core";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { useCSharpScope } from "../symbols/scopes.js";
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
  const scope = useCSharpScope();
  if (
    scope.kind !== "member" ||
    (scope.name !== "constructor-decl" && scope.name !== "method-decl")
  ) {
    throw new Error(
      "can't define a parameter outside of a constructor-decl or method-decl scope",
    );
  }

  const memberSymbol = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  return <core.Declaration symbol={memberSymbol}>
      {props.type} <Name />
    </core.Declaration>;
}

export interface ParametersProps {
  // param name and type
  parameters: Array<ParameterProps>;
}

// a collection of parameters
export function Parameters(props: ParametersProps): Array<core.Child | string> {
  return core.mapJoin(
    props.parameters,
    (param) => {
      return <Parameter {...param} />;
    },
    { joiner: ", " },
  );
}
