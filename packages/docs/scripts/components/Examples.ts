import type { ApiItem } from "@microsoft/api-extractor-model";
import { StandardTags, type DocBlock, type DocComment } from "@microsoft/tsdoc";
import { MdxParagraph, MdxSection, TsDoc } from "./stc/index.js";

export interface ExamplesProps {
  type: ApiItem & { tsdocComment?: DocComment };
}

export function Examples(props: ExamplesProps) {
  if (!props.type.tsdocComment) return "";

  const exampleBlocks: DocBlock[] = props.type.tsdocComment.customBlocks.filter(
    (x) =>
      x.blockTag.tagNameWithUpperCase ===
      StandardTags.example.tagNameWithUpperCase,
  );

  if (exampleBlocks.length === 0) return "";

  const exampleCode = exampleBlocks.map((block) =>
    MdxParagraph().children(TsDoc({ node: block, context: props.type })),
  );

  return MdxSection({
    title: `Example${exampleBlocks.length > 1 ? "s" : ""}`,
    level: 3,
  }).children(exampleCode);
}
