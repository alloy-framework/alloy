import {
  For,
  mapJoin,
  Output,
  renderAsync,
  SourceDirectory,
  SourceFile,
} from "@alloy-js/core";

export const title = "Render N files of import statements";
export const description = `
  Printer-heavy scenario: each of N files contains M ImportStatement-like
  components with mapJoin + group/indent/line/ifBreak.
`;

const FILES = 200;
const IMPORTS_PER_FILE = 50;

interface MockImportProps {
  path: string;
  symbols: string[];
}

function MockImportStatement(props: MockImportProps) {
  return (
    <>
      {"import "}
      <group>
        {"{"}
        <indent>
          <line />
          {mapJoin(
            () => props.symbols,
            (sym) => sym,
            {
              joiner: (
                <>
                  {","}
                  <line />
                </>
              ),
            },
          )}
          <ifBreak>{","}</ifBreak>
        </indent>
        <line />
        {"}"}
      </group>
      {` from "${props.path}";`}
      {"\n"}
    </>
  );
}

interface FileSpec {
  path: string;
  imports: MockImportProps[];
}

export function makeFileSpecs(
  files = FILES,
  importsPerFile = IMPORTS_PER_FILE,
): FileSpec[] {
  const out: FileSpec[] = new Array(files);
  for (let i = 0; i < files; i++) {
    const imports: MockImportProps[] = new Array(importsPerFile);
    for (let j = 0; j < importsPerFile; j++) {
      const symCount = (j % 12) + 1;
      const syms: string[] = new Array(symCount);
      for (let k = 0; k < symCount; k++) syms[k] = `Sym${j}_${k}`;
      imports[j] = { path: `./mod-${i}-${j}`, symbols: syms };
    }
    out[i] = { path: `file-${i}.ts`, imports };
  }
  return out;
}

export async function runTest(): Promise<any> {
  const specs = makeFileSpecs();
  return await renderAsync(
    <Output>
      <SourceDirectory path="src">
        <For each={specs}>
          {(spec) => (
            <SourceFile path={spec.path} filetype="text/plain">
              <For each={spec.imports}>
                {(imp) => (
                  <MockImportStatement path={imp.path} symbols={imp.symbols} />
                )}
              </For>
            </SourceFile>
          )}
        </For>
      </SourceDirectory>
    </Output>,
  );
}
