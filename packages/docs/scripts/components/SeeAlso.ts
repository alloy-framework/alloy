import { code, mapJoin } from "@alloy-js/core";
import type { ApiItem } from "@microsoft/api-extractor-model";
import type {
  DocBlock,
  DocComment,
  DocLinkTag,
  DocParagraph,
} from "@microsoft/tsdoc";
import { MdxSection, TsDoc } from "./stc/index.js";
import { resolveCodeDestination } from "./TsDoc.js";

export interface SeeAlsoProps {
  type: ApiItem & { tsdocComment?: DocComment };
  splitContexts?: boolean;
}

export function SeeAlso(props: SeeAlsoProps) {
  if (
    !props.type.tsdocComment ||
    props.type.tsdocComment.seeBlocks.length === 0
  ) {
    return "";
  }

  const contextsProvided: DocBlock[] = [];
  const seeBlocks: DocBlock[] = [];

  for (const seeBlock of props.type.tsdocComment.seeBlocks) {
    // this check probably needs to be more robust, not sure why the link tag is after two softbreaks.
    if (
      props.splitContexts &&
      seeBlock.content.nodes.length === 1 &&
      seeBlock.content.nodes[0].kind === "Paragraph" &&
      (seeBlock.content.nodes[0] as DocParagraph).nodes[2].kind === "LinkTag" &&
      ((seeBlock.content.nodes[0] as DocParagraph).nodes[2] as DocLinkTag)
        .codeDestination
    ) {
      const resolvedType = resolveCodeDestination(
        ((seeBlock.content.nodes[0] as DocParagraph).nodes[2] as DocLinkTag)
          .codeDestination!,
        props.type,
      );

      if (resolvedType && resolvedType.displayName.indexOf("Context") > -1) {
        contextsProvided.push(seeBlock);
      } else {
        seeBlocks.push(seeBlock);
      }
    } else {
      seeBlocks.push(seeBlock);
    }
  }

  const contextsProvidedList =
    contextsProvided.length > 0 &&
    MdxSection({ title: "Contexts provided", level: 3 }).children(
      mapJoin(contextsProvided, (seeBlock) => {
        return code`
          * ${TsDoc({ node: seeBlock, context: props.type })}
        `;
      }),
    );

  const seeAlsoList =
    seeBlocks.length > 0 &&
    MdxSection({ title: "See also", level: 3 }).children(
      mapJoin(seeBlocks, (seeBlock) => {
        return code`
          * ${TsDoc({ node: seeBlock, context: props.type })}
        `;
      }),
    );

  return [contextsProvidedList, seeAlsoList];
}
