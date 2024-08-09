import * as ay from "@alloy-js/core";
import { code } from "@alloy-js/core";
import * as jv from "@alloy-js/java";
import { AccessModifier, createJavaNamePolicy, createLibrary } from "@alloy-js/java";
import { writeOutput } from "./write-output.js";

const testPackage = createLibrary({
  groupId: "java.util",
  artifactId: "collections",
  version: "1.0.0",
  descriptor: {
    "java.util.collections": [
      "List",
      "ArrayList"
    ]
  }
});

const res = ay.render(
  <ay.Output namePolicy={createJavaNamePolicy()} externals={[testPackage]}>
    <jv.ProjectDirectory groupId="me.example" artifactId="test" version="1.0.0">
      <jv.PackageDirectory package="me.example.code">
        <jv.PackageDirectory package="enums">
          <jv.SourceFile path="AnimalType.java">
            <jv.Enum accessModifier={AccessModifier.PUBLIC} name="AnimalType">
              <jv.EnumMember name="DOG" />,
              <jv.EnumMember name="Cat" />;
            </jv.Enum>
          </jv.SourceFile>
        </jv.PackageDirectory>
        <jv.PackageDirectory package="types">
          <jv.SourceFile path="Animal.java">
            <jv.Class accessModifier={AccessModifier.PUBLIC} abstract name="Animal">
              <jv.Method accessModifier={AccessModifier.PUBLIC} abstract name="makeSound" return="String" />
              <jv.Method accessModifier={AccessModifier.PUBLIC} abstract name="type" return={ay.refkey("AnimalType")} />
            </jv.Class>
          </jv.SourceFile>
        </jv.PackageDirectory>


        <jv.SourceFile path="Cat.java">
          <jv.Class accessModifier={AccessModifier.PUBLIC} name="Cat" extends={ay.refkey("Animal")}>
            <jv.Annotation type="Override" />
            <jv.Method accessModifier={AccessModifier.PUBLIC} name="makeSound" return="String">
              return "Meow";
            </jv.Method>
            <jv.Method accessModifier={AccessModifier.PUBLIC} name="type" return={ay.refkey("AnimalType")}>
              return {ay.refkey("AnimalType")}.CAT;
            </jv.Method>
          </jv.Class>
        </jv.SourceFile>

        <jv.SourceFile path="Dog.java">
          <jv.Class accessModifier={AccessModifier.PUBLIC} name="Dog" extends={ay.refkey("Animal")}>
            <jv.Annotation type="Override" />
            <jv.Method accessModifier={AccessModifier.PUBLIC} name="makeSound" return="String">
              return "Woof";
            </jv.Method>
            <jv.Method accessModifier={AccessModifier.PUBLIC} name="type" return={ay.refkey("AnimalType")}>
              return {ay.refkey("AnimalType")}.DOG;
            </jv.Method>
          </jv.Class>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </jv.ProjectDirectory>
  </ay.Output>
);

writeOutput(res, "./sample-output", true);