import { code, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { assertFileContents, testRender, toSourceText } from "./utils.js";

it("works", () => {
  const res = toSourceText(<jv.Enum public name="TestEnum">
    </jv.Enum>);

  expect(res).toBe(d`
    package me.test.code;

    public enum TestEnum {
      
    }
  `);
});

it("implements interfaces", () => {
  const res = testRender(
    <>
      <jv.SourceFile path="InterfaceOne.java">
        <jv.Declaration name='InterfaceOne'>
          {code`
            public interface InterfaceOne {
            }
          `}
        </jv.Declaration>
      </jv.SourceFile>
      <jv.SourceFile path="InterfaceTwo.java">
        <jv.Declaration name='InterfaceTwo'>
          {code`
            public interface InterfaceTwo {
            }
          `}
        </jv.Declaration>
      </jv.SourceFile>
      <jv.PackageDirectory package="import">
        <jv.SourceFile path="TestEnum.java">
          <jv.Enum public name="TestEnum" implements={[refkey("InterfaceOne"), refkey("InterfaceTwo")]}>
          </jv.Enum>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "TestEnum.java": d`
      package me.test.code.import;

      import me.test.code.InterfaceOne;
      import me.test.code.InterfaceTwo;

      public enum TestEnum implements InterfaceOne, InterfaceTwo {
        
      }
    `,
  });
});

it("declares members", () => {
  const res = toSourceText(
    <jv.Enum public name="TestEnum">
      <jv.EnumMember name="ONE" />
      <jv.EnumMember name="TWO" />
    </jv.Enum>,
  );

  expect(res).toBe(d`
    package me.test.code;

    public enum TestEnum {
      ONE,
      TWO;
    }
  `);
});

it("declares members with arguments", () => {
  const res = toSourceText(
    <jv.Enum public name="TestEnum">
      <jv.EnumMember name="ONE" arguments={[<jv.Value value="One" />]} />
      <jv.EnumMember name="TWO" arguments={[<jv.Value value="Two" />]} />

      <jv.Constructor parameters={{
        value: "String",
      }}>
      </jv.Constructor>
    </jv.Enum>,
  );

  expect(res).toBe(d`
    package me.test.code;

    public enum TestEnum {
      ONE("One"),
      TWO("Two");
      
      TestEnum(String value) {
        
      }
    }
  `);
});
