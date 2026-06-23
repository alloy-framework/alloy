import { Output, code, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";

it("passes types", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="TypeOne.java">
          <jv.Declaration name="TypeOne">
            {code`
              public interface TypeOne {
              }
            `}
          </jv.Declaration>
        </jv.SourceFile>
        <jv.SourceFile path="TypeTwo.java">
          <jv.Declaration name="TypeTwo">
            {code`
              public interface TypeTwo {
              }
            `}
          </jv.Declaration>
        </jv.SourceFile>
        <jv.PackageDirectory package="import">
          <jv.SourceFile path="TestGenerics.java">
            <jv.Class public name="TestGenerics">
              {code`
                public TestGenerics() {
                  List${(<jv.TypeArguments args={[refkey("TypeOne")]} />)} list = new ArrayList${(<jv.TypeArguments />)}();
                  List${(<jv.TypeArguments args={[{ extends: refkey("TypeTwo") }]} />)} list2 = new ArrayList${(<jv.TypeArguments />)}();
                  List${(<jv.TypeArguments args={[{ wildcard: true }]} />)} list3 = new ArrayList${(<jv.TypeArguments />)}();
                }
              `}
            </jv.Class>
          </jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/TypeOne.java": expect.any(String),
    "me/test/code/TypeTwo.java": expect.any(String),
    "me/test/code/import/TestGenerics.java": `
      package me.test.code.import;

      import me.test.code.TypeOne;
      import me.test.code.TypeTwo;

      public class TestGenerics {
        public TestGenerics() {
          List<TypeOne> list = new ArrayList<>();
          List<? extends TypeTwo> list2 = new ArrayList<>();
          List<?> list3 = new ArrayList<>();
        }
      }
    `,
  });
});
