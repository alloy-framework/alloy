const jsxTransform = require('babel-plugin-jsx-dom-expressions');
module.exports = function (context, options = {}) {
  const defaultOptions = {
    moduleName: "@alloyjs/core/jsx-runtime",
    generate: "universal",
    wrapConditionals: true,
    preserveWhitespace: true,
  };

  const plugins = [[jsxTransform, Object.assign(defaultOptions, options)]];

  return { plugins };
}
