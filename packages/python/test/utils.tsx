import {
  Binder,
  Children,
  NamePolicy,
  Output,
  OutputScope,
  SymbolCreator,
} from "@alloy-js/core";
import * as py from "../src/components/index.js";
import { pythonNameConflictResolver } from "../src/name-conflict-resolver.js";
import { createPythonNamePolicy } from "../src/name-policy.js";
import { PythonModuleScope } from "../src/symbols/index.js";

export function TestOutput(props: {
  children?: Children;
  externals?: SymbolCreator[];
  namePolicy?: NamePolicy<string>;
  path?: string;
}) {
  return (
    <Output
      externals={props.externals}
      namePolicy={props.namePolicy ?? createPythonNamePolicy()}
      nameConflictResolver={pythonNameConflictResolver}
    >
      <py.SourceFile path={props.path ?? "test.py"} printWidth={80}>
        {props.children}
      </py.SourceFile>
    </Output>
  );
}

export function TestOutputDirectory(props: {
  children: Children;
  externals?: SymbolCreator[];
  namePolicy?: NamePolicy<string>;
}) {
  return (
    <Output
      externals={props.externals}
      namePolicy={props.namePolicy ?? createPythonNamePolicy()}
      nameConflictResolver={pythonNameConflictResolver}
    >
      {props.children}
    </Output>
  );
}

// Helper function to create a PythonModuleScope to be used in tests
export function createPythonModuleScope(
  name: string,
  parent: OutputScope | undefined,
  binder: Binder | undefined = undefined,
): PythonModuleScope {
  return new PythonModuleScope(name, parent, {
    binder: binder,
  });
}
