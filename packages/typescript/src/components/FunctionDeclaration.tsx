import { Children } from "@alloyjs/core/jsx-runtime";
import { Declaration, childrenArray, findKeyedChild, findUnkeyedChildren, keyedChild, mapJoin } from "@alloyjs/core";


export interface FunctionDeclarationProps {
  refkey?: unknown;
  name: string;
  parameters?: Record<string, string>;
  returnType?: string;
  children?: Children;
}

export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const children = childrenArray(() => props.children);
  const parametersChild = findKeyedChild(children, "params");
  const bodyChild = findKeyedChild(children, "body");
  const filteredChildren = findUnkeyedChildren(children);

  console.log(filteredChildren);
  const sReturnType = props.returnType ? (
    <>
      : { props.returnType }
    </>
  ) : undefined;

  const sParams = parametersChild ??
    (<FunctionDeclaration.Parameters parameters={props.parameters} />)().children

  let sBody = bodyChild ?? (<FunctionDeclaration.Body>{filteredChildren}</FunctionDeclaration.Body>)().children

  return (
    <Declaration name={props.name} refkey={props.refkey}>
      export function {props.name}({sParams}){sReturnType} {"{"}
        {sBody}
      {"}"}
    </Declaration>
  );
}

export interface FunctionParametersProps {
  parameters?: Record<string, string>;
  children?: Children
}

FunctionDeclaration.Parameters = function Parameters(props: FunctionParametersProps) {
  let value;

  if (props.children) {
    value = props.children;
  } else if (props.parameters) {
    value = mapJoin(
      new Map(Object.entries(props.parameters)),
      (key, value) => {
        console.log({key, value});
        return [key, ": ", value]
      },
      { joiner: ","}
    );
    console.log({ value });
  } else {
    value = undefined;
  }

  return keyedChild("params", value);
};


export interface FunctionBodyProps {
  children?: Children;
}

FunctionDeclaration.Body = function Body(props: FunctionBodyProps) {
  console.log("Props children", props.children);
  return keyedChild("body", props.children);
};
