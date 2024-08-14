import {
  childrenArray,
  findKeyedChild,
  findUnkeyedChildren,
  mapJoin,
  taggedComponent,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { useTSNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";

export interface FunctionDeclarationProps
  extends Omit<DeclarationProps, "kind"> {
  parameters?: Record<string, Children>;
  returnType?: string;
  children?: Children;
}

export const functionParametersTag = Symbol();
export const functionBodyTag = Symbol();

export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const children = childrenArray(() => props.children);
  const parametersChild = findKeyedChild(children, functionParametersTag);
  const bodyChild = findKeyedChild(children, functionBodyTag);
  const filteredChildren = findUnkeyedChildren(children);
  const sReturnType = props.returnType ? <>: {props.returnType}</> : undefined;

  const sParams =
    parametersChild ?? <FunctionDeclaration.Parameters parameters={props.parameters} />;

  let sBody =
    bodyChild ?? <FunctionDeclaration.Body>{filteredChildren}</FunctionDeclaration.Body>;

  return <Declaration {...props} kind="function">
      function <Name />({sParams}){sReturnType} {"{"}
        {sBody}
      {"}"}
    </Declaration>;
}

export interface FunctionParametersProps {
  parameters?: Record<string, Children>;
  children?: Children;
}

FunctionDeclaration.Parameters = taggedComponent(
  functionParametersTag,
  function Parameters(props: FunctionParametersProps) {
    const namePolicy = useTSNamePolicy();

    let value;

    if (props.children) {
      value = props.children;
    } else if (props.parameters) {
      value = mapJoin(
        new Map(Object.entries(props.parameters)),
        (key, value) => {
          return [namePolicy.getName(key, "parameter"), ": ", value];
        },
        { joiner: "," },
      );
    } else {
      value = undefined;
    }

    return value;
  },
);

export interface FunctionBodyProps {
  children?: Children;
}

FunctionDeclaration.Body = taggedComponent(functionBodyTag, function Body(
  props: FunctionBodyProps,
) {
  return props.children;
});
