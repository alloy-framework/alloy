import { NodePath } from "@babel/core";
import SyntaxJSX from "@babel/plugin-syntax-jsx";
import * as t from "@babel/types";

import { transformJSX } from "./transform.js";

export default () => {
  return {
    name: "Alloy JSX Transform",
    inherits: SyntaxJSX.default ?? SyntaxJSX,
    visitor: {
      JSXElement: transformJSX,
      JSXFragment: transformJSX,
      ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
        const source = path.node.source.value;
        if (source.endsWith(".jsx")) {
          path.node.source = t.stringLiteral(source.replace(".jsx", ".js"));
        }
      },

      ExportNamedDeclaration(path: NodePath<t.ExportNamedDeclaration>) {
        const source = path.node.source?.value;
        if (source && source.endsWith(".jsx")) {
          path.node.source = t.stringLiteral(source.replace(".jsx", ".js"));
        }
      },

      ExportAllDeclaration(path: NodePath<t.ExportAllDeclaration>) {
        const source = path.node.source.value;
        if (source.endsWith(".jsx")) {
          path.node.source = t.stringLiteral(source.replace(".jsx", ".js"));
        }
      },
    },
  };
};
