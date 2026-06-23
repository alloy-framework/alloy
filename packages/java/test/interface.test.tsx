import { namekey, Output, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { TestPackage } from "./utils.js";

it("works", () => {
  expect(
    <TestPackage>
      <jv.Interface public name="TestInterface"></jv.Interface>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public interface TestInterface {}
  `);
});

it("takes a namekey", () => {
  expect(
    <TestPackage>
      <jv.Interface public name={namekey("TestInterface")}></jv.Interface>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public interface TestInterface {}
  `);
});

it("extends other interfaces", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="InterfaceOne.java">
          <jv.Interface name="InterfaceOne" />
        </jv.SourceFile>
        <jv.SourceFile path="InterfaceTwo.java">
          <jv.Interface name="InterfaceTwo" />
        </jv.SourceFile>
        <jv.PackageDirectory package="import">
          <jv.SourceFile path="TestInterface.java">
            <jv.Interface
              public
              name="TestInterface"
              extends={[refkey("InterfaceOne"), refkey("InterfaceTwo")]}
            ></jv.Interface>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/InterfaceOne.java": expect.any(String),
    "me/test/code/InterfaceTwo.java": expect.any(String),
    "me/test/code/import/TestInterface.java": `
      package me.test.code.import;

      import me.test.code.InterfaceOne;
      import me.test.code.InterfaceTwo;

      public interface TestInterface extends InterfaceOne, InterfaceTwo {}
    `,
  });
});

it("defines generics", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="TypeOne.java">
          <jv.Interface name="TypeOne" />
        </jv.SourceFile>
        <jv.SourceFile path="TypeTwo.java">
          <jv.Interface name="TypeTwo" />
        </jv.SourceFile>
        <jv.PackageDirectory package="import">
          <jv.SourceFile path="TestGenerics.java">
            <jv.Interface
              public
              name="TestGenerics"
              generics={{
                T: refkey("TypeOne"),
                N: refkey("TypeTwo"),
                J: "String",
                K: "",
              }}
            ></jv.Interface>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo(
    {
      "me/test/code/TypeOne.java": expect.any(String),
      "me/test/code/TypeTwo.java": expect.any(String),
      "me/test/code/import/TestGenerics.java": `
        package me.test.code.import;

        import me.test.code.TypeOne;
        import me.test.code.TypeTwo;

        public interface TestGenerics<T extends TypeOne, N extends TypeTwo, J extends String, K> {}
      `,
    },
    { printWidth: 100 },
  );
});
