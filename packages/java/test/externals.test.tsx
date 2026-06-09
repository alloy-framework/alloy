import { StatementList } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { createLibrary } from "../src/index.js";
import { TestPackage } from "./utils.js";

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

  expect(
    <TestPackage externals={[testLib]}>
      <jv.Class public name="TestImport">
        <StatementList>
          <jv.ObjectDeclaration
            type={testLib["TestModel"]}
            name="myTestModel"
          />
          <jv.ObjectDeclaration
            type={testLib["TestClass"]}
            name="myTestClass"
          />
          <jv.ObjectDeclaration type={testLib["Tester"]} name="myTester" />
        </StatementList>
      </jv.Class>
    </TestPackage>,
  ).toRenderTo(`
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
