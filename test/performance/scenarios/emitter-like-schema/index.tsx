import {
  For,
  Output,
  refkey,
  renderAsync,
  type Refkey,
  SourceDirectory,
} from "@alloy-js/core";
import {
  ClassDeclaration,
  ClassMethod,
  InterfaceDeclaration,
  InterfaceMember,
  Reference,
  SourceFile,
  TypeDeclaration,
  VarDeclaration,
} from "@alloy-js/typescript";

export const title = "emitter-like schema (cross-file refs)";
export const description = `
  Simulates a TypeSpec-style emitter producing many TypeScript files with
  interfaces and classes that reference each other across file boundaries.
  Mirrors the shape of real emitter output (e.g. js-cdk network package):
  JSDoc on every declaration and member, mostly-optional properties,
  string-literal union types, and nested object-literal descriptor consts.
  Exercises the binder/symbol system, refkey resolution, automatic import
  insertion, JSDoc rendering, and fragment-heavy render trees.
`;

interface SchemaDef {
  name: string;
  key: Refkey;
  file: string;
  moduleIndex: number;
  schemaIndex: number;
  props: {
    name: string;
    refTo?: SchemaDef;
    array?: boolean;
    optional: boolean;
    doc: string;
  }[];
}

const MODULES = 12;
const SCHEMAS_PER_MODULE = 10;
const PROPS_PER_SCHEMA = 8;

function buildSchemas(): SchemaDef[] {
  const schemas: SchemaDef[] = [];
  for (let m = 0; m < MODULES; m++) {
    for (let s = 0; s < SCHEMAS_PER_MODULE; s++) {
      const name = `Module${m}Schema${s}`;
      schemas.push({
        name,
        key: refkey(name),
        file: `module${m}.ts`,
        moduleIndex: m,
        schemaIndex: s,
        props: [],
      });
    }
  }

  for (let i = 0; i < schemas.length; i++) {
    const s = schemas[i]!;
    for (let p = 0; p < PROPS_PER_SCHEMA; p++) {
      const refIdx = (i * 7 + p * 13) % schemas.length;
      const refTarget = refIdx === i ? undefined : schemas[refIdx];
      s.props.push({
        name: `prop${p}`,
        refTo: refTarget,
        array: p % 3 === 0,
        // ~70% optional, matching network's "most properties are optional" shape
        optional: p % 10 !== 0 && p % 10 !== 3 && p % 10 !== 7,
        doc: `The ${p === 0 ? "primary" : p % 2 === 0 ? "secondary" : "auxiliary"} ${refTarget ? "reference to another schema" : "scalar value"} for field ${p} of ${s.name}.`,
      });
    }
  }
  return schemas;
}

function interfaceDoc(s: SchemaDef): string {
  return `Represents the ${s.name} schema produced by module ${s.moduleIndex}.\n\nThis shape is part of the emitter-like-schema benchmark and mirrors the structure of generated TypeSpec emitter output. It carries ${PROPS_PER_SCHEMA} properties, some of which reference other schemas across module boundaries.`;
}

function classDoc(s: SchemaDef): string {
  return `Concrete implementation of {@link ${s.name}}.\n\nProvides serialization and cloning helpers typical of emitter-produced model classes.`;
}

function kindLiteralsFor(moduleIndex: number): string[] {
  const base = [
    "create",
    "update",
    "delete",
    "read",
    "list",
    "patch",
    "watch",
    "subscribe",
  ];
  const prefix = `m${moduleIndex}`;
  return base.map((b) => `${prefix}_${b}`);
}

function tagLiteralsFor(moduleIndex: number): string[] {
  const base = [
    "stable",
    "beta",
    "alpha",
    "preview",
    "deprecated",
    "internal",
  ];
  const prefix = `m${moduleIndex}`;
  return base.map((b) => `${prefix}_${b}`);
}

