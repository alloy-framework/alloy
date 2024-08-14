import type { AstPath, Options, Plugin, SupportLanguage } from "prettier";
// @ts-ignore
import { printers as estreePrinters } from "prettier/plugins/estree";
import { parsers as tsParsers } from "prettier/plugins/typescript";
import { parsers as babelParsers } from "prettier/plugins/babel";

const printers = {
  estree: {
    ...estreePrinters.estree,
    print: (path: AstPath<any>, options, print) => {
      if (path.node.type === "JSXElement") {
        return options.originalText.slice(
          path.node.range[0],
          path.node.range[1]
        );
      }
      return estreePrinters.estree.print(path, options, print);
    },
  },
} satisfies Plugin["printers"];

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
    name: "Alloy-TS",
    extensions: [".alloy.tsx"],
    parsers: ["alloy-ts"],
  },
  {
    name: "Alloy-JS",
    extensions: [".alloy.jsx"],
    parsers: ["alloy-js"],
  },
] satisfies SupportLanguage[];
