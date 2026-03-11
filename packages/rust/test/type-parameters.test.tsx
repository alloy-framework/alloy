import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { TypeParameters, WhereClause } from "../src/components/type-parameters.js";

describe("TypeParameters", () => {
  it("renders a single type parameter", () => {
    expect(<TypeParameters params={[{ name: "T" }]} />).toRenderTo(d`<T>`);
  });

  it("renders multiple type parameters", () => {
    expect(
      <TypeParameters params={[{ name: "T" }, { name: "U" }]} />,
    ).toRenderTo(d`<T, U>`);
  });

  it("renders a single constrained parameter", () => {
    expect(
      <TypeParameters params={[{ name: "T", constraint: "Display" }]} />,
    ).toRenderTo(d`<T: Display>`);
  });

  it("renders mixed constrained and unconstrained parameters", () => {
    expect(
      <TypeParameters
        params={[
          { name: "T" },
          { name: "U", constraint: "Display + Clone" },
        ]}
      />,
    ).toRenderTo(d`<T, U: Display + Clone>`);
  });

  it("renders nothing for empty params", () => {
    expect(
      <>
        fn value
        <TypeParameters params={[]} />
      </>,
    ).toRenderTo(d`fn value`);
  });

  it("renders nothing for undefined params", () => {
    expect(
      <>
        fn value
        <TypeParameters />
      </>,
    ).toRenderTo(d`fn value`);
  });
});

describe("WhereClause", () => {
  it("renders a single where clause constraint", () => {
    expect(<WhereClause>T: Display + Clone</WhereClause>).toRenderTo(
      d`where T: Display + Clone`,
    );
  });

  it("renders multiple where clause constraints", () => {
    expect(
      <WhereClause>T: Display + Clone, U: Debug</WhereClause>,
    ).toRenderTo(d`where T: Display + Clone, U: Debug`);
  });

  it("renders nothing when children are missing", () => {
    expect(
      <>
        {"impl<T> Thing"}
        <WhereClause />
      </>,
    ).toRenderTo(d`impl<T> Thing`);
  });
});
