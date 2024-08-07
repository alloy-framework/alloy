import * as ay from "@alloy-js/core";
import {code} from "@alloy-js/core";
import * as jv from "@alloy-js/java";
import {AccessModifier, ClassModifier, createJavaNamePolicy, Interface} from "@alloy-js/java";
import {writeOutput} from "./write-output.js";

const res = ay.render(
  <ay.Output namePolicy={createJavaNamePolicy()}>
    <jv.ProjectDirectory groupId='me.example' artifactId='test' version='1.0.0'>

      <jv.PackageDirectory package="me.example.code">
        <jv.SourceFile path="Main.java">
          <jv.ClassDeclaration name="Main" accessModifier={AccessModifier.PUBLIC} classModifiers={[ClassModifier.ABSTRACT]} implementsInterface={"IPerson"}>
            <jv.Method accessModifier={AccessModifier.PUBLIC} isStatic={true} returnType={"void"} methodName={"main"}
                       parameters={{"String[]": "args"}}>
              <jv.ObjectDeclaration name={"Person"} variableName={"person"} constructorArgs={["Tom", 27]}/>
              {code`
                person.displayInfo();
              `}
            </jv.Method>
          </jv.ClassDeclaration>
        </jv.SourceFile>
        <jv.SourceFile path={"IPerson.java"}>
          <Interface isPackagePrivate={false} name={"IPerson"}></Interface>
        </jv.SourceFile>
      </jv.PackageDirectory>

      <jv.PackageDirectory package={"me.example.code.models"}>
        <jv.SourceFile path={"Person.java"}>
          <jv.ClassDeclaration name={"Person"} accessModifier={AccessModifier.PUBLIC}>
            <jv.Variable name={"name"} type={"String"} accessModifier={AccessModifier.PRIVATE}></jv.Variable>
            <jv.Variable name={"age"} type={"int"} accessModifier={AccessModifier.PRIVATE}></jv.Variable>
            <jv.ClassConstructor accessModifier={AccessModifier.PUBLIC} className={"Person"}
                                 parameters={{"String" : "name", "int" : "age"}}>
              {code`
                this.name = name;
                this.age = age;
              `}
            </jv.ClassConstructor>
            <jv.Method accessModifier={AccessModifier.PUBLIC} methodName={"displayInfo"} isStatic={false}
                       returnType={"void"}>
              {code`
                System.out.println("Name: " + name + ", Age: " + age);
              `}
            </jv.Method>
          </jv.ClassDeclaration>
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
