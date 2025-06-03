import {
  Block,
  computed,
  Declaration as CoreDeclaration,
  For,
  MemberScope,
  Name,
  OutputSymbolFlags,
  Show,
  useBinder,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { TSOutputSymbol, useTSScope } from "../symbols/index.js";
import { BaseDeclarationProps } from "./Declaration.js";
import { EnumMember } from "./EnumMember.jsx";
import { JSDoc } from "./JSDoc.jsx";
export interface EnumDeclarationProps extends BaseDeclarationProps {
  /**
   * A JS object representing the enum member names and values.
   */
  jsValue?: Record<string, string | number>;
}

/**
 * A TypeScript enum declaration.
 */
export function EnumDeclaration(props: EnumDeclarationProps) {
  const name = useTSNamePolicy().getName(props.name, "enum");
  const binder = useBinder();
  const scope = useTSScope();
  const sym = new TSOutputSymbol(name, {
    binder,
    scope,
    refkeys: props.refkey,
    default: props.default,
    export: props.export,
    flags: OutputSymbolFlags.StaticMemberContainer,
    metadata: props.metadata,
  });

  const valueEntries = computed(() => Object.entries(props.jsValue ?? {}));
  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <CoreDeclaration symbol={sym}>
        {props.export ? "export " : ""}
        {props.default ? "default " : ""}enum <Name />{" "}
        <MemberScope owner={sym}>
          <Block>
            <For each={valueEntries} comma hardline enderPunctuation>
              {([name, value]) => <EnumMember name={name} jsValue={value} />}
            </For>
            {props.children && (
              <>
                {valueEntries.value.length > 0 && <hbr />}
                {props.children}
              </>
            )}
          </Block>
        </MemberScope>
      </CoreDeclaration>
    </>
  );
}
