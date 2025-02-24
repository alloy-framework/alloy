import { describe, expect, it } from "vitest";
import { Children } from "../../src/jsx-runtime.js";
import "../../testing/extend-expect.js";
describe("string nodes", () => {
  it("renders string nodes with substitutions", () => {
    const str = "hi";
    expect(<>
      a {str}<hbr />
      {str}
    </>).toRenderTo(`
      a hi
      hi
    `);
  });
});

describe("component nodes", () => {
  function Str() {
    return "Str";
  }

  function Arr() {
    return ["Item 1", "\n" + "Item 2"];
  }

  function Nested() {
    return <Str />;
  }

  it("renders basic component", () => {
    expect(<Str />).toRenderTo("Str");
  });

  it("renders array components", () => {
    expect(<Arr />).toRenderTo("Item 1\nItem 2");
  });

  it("renders nested components", () => {
    expect(<Nested />).toRenderTo("Str");
  });

  it("renders components on same line", () => {
    expect(<>
      <Str /> <Str />
    </>).toRenderTo("Str Str");
  });
});

describe("memo nodes", () => {
  function getStr() {
    return "Str";
  }
  function Foo() {
    return "Foo";
  }
  function getFoo() {
    return <Foo />;
  }
  function getArr() {
    return [<Foo />, "\n", <Foo />];
  }

  it("renders basic memos", () => {
    expect(<>
      {getStr()}
    </>).toRenderTo("Str");
  });

  it("renders component memos", () => {
    expect(<>
      {getFoo()}
    </>).toRenderTo("Foo");
  });

  it("renders array memos", () => {
    expect(<>
      {getArr()}
    </>).toRenderTo("Foo\nFoo");
  });
});

describe("array nodes", () => {
  it("renders basic arrays", () => {
    expect([["hi", " ", "hi"]]).toRenderTo("hi hi");
  });
});

it("renders text fragments", () => {
  function Foo() {
    return "bye";
  }

  expect(<>
      hi<hbr />
      <Foo />
    </>).toRenderTo(`
    hi
    bye
  `);
});

it("renders basic components", () => {
  function Bar(props: { children?: Children }) {
    return props.children;
  }

  function Foo() {
    return <Bar>hello</Bar>;
  }

  expect(<Foo />).toRenderTo("hello");
});

it("renders booleans appropriately", () => {
  function Foo() {
    return false;
  }

  expect(<Foo />).toRenderTo("");
});

it("keeps spaces between expressions", () => {
  const str = "str";
  function getStr() {
    return "getStr";
  }
  expect(<>
    a {str} {str} {getStr()} {getStr()} c
  </>).toRenderTo(
    "a str str getStr getStr c",
  );
});
