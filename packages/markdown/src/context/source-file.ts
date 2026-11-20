import { createContext } from "@alloy-js/core";
import GithubSlugger from "github-slugger";

export interface MarkdownFileContext {
  slugger: GithubSlugger;
  ids: Set<string>;
}

export const MarkdownFileContext = createContext<MarkdownFileContext>();