export async function runTest(): Promise<any> {
  const schemas = buildSchemas();
  const files = new Map<string, SchemaDef[]>();
  for (const s of schemas) {
    let arr = files.get(s.file);
    if (!arr) files.set(s.file, (arr = []));
    arr.push(s);
  }
  const fileEntries = [...files.entries()];

  return await renderAsync(
    <Output>
      <SourceDirectory path="src">
        <For each={fileEntries}>
          {([fileName, mods]) => {
            const moduleIndex = mods[0]!.moduleIndex;
            const modulePrefix = `Module${moduleIndex}`;
            const kindLiterals = kindLiteralsFor(moduleIndex);
            const tagLiterals = tagLiteralsFor(moduleIndex);
            const kindKey = refkey(`${modulePrefix}Kind`);
            const tagKey = refkey(`${modulePrefix}Tag`);
            return (
              <SourceFile path={fileName}>
                <TypeDeclaration
                  export
                  name={`${modulePrefix}Kind`}
                  refkey={kindKey}
                  doc={`Discriminator of operations supported by the ${modulePrefix} schema family. Mirrors the string-literal union types common in generated network/emitter code.`}
                >
                  <For each={kindLiterals} joiner=" | ">
                    {(lit) => `"${lit}"`}
                  </For>
                </TypeDeclaration>
                {"\n\n"}
                <TypeDeclaration
                  export
                  name={`${modulePrefix}Tag`}
                  refkey={tagKey}
                  doc={`Stability tag for ${modulePrefix} schemas.`}
                >
                  <For each={tagLiterals} joiner=" | ">
                    {(lit) => `"${lit}"`}
                  </For>
                </TypeDeclaration>
                {"\n\n"}
                <For each={mods} joiner="\n\n">
                  {(schema) => (
                    <>
                      <InterfaceDeclaration
                        export
                        name={schema.name}
                        refkey={schema.key}
                        doc={interfaceDoc(schema)}
                      >
                        <InterfaceMember
                          name="kind"
                          type={<Reference refkey={kindKey} />}
                          doc={`Discriminator identifying the operation kind for this ${schema.name} instance.`}
                        />
                        {"\n"}
                        <InterfaceMember
                          name="tag"
                          type={<Reference refkey={tagKey} />}
                          optional
                          doc={`Optional stability tag applied to this ${schema.name}. When absent, defaults to "stable".`}
                        />
                        {"\n"}
                        <For each={schema.props} joiner="\n">
                          {(prop) => (
                            <InterfaceMember
                              name={prop.name}
                              optional={prop.optional}
                              doc={prop.doc}
                              type={
                                prop.refTo ?
                                  prop.array ?
                                    <>
                                      <Reference refkey={prop.refTo.key} />
                                      {"[]"}
                                    </>
                                  : <Reference refkey={prop.refTo.key} />
                                : prop.array ? "string[]"
                                : "string"
                              }
                            />
                          )}
                        </For>
                      </InterfaceDeclaration>
                      {"\n\n"}
                      <ClassDeclaration
                        export
                        name={`${schema.name}Impl`}
                        refkey={refkey(`${schema.name}Impl`)}
                        doc={classDoc(schema)}
                      >
                        <ClassMethod
                          name="serialize"
                          returnType="string"
                          parameters={[]}
                          doc={`Serializes this ${schema.name} to a JSON string.`}
                        >
                          {`return JSON.stringify(this);`}
                        </ClassMethod>
                        {"\n"}
                        <ClassMethod
                          name="clone"
                          returnType={<Reference refkey={schema.key} />}
                          parameters={[]}
                          doc={`Returns a shallow clone of this ${schema.name}.`}
                        >
                          {`return { ...this };`}
                        </ClassMethod>
                      </ClassDeclaration>
                    </>
                  )}
                </For>
                {"\n\n"}
                <TypeDeclaration
                  export
                  name={`${modulePrefix}All`}
                  refkey={refkey(`${modulePrefix}All`)}
                  doc={`Union of every schema exported from ${modulePrefix}.`}
                >
                  <For each={mods} joiner=" | ">
                    {(s) => <Reference refkey={s.key} />}
                  </For>
                </TypeDeclaration>
                {"\n\n"}
                <VarDeclaration
                  export
                  const
                  name={`${modulePrefix}Registry`}
                  doc={`Nested descriptor map for ${modulePrefix} schemas. Mirrors the object-literal descriptor consts emitted by real-world generators.`}
                >
                  {"{\n  "}
                  <For each={mods} joiner=",\n  ">
                    {(s) =>
                      `${s.name}: { name: "${s.name}", kind: "m${moduleIndex}_${s.schemaIndex % 2 === 0 ? "create" : "update"}", tag: "m${moduleIndex}_stable", schemaIndex: ${s.schemaIndex}, propNames: [${s.props.map((p) => `"${p.name}"`).join(", ")}] }`
                    }
                  </For>
                  {"\n}"}
                </VarDeclaration>
              </SourceFile>
            );
          }}
        </For>
      </SourceDirectory>
    </Output>,
  );
}
