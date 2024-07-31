import * as ay from "@alloy-js/core";
import {code} from "@alloy-js/core";
import * as jv from "@alloy-js/java";
import {AccessModifier, createJavaNamePolicy} from "@alloy-js/java";
import {writeOutput} from "./write-output.js";

const res = ay.render(
  <ay.Output namePolicy={createJavaNamePolicy()}>
    <jv.ProjectDirectory groupId='me.example' artifactId='test' version='1.0.0'>
      <jv.PackageDirectory package="me.example.code">
        <jv.SourceFile path="Main.java">
          <jv.ClassDeclaration name="Main" accessModifier={AccessModifier.PUBLIC}>
            <jv.Variable name={"x"} type={"int"}></jv.Variable>
            <jv.Method accessModifier={AccessModifier.PUBLIC} isStatic={true} returnType={"void"} methodName={"main"}
                       parameters={{"String[]" : "args"}}>
                {code`
                System.out.println("Hello, World!");
                `}
                {code`
                System.out.println("Hello, World Again!");
                `}
            </jv.Method>
          </jv.ClassDeclaration>

        </jv.SourceFile>
        <jv.SourceFile path="TestMain.java">
          {code`
            public class Main {
              public static void main(String[] args) {
                System.out.println("Hello, World!");
                ${<jv.Reference refkey={ay.refkey('Main')} />} main = new Main();
              }
            }
          `}
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
