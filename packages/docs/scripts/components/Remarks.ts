import { code } from "@alloy-js/core";
import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocComment } from "@microsoft/tsdoc";
import { TsDoc } from "./stc/index.js";

export interface RemarksProps {
  type: ApiItem & { tsdocComment?: DocComment };
}

export function Remarks(props: RemarksProps) {
  if (!props.type.tsdocComment || !props.type.tsdocComment.remarksBlock)
    return "";

  return code`

  
    ### Remarks

    ${TsDoc({ node: props.type.tsdocComment.remarksBlock, context: props.type })}


  `;
}
