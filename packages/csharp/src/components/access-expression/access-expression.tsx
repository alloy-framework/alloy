import {
  Children,
  childrenArray,
  isComponentCreator,
  Refkey,
  takeSymbols,
} from "@alloy-js/core";
import { CSharpSymbol } from "../../symbols/csharp.js";
import { childrenToPartDescriptors } from "./part-descriptors.js";

export interface AccessExpressionProps {
  children: Children;
}

export function AccessExpression(props: AccessExpressionProps) {
  const children = flattenAccessExpression(childrenArray(() => props.children));
  const parts = childrenToPartDescriptors(children);

  // any symbols emitted from the children won't be relevant to parent scopes.
  takeSymbols();

  if (parts.length === 0) {
    return <></>;
  }

  const isCallChain = computed(() => {
    let callCount = 0;
    for (const part of parts) {
      if (part.args !== undefined) callCount++;
    }

    return callCount > 1;
  });

  // construct a member expression from the parts. When a part is nullish,
  // and there is a subsequent part, we use `?.` instead of `.`. accessStyle determines
  // whether we use dot or bracket notation.

  return computed(() => {
    return isCallChain.value ?
        formatCallChain(parts)
      : formatNonCallChain(parts);
  });
}

/**
 * Flattens nested access expressions into a single array of parts.
 */
function flattenAccessExpression(children: Children[]): Children[] {
  const flattened: Children[] = [];
  for (const child of children) {
    if (isComponentCreator(child, AccessExpression)) {
      flattened.push(
        ...flattenAccessExpression(childrenArray(() => child.props.children)),
      );
    } else {
      flattened.push(child);
    }
  }
  return flattened;
}

export interface AccessExpressionPartProps {
  children?: Children;
  conditional?: boolean;
  args?: Children[];
  typeArgs?: Children[];
  refkey?: Refkey;
  symbol?: CSharpSymbol;
  id?: string | number;
  index?: number;
}

AccessExpression.Part = function (props: AccessExpressionPartProps) {
  /** renders nothing, the parent AccessExpression will use these args */
};
