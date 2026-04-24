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
  Exercises the binder/symbol system, refkey resolution, automatic import
  insertion, and fragment-heavy render trees — the hot paths typical of
  real-world alloy consumers (js-cdk, flight-instructor).
`;

interface SchemaDef {
  name: string;
  key: Refkey;
  file: string;
  props: { name: string; refTo?: SchemaDef; array?: boolean }[];
}

function buildSchemas(): SchemaDef[] {
  const MODULES = 8;
  const SCHEMAS_PER_MODULE = 10;
  const PROPS_PER_SCHEMA = 8;

  const schemas: SchemaDef[] = [];
  for (let m = 0; m < MODULES; m++) {
    for (let s = 0; s < SCHEMAS_PER_MODULE; s++) {
      const name = `Module${m}Schema${s}`;
      schemas.push({
        name,
        key: refkey(name),
        file: `module${m}.ts`,
        props: [],
      });
    }
  }

  // Fill in props — each schema references a few other (cross-module) schemas
  // to force import generation and binder lookups.
  for (let i = 0; i < schemas.length; i++) {
    const s = schemas[i]!;
    for (let p = 0; p < PROPS_PER_SCHEMA; p++) {
      const refIdx = (i * 7 + p * 13) % schemas.length;
      const refTarget = refIdx === i ? undefined : schemas[refIdx];
      s.props.push({
        name: `prop${p}`,
        refTo: refTarget,
        array: p % 3 === 0,
      });
    }
  }
  return schemas;
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
          {([fileName, mods]) => (
            <SourceFile path={fileName}>
              <For each={mods} joiner="\n\n">
                {(schema) => (
                  <>
                    <InterfaceDeclaration
                      export
                      name={schema.name}
                      refkey={schema.key}
                    >
                      <For each={schema.props} joiner="\n">
                        {(prop) => (
                          <InterfaceMember
                            name={prop.name}
                            type={
                              prop.refTo ? (
                                prop.array ? (
                                  <>
                                    <Reference refkey={prop.refTo.key} />
                                    {"[]"}
                                  </>
                                ) : (
                                  <Reference refkey={prop.refTo.key} />
                                )
                              ) : (
                                "string"
                              )
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
                    >
                      <ClassMethod
                        name="serialize"
                        returnType="string"
                        parameters={[]}
                      >
                        {`return JSON.stringify(this);`}
                      </ClassMethod>
                      {"\n"}
                      <ClassMethod
                        name="clone"
                        returnType={<Reference refkey={schema.key} />}
                        parameters={[]}
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
                name={`${mods[0]!.name.replace(/Schema\d+$/, "")}All`}
                refkey={refkey(`${mods[0]!.name}All`)}
              >
                <For each={mods} joiner=" | ">
                  {(s) => <Reference refkey={s.key} />}
                </For>
              </TypeDeclaration>
              {"\n\n"}
              <VarDeclaration
                export
                const
                name={`${mods[0]!.name.replace(/Schema\d+$/, "")}Registry`}
              >
                {"{"}
                <For each={mods} joiner=", ">
                  {(s) => `${s.name}: "${s.name}"`}
                </For>
                {"}"}
              </VarDeclaration>
            </SourceFile>
          )}
        </For>
      </SourceDirectory>
    </Output>,
  );
}
