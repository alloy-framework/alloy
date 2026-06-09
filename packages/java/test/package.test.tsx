import { Output } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";

it("emits correct package directory", () => {
  expect(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.PackageDirectory package="my.emit.package">
          <jv.SourceFile path="Test.java"></jv.SourceFile>
        </jv.PackageDirectory>
      </jv.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "me/test/code/my/emit/package/Test.java": expect.any(String),
  });
});
