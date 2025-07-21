import { refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { enumModule } from "../src/builtins/python.js";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

describe("Python Enum", () => {
  it("classic enum with explicit values", () => {
    const result = toSourceText(
      [
        <py.EnumDeclaration
          name="Color"
          baseType="IntEnum"
          members={[
            { name: "RED", value: "1" },
            { name: "GREEN", value: "2" },
            { name: "BLUE", value: "3" },
          ]}
        />,
      ],
      { externals: [enumModule] },
    );
    const expected = d`
      from enum import IntEnum

      class Color(IntEnum):
          RED = 1
          GREEN = 2
          BLUE = 3

        
    `;
    expect(result).toRenderTo(expected);
  });

  it("classic enum with jsValues", () => {
    const result = toSourceText(
      [
        <py.EnumDeclaration
          name="Color"
          baseType="IntEnum"
          members={[
            { name: "RED", jsValue: "1" },
            { name: "GREEN", jsValue: 2 },
            { name: "BLUE", jsValue: "3" },
          ]}
        />,
      ],
      { externals: [enumModule] },
    );
    const expected = d`
      from enum import IntEnum

      class Color(IntEnum):
          RED = "1"
          GREEN = 2
          BLUE = "3"


    `;
    expect(result).toRenderTo(expected);
  });

  it("classic enum with a refkey as jsValue", () => {
    const result = toSourceText(
      [
        <py.StatementList>
          <py.ClassDeclaration name="Dog" />
          <py.ClassDeclaration name="Cat" />
          <py.EnumDeclaration
            name="Animal"
            baseType="Enum"
            members={[
              { name: "DOG", value: refkey("Dog") },
              { name: "CAT", value: refkey("Cat") },
            ]}
          />
        </py.StatementList>,
      ],
      { externals: [enumModule] },
    );
    const expected = d`
      from enum import Enum

      class Dog:
          pass

      class Cat:
          pass

      class Animal(Enum):
          DOG = Dog
          CAT = Cat


    `;
    expect(result).toRenderTo(expected);
  });

  it("enum with auto() values", () => {
    const result = toSourceText(
      [
        <py.EnumDeclaration
          name="Animal"
          style="auto"
          members={[{ name: "DOG" }, { name: "CAT" }, { name: "RABBIT" }]}
        />,
      ],
      { externals: [enumModule] },
    );
    const expected = d`
      from enum import auto
      from enum import Enum

      class Animal(Enum):
          DOG = auto()
          CAT = auto()
          RABBIT = auto()


    `;
    expect(result).toRenderTo(expected);
  });

  it("enum with mixed manual and auto() values", () => {
    const result = toSourceText(
      [
        <py.EnumDeclaration
          name="Permission"
          baseType="Flag"
          style="auto"
          members={[
            { name: "READ", value: 1 },
            { name: "WRITE" },
            { name: "EXECUTE" },
          ]}
        />,
      ],
      { externals: [enumModule] },
    );

    const expected = d`
      from enum import auto
      from enum import Flag

      class Permission(Flag):
          READ = 1
          WRITE = auto()
          EXECUTE = auto()


    `;
    expect(result).toRenderTo(expected);
  });

  it("functional enum with list", () => {
    const result = toSourceText(
      [
        <py.EnumDeclaration
          name="Direction"
          style="functional"
          members={[
            { name: "NORTH" },
            { name: "SOUTH" },
            { name: "EAST" },
            { name: "WEST" },
          ]}
        />,
      ],
      { externals: [enumModule] },
    );
    const expected = d`
      from enum import Enum

      Direction = Enum('Direction', ['NORTH', 'SOUTH', 'EAST', 'WEST'])
    `;
    expect(result).toRenderTo(expected);
  });

  it("functional enum with mapping", () => {
    const result = toSourceText(
      [
        <py.EnumDeclaration
          name="Priority"
          style="functional"
          members={[
            { name: "HIGH", value: 1 },
            { name: "MEDIUM", value: 2 },
            { name: "LOW", value: 3 },
          ]}
        />,
      ],
      { externals: [enumModule] },
    );
    const expected = d`
      from enum import Enum

      Priority = Enum('Priority', {'HIGH' : 1, 'MEDIUM' : 2, 'LOW' : 3})
    `;
    expect(result).toRenderTo(expected);
  });
});
