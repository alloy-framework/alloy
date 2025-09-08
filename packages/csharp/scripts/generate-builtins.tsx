/**
 * Script to process DocFX YAML outputs (in ./api) into a Record<string, Descriptor>
 * compatible with the `createLibrary` props shape defined in ../src/create-library.ts.
 *
 * Usage (from repo root):
 *   tsx packages/csharp/scripts/generate-builtins.ts > /tmp/system-builtins.ts
 *
 * Disclaimer: coded with 🪄 vibes 🔮
 */

import {
  code,
  createNamedContext,
  For,
  namekey,
  Output,
  reactive,
  refkey,
  renderAsync,
  Show,
  SourceDirectory,
  writeOutput,
} from "@alloy-js/core";
import {
  ArrowFunction,
  ObjectExpression,
  SourceFile,
  VarDeclaration,
} from "@alloy-js/typescript";

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { parse as parseYaml } from "yaml";
import type { Descriptor, NamespaceDescriptor } from "../src/create-library.js";

interface DocfxItem {
  uid: string;
  id?: string; // simple id (member name)
  type?: string; // e.g. Class, Struct, Method, Property, Field, Enum, Interface, Constructor
  namespace?: string; // namespace owning the type
  children?: string[]; // child UIDs
  syntax?: { content?: string; return?: { type?: string } };
}

interface DocfxFile {
  items?: DocfxItem[];
}

// Global root namespace descriptor (represents the conceptual global namespace).
const rootNamespace: NamespaceDescriptor<any> = {
  kind: "namespace",
  members: {},
} as any;

// Track fully-qualified namespace names encountered so we can resolve the most-nested
// namespace portion of type references later.
const knownNamespaces = new Set<string>();
knownNamespaces.add("");

function ensureNamespace(path: string[]): {
  members: Record<string, Descriptor>;
} {
  let members = rootNamespace.members as Record<string, Descriptor>;
  let currentPath: string[] = [];
  for (const nsPart of path) {
    currentPath.push(nsPart);
    if (!members[nsPart]) {
      members[nsPart] = { kind: "namespace", members: {} } as any;
    }
    const existing = members[nsPart];
    if (existing.kind !== "namespace") {
      return { members: (existing as any).members ?? {} };
    }
    members = (existing as any).members;
    knownNamespaces.add(currentPath.join("."));
  }
  return { members };
}

function mapTypeKind(docfxKind: string | undefined): Descriptor["kind"] {
  switch (docfxKind) {
    case "Class":
      return "class";
    case "Struct":
      return "struct";
    case "Enum":
      return "enum";
    case "Interface":
      return "interface";
    // DocFX might emit "Record" in newer versions; support it if present.
    case "Record":
      return "record";
    default:
      return "generic";
  }
}

function isAcceptableIdentifier(name: string): boolean {
  // Accept only alphanumeric names (A-Z a-z 0-9). Anything with underscore, backtick, or other punctuation is skipped.
  return /^[A-Za-z0-9]+$/.test(name);
}

