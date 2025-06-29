import { expect, it } from "vitest";
import {
  Children,
  code,
  createTap,
  Declaration,
  List,
  Name,
  Output,
  Refkey,
  resolve,
  Scope,
  SourceFile,
  useBinder,
} from "../index.js";
import { local, LocalGroup } from "./local.js";

function TestWrapper(props: { children: Children }) {
  const GetBinder = createTap(() => useBinder());

  function Reference(props: { refkey: Refkey }) {
    const result = resolve(props.refkey);
    return result.value.targetDeclaration.name;
  }

  return (
    <Output>
      <SourceFile path="test.txt" filetype="txt" reference={Reference}>
        <GetBinder />
        <Scope>{props.children}</Scope>
      </SourceFile>
    </Output>
  );
}

it("use simple name", () => {
  const Test = () => {
    return code`
        const ${local("foo")} = 1;
        console.log(${local("foo")});
      `;
  };
  expect(
    <TestWrapper>
      <Test />
    </TestWrapper>,
  ).toRenderTo(`
    const foo = 1;
    console.log(foo);
  `);
});
it("use simple name nested", () => {
  expect(
    <TestWrapper>
      {code`const ${local("foo")} = 1;`}
      <hbr />
      {code`console.log(${local("foo")});`}
    </TestWrapper>,
  ).toRenderTo(`
    const foo = 1;
    console.log(foo);
  `);
});

it("can be passed to sub components expecting refkeys", () => {
  function Sub(props: { refkey: Refkey }) {
    return code`
      ${props.refkey} ++;
    `;
  }
  expect(
    <TestWrapper>
      {code`const ${local("foo")} = 1;`}
      <hbr />
      <Sub refkey={local("foo") as any} />
    </TestWrapper>,
  ).toRenderTo(`
    const foo = 1;
    foo ++;
  `);
});

it("deduplicate conflicting names from another component", () => {
  function Sub() {
    return (
      <LocalGroup>{code`
      let ${local("foo")} = 1;
      ${local("foo")} ++;
    `}</LocalGroup>
    );
  }

  expect(
    <TestWrapper>
      <List>
        {code`
          const ${local("foo")} = 1;
          console.log(${local("foo")});
        `}
        <Sub />
      </List>
    </TestWrapper>,
  ).toRenderTo(`
      const foo = 1;
      console.log(foo);
      let foo_2 = 1;
      foo_2 ++;
    `);
});

it("deduplicate with existing names", () => {
  expect(
    <TestWrapper>
      <Declaration name="foo">
        decl <Name />
        <hbr />
        {code`
            const ${local("foo")} = 1;
            console.log(${local("foo")});
          `}
      </Declaration>
    </TestWrapper>,
  ).toRenderTo(`
    decl foo
    const foo_2 = 1;
    console.log(foo_2);
  `);
});
