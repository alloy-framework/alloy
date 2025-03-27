import { List, refkey, StatementList } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { MemberChainExpression } from "../src/components/MemberChainExpression.jsx";
import { MemberIdentifier } from "../src/components/MemberIdentifier.jsx";
import {
  FunctionCallExpression,
  FunctionDeclaration,
  InterfaceDeclaration,
  InterfaceExpression,
  InterfaceMember,
  Reference,
  ValueExpression,
  VarDeclaration,
} from "../src/index.js";
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
    z.string
    .min
  `);
});

it("can create a chain expression with MemberIdentifiers", () => {
  const memberRef = refkey("member");
  const res = toSourceText(
    <List>
      <InterfaceDeclaration name="Foo" refkey={refkey("Foo")}>
        <StatementList>
          <InterfaceMember name="member" type="string" refkey={memberRef} />
          <InterfaceMember
            name="circular"
            type={<Reference refkey={refkey("Foo")} />}
            refkey={refkey("circular")}
          />
        </StatementList>
      </InterfaceDeclaration>
      <FunctionDeclaration
        name="foo"
        parameters={[
          { name: "foo", type: refkey("Foo"), refkey: refkey("foo") },
        ]}
      >
        <VarDeclaration const name="member">
          <MemberChainExpression>
            <MemberIdentifier refkey={refkey("foo")} />
            <MemberIdentifier refkey={memberRef} />
          </MemberChainExpression>
        </VarDeclaration>
        ;
      </FunctionDeclaration>
    </List>,
  );

  expect(res).toEqual(d`
    interface Foo {
      member: string;
      circular: Foo;
    }
    function foo(foo: Foo) {
      const member = foo.member;
    }
  `);
});

it("can create a chain expression with MemberIdentifiers and optional chaining on the first element", () => {
  const memberRef = refkey("member");
  const res = toSourceText(
    <List>
      <InterfaceDeclaration name="Foo" refkey={refkey("Foo")}>
        <StatementList>
          <InterfaceMember name="member" type="string" refkey={memberRef} />
          <InterfaceMember
            name="circular"
            type={<Reference refkey={refkey("Foo")} />}
            refkey={refkey("circular")}
          />
        </StatementList>
      </InterfaceDeclaration>
      <FunctionDeclaration
        name="foo"
        parameters={[
          { name: "foo", type: refkey("Foo"), refkey: refkey("foo") },
        ]}
      >
        <VarDeclaration const name="member">
          <MemberChainExpression>
            <MemberIdentifier refkey={refkey("foo")} nullish={true} />
            <MemberIdentifier refkey={memberRef} nullish={true} />
          </MemberChainExpression>
        </VarDeclaration>
        ;
      </FunctionDeclaration>
    </List>,
  );

  expect(res).toEqual(d`
    interface Foo {
      member: string;
      circular: Foo;
    }
    function foo(foo: Foo) {
      const member = foo?.member;
    }
  `);
});

it("can create a chain expression with MemberIdentifiers and optional chaining on a nested element", () => {
  const memberRef = refkey("member");
  const nestedRef = refkey("nested");
  const nested = (
    <InterfaceExpression>
      <InterfaceMember
        name="nested"
        type="string"
        optional={true}
        refkey={nestedRef}
      />
      ;
    </InterfaceExpression>
  );
  const res = toSourceText(
    <List>
      <InterfaceDeclaration name="Foo" refkey={refkey("Foo")}>
        <StatementList>
          <InterfaceMember
            name="member"
            type={nested}
            refkey={memberRef}
            optional={true}
          />
          <InterfaceMember
            name="circular"
            type={<Reference refkey={refkey("Foo")} />}
            refkey={refkey("circular")}
          />
        </StatementList>
      </InterfaceDeclaration>
      <FunctionDeclaration
        name="foo"
        parameters={[
          { name: "foo", type: refkey("Foo"), refkey: refkey("foo") },
        ]}
      >
        <VarDeclaration const name="member">
          <MemberChainExpression>
            <MemberIdentifier refkey={refkey("foo")} />
            <MemberIdentifier refkey={memberRef} nullish={true} />
            <MemberIdentifier refkey={nestedRef} nullish={true} />
          </MemberChainExpression>
        </VarDeclaration>
        ;
      </FunctionDeclaration>
    </List>,
  );

  expect(res).toEqual(d`
    interface Foo {
      member?: {
        nested?: string;
      };
      circular: Foo;
    }
    function foo(foo: Foo) {
      const member = foo.member?.nested;
    }
  `);
});
