import { code, memberRefkey, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import {
  ClassDeclaration,
  FunctionDeclaration,
  VariableDeclaration,
} from "../src/components/index.js";
import { ParameterDescriptor, SourceFile } from "../src/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.js";

it("renders basic member expression with dot notation", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="obj" />
        <py.MemberExpression.Part id="property" />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    obj.property
  `);
});

it("renders basic member expression with key", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="arr" />
        <py.MemberExpression.Part key={12345} />
        <py.MemberExpression.Part id="foo-bar" />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    arr[12345].foo-bar
  `);
});

it("renders basic member expression with key with reference", () => {
  const rk1 = refkey();
  expect(
    toSourceText([
      <py.StatementList>
        <py.VariableDeclaration name="test1" refkey={rk1} initializer={1} />
        <py.MemberExpression>
          <py.MemberExpression.Part id="arr" />
          <py.MemberExpression.Part key={rk1} />
          <py.MemberExpression.Part id="foo-bar" />
        </py.MemberExpression>
      </py.StatementList>,
    ]),
  ).toBe(d`
    test1 = 1
    arr[test1].foo-bar
  `);
});

it("renders basic member expression with keys", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="arr" />
        <py.MemberExpression.Part keys={[1, 2]} />
        <py.MemberExpression.Part id="foo-bar" />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    arr[1, 2].foo-bar
  `);
});

it("renders basic member expression with keys with references", () => {
  const rk1 = refkey();
  const rk2 = refkey();
  expect(
    toSourceText([
      <py.StatementList>
        <py.VariableDeclaration name="test1" refkey={rk1} initializer={1} />
        <py.VariableDeclaration name="test2" refkey={rk2} initializer={2} />
        <py.MemberExpression>
          <py.MemberExpression.Part id="arr" />
          <py.MemberExpression.Part keys={[rk1, rk2]} />
          <py.MemberExpression.Part id="foo-bar" />
        </py.MemberExpression>
      </py.StatementList>,
    ]),
  ).toBe(d`
    test1 = 1
    test2 = 2
    arr[test1, test2].foo-bar
  `);
});

it("renders basic member expression with slice - 1", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="arr" />
        <py.MemberExpression.Part slice={{ start: 1, stop: 3, step: 2 }} />
        <py.MemberExpression.Part id="foo-bar" />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    arr[1:3:2].foo-bar
  `);
});

it("renders basic member expression with slice - 1 with references", () => {
  const rk1 = refkey();
  const rk2 = refkey();
  const rk3 = refkey();
  expect(
    toSourceText([
      <py.StatementList>
        <py.VariableDeclaration name="test1" refkey={rk1} initializer={1} />
        <py.VariableDeclaration name="test2" refkey={rk2} initializer={3} />
        <py.VariableDeclaration name="test3" refkey={rk3} initializer={2} />
        <py.MemberExpression>
          <py.MemberExpression.Part id="arr" />
          <py.MemberExpression.Part
            slice={{ start: rk1, stop: rk2, step: rk3 }}
          />
          <py.MemberExpression.Part id="foo-bar" />
        </py.MemberExpression>
      </py.StatementList>,
    ]),
  ).toBe(d`
    test1 = 1
    test2 = 3
    test3 = 2
    arr[test1:test2:test3].foo-bar
  `);
});

it("renders basic member expression with slice - 2", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="arr" />
        <py.MemberExpression.Part slice={{ stop: 3 }} />
        <py.MemberExpression.Part id="foo-bar" />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    arr[:3].foo-bar
  `);
});

it("renders basic member expression with slice - 3", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="arr" />
        <py.MemberExpression.Part slice={{ step: 2 }} />
        <py.MemberExpression.Part id="foo-bar" />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    arr[::2].foo-bar
  `);
});

it("renders basic member expression with slice - 4", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="arr" />
        <py.MemberExpression.Part slice={{ start: 1 }} />
        <py.MemberExpression.Part id="foo-bar" />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    arr[1:].foo-bar
  `);
});

it("renders basic member expression with slice - 5", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="arr" />
        <py.MemberExpression.Part slice={{ start: 1, step: 2 }} />
        <py.MemberExpression.Part id="foo-bar" />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    arr[1::2].foo-bar
  `);
});

it("renders basic member expression with an expression index - 1", () => {
  const xRefkey = refkey();
  expect(
    toSourceText([
      <py.StatementList>
        <py.VariableDeclaration name="x" initializer={1} refkey={xRefkey} />
        <py.MemberExpression>
          <py.MemberExpression.Part id="arr" />
          <py.MemberExpression.Part key={code`${xRefkey} + 1`} />
          <py.MemberExpression.Part id="foo-bar" />
        </py.MemberExpression>
      </py.StatementList>,
    ]),
  ).toBe(d`
    x = 1
    arr[x + 1].foo-bar
  `);
});

