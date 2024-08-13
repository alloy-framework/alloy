import * as ay from "@alloy-js/core";
import * as jv from "@alloy-js/java";
import { AccessModifier, createJavaNamePolicy, createLibrary, javaUtil } from "@alloy-js/java";
import { writeOutput } from "./write-output.js";
import { code, refkey } from "@alloy-js/core";

const res = ay.render(
  <ay.Output namePolicy={createJavaNamePolicy()} externals={[javaUtil]}>
    <jv.ProjectDirectory groupId="me.example" artifactId="test" version="1.0.0">
      <jv.PackageDirectory package="me.example.code">
        <jv.PackageDirectory package="enums">
          <jv.SourceFile path="AnimalType.java">
            <jv.Enum accessModifier='public' name="AnimalType">

              <jv.EnumMember name="DOG" />,
              <jv.EnumMember name="Cat" />;

            </jv.Enum>
          </jv.SourceFile>
        </jv.PackageDirectory>
        <jv.PackageDirectory package="types">
          <jv.SourceFile path="Animal.java">
            <jv.Class accessModifier='public' abstract name="Animal">

              <jv.Method accessModifier='public' abstract name="makeSound" return="String" />

              <jv.Method accessModifier='public' abstract name="type" return={ay.refkey("AnimalType")} />

            </jv.Class>
          </jv.SourceFile>
        </jv.PackageDirectory>


        <jv.SourceFile path="Cat.java">
          <jv.Class accessModifier='public' name="Cat" extends={ay.refkey("Animal")}>

            <jv.Constructor accessModifier='public' />

            <jv.Annotation type="Override" />
            <jv.Method accessModifier='public' name="makeSound" return="String">
              return "Meow";
            </jv.Method>

            <jv.Method accessModifier='public' name="type" return={ay.refkey("AnimalType")}>
              return {ay.refkey("AnimalType")}.CAT;
            </jv.Method>

          </jv.Class>
        </jv.SourceFile>

        <jv.SourceFile path="Dog.java">
          <jv.Class accessModifier='public' name="Dog" extends={ay.refkey("Animal")}>

            <jv.Constructor accessModifier='public' />

            <jv.Annotation type="Override" />
            <jv.Method accessModifier='public' name="makeSound" return="String">
              return "Woof";
            </jv.Method>

            <jv.Method accessModifier='public' name="type" return={ay.refkey("AnimalType")}>
              return {ay.refkey("AnimalType")}.DOG;
            </jv.Method>

          </jv.Class>
        </jv.SourceFile>

        <jv.SourceFile path="Main.java">
          <jv.Class accessModifier='public' name="Main">
            <jv.Constructor accessModifier='public' />

            <jv.Method accessModifier='public' static name="main" parameters={{ args: "String[]"}}>
              {code`
                ${refkey(javaUtil['List'])}<${refkey("Animal")}> animals = new ${refkey(javaUtil['ArrayList'])}<>();
                
                animals.add(new ${refkey("Cat")}());
              `}
            </jv.Method>
          </jv.Class>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </jv.ProjectDirectory>
  </ay.Output>
);

writeOutput(res, "./sample-output", true);