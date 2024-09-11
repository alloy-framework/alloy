import {
  childrenArray,
  code,
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
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
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
export interface FunctionDeclarationProps extends BaseDeclarationProps {
  async?: boolean;
  parameters?: Record<string, Children | ParameterDescriptor>;
  returnType?: Children;
  children?: Children;
}

export const functionParametersTag = Symbol();
export const functionBodyTag = Symbol();

export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const children = childrenArray(() => props.children);
  const parametersChild = findKeyedChild(children, functionParametersTag);
  const bodyChild = findKeyedChild(children, functionBodyTag);
  const filteredChildren = findUnkeyedChildren(children);
  const returnType = getReturnType(props.returnType, { async: props.async });
  const sReturnType = returnType ? <>: {returnType}</> : undefined;

  const sParams =
    parametersChild ?? <FunctionDeclaration.Parameters parameters={props.parameters} />;

  const sBody =
    bodyChild ?? <FunctionDeclaration.Body>{filteredChildren}</FunctionDeclaration.Body>;

  const asyncKwd = props.async ? "async " : "";

  return <Declaration {...props} nameKind="function">
      {asyncKwd}function <Name /><Scope name={props.name} kind="function">
        ({sParams}){sReturnType} {"{"}
          {sBody}
        {"}"}
      </Scope>
    </Declaration>;
}

function getReturnType(
  returnType: Children | undefined,
  options: { async?: boolean } = { async: false },
) {
  if (returnType) {
    return options.async ? code`Promise<${returnType}>` : returnType;
  }
}
export interface FunctionParametersProps {
  parameters?: Record<string, Children | ParameterDescriptor>;
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
        { joiner: ", " },
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
