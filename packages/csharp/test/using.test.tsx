import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as csharp from "../src/index.js";

it("uses a single namespace", () => {
  const res = core.render(
    <core.Output>
      <csharp.Namespace name='TestCode'>
        <csharp.SourceFile path="Test1.cs" using={["Foo"]} />
      </csharp.Namespace>
    </core.Output>,
  );

  expect(res.contents[0].contents).toBe(coretest.d`
    using Foo;
    namespace TestCode {}
  `);
});

it("uses multiple namespaces", () => {
  const res = core.render(
    <core.Output>
      <csharp.Namespace name='TestCode'>
        <csharp.SourceFile path="Test1.cs" using={["Foo", "Bar.Baz"]} />
      </csharp.Namespace>
    </core.Output>,
  );

  expect(res.contents[0].contents).toBe(coretest.d`
    using Bar.Baz;
    using Foo;
    namespace TestCode {}
  `);
});

it("adds using statement across namespaces", () => {
  const inputTypeRefkey = core.refkey();
  const params = {
    BodyParam: inputTypeRefkey,
  };

  const res = core.render(
    <core.Output namePolicy={csharp.createCSharpNamePolicy()}>
      <csharp.Namespace name='Models'>
        <csharp.SourceFile path="Models.cs">
          <csharp.Class accessModifier='public' name="Input" refkey={inputTypeRefkey} />
          <csharp.Class accessModifier='public' name="Output" />
          <csharp.Enum accessModifier='public' name="TestEnum">
            <csharp.EnumMember name="One" />,
            <csharp.EnumMember name="Two" />
          </csharp.Enum>
        </csharp.SourceFile>
      </csharp.Namespace>
      <csharp.Namespace name='Client'>
        <csharp.SourceFile path="Client.cs">
          <csharp.Class accessModifier='public' name="Client">
            <csharp.ClassMethod accessModifier="public" name="MethodOne" parameters={params} returns={core.refkey("Output")} />
          </csharp.Class>
          {core.refkey("Two")};
        </csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
  );

  expect(res.contents[0].contents).toBe(coretest.d`
    namespace Models
    {
      public class Input;
      public class Output;
      public enum TestEnum
      {
        One,
        Two
      }
    }
  `);

  expect(res.contents[1].contents).toBe(coretest.d`
    using Models;
    namespace Client
    {
      public class Client
      {
        public Output MethodOne(Input bodyParam) {}
      }
      TestEnum.Two;
    }
  `);
});
