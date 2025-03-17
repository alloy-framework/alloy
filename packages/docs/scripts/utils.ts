import { useContext } from "@alloy-js/core";
import {
  ApiItemKind,
  type ApiInterface,
  type ApiItem,
  type ExcerptToken,
} from "@microsoft/api-extractor-model";
import { ApiModelContext } from "./contexts/api-model.js";

export function resolveExcerptReference(
  excerpt: ExcerptToken,
  context: ApiItem,
) {
  const apiModel = useContext(ApiModelContext)!;
  if (!excerpt.canonicalReference) return;

  return apiModel.resolveDeclarationReference(
    excerpt.canonicalReference,
    context,
  ).resolvedApiItem;
}

export function cleanExcerpt(excerpt: string) {
  return excerpt.replace(/^(export |declare )*/, "");
}

export function flattenedMembers(iface: ApiInterface) {
  const members = [...iface.members];

  for (const extendsType of iface.extendsTypes ?? []) {
    const refType = resolveExcerptReference(
      extendsType.excerpt.spannedTokens[0],
      iface,
    );
    if (!refType) continue;
    if (refType.kind !== ApiItemKind.Interface) continue;

    members.push(...refType.members);
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
