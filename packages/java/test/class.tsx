import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { assertFileContents, testRender, toSourceText } from "./utils.js";
import { d } from "@alloy-js/core/testing";
import { code, refkey } from "@alloy-js/core";

it("works", () => {
  const res = toSourceText(
    <jv.Class public abstract final name='TestClass'>
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
        <jv.Class public name='TestSuperclass'>
        </jv.Class>
      </jv.SourceFile>
      <jv.PackageDirectory package='import'>
        <jv.SourceFile path="TestSubclass.java">
          <jv.Class public name='TestSubclass' extends={refkey("TestSuperclass")}>
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
          <jv.Class public name="TestSubclass" implements={[refkey("InterfaceOne"), refkey("InterfaceTwo")]}>
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

it("defines generics", () => {
  const res = testRender(
    <>
      <jv.SourceFile path="TypeOne.java">
        <jv.Declaration name='TypeOne'>
          {code`
            public interface TypeOne {
            }
          `}
        </jv.Declaration>
      </jv.SourceFile>
      <jv.SourceFile path="TypeTwo.java">
        <jv.Declaration name='TypeTwo'>
          {code`
            public interface TypeTwo {
            }
          `}
        </jv.Declaration>
      </jv.SourceFile>
      <jv.PackageDirectory package="import">
        <jv.SourceFile path="TestGenerics.java">
          <jv.Class public name="TestGenerics" generics={{ T: refkey("TypeOne"), N: refkey("TypeTwo"), J: 'String', K: ''}}>
          </jv.Class>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "TestGenerics.java": d`
      package me.test.code.import;

      import me.test.code.TypeOne;
      import me.test.code.TypeTwo;

      public class TestGenerics<T extends TypeOne, N extends TypeTwo, J extends String, K> {
        
      }
    `,
  });
});
