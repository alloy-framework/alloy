import {
  stc as makeStc,
  mapJoin,
  refkey,
  useContext,
  type Children,
} from "@alloy-js/core";
import { type ApiItem } from "@microsoft/api-extractor-model";
import {
  DocBlock,
  DocCodeSpan,
  DocLinkTag,
  DocNode,
  DocNodeKind,
  DocNodeTransforms,
  DocParagraph,
  DocPlainText,
  DocSection,
} from "@microsoft/tsdoc";
import { ApiModelContext } from "../contexts/api-model.js";
import { TsDocContext, useTsDoccontext } from "../contexts/ts-doc.js";
import * as stc from "./stc/index.js";
export interface TsDocProps {
  node: DocNode;
  context?: ApiItem;
}

export function TsDoc(props: TsDocProps): Children {
  let content;
  switch (props.node.kind) {
    case DocNodeKind.Paragraph:
      content = stc.TsDocParagraph({ node: props.node as DocParagraph });
      break;
    case DocNodeKind.CodeSpan:
      content = stc.TsDocCodeSpan({ node: props.node as DocCodeSpan });
      break;
    case DocNodeKind.LinkTag:
      content = stc.TsDocLinkTag({ node: props.node as DocLinkTag });
      break;
    case DocNodeKind.PlainText:
      content = stc.TsDocPlainText({ node: props.node as DocPlainText });
      break;
    case DocNodeKind.Section:
      content = stc.TsDocSection({ node: props.node as DocSection });
      break;
    case DocNodeKind.BlockTag:
      // ignore?
      break;
    case DocNodeKind.Block:
      content = stc.TsDocSection({
        node: (props.node as DocBlock).content,
      });
      break;
    case DocNodeKind.ParamBlock:
      // ignore?
      break;
    default:
      throw new Error("Unknown tsdoc node kind " + props.node.kind);
  }

  if (props.context) {
    return makeStc(TsDocContext.Provider)({ value: props.context }).children(
      content,
    );
  } else {
    return content;
  }
}

export interface TsDocParagraphProps {
  node: DocParagraph;
}
export function TsDocParagraph(props: TsDocParagraphProps) {
  const trimmed = DocNodeTransforms.trimSpacesInParagraph(props.node);

  return trimmed.nodes.map((node) => TsDoc({ node }));
}

export interface TsDocPlainTextProps {
  node: DocPlainText;
}
export function TsDocPlainText(props: TsDocPlainTextProps) {
  return props.node.text;
}

export interface TsDocSectionProps {
  node: DocSection;
}

export function TsDocSection(props: TsDocSectionProps) {
  return mapJoin(props.node.nodes as DocNode[], (node) => TsDoc({ node }), {
    joiner: "\n\n",
  });
}

export interface TsDocLinkTagProps {
  node: DocLinkTag;
}

export function TsDocLinkTag(props: TsDocLinkTagProps) {
  const apiModel = useContext(ApiModelContext)!;
  const docContext = useTsDoccontext();
  if (props.node.codeDestination) {
    const apiItem = apiModel.resolveDeclarationReference(
      props.node.codeDestination!,
      docContext,
    ).resolvedApiItem;

    return stc.Reference({
      refkey: refkey(apiItem),
      linkText: props.node.linkText,
    });
  } else {
    return `<a href="${props.node.urlDestination}">${props.node.linkText}</a>`;
  }
}

export interface TsDocCodeSpanProps {
  node: DocCodeSpan;
}

export function TsDocCodeSpan(props: TsDocCodeSpanProps) {
  return `\`${props.node.code}\``;
}
