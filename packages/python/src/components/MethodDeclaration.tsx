import { Children, Indent, Scope, Show, code } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import { Declaration } from "./Declaration.jsx";
import { Parameters, ParametersProps } from "./Parameters.jsx";

export interface MethodDeclarationProps extends ParametersProps {
  name: string; // e.g. "__init__" or "foo"
  instanceMethod?: boolean; // true if this is an instance method
  classMethod?: boolean; // true if this is a class method
  children?: Children; // method body
  returnType?: Children; // return type annotation
  forceName?: boolean; // if true, the name will not be transformed by the name policy
}

export function MethodDeclaration(props: MethodDeclarationProps) {
  const name = !props.forceName ? usePythonNamePolicy().getName(props.name, "method") : props.name;
  // Validate that only one of instanceMethod or classMethod is true
  if (props.instanceMethod && props.classMethod) {
    throw new Error(
      "Method cannot be both an instance method and a class method",
    );
  }
  //TODO: Validate that if either classMethod or instanceMethod is true, this is being called in the scope of a class
  const additionalArgs =
    props.instanceMethod ? [{ name: "self" }]
    : props.classMethod ? [{ name: "cls" }]
    : [];
  const paramPropsWithSelf = [...additionalArgs, ...(props.parameters ?? [])];
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
        def {name}({params})<Show when={props.returnType !== undefined}>{code` -> ${props.returnType}`}</Show>:
        <Scope name={name} kind="method">
          <Indent>{props.children ?? "pass"}</Indent>
        </Scope>
      </group>
    </Declaration>
  );
}

export function InitMethod(
  props: Omit<MethodDeclarationProps, "name" | "instanceMethod" | "classMethod">,
) {
  return (
    <MethodDeclaration
      {...props}
      name="__init__"
      instanceMethod={true}
      classMethod={false}
      forceName={true}
    />
  );
}
