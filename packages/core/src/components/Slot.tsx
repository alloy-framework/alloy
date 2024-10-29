import { OutputSymbol } from "../binder.js";
import { Children } from "../jsx-runtime.js";
import { isRefkey, refkey, Refkey } from "../refkey.js";

export interface SlotProps {
  id: string;
  phase: "wrap" | "before" | "after";
  refkey?: Refkey;
  symbol?: OutputSymbol;
  children?: Children;
}

export function Slot(props: SlotProps) {
  const slotContent = getSlotContent(props);
}

export function slot(id: string, refkey: Refkey | undefined, children: Children) {
  return <Slot id={id} refkey={refkey} phase="wrap">
    <Slot id={id} refkey={refkey} phase="before" />{children}<Slot id={id} refkey={refkey} phase="after" />
  </Slot>
}

interface GetSlotContentOptions {
  id: string;
  phase: "wrap" | "before" | "after";
  refkey?: Refkey;
}

function getSlotContent(options: GetSlotContentOptions) {
  const hooks = [];
  for ()
}

type Hook = RenameHook;

interface HookBase {
  kind: string;
}

interface RenameHook extends HookBase {
  kind: "rename",
  getName(oldName: string): string;
}

const RefkeyHooks = new Map<Refkey, Hook[]>();
const SymbolHooks = new Map<OutputSymbol, Hook[]>();
const SlotHooks = new Map<string, Hook[]>();

export function rename(
  target: Refkey | OutputSymbol | string,
  name: string | ((oldName: string) => string)
) {
  if (typeof name === "string") {
    const fixedName = name;
    name = () => fixedName;
  }

  if (isRefkey(target)) {
    RefkeyHooks.set(target, [{
      kind: "rename",
      getName: name
    }]);
  }
}