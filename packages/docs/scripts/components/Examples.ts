import { code, mapJoin } from "@alloy-js/core";
import type { ApiItem } from "@microsoft/api-extractor-model";
import { StandardTags, type DocBlock, type DocComment } from "@microsoft/tsdoc";
import { TsDoc } from "./stc/index.js";

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

  const exampleCode = mapJoin(
    exampleBlocks,
    (block) => {
      return TsDoc({ node: block, context: props.type });
    },
    { joiner: "\n\n" },
  );

  return code`

  
    ### Example${exampleBlocks.length > 1 ? "s" : ""}

    ${exampleCode}

  `;
}
