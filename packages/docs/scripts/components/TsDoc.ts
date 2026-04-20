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
  DocDeclarationReference,
  DocEscapedText,
  DocFencedCode,
  DocLinkTag,
  DocNode,
  DocNodeKind,
  DocNodeTransforms,
  DocParagraph,
  DocPlainText,
  DocSection,
} from "@microsoft/tsdoc";
import type { DeclarationReference } from "@microsoft/tsdoc/lib-commonjs/beta/DeclarationReference.js";
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
    case DocNodeKind.Paragraph:
      content = stc.TsDocParagraph({
        node: props.node as DocParagraph,
        inline: props.inline,
      });
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
      content = stc.TsDocSection({
        node: props.node as DocSection,
        inline: props.inline,
      });
      break;
    case DocNodeKind.Block:
      content = stc.TsDocSection({
        node: (props.node as DocBlock).content,
        inline: props.inline,
      });
      break;
    case DocNodeKind.ParamBlock:
      // ignore?
      break;
    case DocNodeKind.BlockTag:
      // ignore?
      break;
    case DocNodeKind.FencedCode: {
      const lang = (props.node as DocFencedCode).language;
      // Escape for a JS double-quoted string inside JSX
      const codeContent = (props.node as DocFencedCode).code
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n");
      // Use <pre><code> HTML instead of the <Code> Astro component or
      // markdown fenced blocks. Template literals in <Code code={`...`}/>
      // break MDX parsing inside <td>, and markdown fenced blocks create
      // paragraph boundaries that also break <td>.
      content = ` <pre><code class="language-${lang}">{"${codeContent}"}</code></pre>`;
      break;
    }
    case DocNodeKind.SoftBreak:
      content = props.inline ? " " : "\n";
      break;
    case DocNodeKind.EscapedText:
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
  let trimmed = DocNodeTransforms.trimSpacesInParagraph(props.node);
  let contentStartIndex = 0;
  while (
    contentStartIndex < trimmed.nodes.length &&
    trimmed.nodes[contentStartIndex].kind === DocNodeKind.SoftBreak
  ) {
    contentStartIndex++;
  }

  return trimmed.nodes
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
  if (props.node.codeDestination) {
    const apiItem = resolveCodeDestination(
      props.node.codeDestination,
      docContext,
    );

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
  // Use <code> HTML instead of backticks to avoid MDX parser conflicts
  // when inline code appears alongside <Code code={`...`}/> template literals.
  const escaped = props.node.code.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `<code>{"${escaped}"}</code>`;
}

export function resolveCodeDestination(
  decl: DeclarationReference | DocDeclarationReference,
  context: ApiItem | undefined,
) {
  const apiModel = useContext(ApiModelContext)!;

  return apiModel.resolveDeclarationReference(decl, context).resolvedApiItem;
}
