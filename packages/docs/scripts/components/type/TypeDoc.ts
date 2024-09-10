import { ApiInterface, ApiItemKind } from "@microsoft/api-extractor-model";
import type { TypeApi } from "../../build-json.js";
import {
  DocDeclaration,
  Examples,
  Excerpt,
  Frontmatter,
  MdxSourceFile,
  Remarks,
  SeeAlso,
  Summary,
  TypeMembers,
} from "../stc/index.js";

export interface TypeDocProps {
  type: TypeApi;
}

export function TypeDoc(props: TypeDocProps) {
  const apiType = props.type.type;
  const title = apiType.displayName;

  return MdxSourceFile({ path: title + ".mdx" }).children(
    DocDeclaration({
      name: title,
      apiItem: apiType,
    }),
    Frontmatter({ title }),
    Summary({ type: apiType }),
    apiType.kind === ApiItemKind.TypeAlias ?
      Excerpt({ excerpt: apiType.excerpt, context: apiType })
    : TypeMembers({ type: apiType as ApiInterface }),
    Remarks({ type: apiType }),
    Examples({ type: apiType }),
    SeeAlso({ type: apiType }),
  );
}
