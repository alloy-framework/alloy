import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as csharp from "../src/index.js";

it("uses a single namespace", () => {
  const res = core.render(
    <core.Output>
      <csharp.Namespace name="TestCode">
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
      <csharp.Namespace name="TestCode">
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
  const outputTypeRefkey = core.refkey();
  const twoValRefkey = core.refkey();

  const params = [
    {
      name: "BodyParam",
      type: inputTypeRefkey,
    },
  ];

  const res = core.render(
    <core.Output namePolicy={csharp.createCSharpNamePolicy()}>
      <csharp.Namespace name="Models">
        <csharp.SourceFile path="Models.cs">
          <csharp.Class public name="Input" refkey={inputTypeRefkey} />
          <hbr />
          <csharp.Class public name="Output" refkey={outputTypeRefkey} />
          <hbr />
          <csharp.Enum public name="TestEnum">
            <csharp.EnumMember name="One" />,<hbr />
            <csharp.EnumMember name="Two" refkey={twoValRefkey} />
          </csharp.Enum>
        </csharp.SourceFile>
      </csharp.Namespace>
      <csharp.Namespace name="Client">
        <csharp.SourceFile path="Client.cs" using={["System"]}>
          <csharp.Class public name="Client">
            <csharp.ClassMethod
              public
              name="MethodOne"
              parameters={params}
              returns={outputTypeRefkey}
            />
          </csharp.Class>
          <hbr />
          {twoValRefkey};
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
    using System;

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
