import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { assertFileContents, testRender, toSourceText } from "./utils.js";
import { AccessModifier } from "../src/index.js";
import { d } from "@alloy-js/core/testing";
import { code, Declaration, refkey } from "@alloy-js/core";

it("declares basic empty function", () => {
  const res = toSourceText(
    <jv.Declaration name="Test">
      {code`
        class Test {
          ${<jv.Method accessModifier='public' name="testMethod">
            System.out.println("Test");
          </jv.Method>}
        }
      `}
    </jv.Declaration>,
  );

  expect(res).toBe(d`
    package me.test.code;
    
    class Test {
      public void testMethod() {
        System.out.println("Test");
      }
    }
  `);
});

it("declares bodyless function", () => {
  const res = toSourceText(
    <jv.Declaration name="Test">
      {code`
        class Test {
          ${<jv.Method accessModifier='public' name="testMethod" />}
        }
      `}
    </jv.Declaration>,
  );

  expect(res).toBe(d`
    package me.test.code;
    
    class Test {
      public void testMethod();
    }
  `);
});

it("declares return type", () => {
  const res = toSourceText(
    <jv.Declaration name="Test">
      {code`
        class Test {
          ${<jv.Method accessModifier='public' name="testMethod" return='String'>
            System.out.println("Test");
            return "Test";
          </jv.Method>}
        }
      `}
    </jv.Declaration>,
  );

  expect(res).toBe(d`
    package me.test.code;
    
    class Test {
      public String testMethod() {
        System.out.println("Test");
        return "Test";
      }
    }
  `);
});

it("declares parameters", () => {
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
                ${<jv.Method accessModifier='public' name="testMethod" parameters={{
                  myModel: refkey("Model"),
                  name: "String"
                  }}>
                    System.out.println("Test");
                    return "Test";
                  </jv.Method>}
              }
            `}
          </Declaration>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "Test.java": d`
      package me.test.code.imports;
      
      import me.test.code.Model;

      public class Test {
        public void testMethod(Model myModel, String name) {
          System.out.println("Test");
          return "Test";
        }
      }
    `,
  });
});
