import { code, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";

describe("TypeReference", () => {
  it("renders a Python TypeReference with a refkey and type arguments", () => {
    const classRefkey = refkey();

    expect(
      toSourceText([
        <py.StatementList>
          <py.ClassDeclaration
            name="Bar"
            refkey={classRefkey}
          ></py.ClassDeclaration>
          <py.TypeReference refkey={classRefkey} typeArgs={["T", "P"]} />
          <py.TypeReference name="dict" typeArgs={["str", "int"]} />
        </py.StatementList>,
      ]),
    ).toRenderTo(d`
        class Bar:
            pass

        Bar[T, P]
        dict[str, int]
    `);
  });

  it("renders a Python list expression with a reference", () => {
    const classRefkey = refkey();
    const type = code`list[${classRefkey}]`;

    expect(
      toSourceText([
        <py.StatementList>
          <py.ClassDeclaration
            name="Foo"
            refkey={classRefkey}
          ></py.ClassDeclaration>
          <py.TypeReference name={type} />
        </py.StatementList>,
      ]),
    ).toRenderTo(d`
        class Foo:
            pass

        list[Foo]
    `);
  });
});
