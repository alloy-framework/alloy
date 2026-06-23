import { code, namekey, Output, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { TestPackage } from "./utils.js";

it("works", () => {
  expect(
    <TestPackage>
      <jv.Declaration name="Test">
        {code`
          class Test {
            ${(<jv.Variable public static final type="String" name="myVar" value={<jv.Value value="Test" />} />)};
          }
        `}
      </jv.Declaration>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    class Test {
      public static final String myVar = "Test";
    }
  `);
});

it("takes a namekey", () => {
  expect(
    <TestPackage>
      <jv.Declaration name={namekey("Test")}>
        {code`
          class Test {
            ${(<jv.Variable public static final type="String" name="myVar" value={<jv.Value value="Test" />} />)};
          }
        `}
      </jv.Declaration>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    class Test {
      public static final String myVar = "Test";
    }
  `);
});

it("works with external type", () => {
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
          <jv.SourceFile path="Test.java">
            <jv.Declaration name="Test">
              {code`
                public class Test {
                  ${(<jv.Variable public static type={refkey("Model")} name="myModel" />)};
                }
              `}
            </jv.Declaration>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/Model.java": expect.any(String),
    "me/test/code/imports/Test.java": `
      package me.test.code.imports;

      import me.test.code.Model;

      public class Test {
        public static Model myModel;
      }
    `,
  });
});

it("declares new object", () => {
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
          <jv.SourceFile path="Test.java">
            <jv.Declaration name="Test">
              {code`
                public class Test {
                  ${(<jv.ObjectDeclaration public static type={refkey("Model")} name="myModel" args={[<jv.Value value="initValue" />]} />)};
                }
              `}
            </jv.Declaration>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/Model.java": expect.any(String),
    "me/test/code/imports/Test.java": `
      package me.test.code.imports;

      import me.test.code.Model;

      public class Test {
        public static Model myModel = new Model("initValue");
      }
    `,
  });
});
