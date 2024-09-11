import { refkey, type Children } from "@alloy-js/core";
import {
  ApiItem,
  ExcerptTokenKind,
  type Excerpt as AEExcerpt,
} from "@microsoft/api-extractor-model";
import { resolveExcerptReference } from "../utils.js";

export interface ExcerptProps {
  excerpt: AEExcerpt;
  context: ApiItem;
}

export function Excerpt(props: ExcerptProps) {
  const content: Children = ["<code>"];
  for (const token of props.excerpt.spannedTokens) {
    switch (token.kind) {
      case ExcerptTokenKind.Content:
        content.push(htmlEscape(token.text));
        break;
      case ExcerptTokenKind.Reference: {
        const ref = resolveExcerptReference(token, props.context);
        if (!ref) {
          content.push(htmlEscape(token.text));
        } else {
          content.push(refkey(ref));
        }
        break;
      }
    }
  }
  content.push("</code>");

  return content;
}

function htmlEscape(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}
