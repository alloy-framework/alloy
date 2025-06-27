import {
  Children,
  Indent,
  Name,
  OutputSymbolFlags,
  Scope,
  Show,
  code,
  refkey,
  useContext,
} from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import { PythonOutputSymbol } from "../symbols/index.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.jsx";
import { Parameters, ParametersProps } from "./Parameters.jsx";
import { SourceFileContext } from "./SourceFile.js";

export interface MethodDeclarationProps
  extends BaseDeclarationProps,
    ParametersProps {
  name: string; // e.g. "__init__" or "foo"
  instanceMethod?: boolean; // true if this is an instance method
  classMethod?: boolean; // true if this is a class method
  children?: Children; // method body
  returnType?: Children; // return type annotation
  forceName?: boolean; // if true, the name will not be transformed by the name policy
}

export function MethodDeclaration(props: MethodDeclarationProps) {
  const sfContext = useContext(SourceFileContext);
  const module = sfContext?.module;
  const name =
    !props.forceName ?
      usePythonNamePolicy().getName(props.name, "method")
    : props.name;
  // Due to forceName, we have to create the symbol here so the name policy isn't applied
  // at the Declaration class
  const sym = new PythonOutputSymbol(name, {
    refkeys: props.refkey ?? refkey(name),
    flags:
      (props.flags ?? OutputSymbolFlags.None) |
      OutputSymbolFlags.MemberContainer,
    metadata: props.metadata,
    module: module,
  });
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
    <Declaration {...props} name={name} symbol={sym}>
      <group>
        def <Name />
        <Scope name={name} kind="method">
          ({params})
          <Show
            when={props.returnType !== undefined}
          >{code` -> ${props.returnType}`}</Show>
          :<Indent>{props.children ?? "pass"}</Indent>
        </Scope>
      </group>
    </Declaration>
  );
}

export function InitMethod(
  props: Omit<
    MethodDeclarationProps,
    "name" | "instanceMethod" | "classMethod"
  >,
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
