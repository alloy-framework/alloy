import type { ApiItem } from "../model/index.js";
import { MdxSection, TsDoc } from "./stc/index.js";

export interface RemarksProps {
  type: ApiItem;
}

export function Remarks(props: RemarksProps) {
  if (!props.type.tsdocComment || !props.type.tsdocComment.remarksBlock)
    return "";

  return MdxSection({ title: "Remarks" }).children(
    TsDoc({ node: props.type.tsdocComment.remarksBlock, context: props.type }),
  );
}
