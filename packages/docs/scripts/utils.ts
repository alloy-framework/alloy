import { useContext } from "@alloy-js/core";
import type { ApiItem, ExcerptToken } from "@microsoft/api-extractor-model";
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
