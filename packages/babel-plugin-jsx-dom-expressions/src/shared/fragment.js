import * as t from "@babel/types";
import { decode } from "html-entities";
import { filterChildren, trimWhitespace, checkLength,getRendererConfig,registerImportMethod } from "./utils";
import { transformNode, getCreateTemplate } from "./transform";

export default function transformFragmentChildren(path, children, results, config) {
  const filteredChildren = filterChildren(children, config.preserveWhitespace),
    childNodes = filteredChildren.reduce((memo, path) => {
      if (t.isJSXText(path.node)) {
        const v = decode(trimWhitespace(path.node.extra.raw, config.preserveWhitespace));
        if (v.length) memo.push(t.stringLiteral(v));
      } else {
        const child = transformNode(path, { topLevel: true, fragmentChild: true, lastElement: true });
        memo.push(getCreateTemplate(config, path, child)(path, child, true));
      }
      return memo;
    }, []);

  results.exprs.push(t.arrayExpression(childNodes));
}
