import { code, namekey, Output, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { TestPackage } from "./utils.js";

it("works", () => {
  expect(
    <TestPackage>
      <jv.Enum public name="TestEnum"></jv.Enum>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public enum TestEnum {}
  `);
});

it("takes a namekey", () => {
  expect(
    <TestPackage>
      <jv.Enum public name={namekey("TestEnum")}></jv.Enum>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public enum TestEnum {}
  `);
});

it("implements interfaces", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="InterfaceOne.java">
          <jv.Declaration name="InterfaceOne">
            {code`
              public interface InterfaceOne {
              }
            `}
          </jv.Declaration>
        </jv.SourceFile>
        <jv.SourceFile path="InterfaceTwo.java">
          <jv.Declaration name="InterfaceTwo">
            {code`
              public interface InterfaceTwo {
              }
            `}
          </jv.Declaration>
        </jv.SourceFile>
        <jv.PackageDirectory package="import">
          <jv.SourceFile path="TestEnum.java">
            <jv.Enum
              public
              name="TestEnum"
              implements={[refkey("InterfaceOne"), refkey("InterfaceTwo")]}
            ></jv.Enum>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo(
    {
      "me/test/code/InterfaceOne.java": expect.any(String),
      "me/test/code/InterfaceTwo.java": expect.any(String),
      "me/test/code/import/TestEnum.java": `
        package me.test.code.import;

        import me.test.code.InterfaceOne;
        import me.test.code.InterfaceTwo;

        public enum TestEnum implements InterfaceOne, InterfaceTwo {}
      `,
    },
    { printWidth: 100 },
  );
});

it("declares members", () => {
  expect(
    <TestPackage>
      <jv.Enum public name="TestEnum">
        <jv.EnumMemberList>
          <jv.EnumMember name="ONE" />
          <jv.EnumMember name="TWO" />
        </jv.EnumMemberList>
      </jv.Enum>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public enum TestEnum {
      ONE,
      TWO;
    }
  `);
});

it("declares members with arguments", () => {
  expect(
    <TestPackage>
      <jv.Enum public name="TestEnum">
        <jv.EnumMemberList>
          <jv.EnumMember name="ONE" args={[<jv.Value value="One" />]} />
          <jv.EnumMember name="TWO" args={[<jv.Value value="Two" />]} />
        </jv.EnumMemberList>
        <hbr />
        <hbr />
        <jv.Constructor
          parameters={{
            value: "String",
          }}
        ></jv.Constructor>
      </jv.Enum>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public enum TestEnum {
      ONE("One"),
      TWO("Two");

      TestEnum(String value) {}
    }
  `);
});
