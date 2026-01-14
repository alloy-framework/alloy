const defaultAddSourceInfo = (() => {
  const envMode = process.env.BABEL_ENV ?? process.env.NODE_ENV;
  return envMode === undefined ? true : envMode !== "production";
})();

export default {
  moduleName: "dom",
  generate: "dom",
  hydratable: false,
  delegateEvents: true,
  delegatedEvents: [],
  builtIns: [],
  requireImportSource: false,
  wrapConditionals: true,
  omitNestedClosingTags: false,
  contextToCustomElements: false,
  staticMarker: "@once",
  effectWrapper: "effect",
  memoWrapper: "memo",
  validate: true,
  preserveWhitespace: false,
  // Whether to include fileName/lineNumber/columnNumber debug info in JSX output
  addSourceInfo: defaultAddSourceInfo,
};
