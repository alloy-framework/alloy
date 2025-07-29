import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as csharp from "../src/index.js";
import * as utils from "./utils.js";
import { findFile } from "./utils.js";

it("declares enum with no members", () => {
  const res = utils.toSourceText(
    <csharp.EnumDeclaration public name="TestEnum" />,
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
    <csharp.EnumDeclaration public name="TestEnum">
      <csharp.EnumMember name="One" />,<hbr />
      <csharp.EnumMember name="Two" />
    </csharp.EnumDeclaration>,
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
    <csharp.EnumDeclaration public name="testEnum">
      <csharp.EnumMember name="one" />,<hbr />
      <csharp.EnumMember name="two" />
    </csharp.EnumDeclaration>,
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
      <csharp.Namespace name="TestCode">
        <csharp.SourceFile path="Test.cs">
          <csharp.EnumDeclaration public name="TestEnum" refkey={enumRK}>
            <csharp.EnumMember name="One" />,<hbr />
            <csharp.EnumMember name="Two" refkey={twoRK} />
          </csharp.EnumDeclaration>
          <hbr />
          {enumRK};<hbr />
          {twoRK};
        </csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
  );

  expect(findFile(res, "Test.cs").contents).toBe(coretest.d`
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
      <csharp.Namespace name="TestCode">
        <csharp.SourceFile path="Test.cs">
          <csharp.EnumDeclaration public name="TestEnum">
            <csharp.EnumMember name="One" />,<hbr />
            <csharp.EnumMember name="Two" />
          </csharp.EnumDeclaration>
          <hbr />
          {enumRK};<hbr />
          {barRK};
        </csharp.SourceFile>
        <csharp.SourceFile path="Other.cs">
          <csharp.EnumDeclaration public name="OtherEnum" refkey={enumRK}>
            <csharp.EnumMember name="Foo" />,<hbr />
            <csharp.EnumMember name="Bar" refkey={barRK} />
          </csharp.EnumDeclaration>
          <hbr />
          {enumRK};<hbr />
          {barRK};
        </csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
  );

  expect(findFile(res, "Test.cs").contents).toBe(coretest.d`
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

  expect(findFile(res, "Other.cs").contents).toBe(coretest.d`
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
