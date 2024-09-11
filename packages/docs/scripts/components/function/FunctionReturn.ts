import { code } from "@alloy-js/core";
import type { ApiFunction } from "@microsoft/api-extractor-model";
import { Excerpt, TsDoc } from "../stc/index.js";

export interface FunctionReturnProps {
  fn: ApiFunction;
}

export function FunctionReturn(props: FunctionReturnProps) {
  return code`
    ### Returns

    ${Excerpt({ excerpt: props.fn.returnTypeExcerpt, context: props.fn })}

    ${
      props.fn.tsdocComment &&
      props.fn.tsdocComment.returnsBlock &&
      TsDoc({ node: props.fn.tsdocComment.returnsBlock, context: props.fn })
    }

  `;
}
