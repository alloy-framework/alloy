// prettier-ignore
import { it, expect, describe } from "vitest";
import "../../testing/extend-expect.js";
import { Indent } from "../../src/components/Indent.jsx";

describe("Indent component", () => {
  it("indents explicitly indented content on a single line", () => {
    expect(<>
      one<Indent>hi</Indent>
    </>).toRenderTo("onehi")
  });

  it("indents explicitly indented content on a subsequent line", () => {
    expect(<>
      one
      <Indent>hi</Indent>
    </>).toRenderTo("one\n  hi")
  })

  it("indents explicitly indented content", () => {
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
  });


  it("doesn't indent components on the same line with explicit indent", () => {
    function Foo() { return "Foo" }
  
    expect(<>
      base
      <Indent>
        <Foo /><Foo />
      </Indent>
    </>).toRenderTo(`
      base
        FooFoo
    `)
  });

  it("works with nested indents", () => {
    expect(<>
      base
      <Indent>
        1
        2
        <Indent>
          3
          4
          <Indent>
            5
            6
          </Indent>
          7
          8
        </Indent>
        9
        10
      </Indent>
      11
      12
    </>).toRenderTo(`
      base
        1
        2
          3
          4
            5
            6
          7
          8
        9
        10
      11
      12
    `)
  });
})

