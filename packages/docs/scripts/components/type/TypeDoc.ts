import { ApiInterface, ApiItemKind } from "@microsoft/api-extractor-model";
import type { TypeApi } from "../../build-json.js";
import {
  DocSourceFile,
  Examples,
  Excerpt,
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

  return DocSourceFile({ title, declares: [apiType] }).children(
    Summary({ type: apiType }),
    apiType.kind === ApiItemKind.TypeAlias ?
      Excerpt({ excerpt: apiType.excerpt, context: apiType })
    : TypeMembers({ type: apiType as ApiInterface }),
    Remarks({ type: apiType }),
    Examples({ type: apiType }),
    SeeAlso({ type: apiType }),
  );
}
