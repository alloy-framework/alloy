import { Output } from "@alloy-js/core";
import { expect, it } from "vitest";
import { DecoratorApplication } from "../decorator/decorator-application.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { Namespace } from "./namespace.jsx";

it("renders a namespace with contents", () => {
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace name="My.Namespace">Contents!</Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    namespace My.Namespace;

    Contents!
  `);
});

it("renders namespaces when a file level namespace is present", () => {
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace name="File.Level">
          <Namespace name="My.Namespace">Contents!</Namespace>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    namespace File.Level;

    namespace My.Namespace {
      Contents!
    }
  `);
});

it("renders a namespace with a doc comment", () => {
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace name="MyApi" doc="My API namespace">
          Contents!
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    /**
     * My API namespace
     */
    namespace MyApi;

    Contents!
  `);
});

it("renders a namespace with decorators", () => {
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace
          name="MyApi"
          decorators={<DecoratorApplication decorator="service" />}
        >
          Contents!
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    @service
    namespace MyApi;

    Contents!
  `);
});

it("renders a nested namespace with doc and decorators", () => {
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace name="File.Level">
          <Namespace
            name="Inner"
            doc="Inner namespace"
            decorators={<DecoratorApplication decorator="service" />}
          >
            Contents!
          </Namespace>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    namespace File.Level;

    /**
     * Inner namespace
     */
    @service
    namespace Inner {
      Contents!
    }
  `);
});

it("renders a namespace with doc, directives, and decorators", () => {
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace
          name="MyApi"
          doc="My API"
          directives={
            <>
              #suppress "no-unused" "testing"
              <hbr />
            </>
          }
          decorators={<DecoratorApplication decorator="service" />}
        >
          Contents!
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    /**
     * My API
     */
    #suppress "no-unused" "testing"
    @service
    namespace MyApi;

    Contents!
  `);
});
