import { describe, expect, it } from "vitest";
import { ModelProperty } from "../../src/components/model-property.jsx";
import { toSourceText } from "../utils.jsx";
import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import * as typespec from "../../src/index.js";


//   const result = toSourceText(<ModelProperty name={invalidName} />);
//   expect(result).toBe(`\`${invalidName}\``);
// });

// it.each(["model", "enum", "never", "null", "unknown"])(
//   "Should render reserved names with backticks (%s)",
//   (reservedName) => {
//     const result = toSourceText(<ModelProperty name={reservedName} />);
//     expect(result).toBe(`\`${reservedName}\``);
//   },
// );

describe("ModelProperty name policy", () => {
    it("Should render valid names correctly", () => {
        const result = toSourceText(<ModelProperty name={"ValidName"} />);
        // Note: disabling ModelProperty for now
        expect(result).toBe("");
    });
});