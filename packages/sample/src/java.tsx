import * as ay from "@alloy-js/core";
import { code } from "@alloy-js/core";
import * as jv from "@alloy-js/java";
import { AccessModifier, createJavaNamePolicy, createLibrary } from "@alloy-js/java";
import { writeOutput } from "./write-output.js";

const testPackage = createLibrary({
  groupId: "me.example",
  artifactId: "test",
  version: "1.0.0",
  descriptor: {
    "spring.annotations.test": [
      "TestAnnotation",
      "Tester"
    ]
  }
});

const res = ay.render(
  <ay.Output namePolicy={createJavaNamePolicy()} externals={[testPackage]}>
    <jv.ProjectDirectory groupId="me.example" artifactId="test" version="1.0.0">
      <jv.PackageDirectory package="me.example.code">
        <jv.SourceFile path="TestEnum.java">
          <jv.Enum accessModifier={AccessModifier.PUBLIC} name="TestEnum" implements={['MyInterface', "InterfaceTwo"]}>
            <jv.EnumMember name="ONE"></jv.EnumMember>,
            <jv.EnumMember name="TWO"></jv.EnumMember>;
          </jv.Enum>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </jv.ProjectDirectory>
  </ay.Output>
);

// printOutput(res);
writeOutput(res, "./sample-output", true);

function printOutput(dir: ay.OutputDirectory, level = 1) {
  console.log(`${"#".repeat(level)} Directory ${dir.path}`);

  for (const item of dir.contents) {
    if (item.kind === "directory") {
      printOutput(item, level + 1);
    } else {
      console.log(
        `\n${"#".repeat(level + 1)} ${item.path} (${item.filetype})\n`
      );
      console.log(item.contents);
    }
  }
}
