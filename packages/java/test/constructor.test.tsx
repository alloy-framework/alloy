import { code, Output, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { TestPackage } from "./utils.js";

it("works", () => {
  expect(
    <TestPackage>
      <jv.Declaration name="TestClass">
        {code`
          public class TestClass {
            ${(<jv.Constructor public name="TestClass" />)}
          }
        `}
      </jv.Declaration>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public class TestClass {
      public TestClass() {}
    }
  `);
});

it("takes name from class", () => {
  expect(
    <TestPackage>
      <jv.Declaration name="TestClass">
        {code`
          public class TestClass {
            ${(<jv.Constructor public />)}
          }
        `}
      </jv.Declaration>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    public class TestClass {
      public TestClass() {}
    }
  `);
});

it("declares parameters", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="Model.java">
          <jv.Declaration name="Model">
            {code`
              public class Model {
              }
            `}
          </jv.Declaration>
        </jv.SourceFile>
        <jv.PackageDirectory package="imports">
          <jv.SourceFile path="TestClass.java">
            <jv.Declaration name="TestClass">
              {code`
                public class TestClass {
                  ${(
                    <jv.Constructor
                      public
                      parameters={{
                        type: refkey("Model"),
                        age: "int",
                      }}
                    />
                  )}
                }
              `}
            </jv.Declaration>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/Model.java": expect.any(String),
    "me/test/code/imports/TestClass.java": `
      package me.test.code.imports;

      import me.test.code.Model;

      public class TestClass {
        public TestClass(Model type, int age) {}
      }
    `,
  });
});
