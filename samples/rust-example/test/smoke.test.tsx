import { render, Output, writeOutput } from "@alloy-js/core";
import { execSync } from "child_process";
import { existsSync, mkdirSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  CrateDirectory,
  ModuleDocComment,
  SourceFile,
  createRustNamePolicy,
} from "@alloy-js/rust";
import { stdCrate } from "../src/externals.js";
import { ErrorModule } from "../src/components/error-module.js";
import { TraitsModule } from "../src/components/traits-module.js";
import { StoreModule } from "../src/components/store-module.js";
import { ConfigFile } from "../src/components/config-file.js";

function hasRustToolchain(): boolean {
  try {
    // Check standard PATH first, then common cargo install location
    const cargoPath =
      process.env.CARGO_HOME
        ? join(process.env.CARGO_HOME, "bin", "cargo")
        : join(process.env.HOME ?? "", ".cargo", "bin", "cargo");
    const cmd = existsSync(cargoPath) ? cargoPath : "cargo";
    execSync(`${cmd} --version`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function getCargoBin(): string {
  const cargoPath =
    process.env.CARGO_HOME
      ? join(process.env.CARGO_HOME, "bin", "cargo")
      : join(process.env.HOME ?? "", ".cargo", "bin", "cargo");
  return existsSync(cargoPath) ? cargoPath : "cargo";
}

/**
 * Post-process generated Rust code to fix known framework formatting issues.
 *
 * The alloy framework currently renders items without proper newline separation
 * between doc comments, attributes, and declarations. This causes Rust's
 * line-comment syntax (`///`) to consume following declarations.
 *
 * Tracked as backlog items:
 * - framework-newline-rendering: Missing newlines between items
 * - implblock-missing-generics: ImplBlock doesn't apply generic params to type
 * - implblock-trait-import: ImplBlock trait doesn't generate use statement
 * - cargo-toml-lib-path: CrateDirectory doesn't set [lib] path
 */
function postProcessRustOutput(content: string): string {
  // Fix doc comments running into declarations on the same line
  content = content.replace(
    /\.(pub |impl[ <{]|fn |struct |enum |const |mod |use |trait [A-Z]|type [A-Z])/g,
    ".\n$1",
  );
  content = content.replace(/\.#\[/g, ".\n#[");

  // Fix attributes running into declarations
  content = content.replace(/\](pub |fn |impl )/g, "]\n$1");

  // Fix closing braces running into next items
  content = content.replace(
    /\}(pub |fn |let |impl |struct |enum |type |const |mod |use |trait |#\[|\/\/\/|\/\/!)/g,
    "}\n$1",
  );

  // Fix semicolons running into next statements
  content = content.replace(/;(pub |fn |let |self\.|Ok\(|\/\/\/|#\[)/g, ";\n$1");

  // Fix return value with semicolon on separate line
  content = content.replace(/(return [^;\n]+)\n\s*;/g, "$1;");

  // Fix closure end running into next statement
  content = content.replace(/\}\);([a-z])/g, "});\n$1");

  return content;
}

const hasCargo = hasRustToolchain();

describe.skipIf(!hasCargo)("rust smoke test", () => {
  const outputDir = join(tmpdir(), `alloy-rust-smoke-${Date.now()}`);

  beforeAll(async () => {
    const output = render(
      <Output namePolicy={createRustNamePolicy()} externals={[stdCrate]}>
        <CrateDirectory
          name="kv_store"
          version="0.1.0"
          edition="2021"
          crateType="lib"
          includeCargoToml
        >
          <ErrorModule />
          <TraitsModule />
          <StoreModule />
          <ConfigFile />

          <SourceFile
            path="lib.rs"
            headerComment={
              <ModuleDocComment>
                A generic, thread-safe key-value store library.
              </ModuleDocComment>
            }
          />
        </CrateDirectory>
      </Output>,
    );

    await writeOutput(output, outputDir);
  }, 30_000);

  afterAll(() => {
    if (existsSync(outputDir)) {
      rmSync(outputDir, { recursive: true, force: true });
    }
  });

  it("generates all expected files", () => {
    expect(existsSync(join(outputDir, "Cargo.toml"))).toBe(true);
    expect(existsSync(join(outputDir, "lib.rs"))).toBe(true);
    expect(existsSync(join(outputDir, "config.rs"))).toBe(true);
    expect(existsSync(join(outputDir, "error", "mod.rs"))).toBe(true);
    expect(existsSync(join(outputDir, "store", "mod.rs"))).toBe(true);
    expect(existsSync(join(outputDir, "traits", "mod.rs"))).toBe(true);
  });

  it("generates proper use statements from References", () => {
    const { readFileSync } = require("fs");
    const storeMod = readFileSync(
      join(outputDir, "store", "mod.rs"),
      "utf-8",
    );

    // References should generate proper use statements
    expect(storeMod).toContain("use std::collections::HashMap");
    expect(storeMod).toContain("use std::time::");
    expect(storeMod).toContain("use crate::error::StoreError");

    // Types should use short names (not fully-qualified)
    expect(storeMod).toMatch(/data: HashMap</);
    expect(storeMod).toMatch(/created_at: Instant/);
    expect(storeMod).toMatch(/Option<Duration>/);
  });

  it("generates correct enum variant syntax", () => {
    const { readFileSync } = require("fs");
    const errorMod = readFileSync(
      join(outputDir, "error", "mod.rs"),
      "utf-8",
    );

    // Enum variants should be tuple variants, not struct variants
    expect(errorMod).toContain("SerializationError(String)");
    expect(errorMod).toContain("LockError(String)");
    expect(errorMod).not.toContain("SerializationError {");
  });

  it("generates method chain for remove", () => {
    const { readFileSync } = require("fs");
    const storeMod = readFileSync(
      join(outputDir, "store", "mod.rs"),
      "utf-8",
    );

    // MethodChainExpression should generate proper chain
    expect(storeMod).toMatch(/\.remove\(key\)/);
    expect(storeMod).toMatch(/\.map\(\|entry\| entry\.value\)/);
    expect(storeMod).toMatch(/\.ok_or\(StoreError::NotFound\)/);
  });

  it.todo(
    "compiles with cargo check (blocked by framework bugs: ImplBlock missing generics, trait import missing)",
  );
});
