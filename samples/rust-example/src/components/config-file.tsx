import { Children, refkey } from "@alloy-js/core";
import {
  Attribute,
  ConstDeclaration,
  DocComment,
  Field,
  FieldInit,
  FunctionDeclaration,
  ImplBlock,
  SourceFile,
  StructExpression,
  StructDeclaration,
} from "@alloy-js/rust";

export const configKey = refkey();
export const maxEntriesKey = refkey();
export const defaultTtlSecsKey = refkey();

export interface ConfigFileProps {
  children?: Children;
}

export function ConfigFile(props: ConfigFileProps) {
  return (
    <SourceFile path="config.rs">
      <DocComment>Configuration for the key-value store.</DocComment>

      <ConstDeclaration
        name="MAX_ENTRIES"
        refkey={maxEntriesKey}
        pub
        type="usize"
      >
        10_000
      </ConstDeclaration>

      <hbr />

      <ConstDeclaration
        name="DEFAULT_TTL_SECS"
        refkey={defaultTtlSecsKey}
        pub
        type="u64"
      >
        3600
      </ConstDeclaration>

      <hbr />

      <DocComment>
        {`Configuration options for initializing a Store.\n\nUse the builder methods to customize behavior.`}
      </DocComment>
      <StructDeclaration
        name="Config"
        refkey={configKey}
        pub
        derives={["Debug", "Clone"]}
      >
        <Field name="max_capacity" pub type="usize" />
        <Field
          name="default_ttl"
          pub
          type="Option<std::time::Duration>"
        />
        <Field name="enable_eviction" pub type="bool" />
        <Field name="name" pub type="String" />
      </StructDeclaration>

      <hbr />

      <ImplBlock type={configKey}>
        <DocComment>Creates a new Config with sensible defaults.</DocComment>
        <FunctionDeclaration name="new" pub receiver="none" returnType="Self">
          <StructExpression type="Self">
            <FieldInit name="max_capacity">MAX_ENTRIES</FieldInit>
            <FieldInit name="default_ttl">Some(Duration::from_secs(DEFAULT_TTL_SECS))</FieldInit>
            <FieldInit name="enable_eviction">true</FieldInit>
            <FieldInit name="name">String::from("default")</FieldInit>
          </StructExpression>
        </FunctionDeclaration>

        <hbr />

        <DocComment>Sets the maximum number of entries.</DocComment>
        <Attribute name="must_use" />
        <FunctionDeclaration
          name="with_max_capacity"
          pub
          receiver="self"
          parameters={[{ name: "capacity", type: "usize" }]}
          returnType="Self"
        >
          <StructExpression type="Self" spread="self">
            <FieldInit name="max_capacity">capacity</FieldInit>
          </StructExpression>
        </FunctionDeclaration>

        <hbr />

        <DocComment>Sets the default TTL for entries.</DocComment>
        <Attribute name="must_use" />
        <FunctionDeclaration
          name="with_ttl"
          pub
          receiver="self"
          parameters={[
            { name: "ttl", type: "std::time::Duration" },
          ]}
          returnType="Self"
        >
          <StructExpression type="Self" spread="self">
            <FieldInit name="default_ttl">Some(ttl)</FieldInit>
          </StructExpression>
        </FunctionDeclaration>

        <hbr />

        <DocComment>Disables automatic eviction of expired entries.</DocComment>
        <Attribute name="must_use" />
        <FunctionDeclaration
          name="disable_eviction"
          pub
          receiver="self"
          returnType="Self"
        >
          <StructExpression type="Self" spread="self">
            <FieldInit name="enable_eviction">false</FieldInit>
          </StructExpression>
        </FunctionDeclaration>

        <hbr />

        <DocComment>Sets the name of this store instance.</DocComment>
        <Attribute name="must_use" />
        <FunctionDeclaration
          name="with_name"
          pub
          receiver="self"
          parameters={[{ name: "name", type: "&str" }]}
          returnType="Self"
        >
          <StructExpression type="Self" spread="self">
            <FieldInit name="name">name.to_owned()</FieldInit>
          </StructExpression>
        </FunctionDeclaration>
      </ImplBlock>
    </SourceFile>
  );
}
