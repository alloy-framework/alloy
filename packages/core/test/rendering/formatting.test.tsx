import { describe, expect, it } from "vitest";
import { For } from "../../src/index.js";
import "../../testing/extend-expect.js";

describe("group", () => {
  it("breaks when shouldBreak is passed", () => {
    expect(<group shouldBreak>hi<sbr />bye</group>).toRenderTo(
      `
        hi
        bye
      `,
    );
  });
});
describe("indent", () => {
  it("indents its children", () => {
    expect(<>
      a<indent><hardline />
        b
      </indent>
    </>)
      .toRenderTo(`
      a
        b
    `);
  });
});

describe("dedent and markAsRoot", () => {
  it("dedents its children", () => {
    expect(
      <>
      base
      <indent><hbr />
        a<dedent><hardline />
          b
        </dedent>
      </indent>
    </>,
    ).toRenderTo(`
    base
      a
    b
    `);
  });
});

describe("dedentToRoot and setRoot", () => {
  it("dedents to the indent level marked by the root when not marked", () => {
    expect(
      <>
        base
        <indent><hbr />
          a<dedentToRoot><hbr />
            b
          </dedentToRoot>
        </indent>
      </>,
    ).toRenderTo(`
    base
      a
    b
    `);
  });
  it("dedents to the indent level marked by the root when marked", () => {
    expect(
      <>
        base
        <indent><hbr />
          root
          <markAsRoot>
            <indent><hbr />
              a<dedentToRoot><hbr />
                b
              </dedentToRoot>
            </indent>
          </markAsRoot>
        </indent>
      </>,
    ).toRenderTo(`
    base
      root
        a
      b
    `);
  });
});

describe("softline", () => {
  it("breaks to to a new line when needed", () => {
    expect(<group>1234567890<softline />1234567890</group>).toRenderTo(
      `12345678901234567890`,
      { printWidth: 25 },
    );
    expect(<group>1234567890<softline />1234567890</group>).toRenderTo(
      `
        1234567890
        1234567890
      `,
      { printWidth: 15 },
    );
    expect(<group>1234567890<sbr />1234567890</group>).toRenderTo(
      `12345678901234567890`,
      { printWidth: 25 },
    );
    expect(<group>1234567890<sbr />1234567890</group>).toRenderTo(
      `
        1234567890
        1234567890
      `,
      { printWidth: 15 },
    );
  });
});

describe("hardline", () => {
  it("always breaks to a new line", () => {
    expect(<group>1234567890<hardline />1234567890</group>).toRenderTo(
      `
        1234567890
        1234567890
      `,
    );
    expect(<group>1234567890<hbr />1234567890</group>).toRenderTo(
      `
        1234567890
        1234567890
      `,
    );
  });
});

describe("line", () => {
  it("creates a new line when needed, is otherwise space", () => {
    expect(<group>1234567890<line />1234567890</group>).toRenderTo(
      `1234567890 1234567890`,
      { printWidth: 25 },
    );
    expect(<group>1234567890<line />1234567890</group>).toRenderTo(
      `
        1234567890
        1234567890
      `,
      { printWidth: 15 },
    );
    expect(<group>1234567890<br />1234567890</group>).toRenderTo(
      `1234567890 1234567890`,
      { printWidth: 25 },
    );
    expect(<group>1234567890<br />1234567890</group>).toRenderTo(
      `
        1234567890
        1234567890
      `,
      { printWidth: 15 },
    );
  });
});

describe("literalline", () => {
  it("always creates a new line", () => {
    expect(
      <>
        base
        <indent><hbr />1234567890<literalline />1234567890<hbr />x</indent>
      </>,
    ).toRenderTo(
      `
        base
          1234567890
        1234567890
          x
      `,
    );
    expect(
      <>
        base
        <indent><hbr />1234567890<lbr />1234567890<hbr />x</indent>
      </>,
    ).toRenderTo(
      `
        base
          1234567890
        1234567890
          x
      `,
    );
  });
});

describe("lineSuffix and lineSuffixBoundary", () => {
  it("adds a line suffix", () => {
    expect(
      <>
        hello<lineSuffix>// comment</lineSuffix> there<hbr />
        how<lineSuffix>// another comment</lineSuffix> are <lineSuffixBoundary />you
      </>,
    ).toRenderTo(
      `
        hello there// comment
        how are // another comment
        you
      `,
    );
  });
});

