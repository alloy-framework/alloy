import { refkey, type Children } from "@alloy-js/core";
import {
  ExcerptTokenKind,
  type Excerpt as AEExcerpt,
  type ApiItem,
} from "../model/index.js";
import { mdxEscape, resolveExcerptReference } from "../utils.js";

export interface ExcerptProps {
  excerpt: AEExcerpt;
  context: ApiItem;
}

export function Excerpt(props: ExcerptProps) {
  const content: Children = [];
  for (const token of props.excerpt.spannedTokens) {
    switch (token.kind) {
      case ExcerptTokenKind.Content:
        content.push(mdxEscape(token.text));
        break;
      case ExcerptTokenKind.Reference: {
        const ref = resolveExcerptReference(token, props.context);
        if (!ref) {
          content.push(mdxEscape(token.text));
        } else {
          content.push(refkey(ref));
        }
        break;
      }
    }
  }

  return content;
}
