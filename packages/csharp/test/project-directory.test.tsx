import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as csharp from "../src/index.js";

it("defines a project directory file with multiple source files", () => {
  const res = core.render(
    <core.Output>
      <csharp.ProjectDirectory
        name="TestProject"
        path="~/projects"
        version="0.1.0"
        description="a test project"
      >
        <csharp.Namespace name="TestCode">
          <csharp.SourceFile path="Test1.cs">
            <csharp.ClassDeclaration public name="TestClass1" />
          </csharp.SourceFile>
          <csharp.SourceFile path="Test2.cs">
            <csharp.ClassDeclaration public name="TestClass2" />
          </csharp.SourceFile>
        </csharp.Namespace>
      </csharp.ProjectDirectory>
    </core.Output>,
  );

  const projDir = res.contents[0] as core.OutputDirectory;

  expect(projDir.path).equals("~/projects/TestProject");
  expect(projDir.contents[0].path).equals(
    "~/projects/TestProject/TestProject.csproj",
  );
  expect((projDir.contents[0] as core.ContentOutputFile).contents)
    .toBe(coretest.d`
    <Project Sdk="Microsoft.NET.Sdk">
      <PropertyGroup>
        <Version>0.1.0</Version>
        <Description>a test project</Description>
        <TargetFramework>net8.0</TargetFramework>
      </PropertyGroup>
    </Project>
  `);

  const srcDir = projDir.contents[1] as core.OutputDirectory;

  expect(srcDir.contents[0].path).equals("~/projects/TestProject/src/Test1.cs");
  expect((srcDir.contents[0] as core.ContentOutputFile).contents)
    .toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass1;
    }
  `);

  expect(srcDir.contents[1].path).equals("~/projects/TestProject/src/Test2.cs");
  expect((srcDir.contents[1] as core.ContentOutputFile).contents)
    .toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass2;
    }
  `);
});

it("defines a project directory file with multiple source files and a custom TFM", () => {
  const res = core.render(
    <core.Output>
      <csharp.ProjectDirectory
        name="TestProject"
        path="~/projects"
        version="0.1.0"
        description="a test project"
        targetFrameworkMoniker="netstandard2.1"
      >
        <csharp.Namespace name="TestCode">
          <csharp.SourceFile path="Test1.cs">
            <csharp.ClassDeclaration public name="TestClass1" />
          </csharp.SourceFile>
          <csharp.SourceFile path="Test2.cs">
            <csharp.ClassDeclaration public name="TestClass2" />
          </csharp.SourceFile>
        </csharp.Namespace>
      </csharp.ProjectDirectory>
    </core.Output>,
  );

  const projDir = res.contents[0] as core.OutputDirectory;

  expect(projDir.path).equals("~/projects/TestProject");
  expect(projDir.contents[0].path).equals(
    "~/projects/TestProject/TestProject.csproj",
  );
  expect((projDir.contents[0] as core.ContentOutputFile).contents)
    .toBe(coretest.d`
    <Project Sdk="Microsoft.NET.Sdk">
      <PropertyGroup>
        <Version>0.1.0</Version>
        <Description>a test project</Description>
        <TargetFramework>netstandard2.1</TargetFramework>
      </PropertyGroup>
    </Project>
  `);

  const srcDir = projDir.contents[1] as core.OutputDirectory;

  expect(srcDir.contents[0].path).equals("~/projects/TestProject/src/Test1.cs");
  expect((srcDir.contents[0] as core.ContentOutputFile).contents)
    .toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass1;
    }
  `);

  expect(srcDir.contents[1].path).equals("~/projects/TestProject/src/Test2.cs");
  expect((srcDir.contents[1] as core.ContentOutputFile).contents)
    .toBe(coretest.d`
    namespace TestCode
    {
        public class TestClass2;
    }
  `);
});
