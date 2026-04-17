import { List, Output, refkey, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Namespace } from "../namespace/namespace.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { EnumDeclaration } from "./enum-declaration.jsx";
import { EnumMember } from "./enum-member.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a basic enum", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <EnumDeclaration name="Direction">
          <List comma hardline enderPunctuation>
            <EnumMember name="North" />
            <EnumMember name="South" />
            <EnumMember name="East" />
            <EnumMember name="West" />
          </List>
        </EnumDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      enum Direction {
        North,
        South,
        East,
        West,
      }
    `,
  });
});

it("renders an enum with string values", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <EnumDeclaration name="Color">
          <List comma hardline enderPunctuation>
            <EnumMember name="Red" value={`"red"`} />
            <EnumMember name="Green" value={`"green"`} />
            <EnumMember name="Blue" value={`"blue"`} />
          </List>
        </EnumDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      enum Color {
        Red: "red",
        Green: "green",
        Blue: "blue",
      }
    `,
  });
});

it("renders an enum with numeric values", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <EnumDeclaration name="Status">
          <List comma hardline enderPunctuation>
            <EnumMember name="Ok" value="200" />
            <EnumMember name="NotFound" value="404" />
          </List>
        </EnumDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      enum Status {
        Ok: 200,
        NotFound: 404,
      }
    `,
  });
});

it("renders an empty enum", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <EnumDeclaration name="Empty" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      enum Empty {}
    `,
  });
});

it("applies the enum name policy", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <EnumDeclaration name="model" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      enum \`model\` {}
    `,
  });
});

it("does not deconflict enum names across namespaces", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <EnumDeclaration name="Direction" />
        </Namespace>
        <hbr />
        <hbr />
        <Namespace name="B">
          <EnumDeclaration name="Direction" />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A {
        enum Direction {}
      }

      namespace B {
        enum Direction {}
      }
    `,
  });
});

it("deconflicts duplicate enum names within the same namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <StatementList>
            <EnumDeclaration name="Direction" />
            <EnumDeclaration name="Direction" />
          </StatementList>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      enum Direction {};
      enum Direction_2 {};
    `,
  });
});

it("resolves an enum reference from another declaration", () => {
  const directionKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <EnumDeclaration name="Direction" refkey={directionKey} />
          <EnumDeclaration name="ExtendedDirection" />
        </StatementList>
        <hbr />
        <Reference refkey={directionKey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      enum Direction {};
      enum ExtendedDirection {};
      Direction
    `,
  });
});

it("resolves an enum member reference", () => {
  const northKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <EnumDeclaration name="Direction">
          <EnumMember name="North" refkey={northKey} />
        </EnumDeclaration>
        <hbr />
        <Reference refkey={northKey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      enum Direction {
        North
      }
      North
    `,
  });
});
