import type {
  AstPath,
  Options,
  Plugin,
  Printer,
  SupportLanguage,
} from "prettier";
// @ts-expect-error - This is not exposed by prettier https://github.com/prettier/prettier/issues/4424
import { printers as estreePrinters } from "prettier/plugins/estree";
import { parsers as tsParsers } from "prettier/plugins/typescript";
import { parsers as babelParsers } from "prettier/plugins/babel";

const printers = {
  estree: {
    ...estreePrinters.estree,
    print: (path: AstPath<any>, options, print) => {
      if (path.node.type === "JSXElement" || path.node.type === "JSXFragment") {
        return options.originalText.slice(
          path.node.range[0],
          path.node.range[1],
        );
      }
      return estreePrinters.estree.print(path, options, print);
    },
  },
} satisfies Record<string, Printer>;

const preprocess = (text: string, options: Options) => {
  options.printer = printers.estree;
  return text;
};

export const parsers = {
  "alloy-ts": {
    ...tsParsers.typescript,
    preprocess,
  },
  "alloy-js": {
    ...babelParsers.babel,
    preprocess,
  },
};

export const languages = [
  {
    name: "alloy-ts",
    extensions: [".alloy.tsx"],
    parsers: ["alloy-ts"],
  },
  {
    name: "alloy-js",
    extensions: [".alloy.jsx"],
    parsers: ["alloy-js"],
  },
] satisfies SupportLanguage[];
