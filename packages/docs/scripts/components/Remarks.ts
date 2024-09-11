import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocComment } from "@microsoft/tsdoc";
import { MdxSection, TsDoc } from "./stc/index.js";

export interface RemarksProps {
  type: ApiItem & { tsdocComment?: DocComment };
}

export function Remarks(props: RemarksProps) {
  if (!props.type.tsdocComment || !props.type.tsdocComment.remarksBlock)
    return "";

  return MdxSection({ title: "Remarks", level: 3 }).children(
    TsDoc({ node: props.type.tsdocComment.remarksBlock, context: props.type }),
  );
}