it("renders basic member expression with an expression index - 2", () => {
  expect(
    toSourceText([
      <py.StatementList>
        <py.MemberExpression>
          <py.MemberExpression.Part id="arr" />
          <py.MemberExpression.Part key={code`"foo" + 1`} />
          <py.MemberExpression.Part id="foo-bar" />
        </py.MemberExpression>
      </py.StatementList>,
    ]),
  ).toBe(d`
    arr["foo" + 1].foo-bar
  `);
});

it("throws an error for invalid identifiers with quotes", () => {
  expect(() =>
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="obj" />
        <py.MemberExpression.Part id={`property-"name"`} />
      </py.MemberExpression>,
    ]),
  ).toThrowError(/Invalid identifier: property-"name"/);
});

it("supports multiple levels of nesting", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="a" />
        <py.MemberExpression.Part id="b" />
        <py.MemberExpression.Part id="c" />
        <py.MemberExpression.Part id="d" />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    a.b.c.d
  `);
});

it("handles a mix of dot and bracket notation", () => {
  expect(
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="obj" />
        <py.MemberExpression.Part id="normalProp" />
        <py.MemberExpression.Part key={"special-prop"} />
        <py.MemberExpression.Part key={"123"} />
      </py.MemberExpression>,
    ]),
  ).toBe(d`
    obj.normalProp["special-prop"]["123"]
  `);
});

it("throws an error when providing conflicting part props", () => {
  expect(() =>
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="obj" />
        <py.MemberExpression.Part id="property" args={[1, 2]} />
      </py.MemberExpression>,
    ]),
  ).toThrowError(
    `Only one of args, id can be used for a MemberExpression part at a time`,
  );
});

it("throws an error when providing an empty slice", () => {
  expect(() =>
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="obj" />
        <py.MemberExpression.Part slice={{}} />
      </py.MemberExpression>,
    ]),
  ).toThrowError(`MemberExpression.Part: slice object cannot be empty`);
});

it("throws an error when providing an empty array", () => {
  expect(() =>
    toSourceText([
      <py.MemberExpression>
        <py.MemberExpression.Part id="obj" />
        <py.MemberExpression.Part keys={[]} />
      </py.MemberExpression>,
    ]),
  ).toThrowError(`MemberExpression.Part: keys array cannot be empty`);
});

it("takes children for the id part", () => {
  expect(
    toSourceText([
      <py.StatementList>
        <py.MemberExpression>
          <py.MemberExpression.Part id="child1" />
          <py.MemberExpression.Part key={"child1"} />
        </py.MemberExpression>
        <py.MemberExpression>
          <py.MemberExpression.Part id="child1" />
          <py.MemberExpression.Part key={"child2"} />
          <py.MemberExpression.Part args />
          <py.MemberExpression.Part key={"child3"} />
          <py.MemberExpression.Part args />
          <py.MemberExpression.Part key={code`"foo" + 1`} />
          <py.MemberExpression.Part args />
        </py.MemberExpression>
      </py.StatementList>,
    ]),
  ).toBe(d`
    child1["child1"]
    child1["child2"]()["child3"]()["foo" + 1]()
  `);
});

describe("with refkeys", () => {
  it("handles symbols correctly", () => {
    const rk1 = refkey();
    const rk2 = refkey();
    expect(
      toSourceText([
        <py.StatementList>
          <py.VariableDeclaration name="test1" refkey={rk1} initializer={1} />
          <py.VariableDeclaration name="test1" refkey={rk2} initializer={2} />
          <py.MemberExpression>
            <py.MemberExpression.Part refkey={rk1} />
            <py.MemberExpression.Part refkey={rk2} />
          </py.MemberExpression>
        </py.StatementList>,
      ]),
    ).toBe(d`
        test1 = 1
        test1_2_test = 2
        test1.test1_2_test
      `);
  });

  it("Correctly resolves member expressions from 2 different classes", () => {
    const model1Ref = refkey();
    const model2Ref = refkey();
    const classMethod1Ref = refkey();
    const classMethod2Ref = refkey();
    const v1Rk = refkey();
    const v2Rk = refkey();
    const template = (
      <py.StatementList>
        <ClassDeclaration name="Model1" refkey={model1Ref}>
          <VariableDeclaration
            name="foo"
            refkey={classMethod1Ref}
            type="str"
            omitNone={true}
          />
        </ClassDeclaration>
        <ClassDeclaration name="Model2" refkey={model2Ref}>
          <VariableDeclaration
            name="bar"
            refkey={classMethod2Ref}
            type="str"
            omitNone={true}
          />
        </ClassDeclaration>
        <py.VariableDeclaration
          name="model1_instance"
          refkey={v1Rk}
          type={model1Ref}
          initializer={
            <py.MemberExpression>
              <py.MemberExpression.Part refkey={model1Ref} />
              <py.MemberExpression.Part args />
            </py.MemberExpression>
          }
        />
        <py.VariableDeclaration
          name="model2_instance"
          refkey={v2Rk}
          type={model2Ref}
          initializer={
            <py.MemberExpression>
              <py.MemberExpression.Part refkey={model2Ref} />
              <py.MemberExpression.Part args />
            </py.MemberExpression>
          }
        />
        <>{memberRefkey(v1Rk, classMethod1Ref)}</>
        <>{memberRefkey(v2Rk, classMethod2Ref)}</>
      </py.StatementList>
    );

    expect(toSourceText([template])).toBe(d`
      class Model1:
          foo: str

      class Model2:
          bar: str

      model1_instance: Model1 = Model1()
      model2_instance: Model2 = Model2()
      model1_instance.foo
      model2_instance.bar
    `);
  });

  it("handles optional parameters correctly", () => {
    const fooRef = refkey();
    const modelRef = refkey();
    const parameters: ParameterDescriptor[] = [
      { name: "foo", optional: true, refkey: fooRef, type: modelRef },
    ];
    const messageRef = refkey();
    const template = (
      <py.StatementList>
        <ClassDeclaration name="Model" refkey={modelRef}>
          <VariableDeclaration
            name="bar"
            refkey={refkey()}
            type="str"
            omitNone={true}
          />
        </ClassDeclaration>
        <FunctionDeclaration name="fooFunction" parameters={parameters}>
          <py.StatementList>
            <py.VariableDeclaration
              name="message"
              refkey={messageRef}
              initializer={
                <py.MemberExpression>
                  <py.MemberExpression.Part refkey={fooRef} />
                  <py.MemberExpression.Part id="bar" />
                </py.MemberExpression>
              }
            />
            <>print({messageRef})</>
          </py.StatementList>
        </FunctionDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([template])).toBe(d`
      class Model:
          bar: str

      def foo_function(foo: Model = None):
          message = foo.bar
          print(message)

    `);
  });

  it("handles class member correctly", () => {
    const classRefkey = refkey();
    const interfaceRefkey = refkey();
    const interfaceMemberRefkey = refkey();
    const classMethodRefkey = refkey();
    const classMemberRefkey = refkey();
    const instanceRefkey = refkey();
    expect(
      toSourceText([
        <py.StatementList>
          <ClassDeclaration name="Bar" refkey={interfaceRefkey}>
            <VariableDeclaration
              name="prop1"
              refkey={interfaceMemberRefkey}
              type={"str"}
              omitNone={true}
            />
          </ClassDeclaration>
          <ClassDeclaration name="Foo" refkey={classRefkey}>
            <VariableDeclaration
              name="test1"
              refkey={classMemberRefkey}
              type={interfaceRefkey}
            />
            <br />
            <FunctionDeclaration
              name="testMethod"
              parameters={[]}
              refkey={classMethodRefkey}
              returnType={interfaceRefkey}
            />
          </ClassDeclaration>
          <py.VariableDeclaration
            name="inst"
            refkey={instanceRefkey}
            initializer={code`${classRefkey}()`}
          />
          <py.MemberExpression>
            <py.MemberExpression.Part refkey={instanceRefkey} />
            <py.MemberExpression.Part refkey={classMemberRefkey} />
            <py.MemberExpression.Part refkey={interfaceMemberRefkey} />
          </py.MemberExpression>
          <py.MemberExpression>
            <py.MemberExpression.Part refkey={instanceRefkey} />
            <py.MemberExpression.Part refkey={classMethodRefkey} />
            <py.MemberExpression.Part args={[]} />
          </py.MemberExpression>
        </py.StatementList>,
      ]),
    ).toBe(d`
       class Bar:
           prop1: str

       class Foo:
           test1: Bar = None
           def test_method() -> Bar:
               pass


       inst = Foo()
       inst.test1.prop1
       inst.test_method()
    `);
  });

  it("handles late resolved refkeys correctly", () => {
    const rk1 = refkey();
    const rk2 = refkey();
    expect(
      toSourceText([
        <py.StatementList>
          <py.MemberExpression>
            <py.MemberExpression.Part refkey={rk1} />
            <py.MemberExpression.Part refkey={rk2} />
          </py.MemberExpression>
          <py.VariableDeclaration name="test1" refkey={rk1} initializer={1} />
          <py.VariableDeclaration name="test1" refkey={rk2} initializer={2} />
        </py.StatementList>,
      ]),
    ).toBe(d`
      test1.test1_2_test
      test1 = 1
      test1_2_test = 2
    `);
  });

  it("creates a full reference to the first refkey", () => {
    const rk1 = refkey();
    const res = toSourceTextMultiple([
      <SourceFile path="source.py">
        <py.VariableDeclaration name="importMe" refkey={rk1} />
      </SourceFile>,
      <SourceFile path="index.py">
        <py.StatementList>
          <py.MemberExpression>
            <py.MemberExpression.Part refkey={rk1} />
            <py.MemberExpression.Part id="foo" />
          </py.MemberExpression>
        </py.StatementList>
      </SourceFile>,
    ]);

    assertFileContents(res, {
      "index.py": d`
        from source import import_me

        import_me.foo
      `,
    });
  });
});

describe("with function calls", () => {
  it("handles simple function calls correctly", () => {
    expect(
      toSourceText([
        <py.MemberExpression>
          <py.MemberExpression.Part id="myFunction" />
          <py.MemberExpression.Part args={[1, 2]} />
        </py.MemberExpression>,
      ]),
    ).toBe(d`
      myFunction(1, 2)
    `);
  });

  it("handles function calls with references correctly", () => {
    const xRefkey = refkey();
    const yRefkey = refkey();
    expect(
      toSourceText([
        <py.StatementList>
          <py.VariableDeclaration name="x" initializer={1} refkey={xRefkey} />
          <py.VariableDeclaration name="y" initializer={2} refkey={yRefkey} />
          <py.MemberExpression>
            <py.MemberExpression.Part id="myFunction" />
            <py.MemberExpression.Part args={[xRefkey, yRefkey]} />
          </py.MemberExpression>
        </py.StatementList>,
      ]),
    ).toBe(d`
      x = 1
      y = 2
      myFunction(x, y)
    `);
  });

  it("handles method calls correctly", () => {
    expect(
      toSourceText([
        <py.MemberExpression>
          <py.MemberExpression.Part id="method1" />
          <py.MemberExpression.Part args={[1, 2]} />
          <py.MemberExpression.Part args={[]} />
          <py.MemberExpression.Part id="method2" />
          <py.MemberExpression.Part args={[]} />
          <py.MemberExpression.Part id="prop" />
        </py.MemberExpression>,
      ]),
    ).toBe(d`
      method1(1, 2)().method2().prop
    `);
  });

  it("handles function calls correctly", () => {
    expect(
      toSourceText([
        <py.MemberExpression>
          <py.MemberExpression.Part id="myFunction" />
          <py.MemberExpression.Part args={[1, 2]} />
          <py.MemberExpression.Part id="prop" />
        </py.MemberExpression>,
      ]),
    ).toBe(d`
      myFunction(1, 2).prop
    `);
  });

  it("handles function calls correctly", () => {
    expect(
      toSourceText([
        <py.MemberExpression>
          <py.MemberExpression.Part id="myFunction" />
          <py.MemberExpression.Part args={[1, 2]} />
          <py.MemberExpression.Part id="prop" />
        </py.MemberExpression>,
      ]),
    ).toBe(d`
      myFunction(1, 2).prop
    `);
  });
});

describe("formatting", () => {
  describe("simple chains", () => {
    it("just dots", () => {
      expect(
        toSourceText(
          [
            <py.MemberExpression>
              <py.MemberExpression.Part id="four" />
              <py.MemberExpression.Part id="four" />
              <py.MemberExpression.Part id="two" />
              <py.MemberExpression.Part id="two" />
              <py.MemberExpression.Part id="two" />
              <py.MemberExpression.Part id="two" />
            </py.MemberExpression>,
          ],
          { printOptions: { printWidth: 14 } },
        ),
      ).toBe(d`
        four.four \\
            .two.two \\
            .two.two
      `);
    });

    it("bracket breaks", () => {
      expect(
        toSourceText(
          [
            <py.MemberExpression>
              <py.MemberExpression.Part id="obj" />
              <py.MemberExpression.Part key={"property-name"} />
              <py.MemberExpression.Part id="prop" />
            </py.MemberExpression>,
          ],
          { printOptions: { printWidth: 12 } },
        ),
      ).toBe(d`
        obj[
            "property-name"
        ].prop
      `);
    });
  });

  describe("call chains", () => {
    it("renders multiple calls on the same line when there are no breaks and they fit", () => {
      expect(
        toSourceText([
          <py.MemberExpression>
            <py.MemberExpression.Part id="z" />
            <py.MemberExpression.Part id="object" />
            <py.MemberExpression.Part args />
            <py.MemberExpression.Part id="partial" />
            <py.MemberExpression.Part args />
            <py.MemberExpression.Part id="optional" />
            <py.MemberExpression.Part args />
          </py.MemberExpression>,
        ]),
      ).toBe(d`
        z.object().partial().optional()
      `);
    });
  });
});
