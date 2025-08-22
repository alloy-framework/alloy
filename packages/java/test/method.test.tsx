import { code, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { assertFileContents, testRender, toSourceText } from "./utils.js";

it("declares basic empty function", () => {
  const res = toSourceText(
    <jv.Declaration name="Test">
      {code`
        class Test {
          ${(
            <jv.Method public name="testMethod">
              System.out.println("Test");
            </jv.Method>
          )}
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
          ${(<jv.Method public name="testMethod" />)}
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

describe("can throw errors", () => {
  it("of generic Exception", () => {
    const res = toSourceText(
      <jv.Declaration name="Test">
        {code`
        class Test {
          ${(<jv.Method public name="testMethod" throws={"Exception"} />)}
        }
      `}
      </jv.Declaration>,
    );

    expect(res).toBe(d`
    package me.test.code;
    
    class Test {
      public void testMethod() throws Exception;
    }
  `);
  });

  it("of custom Exception", () => {
    const res = testRender(
      <>
        <jv.SourceFile path="Test.java">
          <jv.Declaration name="Test">
            {code`
              class Test {
                ${(<jv.Method public name="testMethod" throws={refkey("CustomError")} />)}
              }
            `}
          </jv.Declaration>
        </jv.SourceFile>
        <jv.PackageDirectory package="errors">
          <jv.SourceFile path="CustomError.java">
            <jv.Declaration name="CustomError">
              {code`
                public class CustomError extends Exception {
                }
              `}
            </jv.Declaration>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </>,
    );

    assertFileContents(res, {
      "Test.java": d`
      package me.test.code;
      
      import me.test.code.errors.CustomError;

      class Test {
        public void testMethod() throws CustomError;
      }
    `,
    });
  });
});

it("declares return type", () => {
  const res = toSourceText(
    <jv.Declaration name="Test">
      {code`
        class Test {
          ${(
            <jv.Method public name="testMethod" return="String">
              System.out.println("Test");
              <hbr />
              return "Test";
            </jv.Method>
          )}
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
                ${(
                  <jv.Method
                    public
                    name="testMethod"
                    parameters={{
                      myModel: refkey("Model"),
                      name: "String",
                    }}
                  >
                    System.out.println("Test");
                  </jv.Method>
                )}
              }
            `}
          </jv.Declaration>
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
        }
      }
    `,
  });
});

it("defines generics", () => {
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
        <jv.SourceFile path="Test.java">
          <jv.Declaration name="Test">
            {code`
              public class Test {
                ${(
                  <jv.Method
                    public
                    generics={{ T: refkey("Model"), N: "String", K: "" }}
                    name="testMethod"
                  >
                    System.out.println("Test");
                  </jv.Method>
                )}
              }
            `}
          </jv.Declaration>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "Test.java": d`
      package me.test.code.imports;
      
      import me.test.code.Model;

      public class Test {
        public <T extends Model, N extends String, K> void testMethod() {
          System.out.println("Test");
        }
      }
    `,
  });
});
