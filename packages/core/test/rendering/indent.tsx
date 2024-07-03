// prettier-ignore
import { it, expect } from "vitest";
import "../extend-expect.util.js";
import { Indent } from "../../src/components/indent.jsx";
import { a } from "vitest/dist/suite-IbNSsUWN.js";

it("indents explicitly indented content", () => {
  // prettier-ignore
  expect(
    <>
      one
      <Indent>
        hi
        bye
      </Indent>
    </>
  ).toRenderTo(`
    one
      hi
      bye
  `)
});

it("indents implicitly indented components", () => {
  function Foo() {
    return <>
      hi
      bye
    </>;
  }

  expect(
    <>
      one
        <Foo />
    </>
  ).toRenderTo(`
    one
      hi
      bye
  `)
});

it("indents multiple implicitly indented components", () => {
  function Foo() {
    return <>
      hi
      bye
    </>;
  }

  expect(
    <>
      one
        <Foo />
        <Foo />
      
      two
        <Foo />
        <Foo />
    </>
  ).toRenderTo(`
    one
      hi
      bye
      hi
      bye

    two
      hi
      bye
      hi
      bye
  `)
});

it("indents memos", () => {
  function getValue() {
    return "hi";
  }

  expect(<>
    base
    <Indent>
      {getValue()}
    </Indent>
    <Indent>
      {getValue()}
      bye
    </Indent>
    <Indent>
      bye
      {getValue()}
    </Indent>
  </>).toRenderTo(`
    base
      hi
      hi
      bye
      bye
      hi
  `);
})

it("indents arrays of components (map scenario)", () => {

  function Foo() {
    return <>
      a
      b
    </>
  }

  const foos = [
    <Foo />,
    "\n",
    <Foo />
  ]

  expect(<>
    base
      {foos}
  </>).toRenderTo(`
    base
      a
      b
      a
      b
  `)
})

it("indents children", () => {
  function Foo(props: any) {
    return <>
      a
      {props.children}
      b
    </>
  }

  expect(<>
    base
      <Foo>
        child
      </Foo>
  </>).toRenderTo(`
    base
      a
      child
      b
  `)
})