import { List, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { StatementList } from "../src/components/StatementList.jsx";
import { toSourceText } from "./utils.js";

it("declares classes", () => {
  const res = toSourceText(<ts.ClassDeclaration name="Foo" />);
  expect(res).toEqual(d`
    class Foo {}
  `);
});

it("accepts export and default", () => {
  const res = toSourceText(<ts.ClassDeclaration name="Foo" export default />);
  expect(res).toEqual(d`
    export default class Foo {}
  `);
});

it("creates extends", () => {
  const res = toSourceText(<ts.ClassDeclaration name="Foo" extends="string" />);

  expect(res).toEqual(d`
    class Foo extends string {}
  `);
});

describe("instance members", () => {
  it("can be created", () => {
    const res = toSourceText(
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
      </ts.ClassDeclaration>,
    );

    expect(res).toEqual(d`
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
    const res = toSourceText(
      <ts.ClassDeclaration name="Foo">
        <StatementList>
          <ts.ClassField name="one" refkey={one}>
            1
          </ts.ClassField>
          <ts.ClassField name="two">{one} + 1</ts.ClassField>
        </StatementList>
      </ts.ClassDeclaration>,
    );

    expect(res).toEqual(d`
      class Foo {
        one = 1;
        two = this.one + 1;
      }
    `);
  });

  it("cannot be referenced outside the class", () => {
    const one = refkey();
    expect(() => {
      toSourceText(
        <>
          <ts.ClassDeclaration name="Foo">
            <StatementList>
              <ts.ClassField name="one" refkey={one}>
                1
              </ts.ClassField>
            </StatementList>
          </ts.ClassDeclaration>
          {one}
        </>,
      );
    }).toThrow(/Cannot resolve member symbols/);
  });
});

describe("static members", () => {
  it("renders", () => {
    const one = refkey();
    const res = toSourceText(
      <ts.ClassDeclaration name="Foo">
        <StatementList>
          <ts.ClassField static name="one" refkey={one}>
            1
          </ts.ClassField>
        </StatementList>
      </ts.ClassDeclaration>,
    );

    expect(res).toBe(d`
      class Foo {
        static one = 1;
      }
    `);
  });

  it("can be referenced", () => {
    const one = refkey();
    const res = toSourceText(
      <>
        <ts.ClassDeclaration name="Foo">
          <StatementList>
            <ts.ClassField static name="one" refkey={one}>
              1
            </ts.ClassField>
          </StatementList>
        </ts.ClassDeclaration>
        <hbr />
        {one};
      </>,
    );

    expect(res).toBe(d`
      class Foo {
        static one = 1;
      }
      Foo.one;
    `);
  });
});

describe("instance methods", () => {
  it("renders", () => {
    const one = refkey();
    const a = refkey();
    const b = refkey();

    const res = toSourceText(
      <ts.ClassDeclaration name="Foo">
        <List hardline>
          <ts.ClassMethod name="one" refkey={one} />
          <ts.ClassMethod name="two" public />
          <ts.ClassMethod name="three" private />
          <ts.ClassMethod name="four" protected />
          <ts.ClassMethod
            name="five"
            parameters={{ a: "string", b: "string" }}
          />
          <ts.ClassMethod
            name="six"
            parameters={{
              a: { type: "number", refkey: a },
              b: { type: "number", refkey: b },
            }}
            returnType="number"
          >
            {one} = {a} + {b};
          </ts.ClassMethod>
          <ts.ClassMethod name="seven" jsPrivate />
        </List>
      </ts.ClassDeclaration>,
    );

    expect(res).toEqual(d`
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
