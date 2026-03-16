import { Children, refkey } from "@alloy-js/core";
import {
  DocComment,
  EnumDeclaration,
  EnumVariant,
  FunctionDeclaration,
  ImplBlock,
  MacroCall,
  MatchArm,
  MatchExpression,
  ModuleDirectory,
  Reference,
  SourceFile,
  TypeAlias,
} from "@alloy-js/rust";
import { stdCrate } from "../externals.js";

export const storeErrorKey = refkey();
export const resultAliasKey = refkey();

export interface ErrorModuleProps {
  children?: Children;
}

export function ErrorModule(props: ErrorModuleProps) {
  return (
    <ModuleDirectory path="error" pub>
      <SourceFile path="mod.rs">
        <DocComment>Error types for the key-value store.</DocComment>
        <EnumDeclaration
          name="StoreError"
          refkey={storeErrorKey}
          pub
          derives={["Debug", "Clone"]}
        >
          <EnumVariant name="NotFound" doc="The requested key was not found." />
          <EnumVariant
            name="StorageFull"
            doc="The store has reached its maximum capacity."
          />
          <EnumVariant
            name="SerializationError"
            doc="Failed to serialize or deserialize a value."
            kind="tuple"
            fields={["String"]}
          />
          <EnumVariant
            name="LockError"
            doc="Failed to acquire a lock on the store."
            kind="tuple"
            fields={["String"]}
          />
        </EnumDeclaration>

        <hbr />

        <ImplBlock type={storeErrorKey} trait={stdCrate.fmt.Display}>
          <FunctionDeclaration
            name="fmt"
            receiver="&self"
            parameters={[
              {
                name: "f",
                type: (
                  <>
                    {"&mut "}
                    <Reference refkey={stdCrate.fmt.Formatter} />
                    {"<'_>"}
                  </>
                ),
              },
            ]}
            returnType="std::fmt::Result"
          >
            <MatchExpression expression="self">
              <MatchArm pattern="Self::NotFound">
                <MacroCall name="write" args={["f", '"key not found"']} />
              </MatchArm>
              <MatchArm pattern="Self::StorageFull">
                <MacroCall name="write" args={["f", '"storage is full"']} />
              </MatchArm>
              <MatchArm pattern="Self::SerializationError(msg)">
                <MacroCall
                  name="write"
                  args={["f", '"serialization error: {}"', "msg"]}
                />
              </MatchArm>
              <MatchArm pattern="Self::LockError(msg)">
                <MacroCall
                  name="write"
                  args={["f", '"lock error: {}"', "msg"]}
                />
              </MatchArm>
            </MatchExpression>
          </FunctionDeclaration>
        </ImplBlock>

        <hbr />

        <DocComment>A specialized Result type for store operations.</DocComment>
        <TypeAlias
          name="Result"
          refkey={resultAliasKey}
          pub
          typeParameters={[{ name: "T" }]}
        >
          std::result::Result&lt;T, StoreError&gt;
        </TypeAlias>
      </SourceFile>
    </ModuleDirectory>
  );
}
