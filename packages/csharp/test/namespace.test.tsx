import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as csharp from "../src/index.js";

it("defines multiple namespaces and source files with unique content", () => {
  const res = core.render(
    <core.Output>
      <csharp.Namespace name="Namespace1">
        <csharp.SourceFile path="Model1.cs">
          <csharp.Class accessModifier="public" name="Model1" />
        </csharp.SourceFile>
        <csharp.SourceFile path="Model2.cs">
          <csharp.Class accessModifier="public" name="Model2" />
        </csharp.SourceFile>
      </csharp.Namespace>
      <csharp.Namespace name="Namespace2">
        <csharp.SourceFile path="Model3.cs">
          <csharp.Class accessModifier="public" name="Model3" />
        </csharp.SourceFile>
        <csharp.SourceFile path="Model4.cs">
          <csharp.Class accessModifier="public" name="Model4" />
        </csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
  );

  expect(res.contents[0].path).equals("Model1.cs");
  expect(res.contents[0].contents).toBe(coretest.d`
    namespace Namespace1
    {
        public class Model1;
    }
  `);

  expect(res.contents[1].path).equals("Model2.cs");
  expect(res.contents[1].contents).toBe(coretest.d`
    namespace Namespace1
    {
        public class Model2;
    }
  `);

  expect(res.contents[2].path).equals("Model3.cs");
  expect(res.contents[2].contents).toBe(coretest.d`
    namespace Namespace2
    {
        public class Model3;
    }
  `);

  expect(res.contents[3].path).equals("Model4.cs");
  expect(res.contents[3].contents).toBe(coretest.d`
    namespace Namespace2
    {
        public class Model4;
    }
  `);
});
