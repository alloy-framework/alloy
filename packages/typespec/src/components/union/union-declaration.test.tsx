import { List, Output, refkey, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Namespace } from "../namespace/namespace.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { UnionDeclaration } from "./union-declaration.jsx";
import { UnionVariant } from "./union-variant.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a union with anonymous variants", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionDeclaration name="StringOrInt">
          <List comma hardline enderPunctuation>
            <UnionVariant type="string" />
            <UnionVariant type="int32" />
          </List>
        </UnionDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      union StringOrInt {
        string,
        int32,
      }
    `,
  });
});

it("renders a union with named variants", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionDeclaration name="Result">
          <List comma hardline enderPunctuation>
            <UnionVariant name="success" type="string" />
            <UnionVariant name="failure" type="int32" />
          </List>
        </UnionDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      union Result {
        success: string,
        failure: int32,
      }
    `,
  });
});

it("renders a union with mixed anonymous and named variants", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionDeclaration name="Mixed">
          <List comma hardline enderPunctuation>
            <UnionVariant type="string" />
            <UnionVariant name="nothing" type="null" />
          </List>
        </UnionDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      union Mixed {
        string,
        nothing: null,
      }
    `,
  });
});

it("renders an empty union", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionDeclaration name="Empty" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      union Empty {}
    `,
  });
});

it("renders a union with template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionDeclaration name="Maybe" templateParameters={["T"]}>
          <List comma hardline enderPunctuation>
            <UnionVariant name="value" type={<Reference refkey={refkey()} />} />
            <UnionVariant type="null" />
          </List>
        </UnionDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": expect.stringContaining("union Maybe<T>"),
  });
});

it("resolves template parameter references within the union", () => {
  const typeKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionDeclaration
          name="Maybe"
          templateParameters={[{ name: "T", refkey: typeKey }]}
        >
          <List comma hardline enderPunctuation>
            <UnionVariant name="value" type={<Reference refkey={typeKey} />} />
            <UnionVariant type="null" />
          </List>
        </UnionDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      union Maybe<T> {
        value: T,
        null,
      }
    `,
  });
});

it("does not resolve template parameter references outside the union", () => {
  const typeKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionDeclaration
          name="Maybe"
          templateParameters={[{ name: "T", refkey: typeKey }]}
        />
        <hbr />
        <Reference refkey={typeKey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": expect.stringContaining("Unresolved Symbol"),
  });
});

it("applies the union name policy", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionDeclaration name="model" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      union \`model\` {}
    `,
  });
});

it("does not deconflict union names across namespaces", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <UnionDeclaration name="Result" />
        </Namespace>
        <hbr />
        <hbr />
        <Namespace name="B">
          <UnionDeclaration name="Result" />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A {
        union Result {}
      }

      namespace B {
        union Result {}
      }
    `,
  });
});

it("deconflicts duplicate union names within the same namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <StatementList>
            <UnionDeclaration name="Result" />
            <UnionDeclaration name="Result" />
          </StatementList>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      union Result {};
      union Result_2 {};
    `,
  });
});

it("resolves a union reference from another declaration", () => {
  const resultKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <UnionDeclaration name="Result" refkey={resultKey} />
        </StatementList>
        <hbr />
        <Reference refkey={resultKey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      union Result {};
      Result
    `,
  });
});

it("resolves a named union variant reference", () => {
  const successKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionDeclaration name="Result">
          <UnionVariant name="success" type="string" refkey={successKey} />
        </UnionDeclaration>
        <hbr />
        <Reference refkey={successKey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      union Result {
        success: string
      }
      success
    `,
  });
});
