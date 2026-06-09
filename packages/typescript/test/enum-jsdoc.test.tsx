import { expect, it } from "vitest";
import * as ts from "../src/index.js";
import { TestFile } from "./utils.js";

it("renders an enum declaration with documentation", () => {
  const res = (
    <TestFile>
        <ts.EnumDeclaration
      name="Color"
      doc="Color enumeration for the application"
    >
      <ts.CommaList>
        <ts.EnumMember name="Red" />
        <ts.EnumMember name="Green" />
        <ts.EnumMember name="Blue" />
      </ts.CommaList>
    </ts.EnumDeclaration>
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * Color enumeration for the application
     */
    enum Color {
      Red,
      Green,
      Blue,
    }
  `);
});

it("renders an enum declaration with documented members", () => {
  const res = (
    <TestFile>
        <ts.EnumDeclaration
      name="Direction"
      doc="Represents cardinal directions. Used for navigation purposes"
    >
      <ts.CommaList>
        <ts.EnumMember name="North" jsValue={0} doc={["Bound to the north"]} />
        <ts.EnumMember
          name="East"
          jsValue={1}
          doc={["Bound to the East", "A second doc paragraph"]}
        />
        <ts.EnumMember name="South" jsValue={2} doc="Opposite to North" />
        <ts.EnumMember name="West" jsValue={3} doc="Going west!" />
      </ts.CommaList>
    </ts.EnumDeclaration>
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * Represents cardinal directions. Used for navigation purposes
     */
    enum Direction {
      /**
       * Bound to the north
       */
      North = 0,
      /**
       * Bound to the East
       *
       * A second doc paragraph
       */
      East = 1,
      /**
       * Opposite to North
       */
      South = 2,
      /**
       * Going west!
       */
      West = 3,
    }
  `);
});
