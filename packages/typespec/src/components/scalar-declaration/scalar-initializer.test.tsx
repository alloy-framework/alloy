import { Output, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Namespace } from "../namespace/namespace.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ScalarDeclaration } from "./scalar-declaration.jsx";
import { ScalarInitializer } from "./scalar-initializer.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a scalar initializer", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="ipv4" extends="string">
          <StatementList>
            <ScalarInitializer
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

it("renders multiple scalar initializers", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="ipv4" extends="string">
          <StatementList>
            <ScalarInitializer
              name="fromInt"
              parameters={[{ name: "value", type: "uint32" }]}
            />
            <ScalarInitializer
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

it("renders a scalar initializer with multiple parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="point" extends="string">
          <StatementList>
            <ScalarInitializer
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

it("renders a scalar initializer with no parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="myScalar" extends="string">
          <StatementList>
            <ScalarInitializer name="create" />
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
            <ScalarInitializer
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

it("renders a scalar initializer inside a namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="Network">
          <ScalarDeclaration name="ipv4" extends="string">
            <StatementList>
              <ScalarInitializer
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

it("renders a scalar initializer with optional parameter", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="myScalar" extends="string">
          <StatementList>
            <ScalarInitializer
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
