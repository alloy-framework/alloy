import { render, List, namekey, Output, refkey, StatementList } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { TestFile } from "./utils.js";

it("declares classes", () => {
  const res = (
    <TestFile>
        <ts.ClassDeclaration name="Foo" />
    </TestFile>
  );
  expect(res).toRenderTo(`
    class Foo {}
  `);
});

it("accepts export and default", () => {
  const res = (
    <TestFile>
        <ts.ClassDeclaration name="Foo" export default />
    </TestFile>
  );
  expect(res).toRenderTo(`
    export default class Foo {}
  `);
});

it("creates extends", () => {
  const res = (
    <TestFile>
        <ts.ClassDeclaration name="Foo" extends="string" />
    </TestFile>
  );

  expect(res).toRenderTo(`
    class Foo extends string {}
  `);
});

it("creates implements", () => {
  const res = (
    <TestFile>
        <ts.ClassDeclaration name="Foo" implements={["SomeInterface"]} />
    </TestFile>
  );

  expect(res).toRenderTo(`
    class Foo implements SomeInterface {}
  `);
});

it("creates implements with multiple", () => {
  const res = (
    <TestFile>
        <ts.ClassDeclaration
      name="Foo"
      implements={["SomeInterface", "OtherInterface"]}
    />
    </TestFile>
  );

  expect(res).toRenderTo(`
    class Foo implements SomeInterface, OtherInterface {}
  `);
});

it("creates implements with extends", () => {
  const res = (
    <TestFile>
        <ts.ClassDeclaration
      name="Foo"
      extends="string"
      implements={["SomeInterface"]}
    />
    </TestFile>
  );

  expect(res).toRenderTo(`
    class Foo extends string implements SomeInterface {}
  `);
});

it("takes namekeys for all elements", () => {
  const res = (
    <TestFile>
        <ts.ClassDeclaration name={namekey("foo")}>
      <StatementList>
        <ts.ClassField name={namekey("myField")} />
        <ts.ClassMethod name={namekey("myMethod")} />
      </StatementList>
    </ts.ClassDeclaration>
    </TestFile>
  );

  expect(res).toRenderTo(`
    class foo {
      myField;
      myMethod() {};
    }
  `);
});

