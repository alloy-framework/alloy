import { code, Output, refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { TestPackage } from "./utils.js";

it("declares basic empty function", () => {
  expect(
    <TestPackage>
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
      </jv.Declaration>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    class Test {
      public void testMethod() {
        System.out.println("Test");
      }
    }
  `);
});

it("declares bodyless function", () => {
  expect(
    <TestPackage>
      <jv.Declaration name="Test">
        {code`
          class Test {
            ${(<jv.Method public name="testMethod" />)}
          }
        `}
      </jv.Declaration>
    </TestPackage>,
  ).toRenderTo(`
    package me.test.code;

    class Test {
      public void testMethod();
    }
  `);
});

describe("can throw errors", () => {
  it("of generic Exception", () => {
    expect(
      <TestPackage>
        <jv.Declaration name="Test">
          {code`
            class Test {
              ${(<jv.Method public name="testMethod" throws={"Exception"} />)}
            }
          `}
        </jv.Declaration>
      </TestPackage>,
    ).toRenderTo(`
      package me.test.code;

      class Test {
        public void testMethod() throws Exception;
      }
    `);
  });

  it("of custom Exception", () => {
    expect(
      <Output>
        <jv.PackageDirectory package="me.test.code">
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
        </jv.PackageDirectory>
      </Output>,
    ).toRenderTo({
      "me/test/code/Test.java": `
        package me.test.code;

        import me.test.code.errors.CustomError;

        class Test {
          public void testMethod() throws CustomError;
        }
      `,
      "me/test/code/errors/CustomError.java": expect.any(String),
    });
  });
});

it("declares return type", () => {
  expect(
    <TestPackage>
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
      </jv.Declaration>
    </TestPackage>,
  ).toRenderTo(`
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
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/Model.java": expect.any(String),
    "me/test/code/imports/Test.java": `
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
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/Model.java": expect.any(String),
    "me/test/code/imports/Test.java": `
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
