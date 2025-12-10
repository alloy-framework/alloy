import { Prose, namekey, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { dataclassesModule } from "../src/builtins/python.js";
import * as py from "../src/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.jsx";

describe("DataclassDeclaration", () => {
  it("Creates a dataclass with a class doc", () => {
    const doc = (
      <py.ClassDoc description={[<Prose>Represents a user.</Prose>]} />
    );
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
          <py.DataclassDeclaration name="User" doc={doc} />
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );

    expect(res).toRenderTo(
      d`
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
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
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
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );

    expect(res).toRenderTo(
      d`
        from dataclasses import dataclass
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
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
          <py.DataclassDeclaration name="User" frozen slots kwOnly>
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="id"
              type="int"
            />
          </py.DataclassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );

    expect(res).toRenderTo(
      d`
        from dataclasses import dataclass


        @dataclass(frozen=True, slots=True, kw_only=True)
        class User:
            id: int


      `,
    );
  });

  it("Creates a dataclass with all keyword arguments", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
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
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );

    expect(res).toRenderTo(
      d`
        from dataclasses import dataclass


        @dataclass(init=True, repr=False, eq=True, order=False, unsafe_hash=True, frozen=True, match_args=False, kw_only=True, slots=True, weakref_slot=False)
        class User:
            pass


      `,
    );
  });

  it("Throws error when weakref_slot=True without slots=True", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" weakrefSlot />
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(
      /weakref_slot=True requires slots=True in @dataclass decorator/,
    );
  });

  it("Allows weakref_slot=True when slots=True", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
          <py.DataclassDeclaration name="User" slots weakrefSlot />
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );
    expect(res).toRenderTo(
      d`
        from dataclasses import dataclass


        @dataclass(slots=True, weakref_slot=True)
        class User:
            pass


      `,
    );
  });

  it("Throws error when order=True and eq=False", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" order eq={false} />
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(/order=True requires eq=True/);
  });

  it("Creates a dataclass with order=True and no conflicting methods", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
          <py.DataclassDeclaration name="User" order />
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );
    expect(res).toRenderTo(
      d`
        from dataclasses import dataclass


        @dataclass(order=True)
        class User:
            pass


      `,
    );
  });

  it("Throws error when order=True and class defines __lt__", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" order>
              <py.DunderMethodDeclaration name="__lt__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(
      /Cannot specify order=True when the class already defines __lt__\(\)/,
    );
  });

  it("Throws error when order=True and class defines __le__", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" order>
              <py.DunderMethodDeclaration name="__le__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(
      /Cannot specify order=True when the class already defines __le__\(\)/,
    );
  });

  it("Throws error when order=True and class defines __gt__", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" order>
              <py.DunderMethodDeclaration name="__gt__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(
      /Cannot specify order=True when the class already defines __gt__\(\)/,
    );
  });

  it("Throws error when order=True and class defines __ge__", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" order>
              <py.DunderMethodDeclaration name="__ge__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
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
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" order>
              <Wrapper />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(
      /Cannot specify order=True when the class already defines __lt__\(\)/,
    );
  });

  it("Throws error when unsafe_hash=True and class defines __hash__", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" unsafeHash>
              <py.DunderMethodDeclaration name="__hash__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(
      /Cannot specify unsafe_hash=True when the class already defines __hash__\(\)/,
    );
  });

  it("Throws error when frozen=True and class defines __setattr__", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" frozen>
              <py.DunderMethodDeclaration name="__setattr__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(
      /Cannot specify frozen=True when the class already defines __setattr__\(\)/,
    );
  });

  it("Throws errorwhen frozen=True and class defines __delattr__", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" frozen>
              <py.DunderMethodDeclaration name="__delattr__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(
      /Cannot specify frozen=True when the class already defines __delattr__\(\)/,
    );
  });

  it("Throws error when slots=True and class defines __slots__", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" slots>
              <py.DunderMethodDeclaration name="__slots__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(
      /Cannot specify slots=True when the class already defines __slots__\(\)/,
    );
  });

  it("Creates a dataclass with kw_only=True on decorator (sentinel not used)", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
          <py.DataclassDeclaration name="User" kwOnly>
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="id"
              type="int"
            />
          </py.DataclassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );
    expect(res).toRenderTo(
      d`
        from dataclasses import dataclass


        @dataclass(kw_only=True)
        class User:
            id: int


      `,
    );
  });

  it("Creates a dataclass with base classes", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
          <py.DataclassDeclaration name="User" bases={["Base"]} />
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );

    expect(res).toRenderTo(
      d`
        from dataclasses import dataclass


        @dataclass
        class User(Base):
            pass


      `,
    );
  });

  it("Throws error when more than one KW_ONLY sentinel is present", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
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
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(/Only one KW_ONLY sentinel is allowed per dataclass body/);
  });

  it("Will raise arg validation errors first over member conflicts", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User" order eq={false}>
              <py.DunderMethodDeclaration name="__lt__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(/order=True requires eq=True/);
  });

  it("Does not raise errors for member conflict checks without the equivalent kwargs", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User">
              <py.DunderMethodDeclaration name="__lt__" />
              <py.DunderMethodDeclaration name="__slots__" />
              <py.DunderMethodDeclaration name="__hash__" />
              <py.DunderMethodDeclaration name="__setattr__" />
              <py.DunderMethodDeclaration name="__delattr__" />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).not.toThrow();
  });

  it("Allows unsafe_hash=True when no __hash__ is defined", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
          <py.DataclassDeclaration name="User" unsafeHash />
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );
    expect(res).toRenderTo(
      d`
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
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration name="User">
              <py.VariableDeclaration
                instanceVariable
                name={namekey("_", { ignoreNamePolicy: true })}
                type={dataclassesModule["."].KW_ONLY}
                omitNone
              />
              <Wrapper />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(/Only one KW_ONLY sentinel is allowed per dataclass body/);
  });

  it("Allows frozen=True when no conflicting dunders exist", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
          <py.DataclassDeclaration name="User" frozen />
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );
    expect(res).toRenderTo(
      d`
        from dataclasses import dataclass


        @dataclass(frozen=True)
        class User:
            pass


      `,
    );
  });

  it("Allows slots=True when no __slots__ is defined", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="user.py">
          <py.DataclassDeclaration name="User" slots />
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );
    expect(res).toRenderTo(
      d`
        from dataclasses import dataclass


        @dataclass(slots=True)
        class User:
            pass


      `,
    );
  });

  it("Forwards refkey prop for symbol resolution in type references", () => {
    const userRefkey = refkey();
    const res = toSourceTextMultiple(
      [
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
        </py.SourceFile>,
        <py.SourceFile path="services.py">
          <py.FunctionDeclaration name="get_user" returnType={userRefkey}>
            <py.VariableDeclaration
              name="user"
              type={userRefkey}
              initializer={
                <py.ClassInstantiation target="User" args={["1", '"Alice"']} />
              }
            />
            <hbr />
            {"return user"}
          </py.FunctionDeclaration>
        </py.SourceFile>,
      ],
      { externals: [dataclassesModule] },
    );
    assertFileContents(res, {
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
    });
  });
});
