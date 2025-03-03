import * as ay from "@alloy-js/core";
import { code, refkey } from "@alloy-js/core";
import * as jv from "@alloy-js/java";
import { createJavaNamePolicy, javaUtil } from "@alloy-js/java";
import { writeOutput } from "./write-output.js";

const res = ay.render(
  <ay.Output namePolicy={createJavaNamePolicy()} externals={[javaUtil]}>
    <jv.ProjectDirectory
      name="test"
      mavenProjectConfig={{
        groupId: "me.example",
        artifactId: "test",
        version: "1.0.0",
        javaVersion: 8,
      }}
    >
      <jv.PackageDirectory package="me.example.code">
        <jv.PackageDirectory package="enums">
          <jv.SourceFile path="AnimalType.java">
            <jv.Enum public name="AnimalType">
              <jv.EnumMember name="DOG" />,
              <jv.EnumMember name="Cat" />;
            </jv.Enum>
          </jv.SourceFile>
        </jv.PackageDirectory>
        <jv.PackageDirectory package="types">
          <jv.SourceFile path="Animal.java">
            <jv.Class public abstract name="Animal">
              <jv.Method public abstract name="makeSound" return="String" />

              <jv.Method
                public
                abstract
                name="type"
                return={ay.refkey("AnimalType")}
              />
            </jv.Class>
          </jv.SourceFile>
        </jv.PackageDirectory>

        <jv.SourceFile path="Cat.java">
          <jv.Class public name="Cat" extends={ay.refkey("Animal")}>
            <jv.Constructor public />

            <jv.Annotation type="Override" />
            <jv.Method public name="makeSound" return="String">
              return "Meow";
            </jv.Method>

            <jv.Method public name="type" return={ay.refkey("AnimalType")}>
              return {ay.refkey("AnimalType")}.CAT;
            </jv.Method>
          </jv.Class>
        </jv.SourceFile>

        <jv.SourceFile path="Dog.java">
          <jv.Class public name="Dog" extends={ay.refkey("Animal")}>
            <jv.Constructor public />

            <jv.Annotation type="Override" />
            <jv.Method public name="makeSound" return="String">
              return "Woof";
            </jv.Method>

            <jv.Method public name="type" return={ay.refkey("AnimalType")}>
              return {ay.refkey("AnimalType")}.DOG;
            </jv.Method>
          </jv.Class>
        </jv.SourceFile>

        <jv.SourceFile path="Main.java">
          <jv.Class public name="Main">
            <jv.Constructor public />

            <jv.Method
              public
              static
              name="main"
              parameters={{ args: "String[]" }}
            >
              {code`
                ${javaUtil.List}${(<jv.Generics types={[refkey("Animal")]} />)} animals = new ${javaUtil.ArrayList}${(<jv.Generics />)}();
                
                animals.add(new ${refkey("Cat")}());
              `}
            </jv.Method>
          </jv.Class>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </jv.ProjectDirectory>
  </ay.Output>,
);

await writeOutput(res, "./sample-output", true);
