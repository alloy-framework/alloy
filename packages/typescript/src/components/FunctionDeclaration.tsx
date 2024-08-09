import { Children } from "@alloy-js/core/jsx-runtime";
import {
  childrenArray,
  findKeyedChild,
  findUnkeyedChildren,
  keyedChild,
  mapJoin,
} from "@alloy-js/core";
import {
  Declaration,
  DeclarationProps,
} from "./Declaration.js";
import { useTSNamePolicy } from "../name-policy.js";
import { Name } from "./Name.js";

export interface FunctionDeclarationProps extends Omit<DeclarationProps, "kind"> {
  parameters?: Record<string, Children>;
  returnType?: string;
  children?: Children;
}

export function FunctionDeclaration(props: FunctionDeclarationProps) {
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
    <Declaration {...props} kind="function">
      function <Name />({sParams}){sReturnType} {"{"}
        {sBody}
      {"}"}
    </Declaration>
  );
}

export interface FunctionParametersProps {
  parameters?: Record<string, Children>;
  children?: Children;
}

FunctionDeclaration.Parameters = function Parameters(
  props: FunctionParametersProps
) {
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
