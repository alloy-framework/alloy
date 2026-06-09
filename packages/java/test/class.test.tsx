import { code, Output, namekey, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { TestPackage } from "./utils.js";

it("works", () => {
  expect(
    <TestPackage>
      <jv.Class public abstract final name="TestClass"></jv.Class>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public abstract final class TestClass {}
  `);
});

it("takes a namekey", () => {
  expect(
    <TestPackage>
      <jv.Class public abstract final name={namekey("TestClass")}></jv.Class>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public abstract final class TestClass {}
  `);
});

it("extends class", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="TestSuperclass.java">
          <jv.Class
            public
            name="TestSuperclass"
            refkey={refkey("TestSuperclass")}
          ></jv.Class>
        </jv.SourceFile>
        <jv.PackageDirectory package="import">
          <jv.SourceFile path="TestSubclass.java">
            <jv.Class
              public
              name="TestSubclass"
              extends={refkey("TestSuperclass")}
            ></jv.Class>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/TestSuperclass.java": expect.any(String),
    "me/test/code/import/TestSubclass.java": `
      package me.test.code.import;

      import me.test.code.TestSuperclass;

      public class TestSubclass extends TestSuperclass {}
    `,
  });
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
          <jv.SourceFile path="TestSubclass.java">
            <jv.Class
              public
              name="TestSubclass"
              implements={[refkey("InterfaceOne"), refkey("InterfaceTwo")]}
            ></jv.Class>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/InterfaceOne.java": expect.any(String),
    "me/test/code/InterfaceTwo.java": expect.any(String),
    "me/test/code/import/TestSubclass.java": `
      package me.test.code.import;

      import me.test.code.InterfaceOne;
      import me.test.code.InterfaceTwo;

      public class TestSubclass implements InterfaceOne, InterfaceTwo {}
    `,
  });
});

it("defines generics", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="TypeOne.java">
          <jv.Declaration name="TypeOne">
            {code`
              public interface TypeOne {
              }
            `}
          </jv.Declaration>
        </jv.SourceFile>
        <jv.SourceFile path="TypeTwo.java">
          <jv.Declaration name="TypeTwo">
            {code`
              public interface TypeTwo {
              }
            `}
          </jv.Declaration>
        </jv.SourceFile>
        <jv.PackageDirectory package="import">
          <jv.SourceFile path="TestGenerics.java">
            <jv.Class
              public
              name="TestGenerics"
              generics={{
                T: refkey("TypeOne"),
                N: refkey("TypeTwo"),
                J: "String",
                K: "",
              }}
            ></jv.Class>
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

        public class TestGenerics<T extends TypeOne, N extends TypeTwo, J extends String, K> {}
      `,
    },
    { printWidth: 100 },
  );
});
