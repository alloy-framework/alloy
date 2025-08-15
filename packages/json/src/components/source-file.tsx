import {
  Children,
  SourceFile as CoreSourceFile,
  createSourceFileTap,
  moveTakenMembersTo,
} from "@alloy-js/core";
import { JsonFileContext } from "../context/JsonFileContext.js";
import { JsonOutputSymbol } from "../symbols/json-symbol.js";
import { Reference } from "./reference.jsx";

export interface SourceFileProps {
  /** The path for this source file relative to the parent directory */
  path: string;

  /** The contents of the source file */
  children?: Children;
}

/**
 * Creates a JSON source file which defines a JSON value.
 *
 * @see {@link (JsonFileContext:variable)}
 * @see {@link @alloy-js/core#(MemberDeclarationContext:variable)}
 * @see {@link @alloy-js/core#(SourceFileContext:variable)}
 *
 */
export function SourceFile(props: SourceFileProps) {
  const jsonValueSym = new JsonOutputSymbol(props.path, undefined);
  moveTakenMembersTo(jsonValueSym);
  const fileContext: JsonFileContext = {
    symbol: jsonValueSym,
    path: props.path,
  };

  const SfTapper = createSourceFileTap((context) => {
    jsonValueSym.name = context.path;
  });

  return (
    <CoreSourceFile filetype="json" path={props.path} reference={Reference}>
      <SfTapper />
      <JsonFileContext.Provider value={fileContext}>
        {props.children}
      </JsonFileContext.Provider>
    </CoreSourceFile>
  );
}
