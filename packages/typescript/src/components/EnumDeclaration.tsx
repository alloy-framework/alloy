import {
  Block,
  computed,
  Declaration as CoreDeclaration,
  For,
  Name,
  Show,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { createTypeAndValueSymbol } from "../symbols/index.js";
import { CommonDeclarationProps } from "./Declaration.js";
import { EnumMember } from "./EnumMember.jsx";
import { JSDoc } from "./JSDoc.jsx";
import { MemberScope } from "./MemberScope.jsx";
export interface EnumDeclarationProps extends CommonDeclarationProps {
  /**
   * A JS object representing the enum member names and values.
   */
  jsValue?: Record<string, string | number>;
}

/**
 * A TypeScript enum declaration.
 */
export function EnumDeclaration(props: EnumDeclarationProps) {
  const sym = createTypeAndValueSymbol(props.name, {
    refkeys: props.refkey,
    default: props.default,
    export: props.export,
    metadata: props.metadata,
    namePolicy: useTSNamePolicy().for("enum"),
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
        <MemberScope ownerSymbol={sym}>
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
