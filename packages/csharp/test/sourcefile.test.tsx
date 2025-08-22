import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { it } from "vitest";
import * as csharp from "../src/index.js";
import { assertFileContents } from "./utils.jsx";

it("defines multiple source files with unique content", () => {
  const res = core.render(
    <core.Output>
      <csharp.Namespace name="TestCode">
        <csharp.SourceFile path="Test1.cs">
          <csharp.ClassDeclaration public name="TestClass1" />
        </csharp.SourceFile>
        <csharp.SourceFile path="Test2.cs">
          <csharp.ClassDeclaration public name="TestClass2" />
        </csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
  );

  assertFileContents(res, {
    "Test1.cs": coretest.d`
      namespace TestCode;

      public class TestClass1;
    `,
    "Test2.cs": coretest.d`
      namespace TestCode;

      public class TestClass2;
    `,
  });
});
