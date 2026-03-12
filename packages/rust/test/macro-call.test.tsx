import { Children, Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CrateDirectory, MacroCall, SourceFile } from "../src/components/index.js";
import * as Stc from "../src/components/stc/index.js";

function inFile(children: Children) {
  return (
    <Output>
      <CrateDirectory name="my_crate">
        <SourceFile path="lib.rs">{children}</SourceFile>
      </CrateDirectory>
    </Output>
  );
}

describe("MacroCall", () => {
  it("renders macro call with paren brackets by default", () => {
    expect(inFile(<MacroCall name="format" args={['"store::{}"', "self.data.len()"]} />)).toRenderTo(
      d`format!("store::{}", self.data.len())`,
    );
  });

  it("renders macro call with bracket delimiters", () => {
    expect(inFile(<MacroCall name="vec" args={["1", "2", "3"]} bracket="bracket" />)).toRenderTo(
      d`vec![1, 2, 3]`,
    );
  });

  it("renders macro call with brace delimiters", () => {
    expect(inFile(<MacroCall name="cfg" args={["test"]} bracket="brace" />)).toRenderTo(d`cfg!{test}`);
  });

  it("renders macro call with no arguments", () => {
    expect(inFile(<MacroCall name="todo" />)).toRenderTo(d`todo!()`);
  });

  it("wraps multiple arguments across lines", () => {
    expect(
      inFile(
        <MacroCall
          name="println"
          args={[
            '"Long message: {:?}"',
            "var1",
            "var2",
            "var3",
            "Context::new(session_id, metadata, now, source, trace_id, actor)",
          ]}
        />,
      ),
    ).toRenderTo(d`
      println!(
        "Long message: {:?}",
        var1,
        var2,
        var3,
        Context::new(session_id, metadata, now, source, trace_id, actor)
      )
    `);
  });

  it("stc wrapper renders correctly", () => {
    expect(inFile(Stc.MacroCall({ name: "println", args: ['"hello"', "name"] }))).toRenderTo(
      d`println!("hello", name)`,
    );
  });
});
