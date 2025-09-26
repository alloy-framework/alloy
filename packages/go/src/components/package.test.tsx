import { Output } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ModuleDirectory } from "./ModuleDirectory.jsx";
import { SourceDirectory } from "./SourceDirectory.jsx";
import { SourceFile } from "./SourceFile.jsx";
import { VarDeclaration } from "./var/declaration.jsx";

it("defines multiple packages and source files with unique content", () => {
  const tree = (
    <Output>
      <ModuleDirectory name="github.com/alloy-framework/alloy">
        <SourceDirectory path="package1">
          <SourceFile path="Model1.go">
            <VarDeclaration name="Model1" type="string">
              "This is Model1"
            </VarDeclaration>
          </SourceFile>
          <SourceFile path="Model2.go">
            <VarDeclaration name="Model2" type="string">
              "This is Model2"
            </VarDeclaration>
          </SourceFile>
        </SourceDirectory>
        <SourceDirectory path="package2">
          <SourceFile path="Model3.go">
            <VarDeclaration name="Model3" type="string">
              "This is Model3"
            </VarDeclaration>
          </SourceFile>
          <SourceFile path="Model4.go">
            <VarDeclaration name="Model4" type="string">
              "This is Model4"
            </VarDeclaration>
          </SourceFile>
        </SourceDirectory>
      </ModuleDirectory>
    </Output>
  );

  expect(tree).toRenderTo({
    "package1/Model1.go": d`
      package package1

      var Model1 string = "This is Model1"
    `,
    "package1/Model2.go": d`
      package package1

      var Model2 string = "This is Model2"
    `,
    "package2/Model3.go": d`
      package package2
      
      var Model3 string = "This is Model3"
    `,
    "package2/Model4.go": d`
      package package2
      
      var Model4 string = "This is Model4"
    `,
  });
});
