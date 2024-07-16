import { Children } from "@alloy-js/core/jsx-runtime";
import {
  BinderContext,
  Declaration,
  childrenArray,
  findKeyedChild,
  findUnkeyedChildren,
  keyedChild,
  mapJoin,
  useBinder,
  useContext,
  useScope,
} from "@alloy-js/core";

export interface FunctionDeclarationProps {
  refkey?: unknown;
  name: string;
  parameters?: Record<string, string>;
  returnType?: string;
  children?: Children;
  export?: boolean;
  default?: boolean;
}

export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const binder = useBinder();
  const scope = useScope();
  const sym = binder.createSymbol(props.name, scope, props.refkey ?? props.name, {
    export: props.export,
    default: props.default,
  });
  const children = childrenArray(() => props.children);
  const parametersChild = findKeyedChild(children, "params");
  const bodyChild = findKeyedChild(children, "body");
  const filteredChildren = findUnkeyedChildren(children);
  const sReturnType = props.returnType ? <>: {props.returnType}</> : undefined;

  const sParams =
    parametersChild ??
    (<FunctionDeclaration.Parameters parameters={props.parameters} />)()
      .children;

  let sBody =
    bodyChild ??
    (<FunctionDeclaration.Body>{filteredChildren}</FunctionDeclaration.Body>)()
      .children;

  return (
    <Declaration symbol={sym}>
      {props.export ? "export " : ""}{props.default ? "default " : ""}function {props.name}({sParams}){sReturnType} {"{"}
        {sBody}
      {"}"}
    </Declaration>
  );
}

export interface FunctionParametersProps {
  parameters?: Record<string, string>;
  children?: Children;
}

FunctionDeclaration.Parameters = function Parameters(
  props: FunctionParametersProps
) {
  let value;

  if (props.children) {
    value = props.children;
  } else if (props.parameters) {
    value = mapJoin(
      new Map(Object.entries(props.parameters)),
      (key, value) => {
        return [key, ": ", value];
      },
      { joiner: "," }
    );
  } else {
    value = undefined;
  }

  return keyedChild("params", value);
};

export interface FunctionBodyProps {
  children?: Children;
}

FunctionDeclaration.Body = function Body(props: FunctionBodyProps) {
  return keyedChild("body", props.children);
};
