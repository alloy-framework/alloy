import { refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { assertFileContents, testRender, toSourceText } from "./utils.js";

it("works", () => {
  const res = toSourceText(
    <jv.Interface accessModifier='public' name="TestInterface">
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
          <jv.Interface accessModifier='public' name="TestInterface" extends={[refkey("InterfaceOne"), refkey("InterfaceTwo")]}>
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
