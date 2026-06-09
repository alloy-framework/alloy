import { describe, expect, it } from "vitest";
import { generateDocsSection } from "../src/commands/install-docs.js";

const samplePackages = [
  {
    name: "@alloy-js/core",
    description: "Core package",
    docsAbsPath: "/abs/node_modules/@alloy-js/core/docs",
    indexRelPath: "node_modules/@alloy-js/core/docs/index.md",
  },
];

describe("generateDocsSection", () => {
  it("emits H1 top heading and H2 section heading when topLevel=1", () => {
    const out = generateDocsSection(samplePackages, { topHeadingLevel: 1 });
    expect(out).toContain("\n# Alloy Framework\n");
    expect(out).toContain("\n## Installed Package Documentation\n");
  });

  it("emits H5 top heading and H6 section heading when topLevel=5", () => {
    const out = generateDocsSection(samplePackages, { topHeadingLevel: 5 });
    expect(out).toContain("\n##### Alloy Framework\n");
    expect(out).toContain("\n###### Installed Package Documentation\n");
  });
});
