import {
  stc as makeStc,
  mapJoin,
  refkey,
  useContext,
  type Children,
} from "@alloy-js/core";
import { type ApiItem } from "../model/index.js";
import type {
  DocBlock,
  DocCodeSpan,
  DocEscapedText,
  DocFencedCode,
  DocLinkTag,
  DocNode,
  DocParagraph,
  DocPlainText,
  DocSection,
} from "../model/index.js";
import { ApiModelContext } from "../contexts/api-model.js";
import { TsDocContext, useTsDoccontext } from "../contexts/ts-doc.js";
import * as stc from "./stc/index.js";
export interface TsDocProps {
  node: DocNode;
  context?: ApiItem;
  inline?: boolean;
}

export function TsDoc(props: TsDocProps): Children {
  let content;
  switch (props.node.kind) {
    case "Paragraph":
      content = stc.TsDocParagraph({
        node: props.node as DocParagraph,
        inline: props.inline,
      });
      break;
    case "CodeSpan":
      content = stc.TsDocCodeSpan({ node: props.node as DocCodeSpan });
      break;
    case "LinkTag":
      content = stc.TsDocLinkTag({ node: props.node as DocLinkTag });
      break;
    case "PlainText":
      content = stc.TsDocPlainText({ node: props.node as DocPlainText });
      break;
    case "Section":
      content = stc.TsDocSection({
        node: props.node as DocSection,
        inline: props.inline,
      });
      break;
    case "Block":
      content = stc.TsDocSection({
        node: (props.node as DocBlock).content,
        inline: props.inline,
      });
      break;
    case "ParamBlock":
      // ignore
      break;
    case "BlockTag":
      // ignore
      break;
    case "FencedCode": {
      const lang = (props.node as DocFencedCode).language;
      const codeContent = (props.node as DocFencedCode).code
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n");
      content = ` <pre><code class="language-${lang}">{"${codeContent}"}</code></pre>`;
      break;
    }
    case "SoftBreak":
      content = props.inline ? " " : "\n";
      break;
    case "EscapedText":
      content = (props.node as DocEscapedText).encodedText;
      break;
    default:
      console.log("Unknown TSDoc kind " + props.node.kind);
      break;
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
  inline?: boolean;
}
export function TsDocParagraph(props: TsDocParagraphProps) {
  // Trim leading soft breaks
  let contentStartIndex = 0;
  while (
    contentStartIndex < props.node.nodes.length &&
    props.node.nodes[contentStartIndex].kind === "SoftBreak"
  ) {
    contentStartIndex++;
  }

  return props.node.nodes
    .slice(contentStartIndex)
    .map((node) => TsDoc({ node, inline: props.inline }));
}

export interface TsDocPlainTextProps {
  node: DocPlainText;
}
export function TsDocPlainText(props: TsDocPlainTextProps) {
  return props.node.text;
}

export interface TsDocSectionProps {
  node: DocSection;
  inline?: boolean;
}

export function TsDocSection(props: TsDocSectionProps) {
  return mapJoin(
    () => props.node.nodes as DocNode[],
    (node) => stc.TsDoc({ node, inline: props.inline }),
    {
      joiner: props.inline ? " " : "\n\n",
    },
  );
}

export interface TsDocLinkTagProps {
  node: DocLinkTag;
}

export function TsDocLinkTag(props: TsDocLinkTagProps) {
  const docContext = useTsDoccontext();
  if (props.node.referenceId) {
    const apiModel = useContext(ApiModelContext)!;
    const apiItem = apiModel.resolveReference(props.node.referenceId);

    return stc.Reference({
      refkey: refkey(apiItem),
      linkText: props.node.linkText,
    });
  } else if (props.node.urlDestination) {
    return `<a href="${props.node.urlDestination}">${props.node.linkText ?? props.node.urlDestination}</a>`;
  } else {
    return props.node.linkText ?? "";
  }
}

export interface TsDocCodeSpanProps {
  node: DocCodeSpan;
}

export function TsDocCodeSpan(props: TsDocCodeSpanProps) {
  const escaped = props.node.code.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `<code>{"${escaped}"}</code>`;
}

