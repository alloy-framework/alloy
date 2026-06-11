import type { ApiItem, DocBlock } from "../model/index.js";
import { MdxParagraph, MdxSection, TsDoc } from "./stc/index.js";

export interface ExamplesProps {
  type: ApiItem;
}

export function Examples(props: ExamplesProps) {
  if (!props.type.tsdocComment) return "";

  const exampleBlocks: DocBlock[] = props.type.tsdocComment.customBlocks.filter(
    (x) => x.blockTag?.tagNameWithUpperCase === "@EXAMPLE",
  );

  if (exampleBlocks.length === 0) return "";

  const exampleCode = exampleBlocks.map((block) =>
    MdxParagraph().children(TsDoc({ node: block, context: props.type })),
  );

  return MdxSection({
    title: `Example${exampleBlocks.length > 1 ? "s" : ""}`,
  }).children(exampleCode);
}
