import { stc } from "@alloy-js/core";
import { AssociatedType as AssociatedTypeComponent } from "../associated-type.js";
import {
  Attribute as AttributeComponent,
  DeriveAttribute as DeriveAttributeComponent,
  InnerAttribute as InnerAttributeComponent,
} from "../attribute.js";
import { AwaitExpression as AwaitExpressionComponent } from "../await-expression.js";
import { BlockExpression as BlockExpressionComponent } from "../block-expression.js";
import { BreakExpression as BreakExpressionComponent } from "../break-expression.js";
import { CargoTomlFile as CargoTomlFileComponent } from "../cargo-toml-file.js";
import { ClosureExpression as ClosureExpressionComponent } from "../closure-expression.js";
import { ConstDeclaration as ConstDeclarationComponent } from "../const-declaration.js";
import { ContinueExpression as ContinueExpressionComponent } from "../continue-expression.js";
import { CrateDirectory as CrateDirectoryComponent } from "../crate-directory.js";
import {
  DocComment as DocCommentComponent,
  ModuleDocComment as ModuleDocCommentComponent,
} from "../doc-comment.js";
import {
  EnumDeclaration as EnumDeclarationComponent,
  EnumVariant as EnumVariantComponent,
} from "../enum-declaration.js";
import { ForExpression as ForExpressionComponent } from "../for-expression.js";
import { FunctionCallExpression as FunctionCallExpressionComponent } from "../function-call-expression.js";
import { FunctionDeclaration as FunctionDeclarationComponent } from "../function-declaration.js";
import {
  ElseClause as ElseClauseComponent,
  ElseIfClause as ElseIfClauseComponent,
  IfExpression as IfExpressionComponent,
} from "../if-expression.js";
import { ImplBlock as ImplBlockComponent } from "../impl-block.js";
import { LetBinding as LetBindingComponent } from "../let-binding.js";
import { LoopExpression as LoopExpressionComponent } from "../loop-expression.js";
import { MacroCall as MacroCallComponent } from "../macro-call.js";
import {
  MatchArm as MatchArmComponent,
  MatchExpression as MatchExpressionComponent,
} from "../match-expression.js";
import {
  MethodChainCall as MethodChainCallComponent,
  MethodChainExpression as MethodChainExpressionComponent,
} from "../method-chain-expression.js";
import { ModuleDirectory as ModuleDirectoryComponent } from "../module-directory.js";
import { Parameters as ParametersComponent } from "../parameters.js";
import { Reference as ReferenceComponent } from "../reference.js";
import { ReturnExpression as ReturnExpressionComponent } from "../return-expression.js";
import { SourceFile as SourceFileComponent } from "../source-file.js";
import { StaticDeclaration as StaticDeclarationComponent } from "../static-declaration.js";
import {
  Field as FieldComponent,
  StructDeclaration as StructDeclarationComponent,
} from "../struct-declaration.js";
import {
  FieldInit as FieldInitComponent,
  StructExpression as StructExpressionComponent,
} from "../struct-expression.js";
import { TraitDeclaration as TraitDeclarationComponent } from "../trait-declaration.js";
import { TryExpression as TryExpressionComponent } from "../try-expression.js";
import { TypeAlias as TypeAliasComponent } from "../type-alias.js";
import { TypeParameters as TypeParametersComponent } from "../type-parameters.js";
import { UnsafeBlock as UnsafeBlockComponent } from "../unsafe-block.js";
import { Value as ValueComponent } from "../value.js";
import { WhileExpression as WhileExpressionComponent } from "../while-expression.js";

export const Attribute = stc(AttributeComponent);
export const InnerAttribute = stc(InnerAttributeComponent);
export const AssociatedType = stc(AssociatedTypeComponent);
export const AwaitExpression = stc(AwaitExpressionComponent);
export const BlockExpression = stc(BlockExpressionComponent);
export const CargoTomlFile = stc(CargoTomlFileComponent);
export const ClosureExpression = stc(ClosureExpressionComponent);
export const ConstDeclaration = stc(ConstDeclarationComponent);
export const StaticDeclaration = stc(StaticDeclarationComponent);
export const ContinueExpression = stc(ContinueExpressionComponent);
export const CrateDirectory = stc(CrateDirectoryComponent);
export const BreakExpression = stc(BreakExpressionComponent);
export const DeriveAttribute = stc(DeriveAttributeComponent);
export const DocComment = stc(DocCommentComponent);
export const EnumDeclaration = stc(EnumDeclarationComponent);
export const EnumVariant = stc(EnumVariantComponent);
export const Field = stc(FieldComponent);
export const FunctionDeclaration = stc(FunctionDeclarationComponent);
export const ForExpression = stc(ForExpressionComponent);
export const LoopExpression = stc(LoopExpressionComponent);
export const MacroCall = stc(MacroCallComponent);
export const MethodChainExpression = stc(MethodChainExpressionComponent);
export const MethodChainCall = stc(MethodChainCallComponent);
export const IfExpression = stc(IfExpressionComponent);
export const ElseIfClause = stc(ElseIfClauseComponent);
export const ElseClause = stc(ElseClauseComponent);
export const FunctionCallExpression = stc(FunctionCallExpressionComponent);
export const ImplBlock = stc(ImplBlockComponent);
export const LetBinding = stc(LetBindingComponent);
export const MatchArm = stc(MatchArmComponent);
export const MatchExpression = stc(MatchExpressionComponent);
export const ModuleDirectory = stc(ModuleDirectoryComponent);
export const ModuleDocComment = stc(ModuleDocCommentComponent);
export const Parameters = stc(ParametersComponent);
export const Reference = stc(ReferenceComponent);
export const ReturnExpression = stc(ReturnExpressionComponent);
export const SourceFile = stc(SourceFileComponent);
export const StructExpression = stc(StructExpressionComponent);
export const FieldInit = stc(FieldInitComponent);
export const StructDeclaration = stc(StructDeclarationComponent);
export const TraitDeclaration = stc(TraitDeclarationComponent);
export const TryExpression = stc(TryExpressionComponent);
export const TypeAlias = stc(TypeAliasComponent);
export const TypeParameters = stc(TypeParametersComponent);
export const UnsafeBlock = stc(UnsafeBlockComponent);
export const Value = stc(ValueComponent);
export const WhileExpression = stc(WhileExpressionComponent);
