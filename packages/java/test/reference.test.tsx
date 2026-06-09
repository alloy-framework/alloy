import { Block, Output, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";

it("imports reference to source file", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="TestReference.java">
          <jv.Declaration name="TestReference">
            public class TestReference{" "}
            <Block>public TestReference() {"{}"}</Block>
          </jv.Declaration>
        </jv.SourceFile>
        <jv.PackageDirectory package="import">
          <jv.SourceFile path="TestImport.java">
            <jv.Declaration name="TestImport">
              public class TestImport{" "}
              <Block>
                {refkey("TestReference")} myImportedVariable;
                <hbr />
                public TestImport() {"{}"}
              </Block>
            </jv.Declaration>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/TestReference.java": `
      package me.test.code;

      public class TestReference {
        public TestReference() {}
      }
    `,
    "me/test/code/import/TestImport.java": `
      package me.test.code.import;

      import me.test.code.TestReference;

      public class TestImport {
        TestReference myImportedVariable;
        public TestImport() {}
      }
    `,
  });
});

it("doesn't import if in same package", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="TestReference.java">
          <jv.Declaration name="TestReference">
            public class TestReference{" "}
            <Block>public TestReference() {"{}"}</Block>
          </jv.Declaration>
        </jv.SourceFile>
        <jv.SourceFile path="TestImport.java">
          <jv.Declaration name="TestImport">
            public class TestImport{" "}
            <Block>
              {refkey("TestReference")} myImportedVariable;
              <hbr />
              public TestImport() {"{}"}
            </Block>
          </jv.Declaration>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/TestReference.java": `
      package me.test.code;

      public class TestReference {
        public TestReference() {}
      }
    `,
    "me/test/code/TestImport.java": `
      package me.test.code;

      public class TestImport {
        TestReference myImportedVariable;
        public TestImport() {}
      }
    `,
  });
});
