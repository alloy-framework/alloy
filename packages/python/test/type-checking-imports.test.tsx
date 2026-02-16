import { refkey } from "@alloy-js/core";
import { describe, it } from "vitest";
import { createModule } from "../src/create-module.js";
import * as py from "../src/index.js";
import { assertFileContents, toSourceTextMultiple } from "./utils.jsx";

describe("TYPE_CHECKING imports", () => {
  it("imports type-only references inside TYPE_CHECKING block", () => {
    const userClassRef = refkey();

    const result = toSourceTextMultiple([
      <py.SourceFile path="models.py">
        <py.ClassDeclaration name="User" refkey={userClassRef} />
      </py.SourceFile>,
      <py.SourceFile path="service.py">
        <py.FunctionDeclaration
          name="process_user"
          parameters={[{ name: "user", type: userClassRef }]}
          returnType="None"
        >
          pass
        </py.FunctionDeclaration>
      </py.SourceFile>,
    ]);

    assertFileContents(result, {
      "models.py": `
        class User:
            pass

        `,
      "service.py": `
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from models import User


        def process_user(user: User) -> None:
            pass

        `,
    });
  });

  it("imports value references outside TYPE_CHECKING block", () => {
    const userClassRef = refkey();

    const result = toSourceTextMultiple([
      <py.SourceFile path="models.py">
        <py.ClassDeclaration name="User" refkey={userClassRef} />
      </py.SourceFile>,
      <py.SourceFile path="service.py">
        <py.FunctionDeclaration name="create_user" returnType="None">
          <py.VariableDeclaration
            name="user"
            initializer={<py.ClassInstantiation target={userClassRef} />}
          />
        </py.FunctionDeclaration>
      </py.SourceFile>,
    ]);

    assertFileContents(result, {
      "models.py": `
        class User:
            pass

        `,
      "service.py": `
        from models import User


        def create_user() -> None:
            user = User()

        `,
    });
  });

  it("upgrades type-only import to regular import when also used as value", () => {
    const userClassRef = refkey();

    const result = toSourceTextMultiple([
      <py.SourceFile path="models.py">
        <py.ClassDeclaration name="User" refkey={userClassRef} />
      </py.SourceFile>,
      <py.SourceFile path="service.py">
        <py.FunctionDeclaration
          name="create_user"
          parameters={[{ name: "existing", type: userClassRef }]}
          returnType={userClassRef}
        >
          <py.StatementList>
            <py.VariableDeclaration
              name="user"
              initializer={<py.ClassInstantiation target={userClassRef} />}
            />
            <>return user</>
          </py.StatementList>
        </py.FunctionDeclaration>
      </py.SourceFile>,
    ]);

    // Since User is used both as a type (parameter type, return type) and
    // as a value (ClassInstantiation), it should be a regular import
    assertFileContents(result, {
      "models.py": `
        class User:
            pass

        `,
      "service.py": `
        from models import User


        def create_user(existing: User) -> User:
            user = User()
            return user

        `,
    });
  });

  it("handles mixed type-only and regular imports from same module", () => {
    const userClassRef = refkey();
    const helperFuncRef = refkey();

    const result = toSourceTextMultiple([
      <py.SourceFile path="models.py">
        <py.ClassDeclaration name="User" refkey={userClassRef} />
        <py.FunctionDeclaration name="helper" refkey={helperFuncRef}>
          pass
        </py.FunctionDeclaration>
      </py.SourceFile>,
      <py.SourceFile path="service.py">
        <py.FunctionDeclaration
          name="process"
          parameters={[{ name: "user", type: userClassRef }]}
          returnType="None"
        >
          <py.FunctionCallExpression target={helperFuncRef} />
        </py.FunctionDeclaration>
      </py.SourceFile>,
    ]);

    // helper is used as a value (function call), User is only used as type
    assertFileContents(result, {
      "models.py": `
        class User:
            pass


        def helper():
            pass

        `,
      "service.py": `
        from models import helper
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from models import User


        def process(user: User) -> None:
            helper()

        `,
    });
  });

  it("handles return type as type-only import", () => {
    const resultTypeRef = refkey();

    const result = toSourceTextMultiple([
      <py.SourceFile path="types.py">
        <py.ClassDeclaration name="Result" refkey={resultTypeRef} />
      </py.SourceFile>,
      <py.SourceFile path="main.py">
        <py.FunctionDeclaration name="get_result" returnType={resultTypeRef}>
          pass
        </py.FunctionDeclaration>
      </py.SourceFile>,
    ]);

    assertFileContents(result, {
      "types.py": `
        class Result:
            pass

        `,
      "main.py": `
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from types import Result


        def get_result() -> Result:
            pass

        `,
    });
  });

  it("handles variable type annotation as type-only import", () => {
    const configTypeRef = refkey();

    const result = toSourceTextMultiple([
      <py.SourceFile path="types.py">
        <py.ClassDeclaration name="Config" refkey={configTypeRef} />
      </py.SourceFile>,
      <py.SourceFile path="main.py">
        <py.VariableDeclaration name="config" type={configTypeRef} omitNone />
      </py.SourceFile>,
    ]);

    assertFileContents(result, {
      "types.py": `
        class Config:
            pass

        `,
      "main.py": `
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from types import Config

        config: Config
        `,
    });
  });

  it("handles TypeReference component as type-only import", () => {
    const myTypeRef = refkey();

    const result = toSourceTextMultiple([
      <py.SourceFile path="types.py">
        <py.ClassDeclaration name="MyType" refkey={myTypeRef} />
      </py.SourceFile>,
      <py.SourceFile path="main.py">
        <py.VariableDeclaration
          name="value"
          type={<py.TypeReference refkey={myTypeRef} />}
          omitNone
        />
      </py.SourceFile>,
    ]);

    assertFileContents(result, {
      "types.py": `
        class MyType:
            pass

        `,
      "main.py": `
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from types import MyType

        value: MyType
        `,
    });
  });

  it("handles class bases as regular import (runtime requirement)", () => {
    const baseClassRef = refkey();

    const result = toSourceTextMultiple([
      <py.SourceFile path="base.py">
        <py.ClassDeclaration name="BaseClass" refkey={baseClassRef} />
      </py.SourceFile>,
      <py.SourceFile path="derived.py">
        <py.ClassDeclaration name="DerivedClass" bases={[baseClassRef]} />
      </py.SourceFile>,
    ]);

    // Class bases require runtime access, so they should NOT be
    // inside a TYPE_CHECKING block
    assertFileContents(result, {
      "base.py": `
        class BaseClass:
            pass

        `,
      "derived.py": `
        from base import BaseClass


        class DerivedClass(BaseClass):
            pass

        `,
    });
  });

  it("renders regular imports before TYPE_CHECKING block", () => {
    // Create a typing module with multiple exports
    const typingModule = createModule({
      name: "typing",
      descriptor: {
        ".": ["TYPE_CHECKING", "cast"],
      },
    });

    // Create a third-party module
    const requestsModule = createModule({
      name: "requests",
      descriptor: {
        ".": ["get"],
      },
    });

    const userClassRef = refkey();

    const result = toSourceTextMultiple(
      [
        <py.SourceFile path="models.py">
          <py.ClassDeclaration name="User" refkey={userClassRef} />
        </py.SourceFile>,
        <py.SourceFile path="service.py">
          <py.FunctionDeclaration
            name="get_users"
            parameters={[{ name: "user", type: userClassRef }]}
            returnType="str"
          >
            <py.StatementList>
              {/* Use cast as a value (function call) to make it a regular import */}
              <>response = {requestsModule["."].get}("https://example.com")</>
              <>return {typingModule["."].cast}(str, user)</>
            </py.StatementList>
          </py.FunctionDeclaration>
        </py.SourceFile>,
      ],
      { externals: [typingModule, requestsModule] },
    );

    // Regular imports first (sorted alphabetically), then TYPE_CHECKING block
    assertFileContents(result, {
      "models.py": `
        class User:
            pass

        `,
      "service.py": `
        from requests import get
        from typing import cast
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from models import User


        def get_users(user: User) -> str:
            response = get("https://example.com")
            return cast(str, user)

        `,
    });
  });
});
