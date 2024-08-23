import SyntaxJSX from "@babel/plugin-syntax-jsx";
import { transformJSX } from "./transform.js";
import { CodeGenerator, GeneratorResult } from "@babel/generator";
import PrinterMod from "@babel/generator/lib/printer.js";
import * as t from "@babel/types";
import { NodePath } from "@babel/traverse";
// when vite runs, PrinterMod is printer, otherwise PrinterMod.default is.
// esm is so much fun.
const Printer = PrinterMod.default ?? PrinterMod;

class JSXPreservingPrinter extends Printer {
  JSXElement(this: any, node: t.JSXElement) {
    const oldIndent = this._indent;
    this._indent = 0;
    const open = node.openingElement;
    this.print(open, node);
    if (open.selfClosing) return;

    for (const child of node.children) {
      this.print(child, node);
    }

    this.print(node.closingElement, node);
    this._indent = oldIndent;
  }

  JSXFragment(this: any, node: t.JSXFragment) {
    const oldIndent = this._indent;
    this._indent = 0;
    this.print(node.openingFragment, node);

    for (const child of node.children) {
      this.print(child, node);
    }

    this.print(node.closingFragment, node);
    this._indent = oldIndent;
  }
}
class JSXPreservingGenerator extends CodeGenerator {
  generate(): GeneratorResult {
    const printer = new (JSXPreservingPrinter as any)(
      (this as any)._format,
      (this as any)._map,
    );

    return printer.generate((this as any)._ast);
  }
}

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
    generatorOverride(ast: any, opts: any) {
      const generator = new JSXPreservingGenerator(ast, opts);
      return generator.generate();
    },
  };
};
