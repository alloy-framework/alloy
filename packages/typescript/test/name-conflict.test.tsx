import { Output, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { camelCase } from "change-case";
import { expect, it } from "vitest";
import {
  FunctionDeclaration,
  SourceFile,
  TSOutputSymbol,
  TSSymbolFlags,
} from "../src/index.js";
import { ParameterDescriptor } from "../src/parameter-descriptor.js";
it("handles custom name conflict resolver based on metadata", () => {
  function resolver(name: string, symbols: TSOutputSymbol[]) {
    const goodNamedSymbols = symbols.filter(
      (s) => ~s.tsFlags & TSSymbolFlags.LocalImportSymbol,
    );
    const badNamedSymbols = symbols.filter(
      (s) => s.tsFlags & TSSymbolFlags.LocalImportSymbol,
    );
    let nameCount = 1;

    // always rename local import symbols (we don't care about them)
    for (const sym of badNamedSymbols) {
      sym.name = name + "_" + nameCount++;
    }

    // otherwise check the symbol metadata to see how to rename.

    // group by symbol metadata
    const groupedSymbols = new Map<string | undefined, TSOutputSymbol[]>([
      ["body", []],
      ["query", []],
      ["header", []],
      [undefined, []],
    ]);
    for (const sym of goodNamedSymbols) {
      const sourceLocation = sym.metadata.sourceLocation as
        | "body"
        | "query"
        | "header"
        | undefined;
      groupedSymbols.get(sourceLocation)!.push(sym);
    }

    for (const [sourceLocation, symbols] of groupedSymbols) {
      let locationCount = 0;
      if (sourceLocation === undefined) {
        for (const sym of symbols) {
          if (locationCount > 0) {
            sym.name = name + locationCount;
          }

          locationCount++;
        }
      } else if (symbols.length < 0) {
        continue;
      } else if (symbols.length === 1) {
        symbols[0].name = camelCase(name + "_" + sourceLocation);
      } else {
        for (const sym of symbols) {
          sym.name = camelCase(
            name + "_" + sourceLocation + locationCount++,
            {},
          );
        }
      }
    }
  }

  const testParameters: ParameterDescriptor[] = [
    { name: "foo" },
    { name: "foo" },
    { name: "foo", metadata: { sourceLocation: "body" } },
    { name: "foo", metadata: { sourceLocation: "query" } },
    { name: "foo", metadata: { sourceLocation: "query" } },
    { name: "foo", metadata: { sourceLocation: "header" } },
    { name: "foo", metadata: { sourceLocation: "header" } },
    { name: "foo", metadata: { sourceLocation: "header" } },
  ];

  const res = render(
    <Output nameConflictResolver={resolver}>
      <SourceFile path="test.ts">
        <FunctionDeclaration
          export
          name="conflicty"
          parameters={testParameters}
        />
      </SourceFile>
    </Output>,
  );

  expect(res.contents[0].contents).toBe(d`
    export function conflicty(
      foo,
      foo1,
      fooBody,
      fooQuery0,
      fooQuery1,
      fooHeader0,
      fooHeader1,
      fooHeader2,
    ) {}
  `);
});
