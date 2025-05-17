import { Block, Children, Scope } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import { Declaration } from "./Declaration.jsx";
import { Parameters, ParametersProps } from "./Parameters.jsx";

export interface MethodProps extends ParametersProps {
  name: string; // e.g. "__init__" or "foo"
  isInstanceMethod?: boolean; // true if this is an instance method
  isClassMethod?: boolean; // true if this is a class method
  children?: Children; // method body
}

export function Method(props: MethodProps) {
  const name = usePythonNamePolicy().getName(props.name, "method");
  // Validate that only one of isInstanceMethod or isClassMethod is true
  if (props.isInstanceMethod && props.isClassMethod) {
    throw new Error(
      "Method cannot be both an instance method and a class method",
    );
  }
  //TODO: Validate that if either classMethod or instanceMethod is true, this is being called in the scope of a class
  const additionalArgs =
    props.isInstanceMethod ? [{ name: "self" }]
    : props.isClassMethod ? [{ name: "cls" }]
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

export function InitMethod(
  props: Omit<MethodProps, "name" | "isInstanceMethod" | "isClassMethod">,
) {
  return (
    <Method
      {...props}
      name="__init__"
      isInstanceMethod={true}
      isClassMethod={false}
    />
  );
}
