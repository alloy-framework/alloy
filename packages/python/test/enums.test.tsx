import { Output, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, it } from "vitest";
import * as py from "../src/components/index.js";
import { assertFileContents } from "./utils.jsx";

describe("Python Enum", () => {
  it("classic enum with explicit values", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <py.EnumDeclaration
            name="Color"
            baseType="IntEnum"
            members={[
              { name: "RED", value: 1 },
              { name: "GREEN", value: 2 },
              { name: "BLUE", value: 3 },
            ]}
          />
        </py.SourceFile>
      </Output>,
    );
    const expected = d`
      from enum import IntEnum
      class Color(IntEnum):
        RED = 1
        GREEN = 2
        BLUE = 3
    `;
    assertFileContents(result, { "test.py": expected });
  });

  it("enum with auto() values", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <py.EnumDeclaration
            name="Animal"
            style="auto"
            members={[{ name: "DOG" }, { name: "CAT" }, { name: "RABBIT" }]}
          />
        </py.SourceFile>
      </Output>,
    );
    const expected = d`
      from enum import Enum
      from enum import auto
      class Animal(Enum):
        DOG = auto()
        CAT = auto()
        RABBIT = auto()
    `;
    assertFileContents(result, { "test.py": expected });
  });

  it("enum with mixed manual and auto() values", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <py.EnumDeclaration
            name="Permission"
            baseType="Flag"
            style="auto"
            members={[
              { name: "READ", value: 1 },
              { name: "WRITE" },
              { name: "EXECUTE" },
            ]}
          />
        </py.SourceFile>
      </Output>,
    );
    const expected = d`
      from enum import Flag
      from enum import auto
      class Permission(Flag):
        READ = 1
        WRITE = auto()
        EXECUTE = auto()
    `;
    assertFileContents(result, { "test.py": expected });
  });

  it("functional enum with list", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <py.EnumDeclaration
            name="Direction"
            style="functional"
            members={[
              { name: "NORTH" },
              { name: "SOUTH" },
              { name: "EAST" },
              { name: "WEST" },
            ]}
          />
        </py.SourceFile>
      </Output>,
    );
    const expected = d`
      from enum import Enum
      Direction = Enum('Direction', ['NORTH', 'SOUTH', 'EAST', 'WEST'])
    `;
    assertFileContents(result, { "test.py": expected });
  });

  it("functional enum with mapping", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <py.EnumDeclaration
            name="Priority"
            style="functional"
            members={[
              { name: "HIGH", value: 1 },
              { name: "MEDIUM", value: 2 },
              { name: "LOW", value: 3 },
            ]}
          />
        </py.SourceFile>
      </Output>,
    );
    const expected = d`
      from enum import Enum
      Priority = Enum('Priority', {'HIGH' : 1, 'MEDIUM' : 2, 'LOW' : 3})
    `;
    assertFileContents(result, { "test.py": expected });
  });
});
