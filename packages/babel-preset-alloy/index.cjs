const jsxTransform = require('@alloy-js/babel-plugin-jsx-dom-expressions');
module.exports = function (context, options = {}) {
  const defaultOptions = {
    moduleName: "@alloy-js/core/jsx-runtime",
    generate: "universal",
    wrapConditionals: true,
    preserveWhitespace: true,
  };

  const plugins = [[jsxTransform, Object.assign(defaultOptions, options)]];

  return { plugins };
}
