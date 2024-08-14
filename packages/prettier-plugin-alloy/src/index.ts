import type {
  AstPath,
  Parser,
  ParserOptions,
  Plugin,
  Printer,
  SupportLanguage,
} from "prettier";
import { parsers as babelParsers } from "prettier/plugins/babel";
// @ts-expect-error - This is not exposed by prettier https://github.com/prettier/prettier/issues/4424
import { printers as estreePrinters } from "prettier/plugins/estree";
import { parsers as tsParsers } from "prettier/plugins/typescript";

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

const preprocess = (
  parserName: string,
  text: string,
  options: ParserOptions,
) => {
  const pluginsFromOptions = options.plugins ?? [];
  const pluginsWithRelevantParsers = findPluginsByParserName(
    parserName,
    pluginsFromOptions,
  );

  const pluginsWithPreprocessor = pluginsWithRelevantParsers.filter(
    (plugin) => !!plugin.parsers?.[parserName]?.preprocess,
  );

  let processedText = text;

  pluginsWithPreprocessor.forEach((pluginWithPreprocessor) => {
    const nextText = pluginWithPreprocessor.parsers?.[parserName]?.preprocess?.(
      processedText,
      {
        ...options,
        plugins: pluginsFromOptions.filter(
          (plugin) => (plugin as Plugin).parsers !== parsers,
        ),
      },
    );
    if (nextText !== undefined) {
      processedText = nextText;
    }
  });

  options.printer = printers.estree;
  return processedText;
};

function wrap<K extends string>(parsers: Record<K, Parser>, parserName: K) {
  const parser = parsers[parserName];
  return {
    ...parser,
    preprocess: (code: string, options: ParserOptions) =>
      preprocess(
        parserName,
        parser.preprocess ? parser.preprocess(code, options) : code,
        options,
      ),
  };
}

function findPluginsByParserName(
  parserName: string,
  plugins: (Plugin | string)[],
): Plugin[] {
  return plugins.filter((plugin): plugin is Plugin => {
    return (
      typeof plugin === "object" &&
      plugin.parsers !== parsers &&
      !!plugin.parsers?.[parserName]
    );
  });
}

export const parsers = {
  typescript: wrap(tsParsers, "typescript"),

  "alloy-ts": wrap(tsParsers, "typescript"),
  "alloy-js": wrap(babelParsers, "babel"),
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
