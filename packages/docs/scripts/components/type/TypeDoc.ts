import {
  ApiClass,
  ApiInterface,
  ApiItemKind,
} from "@microsoft/api-extractor-model";
import type { TypeApi } from "../../build-json.js";
import { cleanExcerpt } from "../../utils.js";
import {
  Code,
  DocSourceFile,
  Examples,
  MdxParagraph,
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
      MdxParagraph().children(
        Code({ language: "ts" }).children(cleanExcerpt(apiType.excerpt.text)),
      )
    : TypeMembers({ type: apiType as ApiInterface | ApiClass }),
    Remarks({ type: apiType }),
    Examples({ type: apiType }),
    SeeAlso({ type: apiType }),
  );
}
