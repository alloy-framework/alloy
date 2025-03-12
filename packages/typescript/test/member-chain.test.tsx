import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { MemberChainExpression } from "../src/components/MemberChainExpression.jsx";
import { FunctionCallExpression, ValueExpression } from "../src/index.js";
import { toSourceText } from "./utils.js";

it("works", () => {
  expect(
    toSourceText(
      <MemberChainExpression>
        <>z</>
        <FunctionCallExpression target="string" />
        <FunctionCallExpression target="array" />
        <FunctionCallExpression target="min" args={[5]} />
        <FunctionCallExpression target="max" args={[10]} />
      </MemberChainExpression>,
      { printWidth: 10 },
    ),
  ).toBe(d`
    z.string()
      .array()
      .min(5)
      .max(10)
  `);
});

it("works with args which break", () => {
  expect(
    toSourceText(
      <MemberChainExpression>
        <>z</>
        <FunctionCallExpression
          target="object"
          args={[<ValueExpression jsValue={{ a: 1, b: 2 }} />]}
        />
        <FunctionCallExpression target="array" />
      </MemberChainExpression>,
      { printWidth: 10 },
    ),
  ).toBe(d`
    z.object({
        a: 1,
        b: 2,
      })
      .array()
  `);
});

it("works with args when it doesn't break", () => {
  expect(
    toSourceText(
      <MemberChainExpression>
        <>z</>
        <FunctionCallExpression
          target="object"
          args={[<ValueExpression jsValue={{ a: 1, b: 2 }} />]}
        />
      </MemberChainExpression>,
    ),
  ).toBe(d`
    z.object({
      a: 1,
      b: 2,
    })
  `);

  expect(
    toSourceText(
      <MemberChainExpression>
        <>z</>
        <>z2</>
        <>z3</>
        <FunctionCallExpression
          target="object"
          args={[<ValueExpression jsValue={{ a: 1, b: 2 }} />]}
        />
      </MemberChainExpression>,
    ),
  ).toBe(d`
    z.z2.z3.object({
      a: 1,
      b: 2,
    })
  `);
});

it("works with nested call member chains", () => {
  expect(
    toSourceText(
      <MemberChainExpression>
        <>z</>
        <FunctionCallExpression target="string" />
        <FunctionCallExpression target="array" />
        <MemberChainExpression>
          <FunctionCallExpression target="min" args={[5]} />
          <FunctionCallExpression target="max" args={[10]} />
        </MemberChainExpression>
        <FunctionCallExpression target="array" />
      </MemberChainExpression>,
      { printWidth: 10 },
    ),
  ).toBe(d`
    z.string()
      .array()
      .min(5)
      .max(10)
      .array()
  `);
});

it("works without function call expressions", () => {
  expect(
    toSourceText(
      <MemberChainExpression>
        <>z</>
        <>string</>
        <>min</>
      </MemberChainExpression>,
      { printWidth: 5 },
    ),
  ).toBe(d`
    z.string.min
  `);
});
