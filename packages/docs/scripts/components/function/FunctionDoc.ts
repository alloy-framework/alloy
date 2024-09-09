import { mapJoin } from "@alloy-js/core";
import type { FunctionApi } from "../../build-json.js";
import {
  DocDeclaration,
  Frontmatter,
  FunctionOverloadDoc,
  MdxSourceFile,
} from "../stc/index.js";

export interface FunctionDocProps {
  fn: FunctionApi;
}

export function FunctionDoc(props: FunctionDocProps) {
  const title = props.fn.functions[0].displayName;

  return MdxSourceFile({ path: title + ".mdx" }).children(
    DocDeclaration({
      name: title,
      apiItem: props.fn.functions[0],
    }),
    Frontmatter({ title }),
    mapJoin(
      props.fn.functions,
      (fn) =>
        FunctionOverloadDoc({
          fn,
          omitOverloadIndex: props.fn.functions.length === 1,
        }),
      {
        joiner: "\n\n",
      },
    ),
  );
}

/*

function writeFunctionDoc(fn: ApiFunction) {
  const overloads = fn.getMergedSiblings() as ApiFunction[];
  const sigs = overloads
    .map(
      (fn) => `
      ${overloads.length > 1 ? "## Overload " + fn.overloadIndex : ""}

      <Code code={\`${signatureHelp(fn)}\`} lang="ts" />
      ${renderFunctionDocComment(fn)}
      ${renderFunctionParameters(fn)}
      ${renderFunctionOptions(fn)}
      ${renderFunctionReturnType(fn)}
    `,
    )
    .join("\n");

  const doc = `---
title: ${fn.displayName}
---
import { Code } from '@astrojs/starlight/components';

${sigs}
`;
  writeFileSync(mdPath("core", "functions", fn.displayName), doc);
}

*/
