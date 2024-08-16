import {
  childrenArray,
  findKeyedChild,
  findUnkeyedChildren,
  mapJoin,
  Refkey,
  refkey,
  Scope,
  taggedComponent,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { useTSNamePolicy } from "../name-policy.js";
import { createTSSymbol, TSSymbolFlags, useTSScope } from "../symbols/index.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";

export interface ParameterDescriptor {
  type: Children;
  refkey: Refkey;
}

function isParameterDescriptor(
  value: Children | ParameterDescriptor,
): value is ParameterDescriptor {
  return (
    typeof value === "object" && value !== null && Object.hasOwn(value, "type")
  );
}
export interface FunctionDeclarationProps
  extends Omit<DeclarationProps, "nameKind"> {
  parameters?: Record<string, Children | ParameterDescriptor>;
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

  return <Declaration {...props} nameKind="function">
      function <Name /><Scope name={props.name} kind="function">
        ({sParams}){sReturnType} {"{"}
          {sBody}
        {"}"}
      </Scope>
    </Declaration>;
}

export interface FunctionParametersProps {
  parameters?: Record<string, Children | ParameterDescriptor>;
  children?: Children;
}

FunctionDeclaration.Parameters = taggedComponent(
  functionParametersTag,
  function Parameters(props: FunctionParametersProps) {
    debugger;
    const namePolicy = useTSNamePolicy();

    let value;

    if (props.children) {
      value = props.children;
    } else if (props.parameters) {
      const scope = useTSScope();
      if (scope.kind !== "function") {
        throw new Error(
          "Can't declare function parameter in non-function scope",
        );
      }

      value = mapJoin(
        new Map(Object.entries(props.parameters)),
        (key, value) => {
          const descriptor: ParameterDescriptor = isParameterDescriptor(value) ?
            value
          : {
              refkey: refkey(),
              type: value,
            };
          const sym = createTSSymbol({
            name: key,
            refkey: descriptor.refkey,
            flags: TSSymbolFlags.ParameterSymbol,
          });

          return <>{namePolicy.getName(sym.name, "parameter")}: {descriptor.type}</>;
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
