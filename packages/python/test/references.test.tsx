import { Output, refkey, render } from "@alloy-js/core";
import { describe, it } from "vitest";
import * as py from "../src/index.js";
import { assertFileContents, toSourceTextMultiple } from "./utils.jsx";

describe("Reference", () => {
  it("Verifies that a reference is correctly resolved", () => {
    const rk1 = refkey();
    const res = toSourceTextMultiple([
      <py.SourceFile path="models.py">
        <py.ClassDeclaration name="User" refkey={rk1} />
      </py.SourceFile>,
      <py.SourceFile path="services.py">
        <py.VariableDeclaration
          name="current_user"
          type={<py.Reference refkey={rk1} />}
          initializer={
            <py.ClassInstantiation target="User" args={['"Marvin"']} />
          }
        />
      </py.SourceFile>
    ]);
    assertFileContents(res, {
      "models.py": `
        class User:
            pass

        `,
      "services.py": `
        from models import User

        current_user: User = User("Marvin")
        `,
    });
  });
});
