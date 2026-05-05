import { Prose, code, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  pydanticModule,
  pydanticSettingsModule,
  typingModule,
} from "../src/builtins/python.js";
import * as py from "../src/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.jsx";

describe("PydanticClassDeclaration", () => {
  it("emits a pydantic model with BaseModel, fields, and Field import", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration name="User">
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="id"
              type="int"
            />
            <py.VariableDeclaration
              instanceVariable
              name="name"
              type="str"
              initializer={code`${pydanticModule["."].Field}(default="anon")`}
            />
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from pydantic import Field


        class User(BaseModel):
            id: int
            name: str = Field(default="anon")


      `,
    );
  });

  it("inherits from another pydantic model via bases", () => {
    const baseRef = refkey();
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.StatementList>
            <py.PydanticClassDeclaration name="User" refkey={baseRef}>
              <py.VariableDeclaration
                instanceVariable
                omitNone
                name="id"
                type="int"
              />
            </py.PydanticClassDeclaration>
            <py.PydanticClassDeclaration name="Admin" bases={[baseRef]}>
              <py.VariableDeclaration
                instanceVariable
                omitNone
                name="role"
                type="str"
              />
            </py.PydanticClassDeclaration>
          </py.StatementList>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel


        class User(BaseModel):
            id: int

        class Admin(User):
            role: str


      `,
    );
  });

  it("supports required, optional, Field default, and plain default", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration name="Item">
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="sku"
              type="str"
            />
            <py.VariableDeclaration
              instanceVariable
              name="notes"
              type={
                <py.UnionTypeExpression children={["str", "None"]} />
              }
            />
            <py.VariableDeclaration
              instanceVariable
              name="label"
              type="str"
              initializer={code`${pydanticModule["."].Field}(default="untitled")`}
            />
            <py.VariableDeclaration
              instanceVariable
              name="qty"
              type="int"
              initializer={1}
            />
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from pydantic import Field


        class Item(BaseModel):
            sku: str
            notes: str | None = None
            label: str = Field(default="untitled")
            qty: int = 1


      `,
    );
  });

  it("emits class docstring", () => {
    const doc = (
      <py.ClassDoc description={[<Prose>Payload for an API request.</Prose>]} />
    );
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration name="RequestBody" doc={doc}>
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="value"
              type="str"
            />
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel


        class RequestBody(BaseModel):
            """
            Payload for an API request.
            """

            value: str


      `,
    );
  });

  it("resolves refkey across files with pydantic imports", () => {
    const modelRef = refkey();
    const res = toSourceTextMultiple(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration name="User" refkey={modelRef}>
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="id"
              type="int"
            />
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
        <py.SourceFile path="service.py">
          <py.FunctionDeclaration
            name="load_user"
            returnType={modelRef}
            parameters={[{ name: "user_id", type: "int" }]}
          >
            {"return User(id=user_id)"}
          </py.FunctionDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    assertFileContents(res, {
      "models.py": `
        from pydantic import BaseModel


        class User(BaseModel):
            id: int

        `,
      "service.py": `
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from models import User


        def load_user(user_id: int) -> User:
            return User(id=user_id)

        `,
    });
  });

  it("emits model_config = ConfigDict(...) from modelConfig", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration
            name="User"
            modelConfig={{
              frozen: true,
              extra: "forbid",
              validateAssignment: true,
            }}
          >
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="id"
              type="int"
            />
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from pydantic import ConfigDict


        class User(BaseModel):
            model_config = ConfigDict(frozen=True, extra="forbid", validate_assignment=True)
            id: int


      `,
    );
  });

  it("imports SecretStr when used as a field type", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration name="Credentials">
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="token"
              type={pydanticModule["."].SecretStr}
            />
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from pydantic import SecretStr


        class Credentials(BaseModel):
            token: SecretStr


      `,
    );
  });

  it("emits arbitrary model_config via modelConfigExpression", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration
            name="M"
            modelConfigExpression={code`${pydanticModule["."].ConfigDict}(frozen=True, extra="allow")`}
          />
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from pydantic import ConfigDict


        class M(BaseModel):
            model_config = ConfigDict(frozen=True, extra="allow")


      `,
    );
  });

  it("supports RootModel as explicit bases entry", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration
            name="Tags"
            bases={[code`${pydanticModule["."].RootModel}[list[str]]`]}
          />
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import RootModel


        class Tags(RootModel[list[str]]):
            pass


      `,
    );
  });

  it("places Pydantic validators above classmethod", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration name="User">
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="name"
              type="str"
            />
            <py.ClassMethodDeclaration
              name="strip_name"
              decorators={[
                code`@${pydanticModule["."].field_validator}("name", mode="before")`,
              ]}
              parameters={[{ name: "value", type: "str" }]}
              returnType="str"
            >
              {"return value.strip()"}
            </py.ClassMethodDeclaration>
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from pydantic import field_validator


        class User(BaseModel):
            name: str
            @field_validator("name", mode="before")
            @classmethod
            def strip_name(cls, value: str) -> str:
                return value.strip()


      
      `,
    );
  });
});

describe("Pydantic ecosystem emitters", () => {
  it("typing module resolves Any and similar annotations", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.FunctionDeclaration
            name="identity"
            parameters={[{ name: "x", type: typingModule["."].Any }]}
            returnType={typingModule["."].Any}
          >
            {"return x"}
          </py.FunctionDeclaration>
        </py.SourceFile>,
      ],
      { externals: [typingModule] },
    );

    expect(res).toRenderTo(
      d`
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from typing import Any


        def identity(x: Any) -> Any:
            return x


      `,
    );
  });

  it("pydantic.types constrains field annotations", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration name="Score">
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="points"
              type={pydanticModule.types.PositiveInt}
            />
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from typing import TYPE_CHECKING

        if TYPE_CHECKING:
            from pydantic.types import PositiveInt


        class Score(BaseModel):
            points: PositiveInt


      `,
    );
  });

  it("postponed annotations support forward references in fields", () => {
    const res = toSourceText(
      [
        <py.SourceFile
          path="models.py"
          futureImports={<py.FutureStatement feature="annotations" />}
        >
          <py.PydanticClassDeclaration name="Node">
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="label"
              type="str"
            />
            <py.VariableDeclaration
              instanceVariable
              name="child"
              type={code`"Node" | None`}
            />
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from __future__ import annotations

        from pydantic import BaseModel


        class Node(BaseModel):
            label: str
            child: "Node" | None = None


      `,
    );
  });

  it("model_config can use pydantic.alias_generators", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration
            name="M"
            modelConfigExpression={code`${pydanticModule["."].ConfigDict}(alias_generator=${pydanticModule.alias_generators.to_camel})`}
          />
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from pydantic import ConfigDict
        from pydantic.alias_generators import to_camel


        class M(BaseModel):
            model_config = ConfigDict(alias_generator=to_camel)


      `,
    );
  });

  it("pydantic_settings exposes BaseSettings", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="config.py">
          <py.ClassDeclaration
            name="AppSettings"
            bases={[pydanticSettingsModule["."].BaseSettings]}
          />
        </py.SourceFile>,
      ],
      { externals: [pydanticSettingsModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic_settings import BaseSettings


        class AppSettings(BaseSettings):
            pass


      `,
    );
  });

  it("emits computed_field on an instance method", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration name="Square">
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="width"
              type="float"
            />
            <py.MethodDeclaration
              name="area"
              decorators={[code`@${pydanticModule["."].computed_field}`]}
              returnType="float"
            >
              {"return self.width ** 2"}
            </py.MethodDeclaration>
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from pydantic import computed_field


        class Square(BaseModel):
            width: float
            @computed_field
            def area(self) -> float:
                return self.width ** 2


      
      `,
    );
  });

  it("emits model_validator above classmethod", () => {
    const res = toSourceText(
      [
        <py.SourceFile path="models.py">
          <py.PydanticClassDeclaration name="Bag">
            <py.VariableDeclaration
              instanceVariable
              omitNone
              name="items"
              type="list"
            />
            <py.ClassMethodDeclaration
              name="ensure_items"
              decorators={[
                code`@${pydanticModule["."].model_validator}(mode="before")`,
              ]}
              parameters={[{ name: "data", type: "dict" }]}
              returnType="dict"
            >
              {"return data"}
            </py.ClassMethodDeclaration>
          </py.PydanticClassDeclaration>
        </py.SourceFile>,
      ],
      { externals: [pydanticModule] },
    );

    expect(res).toRenderTo(
      d`
        from pydantic import BaseModel
        from pydantic import model_validator


        class Bag(BaseModel):
            items: list
            @model_validator(mode="before")
            @classmethod
            def ensure_items(cls, data: dict) -> dict:
                return data


      
      `,
    );
  });
});