describe("instance members", () => {
  it("can be created", () => {
    const res = (
      <TestFile>
          <ts.ClassDeclaration name="Foo">
        <StatementList>
          <ts.ClassField name="one" />
          <ts.ClassField name="two" public />
          <ts.ClassField name="three" private />
          <ts.ClassField name="four" protected />
          <ts.ClassField name="five" type="number" />
          <ts.ClassField name="six" type="number">
            12
          </ts.ClassField>
          <ts.ClassField name="seven" jsPrivate />
        </StatementList>
      </ts.ClassDeclaration>
      </TestFile>
    );

    expect(res).toRenderTo(`
      class Foo {
        one;
        public two;
        private three;
        protected four;
        five: number;
        six: number = 12;
        #seven;
      }
    `);
  });

  it("can be referenced", () => {
    const one = refkey();
    const privateOne = refkey();

    const res = (
      <TestFile>
          <ts.ClassDeclaration name="Foo">
        <StatementList>
          <ts.ClassField name="one" refkey={one}>
            1
          </ts.ClassField>
          <ts.ClassField name="two">{one} + 1</ts.ClassField>
          <ts.ClassField name="one" refkey={privateOne} jsPrivate>
            1
          </ts.ClassField>
          <ts.ClassField name="three">{privateOne} + 1</ts.ClassField>
        </StatementList>
      </ts.ClassDeclaration>
      </TestFile>
    );

    expect(res).toRenderTo(`
      class Foo {
        one = 1;
        two = this.one + 1;
        #one = 1;
        three = this.#one + 1;
      }
    `);
  });

  it("cannot be referenced outside the class", () => {
    const one = refkey();
    expect(() => {
      render(
        <TestFile>
          <ts.ClassDeclaration name="Foo">
            <StatementList>
              <ts.ClassField name="one" refkey={one}>
                1
              </ts.ClassField>
            </StatementList>
          </ts.ClassDeclaration>
          {one}
        </TestFile>,
        { insertFinalNewLine: false },
      );
    }).toThrow(
      /Cannot reference instance member 'one' without an instance of 'Foo'/,
    );
  });

  it("cannot be referenced outside the class when protected", () => {
    const one = refkey();
    expect(() => {
      render(
        <TestFile>
          <ts.ClassDeclaration name="Foo">
            <StatementList>
              <ts.ClassField name="one" refkey={one} protected>
                1
              </ts.ClassField>
            </StatementList>
          </ts.ClassDeclaration>
          {one}
        </TestFile>,
        { insertFinalNewLine: false },
      );
    }).toThrow(
      /Cannot reference instance member 'one' without an instance of 'Foo'/,
    );
  });

  it("cannot be referenced outside the class when private", () => {
    const one = refkey();
    expect(() => {
      render(
        <TestFile>
          <ts.ClassDeclaration name="Foo">
            <StatementList>
              <ts.ClassField name="one" refkey={one} jsPrivate>
                1
              </ts.ClassField>
            </StatementList>
          </ts.ClassDeclaration>
          {one}
        </TestFile>,
        { insertFinalNewLine: false },
      );
    }).toThrow(
      /Cannot reference instance member 'one' without an instance of 'Foo'/,
    );
  });

  it("works with invalid identifier names", () => {
    const one = refkey();

    const res = (
      <TestFile>
          <ts.ClassDeclaration name="Foo">
        <StatementList>
          <ts.ClassField name="o-n-e" refkey={one}>
            1
          </ts.ClassField>
          <ts.ClassField name="t-w-o">{one} + 1</ts.ClassField>
        </StatementList>
      </ts.ClassDeclaration>
      </TestFile>
    );

    expect(res).toRenderTo(`
      class Foo {
        "o-n-e" = 1;
        "t-w-o" = this["o-n-e"] + 1;
      }
    `);
  });

  it("doesn't conflict with variables outside the class", () => {
    const rk = refkey();
    const res = (
      <TestFile>
          <List>
        <ts.VarDeclaration name="one">1;</ts.VarDeclaration>
        <ts.VarDeclaration name="two">2;</ts.VarDeclaration>
        <ts.ClassDeclaration name="Foo">
          <StatementList>
            <ts.ClassField name="one" refkey={rk}>
              1
            </ts.ClassField>
            <ts.ClassMethod name="two">{rk} + 1</ts.ClassMethod>
          </StatementList>
        </ts.ClassDeclaration>
      </List>
      </TestFile>
    );
    expect(res).toRenderTo(`
      const one = 1;
      const two = 2;
      class Foo {
        one = 1;
        two() {
          this.one + 1
        };
      }
    `);
  });

  it("doesn't conflict with imports from other files", () => {
    const rk1 = refkey();
    const rk2 = refkey();
    expect(
      <Output
        nameConflictResolver={() => {
          // do nothing
          return undefined;
        }}
      >
        <ts.SourceFile path="decl.ts">
          <StatementList>
            <ts.VarDeclaration export name="one" refkey={rk1}>
              1
            </ts.VarDeclaration>
            <ts.VarDeclaration export name="two" refkey={rk2}>
              2
            </ts.VarDeclaration>
          </StatementList>
        </ts.SourceFile>
        <ts.SourceFile path="ref.ts">
          <ts.ClassDeclaration name="Foo">
            <StatementList>
              <ts.ClassField name="one">{rk1}</ts.ClassField>
              <ts.ClassMethod name="two">{rk2}</ts.ClassMethod>
            </StatementList>
          </ts.ClassDeclaration>
        </ts.SourceFile>
      </Output>,
    ).toRenderTo({
      "decl.ts": `
        export const one = 1;
        export const two = 2;
      `,
      "ref.ts": `
        import { one, two } from "./decl.js";

        class Foo {
          one = one;
          two() {
            two
          };
        }
      `,
    });
  });
});

