import { Block, Children, Scope } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import { Declaration } from "./Declaration.jsx";
import { Parameters, ParametersProps } from "./Parameters.jsx";

export interface MethodProps extends ParametersProps {
  name: string; // e.g. "__init__" or "foo"
  children?: Children; // method body
}

export function Method(props: MethodProps) {
  const name = usePythonNamePolicy().getName(props.name, "method");
  // Change this when scopes are implemented
  // If the parent scope is a class, add "self" to the parameters
  // otherwise, just use the parameters as is
  const paramPropsWithSelf = [{ name: "self" }, ...(props.parameters ?? [])];
  const params = (
    <Parameters
      parameters={paramPropsWithSelf}
      args={props.args}
      kwargs={props.kwargs}
    />
  );
  return (
    <Declaration {...props} name={name}>
      <group>
        def {name}({params})
        <Scope name={name} kind="method">
          <Block opener=":" closer="">
            {props.children ?? "pass"}
          </Block>
        </Scope>
      </group>
    </Declaration>
  );
}

export function InitMethod(props: Omit<MethodProps, "name">) {
  return <Method {...props} name="__init__" />;
}
