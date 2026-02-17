import { Declaration, Output } from "@alloy-js/core";
import { d, renderToString } from "@alloy-js/core/testing";
import { beforeEach, expect, it } from "vitest";
import { resetGlobalNamespace } from "../../contexts/index.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import { SourceFile } from "../source-file/source-file.jsx";
import { Name } from "./name.jsx";

beforeEach(() => {
  resetGlobalNamespace();
});

it("throws when used without a declaration context", () => {
  expect(() =>
    renderToString(
      <Output>
        <SourceFile path="main.tsp">
          <Name />
        </SourceFile>
      </Output>,
    ),
  ).toThrow("missing declaration context");
});

it("renders the current declaration's name", () => {
  const policy = createTypeSpecNamePolicy();

  expect(
    <Output namePolicy={policy}>
      <SourceFile path="main.tsp">
        <Declaration
          symbol={createNamedTypeSymbol("Foo", "scalar", {
            namePolicy: policy.for("scalar"),
          })}
        >
          <Name />
        </Declaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": d`
      Foo
    `,
  });
});

it("renders the policy-adjusted name", () => {
  const policy = createTypeSpecNamePolicy();

  expect(
    <Output namePolicy={policy}>
      <SourceFile path="main.tsp">
        <Declaration
          symbol={createNamedTypeSymbol("model", "scalar", {
            namePolicy: policy.for("scalar"),
          })}
        >
          <Name />
        </Declaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": d`
      \`model\`
    `,
  });
});
