import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import { findFile, testRender } from "./utils.js";

it("emits correct package directory", () => {
  const res = testRender(
    <>
      <jv.PackageDirectory package="my.emit.package">
        <jv.SourceFile path="Test.java"></jv.SourceFile>
      </jv.PackageDirectory>
    </>,
  );

  // Assert directory file is in is correct
  const testFile = findFile(res, "Test.java");
  expect(testFile.path).toBe("me/test/code/my/emit/package/Test.java");
});
