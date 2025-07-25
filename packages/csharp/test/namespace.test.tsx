import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { it } from "vitest";
import * as csharp from "../src/index.js";
import { assertFileContents } from "./utils.jsx";

it("defines multiple namespaces and source files with unique content", () => {
  const res = core.render(
    <core.Output>
      <csharp.Namespace name="Namespace1">
        <csharp.SourceFile path="Model1.cs">
          <csharp.ClassDeclaration public name="Model1" />
        </csharp.SourceFile>
        <csharp.SourceFile path="Model2.cs">
          <csharp.ClassDeclaration public name="Model2" />
        </csharp.SourceFile>
      </csharp.Namespace>
      <csharp.Namespace name="Namespace2">
        <csharp.SourceFile path="Model3.cs">
          <csharp.ClassDeclaration public name="Model3" />
        </csharp.SourceFile>
        <csharp.SourceFile path="Model4.cs">
          <csharp.ClassDeclaration public name="Model4" />
        </csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
  );

  assertFileContents(res, {
    "Model1.cs": coretest.d`
      namespace Namespace1
      {
          public class Model1;
      }
    `,
    "Model2.cs": coretest.d`
      namespace Namespace1
      {
          public class Model2;
      }
    `,
    "Model3.cs": coretest.d`
      namespace Namespace2
      {
          public class Model3;
      }
    `,
    "Model4.cs": coretest.d`
      namespace Namespace2
      {
          public class Model4;
      }
    `,
  });
});
