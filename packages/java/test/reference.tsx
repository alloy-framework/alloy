import { refkey } from "@alloy-js/core";
import { it } from "vitest";
import * as jv from "../src/components/index.js";
import { assertFileContents, testRender } from "./utils.js";

it("imports reference to source file", () => {
  const res = testRender(
    <>
      <jv.SourceFile path="TestReference.java">
        <jv.Declaration name="TestReference">
          public class TestReference {"{"}
            public TestReference() {"{}"}
          {"}"}
        </jv.Declaration>
      </jv.SourceFile>
      <jv.PackageDirectory package='import'>
        <jv.SourceFile path="TestImport.java">
          <jv.Declaration name="TestImport">
            public class TestImport {"{"}
              {refkey("TestReference")} myImportedVariable;
              public TestImport() {"{}"}
            {"}"}
          </jv.Declaration>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "TestReference.java": `
      package me.test.code;

      public class TestReference {
        public TestReference() {}
      }
    `,
    "TestImport.java": `
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
  const res = testRender(
    <>
      <jv.SourceFile path="TestReference.java">
        <jv.Declaration name="TestReference">
          public class TestReference {"{"}
            public TestReference() {"{}"}
          {"}"}
        </jv.Declaration>
      </jv.SourceFile>
      <jv.SourceFile path="TestImport.java">
        <jv.Declaration name="TestImport">
          public class TestImport {"{"}
            {refkey("TestReference")} myImportedVariable;
            public TestImport() {"{}"}
          {"}"}
        </jv.Declaration>
      </jv.SourceFile>
    </>,
  );

  assertFileContents(res, {
    "TestReference.java": `
      package me.test.code;

      public class TestReference {
        public TestReference() {}
      }
    `,
    "TestImport.java": `
      package me.test.code;

      public class TestImport {
        TestReference myImportedVariable;
        public TestImport() {}
      }
    `,
  });
});
