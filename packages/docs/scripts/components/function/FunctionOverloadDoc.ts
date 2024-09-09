import { code } from "@alloy-js/core";
import type { ApiFunction } from "@microsoft/api-extractor-model";
import {
  FunctionOptions,
  FunctionParameters,
  FunctionSignature,
  TsDoc,
} from "../stc/index.js";

export interface FunctionOverloadDocProps {
  fn: ApiFunction;
  omitOverloadIndex?: boolean;
}

export function FunctionOverloadDoc(props: FunctionOverloadDocProps) {
  return code`
    ${!props.omitOverloadIndex && "## Overload " + props.fn.overloadIndex}

    ${props.fn.tsdocComment && TsDoc({ node: props.fn.tsdocComment?.summarySection, context: props.fn })}

    ${FunctionSignature({ fn: props.fn })}

    ${FunctionParameters({ fn: props.fn })}

    ${FunctionOptions({ fn: props.fn })}
  `;
}

/*
    <Code code={\`${signatureHelp(fn)}\`} lang="ts" />
    ${renderFunctionDocComment(fn)}
    ${renderFunctionParameters(fn)}
    ${renderFunctionOptions(fn)}
    ${renderFunctionReturnType(fn)}
    */
