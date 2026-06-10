import { code, mapJoin, useContext } from "@alloy-js/core";
import type { ApiItem, DocBlock, DocLinkTag, DocParagraph } from "../model/index.js";
import { ApiModelContext } from "../contexts/api-model.js";
import { MdxSection, TsDoc } from "./stc/index.js";

export interface SeeAlsoProps {
  type: ApiItem;
  splitContexts?: boolean;
}

export function SeeAlso(props: SeeAlsoProps) {
  if (
    !props.type.tsdocComment ||
    props.type.tsdocComment.seeBlocks.length === 0
  ) {
    return "";
  }

  const apiModel = useContext(ApiModelContext)!;
  const contextsProvided: DocBlock[] = [];
  const seeBlocks: DocBlock[] = [];

  for (const seeBlock of props.type.tsdocComment.seeBlocks) {
    if (
      props.splitContexts &&
      seeBlock.content.nodes.length === 1 &&
      seeBlock.content.nodes[0].kind === "Paragraph" &&
      (seeBlock.content.nodes[0] as DocParagraph).nodes[2]?.kind === "LinkTag" &&
      ((seeBlock.content.nodes[0] as DocParagraph).nodes[2] as DocLinkTag)
        .codeDestination
    ) {
      const linkTag = (seeBlock.content.nodes[0] as DocParagraph)
        .nodes[2] as DocLinkTag;
      const resolvedType = apiModel.resolveReference(
        parseInt(linkTag.codeDestination!),
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
    MdxSection({ title: "Contexts provided" }).children(
      mapJoin(
        () => contextsProvided,
        (seeBlock) => {
          return code`
          * ${TsDoc({ node: seeBlock, context: props.type })}
        `;
        },
      ),
    );

  const seeAlsoList =
    seeBlocks.length > 0 &&
    MdxSection({ title: "See also" }).children(
      mapJoin(
        () => seeBlocks,
        (seeBlock) => {
          return code`
          * ${TsDoc({ node: seeBlock, context: props.type })}
        `;
        },
      ),
    );

  return [contextsProvidedList, seeAlsoList];
}

