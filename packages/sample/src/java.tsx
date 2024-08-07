import * as ay from "@alloy-js/core";
import * as jv from "@alloy-js/java";
import { writeOutput } from "./write-output.js";
import { createJavaNamePolicy, AccessModifier } from "@alloy-js/java";
import { code } from "@alloy-js/core";

const res = ay.render(
  <ay.Output namePolicy={createJavaNamePolicy()}>
    <jv.ProjectDirectory groupId="me.example" artifactId="test" version="1.0.0">
      <jv.PackageDirectory package="me.example.code">
        <jv.SourceFile path="Main.java">
          {code`
            public class Main {
              public static void main(String[] args) {
                System.out.println("Hello, World!");
                ${<jv.Reference refkey={ay.refkey("Model")} />} myModel = new ${<jv.Reference refkey={ay.refkey("Model")} />}();
              }
            }
          `}
        </jv.SourceFile>
        <jv.Declaration name="Model" accessModifier={AccessModifier.PUBLIC}>
          <jv.SourceFile path="Model.java">
            {code`
              public class Model {
                
                public String myName = "Test";
                
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
