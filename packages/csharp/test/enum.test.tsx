import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as csharp from "../src/index.js";
import * as utils from "./utils.js";

it("declares enum with no members", () => {
  const res = utils.toSourceText(
    <csharp.Enum accessModifier='public' name="TestEnum" />,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
        public enum TestEnum;
    }

  `);
});

it("declares enum with members", () => {
  const res = utils.toSourceText(
    <csharp.Enum accessModifier='public' name="TestEnum">
      <csharp.EnumMember name="One" />,
      <csharp.EnumMember name="Two" />
    </csharp.Enum>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
        public enum TestEnum
        {
            One,
            Two
        }
    }

  `);
});

it("applies naming policy to enum and members", () => {
  const res = utils.toSourceText(
    <csharp.Enum accessModifier='public' name="testEnum">
      <csharp.EnumMember name="one" />,
      <csharp.EnumMember name="two" />
    </csharp.Enum>,
  );

  expect(res).toBe(coretest.d`
    namespace TestCode
    {
        public enum TestEnum
        {
            One,
            Two
        }
    }

  `);
});

it("can reference things by refkey", () => {
  const enumRK = core.refkey();
  const twoRK = core.refkey();

  const res = core.render(
    <core.Output>
      <csharp.Namespace name='TestCode'>
        <csharp.SourceFile path="Test.cs">
          <csharp.Enum accessModifier='public' name="TestEnum" refkey={enumRK}>
            <csharp.EnumMember name="One" />,
            <csharp.EnumMember name="Two" refkey={twoRK} />
          </csharp.Enum>
          {enumRK};
          {twoRK};
        </csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
  );

  expect(res.contents[0].contents).toBe(coretest.d`
    namespace TestCode
    {
        public enum TestEnum
        {
            One,
            Two
        }
        TestEnum;
        TestEnum.Two;
    }

  `);
});

it("can reference things by refkey across files", () => {
  const enumRK = core.refkey();
  const barRK = core.refkey();

  const res = core.render(
    <core.Output>
      <csharp.Namespace name='TestCode'>
        <csharp.SourceFile path="Test.cs">
          <csharp.Enum accessModifier='public' name="TestEnum">
            <csharp.EnumMember name="One" />,
            <csharp.EnumMember name="Two" />
          </csharp.Enum>
          {enumRK};
          {barRK};
        </csharp.SourceFile>
        <csharp.SourceFile path="Other.cs">
          <csharp.Enum accessModifier='public' name="OtherEnum" refkey={enumRK}>
            <csharp.EnumMember name="Foo" />,
            <csharp.EnumMember name="Bar" refkey={barRK} />
          </csharp.Enum>
          {enumRK};
          {barRK};
        </csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
  );

  expect(res.contents[0].path).toBe("Test.cs");
  expect(res.contents[0].contents).toBe(coretest.d`
    namespace TestCode
    {
        public enum TestEnum
        {
            One,
            Two
        }
        OtherEnum;
        OtherEnum.Bar;
    }

  `);

  expect(res.contents[1].path).toBe("Other.cs");
  expect(res.contents[1].contents).toBe(coretest.d`
    namespace TestCode
    {
        public enum OtherEnum
        {
            Foo,
            Bar
        }
        OtherEnum;
        OtherEnum.Bar;
    }

  `);
});
