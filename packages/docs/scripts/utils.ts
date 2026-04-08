import { useContext } from "@alloy-js/core";
import {
  ApiItemKind,
  type ApiInterface,
  type ApiItem,
  type ExcerptToken,
} from "@microsoft/api-extractor-model";
import type { DocDeclarationReference } from "@microsoft/tsdoc";
import { DeclarationReference } from "@microsoft/tsdoc/lib-commonjs/beta/DeclarationReference.js";
import { ApiModelContext } from "./contexts/api-model.js";

export function normalizeDeclarationReference(
  reference: unknown,
): DeclarationReference | DocDeclarationReference | undefined {
  if (!reference) return;
  if (typeof reference === "string") {
    return DeclarationReference.parse(reference);
  }
  return reference as DeclarationReference | DocDeclarationReference;
}

export function resolveExcerptReference(
  excerpt: ExcerptToken,
  context: ApiItem,
) {
  const apiModel = useContext(ApiModelContext)!;
  const reference = normalizeDeclarationReference(excerpt.canonicalReference);
  if (!reference) return;

  return apiModel.resolveDeclarationReference(reference, context)
    .resolvedApiItem;
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
