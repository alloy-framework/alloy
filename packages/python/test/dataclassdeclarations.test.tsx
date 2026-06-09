import { Prose, namekey, refkey, render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { dataclassesModule } from "../src/builtins/python.js";
import * as py from "../src/index.js";
import {
  TestOutput,
  TestOutputDirectory,
} from "./utils.js";

describe("DataclassDeclaration", () => {
  it("stacks user decorators above @dataclass", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" frozen decorators={["@final"]} />
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @final
        @dataclass(frozen=True)
        class User:
            pass

      `,
    );
  });

  it("Creates a dataclass with a class doc", () => {
    const doc = (
      <py.ClassDoc description={[<Prose>Represents a user.</Prose>]} />
    );
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" doc={doc} />
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass
        class User:
            """
            Represents a user.
            """

            pass

      `,
    );
  });

  it("Creates a dataclass with fields and defaults", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User">
          <py.VariableDeclaration
            instanceVariable
            omitNone
            name="id"
            type="int"
          />
          <py.VariableDeclaration
            instanceVariable
            name={namekey("_", { ignoreNamePolicy: true })}
            type={dataclassesModule["."].KW_ONLY}
            omitNone
          />
          <py.VariableDeclaration
            instanceVariable
            name="name"
            type="str"
            initializer={"Anonymous"}
          />
        </py.DataclassDeclaration>
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from dataclasses import KW_ONLY


        @dataclass
        class User:
            id: int
            _: KW_ONLY
            name: str = "Anonymous"

      `,
    );
  });

  it("Creates a dataclass with keyword arguments", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" frozen slots kwOnly>
          <py.VariableDeclaration
            instanceVariable
            omitNone
            name="id"
            type="int"
          />
        </py.DataclassDeclaration>
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass(frozen=True, slots=True, kw_only=True)
        class User:
            id: int

      `,
    );
  });

  it("Creates a dataclass with all keyword arguments", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration
          name="User"
          init
          repr={false}
          eq
          order={false}
          unsafeHash
          frozen
          matchArgs={false}
          kwOnly
          slots
          weakrefSlot={false}
        />
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass(init=True, repr=False, eq=True, order=False, unsafe_hash=True, frozen=True, match_args=False, kw_only=True, slots=True, weakref_slot=False)
        class User:
            pass

      `,
    );
  });

  it("Throws error when weakref_slot=True without slots=True", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" weakrefSlot />
        </TestOutput>,
      ),
    ).toThrowError(
      /weakref_slot=True requires slots=True in @dataclass decorator/,
    );
  });

  it("Allows weakref_slot=True when slots=True", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" slots weakrefSlot />
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass(slots=True, weakref_slot=True)
        class User:
            pass

      `,
    );
  });

  it("Throws error when order=True and eq=False", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" order eq={false} />
        </TestOutput>,
      ),
    ).toThrowError(/order=True requires eq=True/);
  });

  it("Creates a dataclass with order=True and no conflicting methods", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" order />
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass(order=True)
        class User:
            pass

      `,
    );
  });

  it("Throws error when order=True and class defines __lt__", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" order>
            <py.DunderMethodDeclaration name="__lt__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(
      /Cannot specify order=True when the class already defines __lt__\(\)/,
    );
  });

  it("Throws error when order=True and class defines __le__", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" order>
            <py.DunderMethodDeclaration name="__le__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(
      /Cannot specify order=True when the class already defines __le__\(\)/,
    );
  });

  it("Throws error when order=True and class defines __gt__", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" order>
            <py.DunderMethodDeclaration name="__gt__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(
      /Cannot specify order=True when the class already defines __gt__\(\)/,
    );
  });

  it("Throws error when order=True and class defines __ge__", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" order>
            <py.DunderMethodDeclaration name="__ge__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(
      /Cannot specify order=True when the class already defines __ge__\(\)/,
    );
  });

  it("Throws error when order=True and a wrapper defines __lt__", () => {
    function Wrapper() {
      return <py.DunderMethodDeclaration name="__lt__" />;
    }
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" order>
            <Wrapper />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(
      /Cannot specify order=True when the class already defines __lt__\(\)/,
    );
  });

  it("Throws error when unsafe_hash=True and class defines __hash__", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" unsafeHash>
            <py.DunderMethodDeclaration name="__hash__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(
      /Cannot specify unsafe_hash=True when the class already defines __hash__\(\)/,
    );
  });

  it("Throws error when frozen=True and class defines __setattr__", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" frozen>
            <py.DunderMethodDeclaration name="__setattr__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(
      /Cannot specify frozen=True when the class already defines __setattr__\(\)/,
    );
  });

  it("Throws errorwhen frozen=True and class defines __delattr__", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" frozen>
            <py.DunderMethodDeclaration name="__delattr__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(
      /Cannot specify frozen=True when the class already defines __delattr__\(\)/,
    );
  });

  it("Throws error when slots=True and class defines __slots__", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" slots>
            <py.DunderMethodDeclaration name="__slots__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(
      /Cannot specify slots=True when the class already defines __slots__\(\)/,
    );
  });

  it("Creates a dataclass with kw_only=True on decorator (sentinel not used)", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" kwOnly>
          <py.VariableDeclaration
            instanceVariable
            omitNone
            name="id"
            type="int"
          />
        </py.DataclassDeclaration>
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass(kw_only=True)
        class User:
            id: int

      `,
    );
  });

  it("Creates a dataclass with base classes", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" bases={["Base"]} />
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass
        class User(Base):
            pass

      `,
    );
  });

  it("Throws error when more than one KW_ONLY sentinel is present", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User">
            <py.VariableDeclaration
              instanceVariable
              name={namekey("_", { ignoreNamePolicy: true })}
              type={dataclassesModule["."].KW_ONLY}
              omitNone
            />
            <py.VariableDeclaration
              instanceVariable
              name={namekey("_", { ignoreNamePolicy: true })}
              type={dataclassesModule["."].KW_ONLY}
              omitNone
            />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(/Only one KW_ONLY sentinel is allowed per dataclass body/);
  });

  it("Will raise arg validation errors first over member conflicts", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User" order eq={false}>
            <py.DunderMethodDeclaration name="__lt__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(/order=True requires eq=True/);
  });

  it("Does not raise errors for member conflict checks without the equivalent kwargs", () => {
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User">
            <py.DunderMethodDeclaration name="__lt__" />
            <py.DunderMethodDeclaration name="__slots__" />
            <py.DunderMethodDeclaration name="__hash__" />
            <py.DunderMethodDeclaration name="__setattr__" />
            <py.DunderMethodDeclaration name="__delattr__" />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).not.toThrow();
  });

  it("Allows unsafe_hash=True when no __hash__ is defined", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" unsafeHash />
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass(unsafe_hash=True)
        class User:
            pass

      `,
    );
  });

  it("Counts KW_ONLY sentinels through wrappers (symbol-level)", () => {
    function Wrapper() {
      return (
        <py.VariableDeclaration
          instanceVariable
          name={namekey("_", { ignoreNamePolicy: true })}
          type={dataclassesModule["."].KW_ONLY}
          omitNone
        />
      );
    }
    expect(() =>
      render(
        <TestOutput path="user.py" externals={[dataclassesModule]}>
          <py.DataclassDeclaration name="User">
            <py.VariableDeclaration
              instanceVariable
              name={namekey("_", { ignoreNamePolicy: true })}
              type={dataclassesModule["."].KW_ONLY}
              omitNone
            />
            <Wrapper />
          </py.DataclassDeclaration>
        </TestOutput>,
      ),
    ).toThrowError(/Only one KW_ONLY sentinel is allowed per dataclass body/);
  });

  it("Allows frozen=True when no conflicting dunders exist", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" frozen />
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass(frozen=True)
        class User:
            pass

      `,
    );
  });

  it("Allows slots=True when no __slots__ is defined", () => {
    expect(
      <TestOutput path="user.py" externals={[dataclassesModule]}>
        <py.DataclassDeclaration name="User" slots />
      </TestOutput>,
    ).toRenderTo(
      `
        from dataclasses import dataclass


        @dataclass(slots=True)
        class User:
            pass

      `,
    );
  });

  it("Forwards refkey prop for symbol resolution in type references", () => {
    const userRefkey = refkey();
    expect(
      <TestOutputDirectory externals={[dataclassesModule]}>
        <py.SourceFile path="models.py">
          <py.DataclassDeclaration name="User" refkey={userRefkey}>
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="id"
              type="int"
            />
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="name"
              type="str"
            />
          </py.DataclassDeclaration>
        </py.SourceFile>
        <py.SourceFile path="services.py">
          <py.FunctionDeclaration name="get_user" returnType={userRefkey}>
            <py.VariableDeclaration
              name="user"
              type={userRefkey}
              initializer={
                <py.ClassInstantiation
                  target={userRefkey}
                  args={["1", '"Alice"']}
                />
              }
            />
            <hbr />
            {"return user"}
          </py.FunctionDeclaration>
        </py.SourceFile>
      </TestOutputDirectory>,
    ).toRenderTo(
      {
        "models.py": `
          from dataclasses import dataclass


          @dataclass
          class User:
              id: int
              name: str

          `,
        "services.py": `
          from models import User


          def get_user() -> User:
              user: User = User(1, "Alice")
              return user

          `,
      },
    );
  });
});
