import type { VariableApi } from "../../build-json.js";
import { cleanExcerpt } from "../../utils.js";
import {
  Code,
  DocSourceFile,
  Examples,
  MdxParagraph,
  Remarks,
  SeeAlso,
  Summary,
} from "../stc/index.js";

export interface VariableDocProps {
  variable: VariableApi;
}

export function VariableDoc(props: VariableDocProps) {
  const apiVariable = props.variable.variable;

  const title = props.variable.variable.displayName;

  return DocSourceFile({ title, declares: apiVariable }).children(
    Summary({ type: apiVariable }),
    MdxParagraph().children(
      Code({ language: "ts" }).children(cleanExcerpt(apiVariable.excerpt.text)),
    ),
    Remarks({ type: apiVariable }),
    Examples({ type: apiVariable }),
    SeeAlso({ type: apiVariable }),
  );
}
