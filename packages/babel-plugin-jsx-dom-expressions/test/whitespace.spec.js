const path = require("path");
const pluginTester = require("babel-plugin-tester").default;
const plugin = require("../index");

pluginTester({
  plugin,
  pluginOptions: {
    moduleName: "r-custom",
    generate: "dom",
    preserveWhitespace: true
  },
  title: "Convert JSX",
  fixtures: path.join(__dirname, "__whitespace_fixtures__"),
  snapshot: true
});
