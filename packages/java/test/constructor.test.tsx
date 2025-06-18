import { code, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { assertFileContents, testRender, toSourceText } from "./utils.js";

it("works", () => {
  const res = toSourceText(
    <>
      <jv.Declaration name="TestClass">
        {code`
        public class TestClass {
          ${(<jv.Constructor public name="TestClass" />)}
        }
      `}
      </jv.Declaration>
    </>,
  );

  expect(res).toBe(d`
    package me.test.code;

    public class TestClass {
      public TestClass() {}
    }
  `);
});

it("takes name from class", () => {
  const res = toSourceText(
    <>
      <jv.Declaration name="TestClass">
        {code`
        public class TestClass {
          ${(<jv.Constructor public />)}
        }
      `}
      </jv.Declaration>
    </>,
  );

  expect(res).toBe(d`
    package me.test.code;

    public class TestClass {
      public TestClass() {}
    }
  `);
});

it("declares parameters", () => {
  const res = testRender(
    <>
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
    </>,
  );

  assertFileContents(res, {
    "TestClass.java": d`
      package me.test.code.imports;
      
      import me.test.code.Model;

      public class TestClass {
        public TestClass(Model type, int age) {}
      }
    `,
  });
});