describe("breakParent", () => {
  it("breaks the parent group", () => {
    expect(
      <group>
        <breakParent />one<sbr />two
      </group>,
    ).toRenderTo(
      `
        one
        two
      `,
    );
  });
});

describe("ifBreak", () => {
  it("renders the children when broken", () => {
    expect(<group><ifBreak flatContents="bye">hi</ifBreak></group>).toRenderTo(
      `bye`,
    );
  });

  it("renders the children when not broken", () => {
    expect(
      <group><ifBreak flatContents="bye">hi</ifBreak><breakParent /></group>,
    ).toRenderTo(`hi`);
  });

  it("renders flatContents that are elements", () => {
    function Foo() {
      return "Foo";
    }
    const contents = <>
      <Foo /><Foo />
    </>;

    expect(
      <group><ifBreak flatContents={contents}>hi</ifBreak></group>,
    ).toRenderTo(`FooFoo`);
  });

  it("works with a group id", () => {
    const id = Symbol();
    expect(
      <>
      <group id={id}>
        a<hbr />b<hbr />
      </group>
      <ifBreak groupId={id}>c</ifBreak>
    </>,
    ).toRenderTo(`a\nb\nc`);
  });
});

describe("fill", () => {
  it("fills the group with its children", () => {
    const items = ["one", "two", "three", "four", "five", "six"];
    // place a <br /> after every item except the last
    const filledItems = items.map((
      item,
      index,
    ) => <>
        {item}
        {index < items.length - 1 && <br />}
      </>);

    expect(<fill>{filledItems}</fill>).toRenderTo(
      `one two three four\nfive six`,
      { printWidth: 20 },
    );
  });
});

describe("align", () => {
  it("aligns contents with a number of spaces", () => {
    expect(
      <>
        base
        <align width={4}>
          <hbr />
          hi
        </align>
      </>,
    ).toRenderTo(
      `
        base
            hi
      `,
    );
  });

  it("aligns contents with a string", () => {
    expect(
      <>
        base
        <align string="XXXX">
          <hbr />
          hi
        </align>
      </>,
    ).toRenderTo(
      `
        base
        XXXXhi
      `,
    );
  });
});

it("all works together", () => {
  const argCount = 2;
  const args = Array.from({ length: argCount }, (_, i) => `arg${i + 1}`);
  expect(
    <>
      <group>
        async function foo(<indent><sbr />
          <For each={args} joiner={<>,<br /></>}>
            {(arg) => <>{arg}: string</>}
          </For>
        </indent><sbr />)
      </group>
      : void {"{"}<indent><hbr />
        // function body
      </indent><hbr />{"}"}
    </>,
  ).toRenderTo(
    `
    async function foo(arg1: string, arg2: string): void {
      // function body
    }
  `,
    { printWidth: 80 },
  );
});

describe("align", () => {
  it("works with jsdoc", () => {
    function JSDoc(props: any) {
      return <>
        /**<align string=""><hbr/>
          {props.children}
        </align><hbr />
        {" "}**/
      </>;
    }

    function JSDocParagraph(props: any) {
      const words: string[] = props.content.trim().split(/\s+/);
      return <fill>{words.map((word) => <>{word}<br /></>)}</fill>;
    }

    function JSDocExample(props: any) {
      return <>```typescript<hbr/>{props.children}<hbr/>```</>;
    }

    function FunctionDeclaration(props: any) {
      return <>
        function {props.name}(
          <group>
            <indent><sbr />
              <For each={props.params} joiner={<>,<br /></>}>
                {(param) => <>{param}</>}
              </For>
            </indent><sbr />
          </group>
        ): {props.returnType} {"{"}
          <indent><hbr />
            {props.children}
          </indent><hbr />
        {"}"}
      </>;
    }

    const words = `
      this is a long doc comment filled with nonsense
      and it will be formatted
      to be pretty. Which is pretty nice because if
      you put substitutions in here or whatever, who knows
      how it's going to end up formatted.

    `;
    const template =
      <>
        <JSDoc>
          <JSDocParagraph content={words} /><hbr/><hbr/>
          <JSDocExample>
            <FunctionDeclaration
              name="foo"
              params={["param1: number", "param2: number"]}
              returnType="void">
              return param1 + param2;
            </FunctionDeclaration>
          </JSDocExample>
        </JSDoc>
      </>;

    expect(template).toRenderTo(`
    `);
  });
});
