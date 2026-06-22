import { Output, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { DecoratorApplication } from "../decorator/decorator-application.jsx";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { Namespace } from "../namespace/namespace.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { DecoratorDeclaration } from "./decorator-declaration.jsx";

it("renders a basic extern dec declaration", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <DecoratorDeclaration name="doc" target="unknown" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    extern dec doc(target: unknown);
  `);
});

it("renders a decorator with additional parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <DecoratorDeclaration
          name="doc"
          target="unknown"
          parameters={[
            { name: "value", type: "valueof string" },
            { name: "formatArgs", type: "valueof unknown", optional: true },
          ]}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    extern dec doc(
      target: unknown,
      value: valueof string,
      formatArgs?: valueof unknown
    );
  `);
});

it("renders a decorator with a rest parameter", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <DecoratorDeclaration
          name="example"
          target="unknown"
          parameters={[
            { name: "values", type: "valueof string[]", rest: true },
          ]}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    extern dec example(target: unknown, ...values: valueof string[]);
  `);
});

it("renders a decorator with a specific target type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <DecoratorDeclaration name="route" target="Operation" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    extern dec route(target: Operation);
  `);
});

it("renders a decorator with a doc comment", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <DecoratorDeclaration
          name="summary"
          target="unknown"
          doc="Attach a brief summary."
          parameters={[{ name: "summary", type: "valueof string" }]}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    /**
     * Attach a brief summary.
     */
    extern dec summary(target: unknown, summary: valueof string);
  `);
});

it("creates a referenceable symbol usable in decorator application", () => {
  const decKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <DecoratorDeclaration
          name="myDecorator"
          target="Model"
          refkey={decKey}
        />
        <hbr />
        <DecoratorApplication decorator={<Reference refkey={decKey} />} />
        <ModelDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    extern dec myDecorator(target: Model);
    @myDecorator
    model Foo {}
  `);
});

it("can reference a decorator declared in a different namespace", () => {
  const decKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="lib.tsp">
        <Namespace name="MyLib">
          <DecoratorDeclaration name="tag" target="unknown" refkey={decKey} />
        </Namespace>
      </SourceFile>
      <SourceFile path="main.tsp">
        <DecoratorApplication
          decorator={<Reference refkey={decKey} />}
          args={['"important"']}
        />
        <ModelDeclaration name="Pet" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "lib.tsp": `
      namespace MyLib;

      extern dec tag(target: unknown);
    `,
    "main.tsp": `
      import "./lib.tsp";

      using MyLib;

      @tag("important")
      model Pet {}
    `,
  });
});

it("cross-file reference without namespace emits import but no using", () => {
  const decKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="lib.tsp">
        <DecoratorDeclaration name="tag" target="unknown" refkey={decKey} />
      </SourceFile>
      <SourceFile path="main.tsp">
        <DecoratorApplication decorator={<Reference refkey={decKey} />} />
        <ModelDeclaration name="Pet" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "lib.tsp": `
      extern dec tag(target: unknown);
    `,
    "main.tsp": `
      import "./lib.tsp";

      @tag
      model Pet {}
    `,
  });
});