function sanitizeMemberName(id: string | undefined): string | undefined {
  if (!id) return undefined;
  // Drop parameter list for methods / constructors
  const base = id.split("(")[0];
  // Remove leading punctuation (# for constructors)
  let trimmed = base.replace(/^#+/, "");
  // Remove trailing overload artifacts like __1
  trimmed = trimmed.replace(/__\d+$/, "");
  // Drop generic arity for potential generic members (rare): Name`1 -> Name
  trimmed = trimmed.replace(/`\d+$/, "");
  if (!trimmed || !isAcceptableIdentifier(trimmed)) return undefined;
  return trimmed;
}

function parseModifiers(syntaxContent: string | undefined) {
  const mods: Record<string, boolean> = {};
  if (!syntaxContent) return mods;
  // NOTE: simple regex presence checks; this may over-approximate in rare cases (e.g., names containing keywords)
  if (/\bstatic\b/.test(syntaxContent)) mods.isStatic = true;
  if (/\babstract\b/.test(syntaxContent)) mods.isAbstract = true;
  if (/\bvirtual\b/.test(syntaxContent)) mods.isVirtual = true;
  if (/\boverride\b/.test(syntaxContent)) mods.isOverride = true;
  if (/\bsealed\b/.test(syntaxContent)) mods.isSealed = true;
  if (/\bextern\b/.test(syntaxContent)) mods.isExtern = true;
  if (/\breadonly\b/.test(syntaxContent)) mods.isReadOnly = true; // fields, also 'readonly struct' ignored for members
  return mods;
}

function normalizeTypeName(name: string): string {
  if (name.startsWith("ValueTuple`")) return "ValueTuple";
  // Remove synthetic generic arity artifacts like __1, __2 etc.
  return name.replace(/__\d+$/, "");
}

// Remove generic arity markers (`1, `2, etc.) and DocFX placeholder type parameter lists like {{T}}, {{TKey},{TValue}}
function cleanDocfxType(typeName: string | undefined): string | undefined {
  if (!typeName) return typeName;
  let cleaned = typeName;
  // Strip generic arity markers following identifiers
  cleaned = cleaned.replace(/`\d+/g, "");
  // Remove placeholder generic parameter blocks of the form {{...}}
  cleaned = cleaned.replace(/\{?\{[^}]*\}\}?/g, "");
  // Collapse any duplicate commas/spaces introduced
  cleaned = cleaned.replace(/\s+/g, "");
  cleaned = cleaned.replace(/,+/g, ",");
  cleaned = cleaned.replace(/,+$/g, "");
  return cleaned;
}

function TypeReference(props: { type: string | undefined }) {
  const type = cleanDocfxType(props.type);
  if (!type) return "undefined";
  if (type.endsWith("[]")) {
    return <ArrowFunction>return {refkey("System")}.Array;</ArrowFunction>;
  }
  const parts = type.split(".");
  if (parts.length === 0) return "undefined";

  // Find the longest prefix that is a known namespace.
  let namespace = "";
  for (let i = parts.length - 1; i >= 0; i--) {
    const candidate = parts.slice(0, i).join(".");
    if (knownNamespaces.has(candidate)) {
      namespace = candidate;
      break;
    }
  }
  let typeName =
    namespace ?
      parts.slice(namespace.split(".").length).join(".")
    : parts.join(".");
  if (!typeName) return "undefined";

  if (typeName.endsWith("*")) {
    typeName = typeName.slice(0, -1);
  }
  return (
    <ArrowFunction>
      return {refkey(namespace)}.{typeName};
    </ArrowFunction>
  );
}
function buildMemberDescriptors(
  items: DocfxItem[],
  leafTypeName: string,
): Record<string, Descriptor> {
  const memberDescriptors: Record<string, Descriptor> = {};
  for (const item of items) {
    const memberKind = item.type;
    if (!memberKind) continue;
    if (["Field", "Property", "Method", "Constructor"].includes(memberKind)) {
      const simpleName = sanitizeMemberName(
        item.id || item.uid.split(".").pop(),
      );
      if (!simpleName) continue;
      if (memberDescriptors[simpleName]) continue; // collapse overloads
      // Detect Nullable<T> return types (DocFX form: System.Nullable{T}) so we can
      // mark descriptor.isNullable = true and reference the inner T symbol directly.
      const rawReturnType = item.syntax?.return?.type;
      let isNullable = false;
      let effectiveReturnType = rawReturnType;
      if (rawReturnType) {
        const nullableMatch = /^System\.Nullable\{(.+)\}$/.exec(
          rawReturnType.trim(),
        );
        if (nullableMatch) {
          isNullable = true;
          effectiveReturnType = nullableMatch[1];
        }
      }
      // If still not marked nullable, attempt to detect C# shorthand nullable syntax (Type? Name)
      // by searching the declaration content for a '?' immediately preceding the identifier.
      if (!isNullable && item.syntax?.content) {
        const namePattern = new RegExp(`\\?\\s+${simpleName}\\b`);
        // Quick scan: split at newline to avoid unrelated later usages.
        const firstLine = item.syntax.content.split(/\r?\n/, 1)[0];
        if (namePattern.test(firstLine)) {
          // Ensure the '?' actually belongs to the type token (avoid matching '??').
          // Find the index of the simpleName and inspect preceding chars.
          const idx = firstLine.indexOf(simpleName);
          if (idx > 1) {
            const before = firstLine.slice(0, idx);
            // Trim trailing spaces then check last non-space char
            const trimmed = before.replace(/\s+$/g, "");
            if (trimmed.endsWith("?") && !trimmed.endsWith("??")) {
              isNullable = true;
            }
          }
        }
      }
      switch (memberKind) {
        case "Field":
          memberDescriptors[simpleName] = {
            kind: "field",
            type: (() => <TypeReference type={effectiveReturnType} />) as any,
            ...(isNullable ? { isNullable: true } : {}),
            ...parseModifiers(item.syntax?.content),
          } as any;
          break;
        case "Property":
          memberDescriptors[simpleName] = {
            kind: "property",
            type: (() => <TypeReference type={effectiveReturnType} />) as any,
            ...(isNullable ? { isNullable: true } : {}),
            ...parseModifiers(item.syntax?.content),
          } as any;
          break;
        case "Method":
          memberDescriptors[simpleName] = {
            kind: "method",
            methodKind: "ordinary",
            ...parseModifiers(item.syntax?.content),
          } as any;
          break;
        case "Constructor":
          memberDescriptors[leafTypeName] = {
            kind: "method",
            methodKind: "constructor",
            ...parseModifiers(item.syntax?.content),
          } as any;
          break;
      }
    }
  }
  return memberDescriptors;
}

function addType(file: DocfxFile) {
  if (!file.items || !file.items.length) return;
  const root = file.items[0];
  if (!root.uid || !root.type || !root.namespace) return;

  const typeKind = mapTypeKind(root.type);

  const nsParts = root.namespace.split(".");
  const { members: namespaceMembers } = ensureNamespace(nsParts);

  // Normalize and split potential nested type path (ReadOnlyDictionary`2.KeyCollection)
  const rawId = root.id || root.uid.split(".").pop() || "";
  const normalized = normalizeTypeName(rawId);
  const segments = normalized.split(".").map((s) => s.replace(/`\d+$/, ""));
  if (segments.some((s) => !s || !isAcceptableIdentifier(s))) return;
  const leafName = segments.at(-1)!;

  // Walk/create parent chain (placeholders) within namespace container
  let container: Record<string, Descriptor> = namespaceMembers;
  for (const parentSeg of segments.slice(0, -1)) {
    const existing = container[parentSeg];
    if (!existing || !(existing as any).members) {
      container[parentSeg] = {
        kind: "class", // placeholder kind
        members: (existing as any)?.members || {},
      } as any;
    }
    container = (container[parentSeg] as any).members;
  }

  // Avoid overwriting existing rich definition
  if (container[leafName] && (container[leafName] as any).members) return;

  const typeLevelMods = parseModifiers(root.syntax?.content);
  const namedTypeExtra: Record<string, boolean> = {};
  if (typeLevelMods.isStatic) namedTypeExtra.isStatic = true;
  if (typeLevelMods.isAbstract) namedTypeExtra.isAbstract = true;
  if (typeLevelMods.isSealed) namedTypeExtra.isSealed = true;

  const memberDescriptors = buildMemberDescriptors(
    file.items.slice(1),
    leafName,
  );

  container[leafName] = {
    kind: typeKind,
    members: memberDescriptors,
    ...namedTypeExtra,
  } as any;
}

function walk(dir: string) {
  for (const entry of readdirSync(dir)) {
    console.log(entry);
    if (entry.startsWith(".")) continue;
    if (!entry.endsWith(".yml")) continue;
    if (entry === "toc.yml" || entry === ".manifest") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) continue;
    try {
      const content = readFileSync(full, "utf8");
      const data = parseYaml(content) as DocfxFile;
      addType(data);
    } catch (e) {
      console.warn(`Skipping ${entry}: ${(e as Error).message}`);
    }
  }
}

// Arg[0]=node, Arg[1]=script, Arg[2]=apiDir, Arg[3]=outputPath (unused for now)
const [, , apiParam, outParam] = process.argv;
const API_DIR =
  apiParam ?
    resolve(apiParam)
  : join(dirname(new URL(import.meta.url).pathname), "api");
const OUTPUT_PATH = outParam ? resolve(outParam) : undefined; // reserved for future use

console.log("Reading yaml files...");
walk(API_DIR);

interface NamespaceDirectoryContext {
  imports: Map<string, string>;
}

const NamespaceDirectoryContext = createNamedContext<NamespaceDirectoryContext>(
  "NamespaceDirectoryContext",
);

function NamespaceDirectory(props: {
  name: string;
  fqn: string;
  ns: NamespaceDescriptor<any>;
}) {
  const subNamespaces = Object.entries(props.ns.members || {}).filter(
    ([, member]) => (member as any).kind === "namespace",
  );

  const nonNamespaces = Object.entries(props.ns.members || {}).filter(
    ([, member]) => (member as any).kind !== "namespace",
  );

  if (nonNamespaces.length === 0 && subNamespaces.length === 0) {
    return;
  }

  let path: string;
  let fqnBase: string;
  if (props.name === "") {
    path = ".";
    fqnBase = "";
  } else {
    path = props.name;
    fqnBase = props.fqn + ".";
  }

  const context: NamespaceDirectoryContext = {
    imports: reactive(new Map<string, string>()),
  };

  return (
    <SourceDirectory path={path}>
      <NamespaceDirectoryContext.Provider value={context}>
        <Show when={subNamespaces.length > 0}>
          <For each={subNamespaces}>
            {([memberName, member]) => {
              if ((member as any).kind === "namespace") {
                return (
                  <NamespaceDirectory
                    name={memberName}
                    fqn={fqnBase + memberName}
                    ns={member as any}
                  />
                );
              }
            }}
          </For>
        </Show>

        <SourceFile path="index.ts">
          <Show when={props.fqn !== ""}>
            {code`import { createLibrary } from "#createLibrary";${(<hbr />)}`}
          </Show>
          <For each={subNamespaces}>
            {([memberName, member]) => {
              if ((member as any).kind === "namespace") {
                return `export { default as ${memberName} } from "./${memberName}/index.js";`;
              }
            }}
          </For>
          <Show when={props.fqn !== ""}>
            <hbr />
            <hbr />
            <VarDeclaration name={path}>
              createLibrary("{props.fqn}",{" "}
              <ObjectExpression jsValue={Object.fromEntries(nonNamespaces)} />
              );
            </VarDeclaration>
            <hbr />
            <VarDeclaration
              name={namekey(path, { ignoreNameConflict: true })}
              refkey={refkey(props.fqn)}
              export
              default
            >
              {path}
            </VarDeclaration>
          </Show>
        </SourceFile>
      </NamespaceDirectoryContext.Provider>
    </SourceDirectory>
  );
}
console.log("Writing library definitions...");
await writeOutput(
  await renderAsync(
    <Output basePath={OUTPUT_PATH}>
      <NamespaceDirectory name="" fqn="" ns={rootNamespace} />
    </Output>,
  ),
);
