import { Output, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Namespace } from "../namespace/namespace.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ScalarConstructor } from "./scalar-constructor.jsx";
import { ScalarDeclaration } from "./scalar-declaration.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a scalar constructor", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="ipv4" extends="string">
          <StatementList>
            <ScalarConstructor
              name="fromInt"
              parameters={[{ name: "value", type: "uint32" }]}
            />
          </StatementList>
        </ScalarDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar ipv4 extends string {
        init fromInt(value: uint32);
      }
    `);
});

it("renders multiple scalar constructors", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="ipv4" extends="string">
          <StatementList>
            <ScalarConstructor
              name="fromInt"
              parameters={[{ name: "value", type: "uint32" }]}
            />
            <ScalarConstructor
              name="fromString"
              parameters={[{ name: "value", type: "string" }]}
            />
          </StatementList>
        </ScalarDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar ipv4 extends string {
        init fromInt(value: uint32);
        init fromString(value: string);
      }
    `);
});

it("renders a scalar constructor with multiple parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="point" extends="string">
          <StatementList>
            <ScalarConstructor
              name="fromCoords"
              parameters={[
                { name: "x", type: "float64" },
                { name: "y", type: "float64" },
              ]}
            />
          </StatementList>
        </ScalarDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar point extends string {
        init fromCoords(x: float64, y: float64);
      }
    `);
});

it("renders a scalar constructor with no parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="myScalar" extends="string">
          <StatementList>
            <ScalarConstructor name="create" />
          </StatementList>
        </ScalarDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar myScalar extends string {
        init create();
      }
    `);
});

it("renders a scalar body without extends", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="myScalar">
          <StatementList>
            <ScalarConstructor
              name="fromInt"
              parameters={[{ name: "value", type: "int32" }]}
            />
          </StatementList>
        </ScalarDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar myScalar {
        init fromInt(value: int32);
      }
    `);
});

it("renders a scalar constructor inside a namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="Network">
          <ScalarDeclaration name="ipv4" extends="string">
            <StatementList>
              <ScalarConstructor
                name="fromInt"
                parameters={[{ name: "value", type: "uint32" }]}
              />
            </StatementList>
          </ScalarDeclaration>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace Network;

      scalar ipv4 extends string {
        init fromInt(value: uint32);
      }
    `);
});

it("renders a scalar constructor with optional parameter", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="myScalar" extends="string">
          <StatementList>
            <ScalarConstructor
              name="parse"
              parameters={[
                { name: "value", type: "string" },
                { name: "format", type: "string", optional: true },
              ]}
            />
          </StatementList>
        </ScalarDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar myScalar extends string {
        init parse(value: string, format?: string);
      }
    `);
});
