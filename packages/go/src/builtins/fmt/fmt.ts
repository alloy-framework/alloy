import { createModule, StrictDescriptor } from "../../create-module.js";

export const fmt = createModule(
  "fmt",
  {
    kind: "package",
    members: {
      Append: { kind: "function" },
      Appendf: { kind: "function" },
      Appendln: { kind: "function" },
      Errorf: { kind: "function" },
      FormatString: { kind: "function" },
      Fprint: { kind: "function" },
      Fprintf: { kind: "function" },
      Fprintln: { kind: "function" },
      Fscan: { kind: "function" },
      Fscanf: { kind: "function" },
      Fscanln: { kind: "function" },
      Print: { kind: "function" },
      Printf: { kind: "function" },
      Println: { kind: "function" },
      Scan: { kind: "function" },
      Scanf: { kind: "function" },
      Scanln: { kind: "function" },
      Sprint: { kind: "function" },
      Sprintf: { kind: "function" },
      Sprintln: { kind: "function" },
      Sscan: { kind: "function" },
      Sscanf: { kind: "function" },
      Sscanln: { kind: "function" },
      Formatter: {
        kind: "interface",
        members: {
          Format: { kind: "field" },
        },
      },
      GoStringer: {
        kind: "interface",
        members: {
          GoString: { kind: "field" },
        },
      },
      ScanState: {
        kind: "interface",
        members: {
          ReadRune: { kind: "field" },
          UnreadRune: { kind: "field" },
          SkipSpace: { kind: "field" },
          Token: { kind: "field" },
          Width: { kind: "field" },
          Read: { kind: "field" },
        },
      },
      Scanner: {
        kind: "interface",
        members: {
          Scan: { kind: "field" },
        },
      },
      State: {
        kind: "interface",
        members: {
          Write: { kind: "field" },
          Width: { kind: "field" },
          Precision: { kind: "field" },
          Flag: { kind: "field" },
        },
      },
      Stringer: {
        kind: "interface",
        members: {
          String: { kind: "field" },
        },
      },
    },
  } satisfies StrictDescriptor,
  true,
);
