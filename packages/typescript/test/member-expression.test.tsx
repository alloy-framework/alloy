import { refkey, StatementList } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { MemberExpression } from "../src/components/MemberExpression.jsx";
import { ObjectExpression } from "../src/components/stc/index.js";
import { VarDeclaration } from "../src/components/VarDeclaration.jsx";
import { toSourceText } from "./utils.js";

it("renders basic member expression with dot notation", () => {
  expect(
    toSourceText(
      <MemberExpression>
        <MemberExpression.Part id="obj" />
        <MemberExpression.Part id="property" />
      </MemberExpression>,
    ),
  ).toBe(d`
    obj.property
  `);
});

it("renders member expression with bracket notation for invalid identifiers", () => {
  expect(
    toSourceText(
      <MemberExpression>
        <MemberExpression.Part id="obj" />
        <MemberExpression.Part id="property-name" />
      </MemberExpression>,
    ),
  ).toBe(d`
    obj["property-name"]
  `);
});

it("handles nullish chaining", () => {
  expect(
    toSourceText(
      <MemberExpression>
        <MemberExpression.Part id="obj" nullish={true} />
        <MemberExpression.Part id="property" />
      </MemberExpression>,
    ),
  ).toBe(d`
    obj?.property
  `);
});

it("supports multiple levels of nesting", () => {
  expect(
    toSourceText(
      <MemberExpression>
        <MemberExpression.Part id="a" />
        <MemberExpression.Part id="b" />
        <MemberExpression.Part id="c" />
        <MemberExpression.Part id="d" />
      </MemberExpression>,
    ),
  ).toBe(d`
    a.b.c.d
  `);
});

it("ignores non-part children", () => {
  expect(
    toSourceText(
      <MemberExpression>
        <MemberExpression.Part id="obj" />
        <MemberExpression.Part id="property" />
      </MemberExpression>,
    ),
  ).toBe(d`
    obj.property
  `);
});

it("flattens nested member expressions", () => {
  expect(
    toSourceText(
      <MemberExpression>
        <MemberExpression.Part id="outer" />
        <MemberExpression>
          <MemberExpression.Part id="inner" />
          <MemberExpression.Part id="prop" />
        </MemberExpression>
        <MemberExpression.Part id="last" />
      </MemberExpression>,
    ),
  ).toBe(d`
    outer.inner.prop.last
  `);
});

it("handles a mix of dot and bracket notation", () => {
  expect(
    toSourceText(
      <MemberExpression>
        <MemberExpression.Part id="obj" />
        <MemberExpression.Part id="normalProp" />
        <MemberExpression.Part id="special-prop" />
        <MemberExpression.Part id="123" />
      </MemberExpression>,
    ),
  ).toBe(d`
    obj.normalProp["special-prop"]["123"]
  `);
});

it("handles nullish chaining at multiple levels", () => {
  expect(
    toSourceText(
      <MemberExpression>
        <MemberExpression.Part id="a" />
        <MemberExpression.Part id="b" nullish={true} />
        <MemberExpression.Part id="c" />
        <MemberExpression.Part id="d" nullish={true} />
        <MemberExpression.Part id="e" />
      </MemberExpression>,
    ),
  ).toBe(d`
    a.b?.c.d?.e
  `);
});

describe("with refkeys", () => {
  it("handles symbols correctly", () => {
    const rk1 = refkey();
    const rk2 = refkey();
    expect(
      toSourceText(
        <StatementList>
          <VarDeclaration name="test1" refkey={rk1} initializer={1} />
          <VarDeclaration name="test1" refkey={rk2} initializer={2} />
          <MemberExpression>
            <MemberExpression.Part refkey={rk1} />
            <MemberExpression.Part refkey={rk2} />
          </MemberExpression>
        </StatementList>,
      ),
    ).toBe(d`
      const test1 = 1;
      const test1_2 = 2;
      test1.test1_2;
    `);
  });

  it("handles late resolved refkeys correctly", () => {
    const rk1 = refkey();
    const rk2 = refkey();
    expect(
      toSourceText(
        <StatementList>
          <MemberExpression>
            <MemberExpression.Part refkey={rk1} />
            <MemberExpression.Part refkey={rk2} />
          </MemberExpression>
          <VarDeclaration name="test1" refkey={rk1} initializer={1} />
          <VarDeclaration name="test1" refkey={rk2} initializer={2} />
        </StatementList>,
      ),
    ).toBe(d`
      test1.test1_2;
      const test1 = 1;
      const test1_2 = 2;
    `);
  });
});

