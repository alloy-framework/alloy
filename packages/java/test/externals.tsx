import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { createLibrary } from "../src/index.js";
import { findFile } from "./utils.js";
import { Output, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";

it("uses import from external library", () => {
  const testLib = createLibrary({
    groupId: "me.test",
    artifactId: "test-lib",
    version: "1.0.0",
    descriptor: {
      "me.test.testlib": ["TestClass", "Tester"],
      "me.test.testlib.models": ["TestModel"],
    },
  });

  const res = render(
    <Output externals={[testLib]}>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path='TestImport.java'>
          <jv.Class public name="TestImport">
            <jv.ObjectDeclaration type={testLib["TestModel"]} name="myTestModel" />
            <jv.ObjectDeclaration type={testLib["TestClass"]} name="myTestClass" />
            <jv.ObjectDeclaration type={testLib["Tester"]} name="myTester" />
          </jv.Class>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </Output>,
  );

  expect(findFile(res, "TestImport.java").contents).toBe(d`
    package me.test.code;

    import me.test.testlib.models.TestModel;
    import me.test.testlib.TestClass;
    import me.test.testlib.Tester;

    public class TestImport {
      TestModel myTestModel = new TestModel();
      TestClass myTestClass = new TestClass();
      Tester myTester = new Tester();
    }
  `);
});
