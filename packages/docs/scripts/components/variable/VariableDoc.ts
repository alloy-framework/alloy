import type { VariableApi } from "../../build-json.js";
import {
  DocDeclaration,
  Examples,
  Excerpt,
  Frontmatter,
  MdxSourceFile,
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

  return MdxSourceFile({ path: title + ".mdx" }).children(
    DocDeclaration({
      name: title,
      apiItem: apiVariable,
    }),
    Frontmatter({ title }),
    Summary({ type: apiVariable }),
    Excerpt({ excerpt: apiVariable.excerpt, context: apiVariable }),
    Remarks({ type: apiVariable }),
    Examples({ type: apiVariable }),
    SeeAlso({ type: apiVariable }),
  );
}
