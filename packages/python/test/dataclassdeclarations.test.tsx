import { Prose } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { dataclassesModule } from "../src/builtins/python.js";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";

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
            <py.DataclassKWOnly />
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
          <py.DataclassDeclaration
            name="User"
            decoratorKwargs={{ frozen: true, slots: true, kw_only: true }}
          >
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
            decoratorKwargs={{
              init: true,
              repr: false,
              eq: true,
              order: false,
              unsafe_hash: true,
              frozen: true,
              match_args: false,
              kw_only: true,
              slots: true,
              weakref_slot: false,
            }}
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
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ weakref_slot: true }}
            />
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
          <py.DataclassDeclaration
            name="User"
            decoratorKwargs={{ slots: true, weakref_slot: true }}
          />
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
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ order: true, eq: false }}
            />
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
          <py.DataclassDeclaration
            name="User"
            decoratorKwargs={{ order: true }}
          />
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
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ order: true }}
            >
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
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ order: true }}
            >
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
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ order: true }}
            >
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
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ order: true }}
            >
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

  it("Throws error when unsafe_hash=True and class defines __hash__", () => {
    expect(() =>
      toSourceText(
        [
          <py.SourceFile path="user.py">
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ unsafe_hash: true }}
            >
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
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ frozen: true }}
            >
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
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ frozen: true }}
            >
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
            <py.DataclassDeclaration
              name="User"
              decoratorKwargs={{ slots: true }}
            >
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
          <py.DataclassDeclaration
            name="User"
            decoratorKwargs={{ kw_only: true }}
          >
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
              <py.DataclassKWOnly />
              <py.DataclassKWOnly />
            </py.DataclassDeclaration>
          </py.SourceFile>,
        ],
        { externals: [dataclassesModule] },
      ),
    ).toThrowError(/Only one KW_ONLY sentinel is allowed per dataclass body/);
  });
});
