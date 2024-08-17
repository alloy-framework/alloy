import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { code, Declaration, Output, refkey } from "@alloy-js/core";
import { assertFileContents, testRender, toSourceText } from "./utils.js";
import { d } from "@alloy-js/core/testing";

it("works", () => {
  const res = toSourceText(
    <jv.Declaration name="Test">
      {code`
        class Test {
          ${<jv.Variable public static final type="String" name='myVar' value={<jv.Value value="Test" /> } />}
        }
      `}
    </jv.Declaration>,
  );

  expect(res).toBe(d`
    package me.test.code;
    
    class Test {
      public static final String myVar = "Test";
    }
  `);
});

it("works with external type", () => {
  const res = testRender(
    <>
      <jv.SourceFile path="Model.java">
        <jv.Declaration name='Model'>
          {code`
            public class Model {
            }
          `}
        </jv.Declaration>
      </jv.SourceFile>
      <jv.PackageDirectory package='imports'>
        <jv.SourceFile path="Test.java">
          <Declaration name="Test">
            {code`
              public class Test {
                ${<jv.Variable public static type={refkey("Model")} name='myModel' />}
              }
            `}
          </Declaration>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "Test.java": `
      package me.test.code.imports;
      
      import me.test.code.Model;

      public class Test {
        public static Model myModel;
      }
    `,
  });
});

it("declares new object", () => {
  const res = testRender(
    <>
      <jv.SourceFile path="Model.java">
        <jv.Declaration name='Model'>
          {code`
            public class Model {
            }
          `}
        </jv.Declaration>
      </jv.SourceFile>
      <jv.PackageDirectory package='imports'>
        <jv.SourceFile path="Test.java">
          <Declaration name="Test">
            {code`
              public class Test {
                ${<jv.ObjectDeclaration public static type={refkey("Model")} name='myModel' arguments={<jv.Value value="initValue" />} />}
              }
            `}
          </Declaration>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "Test.java": `
      package me.test.code.imports;
      
      import me.test.code.Model;

      public class Test {
        public static Model myModel = new Model("initValue");
      }
    `,
  });
});