describe("implicit indenting", () => {

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

  it("indents memo substitutions with line breaks properly", () => {
    function getStr() { return "a\nb" };
    expect(<>
      base
        {getStr()}
    </>).toRenderTo(`
      base
        a
        b
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
  
  
  it("implictly indents memos", () => {
    function Foo() {
      return "Foo";
    }
    const hi = "const hi";
    function getHi() { return "getHi" };
  
    expect(<>
      base
        {getHi()}
      base {hi}
        {getHi()}
      base {getHi()}
        {getHi()}
      base <Foo />
        {getHi()}
    </>).toRenderTo(`
      base
        getHi
      base const hi
        getHi
      base getHi
        getHi
      base Foo
        getHi
    `)
  });
  
  it("implictly indents consts", () => {
    function Foo() {
      return "Foo";
    }
    const hi = "const hi";
    function getHi() { return "getHi" };
  
    function ArrComponent() {
      return [<Foo />, <Foo />]
    }
  
    const arr = [<Foo />, <Foo />];
  
    expect(<>
      base
        {hi}
      base {hi}
        {hi}
      base {getHi()}
        {hi}
      base <Foo />
        {hi}
      base <ArrComponent />
        {hi}
      base {arr}
        {hi}
    </>).toRenderTo(`
      base
        const hi
      base const hi
        const hi
      base getHi
        const hi
      base Foo
        const hi
      base FooFoo
        const hi
      base FooFoo
        const hi
    `)
  });
  
  it("indents children", () => {
    function Foo(props: any) {
      return <>
        a
        {props.children}
        b
      </>
    }
  
    function getChild() { return "hi" };
    expect(<>
      base
        <Foo>
          child
          {getChild()}
        </Foo>
      </>
    ).toRenderTo(`
    base
      a
      child
      hi
      b
    `);
  });
  
  it("implicity indents within children", () => {
    function Foo(props: any) {
      return <>
        a
        {props.children}
        b
      </>
    }
  
    function getChild() { return "hi" };
    expect(<>
      base
        <Foo>
          child
            {getChild()}
        </Foo>
      </>
    ).toRenderTo(`
      base
        a
        child
          hi
        b
    `);
  })
  
  
  it("doesn't indent things on the same line", () => {
    const str = "str"
    function getStr() { return "getstr" }
    function Foo() {
      return "Foo";
    }
    const array = [<>{str} {getStr()}</>]
    expect(<>
      base
      {str} {getStr()}
      item <Foo /> <Foo />
        {str} {getStr()}
        item <Foo /> <Foo />
      </>
    ).toRenderTo(`
      base
      str getstr
      item Foo Foo
        str getstr
        item Foo Foo
    `)
  })
  

})


describe("array handling", () => {
  it("handles a simple array", () => {
    const simpleArray = [<>hi</>];
    expect(<>
      a
      {simpleArray}
      b
    </>).toRenderTo(`
      a
      hi
      b
    `);
  });

  it("handles indented simple array", () => {
    const simpleArray = [<>hi</>];
    expect(<>
      a
        {simpleArray}
      b
    </>).toRenderTo(`
      a
        hi
      b
    `);
  });

  it("handles indented simple array with linebreaks", () => {
    const val = "hi";
    function getHi() { return "getHi" }
    const arr = [<>{val}</>, "\n", <>{getHi()}</>];
    expect(<>
      a
        {arr}
      b
    </>).toRenderTo(`
      a
        hi
        getHi
      b
    `);
  });

  it("handles indented component array", () => {
    const val = "hi";
    function getHi() { return "getHi" }
    function Foo() {
      return "Foo"
    }
    const arr = [<Foo />, <Foo />];
    expect(<>
      a
        {arr}
      b
    </>).toRenderTo(`
      a
        FooFoo
      b
    `);
  });

  it("handles indented component array with linebreaks", () => {
    const val = "hi";
    function getHi() { return "getHi" }
    function Foo() {
      return "Foo"
    }
    const arr = [<Foo />, "\n", <Foo />];
    expect(<>
      a
        {arr}
      b
    </>).toRenderTo(`
      a
        Foo
        Foo
      b
    `);
  });

  it("indents arrays of components (map scenario)", () => {
    function Foo() {
      return <>
        a
        b
      </>
    }
  
    function Bar() {
      return <>
        c
        d
      </>
    }
  
  
    const foos = [
      <Foo />,
      "\n",
      <Bar />
    ]
  
    expect(<>
      base
        {foos}
    </>).toRenderTo(`
      base
        a
        b
        c
        d
    `);
  });

  it("handles arrays of components with children", () => {
    function Foo(props: any) {
      return <>
        hi
        {props.children}
          {props.children}
      </>
    }

    const arr = [
      <Foo>
        a
        b
      </Foo>,
      "\n",
      <Foo>
        c
        d
      </Foo>
    ]

    expect(<>
      base
      {arr}
        {arr}
    </>).toRenderTo(`
      base
      hi
      a
      b
        a
        b
      hi
      c
      d
        c
        d
        hi
        a
        b
          a
          b
        hi
        c
        d
          c
          d
    `)
  });
})

it("doesn't indent things on the same line simple", () => {
  const str = "str"
  function getStr() { return "getstr" }
  function Foo() {
    return "Foo";
  }
  const array = [<>{getStr()} {getStr()}</>]
  expect(<>
    base
    <Indent>
      {str} {getStr()}
      {array}
      <Foo /> {str} {getStr()}
    </Indent>
  </>).toRenderTo(`
      base
        str getstr
        getstr getstr
        Foo str getstr
  `)
});

describe("Children rendering", () => {
  it("handles children via props.children", () => {
    function Foo(props: any) {
      return <>
        a
        {props.children}
        d
      </>
    }

    expect(<>
      base
      <Foo>
        b
        c
      </Foo>
    </>).toRenderTo(`
      base
      a
      b
      c
      d
    `);
  });

  it("handles children via destructured children", () => {
    function Foo({children}: any) {
      return <>
        a
        {children}
        d
      </>
    }

    expect(<>
      base
      <Foo>
        b
        c
      </Foo>
    </>).toRenderTo(`
      base
      a
      b
      c
      d
    `);
  });

  it("handles children via returning children", () => {
    function Foo({children}: any) {
      return children
    }

    expect(<>
      base
      <Foo>
        b
        c
      </Foo>
    </>).toRenderTo(`
      base
      b
      c
    `);
  });
});