import alloyTransform from "@alloy-js/babel-plugin";
import jsxTransform from "@alloy-js/babel-plugin-jsx-dom-expressions";

export default function (context, options = {}) {
  const defaultOptions = {
    alloyModuleName: "@alloy-js/core",
    moduleName: "@alloy-js/core/jsx-runtime",
    generate: "universal",
    wrapConditionals: true,
    preserveWhitespace: true,
  };

  const plugins = [
    [
      alloyTransform,
      {
        alloyModuleName:
          options.alloyModuleName ?? defaultOptions.alloyModuleName,
        legacyWhitespace: options.legacyWhitespace ?? defaultOptions.legacyWhitespace,
      },
    ],
    [jsxTransform, Object.assign(defaultOptions, options)],
  ];

  return { plugins };
}
