export type AnnotatedNode =
  | {
      component: string;
      props: unknown;
      rendered: AnnotatedNode[];
      implementation: string;
    }
  | string;

export interface OutputDirectory {
  kind: "directory";
  path: string;
  contents: (OutputDirectory | OutputFile)[];
}

export interface OutputFile {
  kind: "file";
  contents: AnnotatedNode[];
  path: string;
  filetype: string;
}