describe("with function calls", () => {
  it("handles simple function calls correctly", () => {
    expect(
      toSourceText(
        <MemberExpression>
          <MemberExpression.Part id="myFunction" />
          <MemberExpression.Part args={[1, 2]} />
        </MemberExpression>,
      ),
    ).toBe(d`
      myFunction(1, 2)
    `);
  });

  it("handles nullish function calls correctly", () => {
    expect(
      toSourceText(
        <MemberExpression>
          <MemberExpression.Part id="method1" nullish />
          <MemberExpression.Part nullish args={[1, 2]} />
          <MemberExpression.Part nullish args={[]} />
          <MemberExpression.Part id="method2" nullish />
          <MemberExpression.Part args={[]} />
          <MemberExpression.Part id="prop" />
        </MemberExpression>,
      ),
    ).toBe(d`
      method1?.(1, 2)?.()?.method2?.().prop
    `);
  });

  it("handles function calls returning nullish correctly", () => {
    expect(
      toSourceText(
        <MemberExpression>
          <MemberExpression.Part id="myFunction" />
          <MemberExpression.Part args={[1, 2]} nullish />
          <MemberExpression.Part id="prop" />
        </MemberExpression>,
      ),
    ).toBe(d`
      myFunction(1, 2)?.prop
    `);
  });
});

describe("formatting", () => {
  describe("simple chains", () => {
    it("just dots", () => {
      expect(
        toSourceText(
          <MemberExpression>
            <MemberExpression.Part id="four" />
            <MemberExpression.Part id="four" />
            <MemberExpression.Part id="four" />
            <MemberExpression.Part id="four" />
            <MemberExpression.Part id="four" />
            <MemberExpression.Part id="four" />
          </MemberExpression>,
          { printWidth: 12 },
        ),
      ).toBe(d`
        four.four
          .four.four
          .four.four
      `);
    });

    it("bracket breaks", () => {
      expect(
        toSourceText(
          <MemberExpression>
            <MemberExpression.Part id="obj" />
            <MemberExpression.Part id="property-name" />
            <MemberExpression.Part id="prop" />
          </MemberExpression>,
          { printWidth: 12 },
        ),
      ).toBe(d`
        obj[
          "property-name"
        ].prop
      `);
    });
  });

  describe("call chains", () => {
    it("handles single calls", () => {
      expect(
        toSourceText(
          <MemberExpression>
            <MemberExpression.Part id="z" />
            <MemberExpression.Part id="object" />
            <MemberExpression.Part
              args={[<ObjectExpression jsValue={{ x: 1 }} />]}
            />
          </MemberExpression>,
          { printWidth: 12 },
        ),
      ).toBe(d`
        z.object({
          x: 1,
        })
      `);
    });

    it.skip("handles multiple calls", () => {
      expect(
        toSourceText(
          <MemberExpression>
            <MemberExpression.Part id="z" />
            <MemberExpression.Part id="object" />
            <MemberExpression.Part
              args={[<ObjectExpression jsValue={{ x: 1 }} />]}
            />
            <MemberExpression.Part id="partial" />
            <MemberExpression.Part args={[]} />
          </MemberExpression>,
          { printWidth: 12 },
        ),
      ).toBe(d`
        z
          .object({
            x: 1,
          })
          .partial()
      `);
    });
  });
});
