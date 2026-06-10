import { useContext } from "@alloy-js/core";
import {
  ApiItemKind,
  type ApiInterface,
  type ApiItem,
  type ExcerptToken,
} from "./model/index.js";
import { ApiModelContext } from "./contexts/api-model.js";

export function resolveExcerptReference(
  excerpt: ExcerptToken,
  context: ApiItem,
) {
  const apiModel = useContext(ApiModelContext)!;
  if (!excerpt.referenceId) return;

  return apiModel.resolveReference(excerpt.referenceId);
}

export function cleanExcerpt(excerpt: string) {
  return excerpt
    .replace(/^(export |declare )*/, "")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

export function mdxEscape(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}

export function flattenedMembers(iface: ApiInterface) {
  const members = [...iface.members];

  for (const extendsType of iface.extendsTypes ?? []) {
    const refToken = extendsType.excerpt.spannedTokens.find(
      (t) => t.referenceId !== undefined,
    );
    if (!refToken) continue;
    const apiModel = useContext(ApiModelContext)!;
    const refType = apiModel.resolveReference(refToken.referenceId);
    if (!refType) continue;
    if (refType.kind !== ApiItemKind.Interface) continue;

    members.push(...(refType as ApiInterface).members);
  }

  return members.sort((a, b) => {
    if (a.displayName < b.displayName) {
      return -1;
    }
    if (a.displayName > b.displayName) {
      return 1;
    }
    return 0;
  });
}
