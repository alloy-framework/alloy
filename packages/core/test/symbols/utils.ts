import { Refkey } from "../../src/refkey.js";
import {
  OutputScopeFlags,
  OutputSymbolFlags,
} from "../../src/symbols/flags.js";

type ScopeRecords = Record<string, ScopeDescriptor>;
type SymbolRecords = Record<string, SymbolDescriptor>;

interface ScopeDescriptor {
  flags?: OutputScopeFlags;
  scopes?: ScopeRecords;
  symbols: SymbolRecords;
}

interface SymbolDescriptor {
  refkey?: Refkey;
  flags?: OutputSymbolFlags;
  instanceMembers?: SymbolRecords;
  staticMembers?: SymbolRecords;
}
