import { code, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { it } from "vitest";
import * as jv from "../src/components/index.js";
import { assertFileContents, testRender } from "./utils.jsx";

it("passes types", () => {
  const res = testRender(
    <>
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
                List${(<jv.TypeArguments arguments={[refkey("TypeOne")]} />)} list = new ArrayList${(<jv.TypeArguments />)}();
                List${(<jv.TypeArguments arguments={[{ extends: refkey("TypeTwo") }]} />)} list2 = new ArrayList${(<jv.TypeArguments />)}();
                List${(<jv.TypeArguments arguments={[{ wildcard: true }]} />)} list3 = new ArrayList${(<jv.TypeArguments />)}();
              }
            `}
          </jv.Class>
        </jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  assertFileContents(res, {
    "TestGenerics.java": d`
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
