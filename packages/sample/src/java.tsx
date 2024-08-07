import * as ay from "@alloy-js/core";
import { code, refkey } from "@alloy-js/core";
import * as jv from "@alloy-js/java";
import { AccessModifier, createJavaNamePolicy, createLibrary } from "@alloy-js/java";
import { writeOutput } from "./write-output.js";

const testPackage = createLibrary({
  groupId: "me.example",
  artifactId: "test",
  version: "1.0.0",
  descriptor: {
    'spring.annotations': [
      'TestAnnotation',
      'Tester',
    ]
  }
})

const res = ay.render(
  <ay.Output namePolicy={createJavaNamePolicy()} externals={[testPackage]}>
    <jv.ProjectDirectory groupId="me.example" artifactId="test" version="1.0.0">
      <jv.PackageDirectory package="me.example.code">
        <jv.SourceFile path="Main.java">
          {code`
            public class Main {
              public static void main(String[] args) {
                System.out.println("Hello, World!");
                ${<jv.Reference refkey={ay.refkey("Model")} />} myModel = new ${<jv.Reference
            refkey={ay.refkey("Model")} />}();
              }
            }
          `}
        </jv.SourceFile>
        <jv.PackageDirectory package="annotations">
          <jv.Declaration name="Data" accessModifier={AccessModifier.PUBLIC}>
            <jv.SourceFile path="Data.java">
              {code`
              public class Data {
                
                public String myName = "Test";
                
              }
            `}
            </jv.SourceFile>
          </jv.Declaration>
        </jv.PackageDirectory>
        <jv.Declaration name="Model" accessModifier={AccessModifier.PUBLIC}>
          <jv.SourceFile path="Model.java">
            {code`
              ${<jv.Annotation name="Data" arguments={
              new Map([
                ["staticConstructor", "\"test\""]
              ])
            } />}
              public class Model {
                
                public String myName = "Test";
                public ${<jv.Reference refkey={testPackage['TestAnnotation']} />} myVar = "Test";
                
              }
            `}
          </jv.SourceFile>
        </jv.Declaration>
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
