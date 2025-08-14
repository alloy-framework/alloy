import { Namespace } from "#components/namespace.jsx";
import { SourceFile } from "#components/SourceFile.jsx";
import { Output, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { EnumDeclaration } from "./declaration.jsx";
import { EnumMember } from "./member.jsx";

it("can reference things by refkey", () => {
  const enumRK = refkey();
  const twoRK = refkey();

  const tree = (
    <Output>
      <Namespace name="TestCode">
        <SourceFile path="Test.cs">
          <EnumDeclaration public name="TestEnum" refkey={enumRK}>
            <EnumMember name="One" />,<hbr />
            <EnumMember name="Two" refkey={twoRK} />
          </EnumDeclaration>
          <hbr />
          {enumRK};<hbr />
          {twoRK};
        </SourceFile>
      </Namespace>
    </Output>
  );
  expect(tree).toRenderTo(d`
    namespace TestCode;

    public enum TestEnum
    {
        One,
        Two
    }
    TestEnum;
    TestEnum.Two;
  `);
});

it("can reference things by refkey across files", () => {
  const enumRK = refkey();
  const barRK = refkey();

  const tree = (
    <Output>
      <Namespace name="TestCode">
        <SourceFile path="Test.cs">
          <EnumDeclaration public name="TestEnum">
            <EnumMember name="One" />,<hbr />
            <EnumMember name="Two" />
          </EnumDeclaration>
          <hbr />
          {enumRK};<hbr />
          {barRK};
        </SourceFile>
        <SourceFile path="Other.cs">
          <EnumDeclaration public name="OtherEnum" refkey={enumRK}>
            <EnumMember name="Foo" />,<hbr />
            <EnumMember name="Bar" refkey={barRK} />
          </EnumDeclaration>
          <hbr />
          {enumRK};<hbr />
          {barRK};
        </SourceFile>
      </Namespace>
    </Output>
  );
  expect(tree).toRenderTo({
    "Test.cs": d`
      namespace TestCode;

      public enum TestEnum
      {
          One,
          Two
      }
      OtherEnum;
      OtherEnum.Bar;
    `,
    "Other.cs": d`
      namespace TestCode;

      public enum OtherEnum
      {
          Foo,
          Bar
      }
      OtherEnum;
      OtherEnum.Bar;
    `,
  });
});
