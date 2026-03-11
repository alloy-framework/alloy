import { stc } from "@alloy-js/core";
import { Attribute as AttributeComponent, DeriveAttribute as DeriveAttributeComponent } from "../attribute.js";
import { ConstDeclaration as ConstDeclarationComponent } from "../const-declaration.js";
import { DocComment as DocCommentComponent } from "../doc-comment.js";
import {
  EnumDeclaration as EnumDeclarationComponent,
  EnumVariant as EnumVariantComponent,
} from "../enum-declaration.js";
import { FunctionDeclaration as FunctionDeclarationComponent } from "../function-declaration.js";
import { ImplBlock as ImplBlockComponent } from "../impl-block.js";
import { Field as FieldComponent, StructDeclaration as StructDeclarationComponent } from "../struct-declaration.js";
import { TraitDeclaration as TraitDeclarationComponent } from "../trait-declaration.js";
import { TypeAlias as TypeAliasComponent } from "../type-alias.js";

export const Attribute = stc(AttributeComponent);
export const ConstDeclaration = stc(ConstDeclarationComponent);
export const DeriveAttribute = stc(DeriveAttributeComponent);
export const DocComment = stc(DocCommentComponent);
export const EnumDeclaration = stc(EnumDeclarationComponent);
export const EnumVariant = stc(EnumVariantComponent);
export const Field = stc(FieldComponent);
export const FunctionDeclaration = stc(FunctionDeclarationComponent);
export const ImplBlock = stc(ImplBlockComponent);
export const StructDeclaration = stc(StructDeclarationComponent);
export const TraitDeclaration = stc(TraitDeclarationComponent);
export const TypeAlias = stc(TypeAliasComponent);
