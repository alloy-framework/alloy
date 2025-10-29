import { expect, it } from "vitest";
import { Output } from "@alloy-js/core";
import { SourceFile } from "#components/source-file/source-file.jsx";
import { Namespace } from "./block.jsx";
import { d } from "@alloy-js/core/testing";

it("renders a namespace with contents", () => {
    expect(
      <Output>
          <SourceFile path="main.tsp">
            <Namespace name="My.Namespace">
                Contents!
            </Namespace>
          </SourceFile>
      </Output>,
    ).toRenderTo({
      "main.tsp": d`
        namespace My.Namespace {
          Contents!
        }`,
    });
});

it("renders nested block namespaces", () => {
    expect(
      <Output>
          <SourceFile path="main.tsp">
            <Namespace name="My.Namespace">
                <Namespace name="Inner.Namespace">
                    Inner Contents!
                </Namespace>
            </Namespace>
          </SourceFile>
      </Output>,
    ).toRenderTo({
      "main.tsp": d`
        namespace My.Namespace {
          namespace Inner.Namespace {
            Inner Contents!
          }
        }`,
    });
});

it("renders namespaces when a file level namespace is present", () => {
    expect(
      <Output>
          <SourceFile path="main.tsp" namespace="File.Level">
            <Namespace name="My.Namespace">
                Contents!
            </Namespace>
          </SourceFile>
      </Output>,
    ).toRenderTo({
      "main.tsp": d`
        namespace File.Level;

        namespace My.Namespace {
          Contents!
        }`,
    });
});