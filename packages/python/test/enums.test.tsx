import { refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { enumModule } from "../src/builtins/python.js";
import * as py from "../src/index.js";
import { TestOutput } from "./utils.js";

describe("Python Enum", () => {
  it("renders class-level decorators above ClassEnumDeclaration", () => {
    expect(
      <TestOutput externals={[enumModule]}>
        <py.ClassEnumDeclaration
          name="Color"
          baseType="IntEnum"
          decorators={["@final"]}
          members={[
            { name: "RED", value: 1 },
            { name: "GREEN", value: 2 },
          ]}
        />
      </TestOutput>,
    ).toRenderTo(
      `
      from enum import IntEnum


      @final
      class Color(IntEnum):
          RED = 1
          GREEN = 2

    `,
    );
  });

  it("class enum with explicit values", () => {
    expect(
      <TestOutput externals={[enumModule]}>
        <py.ClassEnumDeclaration
          name="Color"
          baseType="IntEnum"
          members={[
            { name: "RED", value: "1" },
            { name: "GREEN", value: "2" },
            { name: "BLUE", value: "3" },
          ]}
        />
      </TestOutput>,
    ).toRenderTo(
      `
      from enum import IntEnum


      class Color(IntEnum):
          RED = 1
          GREEN = 2
          BLUE = 3

    `,
    );
  });

  it("class enum with jsValues", () => {
    expect(
      <TestOutput externals={[enumModule]}>
        <py.ClassEnumDeclaration
          name="Color"
          baseType="IntEnum"
          members={[
            { name: "RED", jsValue: "1" },
            { name: "GREEN", jsValue: 2 },
            { name: "BLUE", jsValue: "3" },
          ]}
        />
      </TestOutput>,
    ).toRenderTo(
      `
      from enum import IntEnum


      class Color(IntEnum):
          RED = "1"
          GREEN = 2
          BLUE = "3"

    `,
    );
  });

  it("class enum with a refkey as jsValue", () => {
    expect(
      <TestOutput externals={[enumModule]}>
        <py.StatementList>
          <py.ClassDeclaration name="Dog" refkey={refkey("Dog")} />
          <py.ClassDeclaration name="Cat" refkey={refkey("Cat")} />
          <py.ClassEnumDeclaration
            name="Animal"
            baseType="Enum"
            members={[
              { name: "DOG", value: refkey("Dog") },
              { name: "CAT", value: refkey("Cat") },
            ]}
          />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      from enum import Enum


      class Dog:
          pass

      class Cat:
          pass

      class Animal(Enum):
          DOG = Dog
          CAT = Cat

    `,
    );
  });

  it("class enum with auto() values", () => {
    expect(
      <TestOutput externals={[enumModule]}>
        <py.ClassEnumDeclaration
          name="Animal"
          auto
          members={[{ name: "DOG" }, { name: "CAT" }, { name: "RABBIT" }]}
        />
      </TestOutput>,
    ).toRenderTo(
      `
      from enum import auto
      from enum import Enum


      class Animal(Enum):
          DOG = auto()
          CAT = auto()
          RABBIT = auto()

    `,
    );
  });

  it("class enum with mixed manual and auto() values", () => {
    expect(
      <TestOutput externals={[enumModule]}>
        <py.ClassEnumDeclaration
          name="Permission"
          baseType="Flag"
          auto
          members={[
            { name: "READ", value: 1 },
            { name: "WRITE" },
            { name: "EXECUTE" },
          ]}
        />
      </TestOutput>,
    ).toRenderTo(
      `
      from enum import auto
      from enum import Flag


      class Permission(Flag):
          READ = 1
          WRITE = auto()
          EXECUTE = auto()

    `,
    );
  });

  it("functional enum with list", () => {
    expect(
      <TestOutput externals={[enumModule]}>
        <py.FunctionalEnumDeclaration
          name="Direction"
          members={[
            { name: "NORTH" },
            { name: "SOUTH" },
            { name: "EAST" },
            { name: "WEST" },
          ]}
        />
      </TestOutput>,
    ).toRenderTo(
      `
      from enum import Enum


      Direction = Enum('Direction', ['NORTH', 'SOUTH', 'EAST', 'WEST'])
    `,
    );
  });

  it("functional enum with mapping", () => {
    expect(
      <TestOutput externals={[enumModule]}>
        <py.FunctionalEnumDeclaration
          name="Priority"
          members={[
            { name: "HIGH", value: 1 },
            { name: "MEDIUM", value: 2 },
            { name: "LOW", value: 3 },
          ]}
        />
      </TestOutput>,
    ).toRenderTo(
      `
      from enum import Enum


      Priority = Enum('Priority', {'HIGH' : 1, 'MEDIUM' : 2, 'LOW' : 3})
    `,
    );
  });
});
