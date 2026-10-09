export interface OutputDirectory {
  kind: "directory";
  /** Full path from the output root, e.g. `"generated-client/src"`. Do not prepend parent directory paths when walking the tree. */
  path: string;
  contents: (OutputDirectory | OutputFile)[];
}

export interface OutputFileBase {
  kind: "file";
  /** Full path from the output root, e.g. `"generated-client/src/models.ext"`. Do not prepend parent directory paths when walking the tree. */
  path: string;
}

export interface CopyOutputFile extends OutputFileBase {
  sourcePath: string;
}

export interface ContentOutputFile extends OutputFileBase {
  contents: string;
  filetype: string;
}

export type OutputFile = ContentOutputFile | CopyOutputFile;

export interface PrintTreeOptions {
  /**
   * The number of characters the printer will wrap on. Defaults to 100
   * characters.
   */
  printWidth?: number;

  /**
   * Whether to use tabs instead of spaces for indentation. Defaults to false.
   */
  useTabs?: boolean;

  /**
   * The number of spaces to use for indentation. Defaults to 2 spaces.
   */
  tabWidth?: number;

  /**
   * If files should end with a final new line.
   * @default true
   */
  insertFinalNewLine?: boolean;
}
