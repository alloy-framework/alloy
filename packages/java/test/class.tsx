import { code, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { assertFileContents, testRender, toSourceText } from "./utils.js";

it("works", () => {
  const res = toSourceText(
    <jv.Class accessModifier='public' abstract final name='TestClass'>
    </jv.Class>,
  );

  expect(res).toBe(d`
    package me.test.code;

    public abstract final class TestClass {
      
    }
  `);
});

it("extends class", () => {
  const res = testRender(
    <>
      <jv.SourceFile path="TestSuperclass.java">
        <jv.Class accessModifier='public' name='TestSuperclass'>
        </jv.Class>
      </jv.SourceFile>
      <jv.PackageDirectory package='import'>
        <jv.SourceFile path="TestSubclass.java">
          <jv.Class accessModifier='public' name='TestSubclass' extends={refkey("TestSuperclass")}>
          </jv.Class>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "TestSubclass.java": d`
      package me.test.code.import;

      import me.test.code.TestSuperclass;

      public class TestSubclass extends TestSuperclass {
        
      }
    `,
  });
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
        <jv.SourceFile path="TestSubclass.java">
          <jv.Class accessModifier='public' name="TestSubclass" implements={[refkey("InterfaceOne"), refkey("InterfaceTwo")]}>
          </jv.Class>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "TestSubclass.java": d`
      package me.test.code.import;

      import me.test.code.InterfaceOne;
      import me.test.code.InterfaceTwo;

      public class TestSubclass implements InterfaceOne, InterfaceTwo {
        
      }
    `,
  });
});
