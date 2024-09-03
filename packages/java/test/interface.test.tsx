import * as jv from "../src/components/index.js";
import { expect, it } from "vitest";
import { assertFileContents, testRender, toSourceText } from "./utils.js";
import { code, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";

it("works", () => {
  const res = toSourceText(
    <jv.Interface public name="TestInterface">
    </jv.Interface>,
  );

  expect(res).toBe(d`
    package me.test.code;

    public interface TestInterface {
      
    }
  `);
});

it("extends other interfaces", () => {
  const res = testRender(
    <>
      <jv.SourceFile path="InterfaceOne.java">
        <jv.Interface name="InterfaceOne" />
      </jv.SourceFile>
      <jv.SourceFile path="InterfaceTwo.java">
        <jv.Interface name="InterfaceTwo" />
      </jv.SourceFile>
      <jv.PackageDirectory package="import">
        <jv.SourceFile path="TestInterface.java">
          <jv.Interface public name="TestInterface" extends={[refkey("InterfaceOne"), refkey("InterfaceTwo")]}>
          </jv.Interface>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "TestInterface.java": `
      package me.test.code.import;

      import me.test.code.InterfaceOne;
      import me.test.code.InterfaceTwo;

      public interface TestInterface extends InterfaceOne, InterfaceTwo {
        
      }
    `,
  });
});

it("defines generics", () => {
  const res = testRender(
    <>
      <jv.SourceFile path="TypeOne.java">
        <jv.Interface name="TypeOne" />
      </jv.SourceFile>
      <jv.SourceFile path="TypeTwo.java">
        <jv.Interface name="TypeTwo" />
      </jv.SourceFile>
      <jv.PackageDirectory package="import">
        <jv.SourceFile path="TestGenerics.java">
          <jv.Interface public name="TestGenerics" generics={{ T: refkey("TypeOne"), N: refkey("TypeTwo"), J: 'String', K: ''}}>
          </jv.Interface>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "TestGenerics.java": d`
      package me.test.code.import;

      import me.test.code.TypeOne;
      import me.test.code.TypeTwo;

      public interface TestGenerics<T extends TypeOne, N extends TypeTwo, J extends String, K> {
        
      }
    `,
  });
});
