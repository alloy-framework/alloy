import { code } from "@alloy-js/core";
import type { ApiFunction } from "@microsoft/api-extractor-model";
import {
  Examples,
  FunctionOptions,
  FunctionParameters,
  FunctionReturn,
  FunctionSignature,
  Remarks,
  SeeAlso,
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

    ${FunctionReturn({ fn: props.fn })}
    
    ${Remarks({
      type: props.fn,
    })}

    ${Examples({
      type: props.fn,
    })}

    ${SeeAlso({
      type: props.fn,
    })}
  `;
}