describe("static members", () => {
  it("renders", () => {
    const one = refkey();
    const res = (
      <TestFile>
          <ts.ClassDeclaration name="Foo">
        <StatementList>
          <ts.ClassField static name="one" refkey={one}>
            1
          </ts.ClassField>

          <ts.ClassField static name="two" jsPrivate>
            2
          </ts.ClassField>
        </StatementList>
      </ts.ClassDeclaration>
      </TestFile>
    );

    expect(res).toRenderTo(`
      class Foo {
        static one = 1;
        static #two = 2;
      }
    `);
  });

  it("can be referenced", () => {
    const one = refkey();
    const two = refkey();
    const res = (
      <TestFile>
        <ts.ClassDeclaration name="Foo">
          <StatementList>
            <ts.ClassField static name="one" refkey={one}>
              1
            </ts.ClassField>
            <ts.ClassField static name="two" refkey={two} jsPrivate>
              2
            </ts.ClassField>
            <ts.ClassMethod name="getTwo">return {two};</ts.ClassMethod>
          </StatementList>
        </ts.ClassDeclaration>
        <hbr />
        {one};
      </TestFile>
    );

    expect(res).toRenderTo(`
      class Foo {
        static one = 1;
        static #two = 2;
        getTwo() {
          return Foo.#two;
        };
      }
      Foo.one;
    `);
  });

  it("cannot be referenced outside the class when private", () => {
    const two = refkey();

    expect(() =>
      render(
        <TestFile>
          <ts.ClassDeclaration name="Foo">
            <StatementList>
              <ts.ClassField static name="two" refkey={two} jsPrivate>
                2
              </ts.ClassField>
            </StatementList>
          </ts.ClassDeclaration>
          <hbr />
          {two};
        </TestFile>,
        { insertFinalNewLine: false },
      ),
    ).toThrow(/Cannot reference/);
  });
});

describe("instance methods", () => {
  it("renders", () => {
    const one = refkey();
    const a = refkey();
    const b = refkey();

    const res = (
      <TestFile>
          <ts.ClassDeclaration name="Foo">
        <List hardline>
          <ts.ClassMethod name="one" refkey={one} />
          <ts.ClassMethod name="two" public />
          <ts.ClassMethod name="three" private />
          <ts.ClassMethod name="four" protected />
          <ts.ClassMethod
            name="five"
            parameters={[
              { name: "a", type: "string" },
              { name: "b", type: "string" },
            ]}
          />
          <ts.ClassMethod
            name="six"
            parameters={[
              { name: "a", type: "number", refkey: a },
              { name: "b", type: "number", refkey: b },
            ]}
            returnType="number"
          >
            {one} = {a} + {b};
          </ts.ClassMethod>
          <ts.ClassMethod name="seven" jsPrivate />
        </List>
      </ts.ClassDeclaration>
      </TestFile>
    );

    expect(res).toRenderTo(`
      class Foo {
        one() {}
        public two() {}
        private three() {}
        protected four() {}
        five(a: string, b: string) {}
        six(a: number, b: number): number {
          this.one = a + b;
        }
        #seven() {}
      }
    `);
  });
});

it("renders a class with docs for the class and its members", () => {
  const res = (
    <TestFile>
        <ts.ClassDeclaration name="Foo" doc="This is a class documentation">
      <ts.ClassField name="bar" doc="This is a field documentation">
        123
      </ts.ClassField>
      ;<hbr />
      <ts.ClassMethod name="baz" doc="This is a method documentation">
        return 123;
      </ts.ClassMethod>
    </ts.ClassDeclaration>
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * This is a class documentation
     */
    class Foo {
      /**
       * This is a field documentation
       */
      bar = 123;
      /**
       * This is a method documentation
       */
      baz() {
        return 123;
      }
    }
  `);
});

it("renders a method with parameter docs", () => {
  const res = (
    <TestFile>
        <ts.ClassDeclaration name="Foo">
      <ts.ClassMethod
        name="bar"
        doc="Method documentation"
        returnType="void"
        parameters={[
          { name: "a", type: "number", doc: "Parameter a doc" },
          {
            name: "b",
            type: "string",
            doc: "Line 1 for b. This is a long description that should continue in the next line.",
          },
        ]}
      />
    </ts.ClassDeclaration>
    </TestFile>
  );
  expect(res).toRenderTo(`
    class Foo {
      /**
       * Method documentation
       *
       * @param {number} a - Parameter a doc
       * @param {string} b - Line 1 for b.
       *   This is a long description that
       *   should continue in the next line.
       */
      bar(a: number, b: string): void {}
    }
  `, { printWidth: 40 });
});
