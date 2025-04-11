import { describe, expect, it } from "vitest";
import {
  Children,
  createTap,
  Declaration,
  List,
  Output,
  ReferenceOrContent,
  Refkey,
  refkey,
  resolve,
  Scope,
  SourceFile,
  useBinder,
} from "../../src/index.js";
import { d, renderToString } from "../../testing/render.js";

function TestWrapper(props: { children: Children }) {
  const GetBinder = createTap(() => {
    return useBinder();
  });

  function Reference(props: { refkey: Refkey }) {
    const result = resolve(props.refkey);
    return result.value.targetDeclaration.name;
  }

  return (
    <Output>
      <SourceFile path="test.txt" filetype="txt" reference={Reference}>
        <GetBinder />
        <Scope>
          <List>{props.children}</List>
        </Scope>
      </SourceFile>
    </Output>
  );
}

describe("render the reference name if a declaration exists", () => {
  it("declaration is before", () => {
    const rk1 = refkey();
    const template = (
      <TestWrapper>
        <Declaration name="A" refkey={rk1}>
          Declare A
        </Declaration>
        <ReferenceOrContent refkey={rk1}>No Reference A</ReferenceOrContent>
      </TestWrapper>
    );

    expect(renderToString(template)).toEqual(d`
      Declare A
      A
    `);
  });

  it("declaration is after", () => {
    const rk1 = refkey();
    const template = (
      <TestWrapper>
        <ReferenceOrContent refkey={rk1}>No Reference A</ReferenceOrContent>
        <Declaration name="A" refkey={rk1}>
          Declare A
        </Declaration>
      </TestWrapper>
    );

    expect(renderToString(template)).toEqual(d`
    A
    Declare A
  `);
  });
});

it("render content if there is not declaration attached to symbol", () => {
  const rk1 = refkey();
  const template = (
    <TestWrapper>
      <ReferenceOrContent refkey={rk1}>No Reference A</ReferenceOrContent>
    </TestWrapper>
  );

  expect(renderToString(template)).toEqual(d`
    No Reference A
  `);
});

it("mixed", () => {
  const rk1 = refkey();
  const rk2 = refkey();
  const template = (
    <TestWrapper>
      <Declaration name="A" refkey={rk1}>
        Declare A
      </Declaration>
      <ReferenceOrContent refkey={rk1}>No Reference A</ReferenceOrContent>
      <ReferenceOrContent refkey={rk2}>No Reference B</ReferenceOrContent>
    </TestWrapper>
  );

  expect(renderToString(template)).toEqual(d`
    Declare A
    A
    No Reference B
  `);
});
