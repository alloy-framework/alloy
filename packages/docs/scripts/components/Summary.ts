import type { ApiItem } from "@microsoft/api-extractor-model";
import type { DocComment } from "@microsoft/tsdoc";
import { MdxParagraph, TsDoc } from "./stc/index.js";

export interface SummaryProps {
  type?: ApiItem & { tsdocComment?: DocComment };
}

export function Summary(props: SummaryProps) {
  if (
    !props.type ||
    !props.type.tsdocComment ||
    !props.type.tsdocComment.summarySection
  )
    return "";

  return MdxParagraph().children(
    TsDoc({
      node: props.type.tsdocComment.summarySection,
      context: props.type,
    }),
  );
}
