import {
  childrenArray,
  code,
  findKeyedChild,
  findUnkeyedChildren,
  mapJoin,
  Name,
  Refkey,
  refkey,
  Scope,
  taggedComponent,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { useTSNamePolicy } from "../name-policy.js";
import { createTSSymbol, TSSymbolFlags, useTSScope } from "../symbols/index.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";

export interface ParameterDescriptor {
  type: Children;
  refkey: Refkey;
  optional?: boolean;
  doc?: string | string[];
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
  const doc = getFunctionDoc(props.doc, props.parameters);
  return <Declaration {...props} nameKind="function" doc={doc}>
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
  doc?: string | string[];
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
          const optionality = descriptor.optional ? "?" : "";
          const sym = createTSSymbol({
            name: key,
            refkey: descriptor.refkey,
            tsFlags: TSSymbolFlags.ParameterSymbol,
          });

          return <>{namePolicy.getName(sym.name, "parameter")}{optionality}: {descriptor.type}</>;
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

/**
 * Builds up a JSDoc string for a function including parameters
 */
export function getFunctionDoc(
  doc: string | string[] | undefined,
  params: Record<string, Children | ParameterDescriptor> | undefined,
) {
  let mainContent: string[] = [];
  if (doc) {
    if (typeof doc === "string") {
      mainContent = doc.split("\n");
    } else {
      mainContent = doc;
    }
  }

  // Build parameter documentation lines only for ParameterDescriptor values.
  const paramLines: string[] = [];
  if (params) {
    for (const [name, param] of Object.entries(params)) {
      // Only process the parameter if it has a "doc" property.
      if (typeof param === "object" && param !== null && "doc" in param) {
        let docs = param.doc;
        if (typeof docs === "string") {
          docs = docs.split("\n");
        }
        if (Array.isArray(docs) && docs.length > 0) {
          // Prefix the first line with '@param'.
          paramLines.push(`@param ${name} ${docs[0]}`);
          // Append any additional documentation lines.
          for (let i = 1; i < docs.length; i++) {
            paramLines.push(docs[i]);
          }
        }
      }
    }
  }

  // Combine the main content and parameter documentation, filtering out any empty lines.
  const allContent = mainContent
    .concat(paramLines)
    .filter((line) => line.trim() !== "");

  return allContent;
}
