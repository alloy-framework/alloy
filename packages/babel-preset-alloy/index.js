import alloyTransform from "@alloy-js/babel-plugin";
import jsxTransform from "@alloy-js/babel-plugin-jsx-dom-expressions";

export default function (context, options = {}) {
  const envMode = process.env.BABEL_ENV ?? process.env.NODE_ENV;
  const inferredDev = envMode === undefined ? true : envMode !== "production";
  const defaultOptions = {
    alloyModuleName: "@alloy-js/core",
    moduleName: "@alloy-js/core/jsx-runtime",
    generate: "universal",
    wrapConditionals: true,
    preserveWhitespace: true,
  };

  const jsxOptions = Object.assign({}, defaultOptions, options);
  if (options.addSourceInfo === undefined) {
    if (options.dev !== undefined) {
      jsxOptions.addSourceInfo = options.dev;
    } else {
      jsxOptions.addSourceInfo = inferredDev;
    }
  }

  const plugins = [
    [
      alloyTransform,
      {
        alloyModuleName:
          options.alloyModuleName ?? defaultOptions.alloyModuleName,
        legacyWhitespace:
          options.legacyWhitespace ?? defaultOptions.legacyWhitespace,
      },
    ],
    [jsxTransform, jsxOptions],
  ];

  return { plugins };
}
