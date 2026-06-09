import { refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { TestOutputDirectory } from "./utils.js";

describe("Reference", () => {
  it("Verifies that a reference is correctly resolved", () => {
    const rk1 = refkey();
    expect(
      <TestOutputDirectory>
        <py.SourceFile path="models.py">
          <py.ClassDeclaration name="User" refkey={rk1} />
        </py.SourceFile>
        <py.SourceFile path="services.py">
          <py.VariableDeclaration
            name="current_user"
            type={rk1}
            initializer={
              <py.ClassInstantiation target={rk1} args={['"Marvin"']} />
            }
          />
        </py.SourceFile>
      </TestOutputDirectory>,
    ).toRenderTo({
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
