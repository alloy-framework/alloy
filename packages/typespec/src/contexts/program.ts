import { Binder, useBinder } from "@alloy-js/core";
import { ProgramScope } from "../scopes/program.js";
import { SourceFileScope } from "../scopes/source-file.js";
import { NamespaceSymbol } from "../symbols/index.js";

export function createGlobalNamespace(parent: SourceFileScope | ProgramScope) {
  return new NamespaceSymbol("global", undefined, { isGlobal: true });
}

const programs = new WeakMap<Binder, ProgramScope>();
let defaultProgram = new ProgramScope();

export function useProgram() {
  const binder = useBinder();
  return getProgram(binder);
}

export function resetProgram() {
  defaultProgram = new ProgramScope();
}

export function getProgram(binder: Binder | undefined) {
  if (!binder) {
    return defaultProgram;
  }

  let program = programs.get(binder);

  if (!program) {
    program = new ProgramScope({ binder });
    programs.set(binder, program);
  }

  return program;
}
