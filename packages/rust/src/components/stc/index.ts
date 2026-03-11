import { stc } from "@alloy-js/core";
import { Attribute as AttributeComponent, DeriveAttribute as DeriveAttributeComponent } from "../attribute.js";
import { CargoTomlFile as CargoTomlFileComponent } from "../cargo-toml-file.js";
import { ConstDeclaration as ConstDeclarationComponent } from "../const-declaration.js";
import { CrateDirectory as CrateDirectoryComponent } from "../crate-directory.js";
import { DocComment as DocCommentComponent, ModuleDocComment as ModuleDocCommentComponent } from "../doc-comment.js";
import {
  EnumDeclaration as EnumDeclarationComponent,
  EnumVariant as EnumVariantComponent,
} from "../enum-declaration.js";
import { FunctionDeclaration as FunctionDeclarationComponent } from "../function-declaration.js";
import { ImplBlock as ImplBlockComponent } from "../impl-block.js";
import {
  MatchArm as MatchArmComponent,
  MatchExpression as MatchExpressionComponent,
} from "../match-expression.js";
import { ModuleDirectory as ModuleDirectoryComponent } from "../module-directory.js";
import { Parameters as ParametersComponent } from "../parameters.js";
import { Reference as ReferenceComponent } from "../reference.js";
import { SourceFile as SourceFileComponent } from "../source-file.js";
import {
  FieldInit as FieldInitComponent,
  StructExpression as StructExpressionComponent,
} from "../struct-expression.js";
import { Field as FieldComponent, StructDeclaration as StructDeclarationComponent } from "../struct-declaration.js";
import { TraitDeclaration as TraitDeclarationComponent } from "../trait-declaration.js";
import { TypeAlias as TypeAliasComponent } from "../type-alias.js";
import { TypeParameters as TypeParametersComponent } from "../type-parameters.js";
import { Value as ValueComponent } from "../value.js";

export const Attribute = stc(AttributeComponent);
export const CargoTomlFile = stc(CargoTomlFileComponent);
export const ConstDeclaration = stc(ConstDeclarationComponent);
export const CrateDirectory = stc(CrateDirectoryComponent);
export const DeriveAttribute = stc(DeriveAttributeComponent);
export const DocComment = stc(DocCommentComponent);
export const EnumDeclaration = stc(EnumDeclarationComponent);
export const EnumVariant = stc(EnumVariantComponent);
export const Field = stc(FieldComponent);
export const FunctionDeclaration = stc(FunctionDeclarationComponent);
export const ImplBlock = stc(ImplBlockComponent);
export const MatchArm = stc(MatchArmComponent);
export const MatchExpression = stc(MatchExpressionComponent);
export const ModuleDirectory = stc(ModuleDirectoryComponent);
export const ModuleDocComment = stc(ModuleDocCommentComponent);
export const Parameters = stc(ParametersComponent);
export const Reference = stc(ReferenceComponent);
export const SourceFile = stc(SourceFileComponent);
export const StructExpression = stc(StructExpressionComponent);
export const FieldInit = stc(FieldInitComponent);
export const StructDeclaration = stc(StructDeclarationComponent);
export const TraitDeclaration = stc(TraitDeclarationComponent);
export const TypeAlias = stc(TypeAliasComponent);
export const TypeParameters = stc(TypeParametersComponent);
export const Value = stc(ValueComponent);
