import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocComment } from "@microsoft/tsdoc";
import { TsDoc } from "./stc/index.js";

export interface SummaryProps {
  type: ApiItem & { tsdocComment?: DocComment };
}

export function Summary(props: SummaryProps) {
  if (!props.type.tsdocComment || !props.type.tsdocComment.summarySection)
    return "";

  return [
    TsDoc({
      node: props.type.tsdocComment.summarySection,
      context: props.type,
    }),
    "\n\n",
  ];
}
