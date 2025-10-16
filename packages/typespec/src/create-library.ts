
// import { LibrarySymbolReference } from "@alloy-js/core";
// import {} from "./symbols/named-type.js";


// export interface MemberDescriptor {
//   kind: string;
//   type?: LibrarySymbolReference | (() => LibrarySymbolReference);
// }

// export interface NamedTypeDescriptor<M> {
//   kind: string;
//   members: M;
// }
// export interface ClassDescriptor<M> extends NamedTypeDescriptor<M> {
//   kind: "class";
// }

// export interface PropertyDescriptor extends MemberDescriptor {
//   kind: "property";
// }

// export interface InterfaceDescriptor<M> extends NamedTypeDescriptor<M> {
//   kind: "interface";
// }

// export interface EnumDescriptor<M> extends NamedTypeDescriptor<M> {
//   kind: "enum";
// }

// export interface StructDescriptor<M> extends NamedTypeDescriptor<M> {
//   kind: "struct";
// }

// export interface RecordDescriptor<M> extends NamedTypeDescriptor<M> {
//   kind: "record";
// }

// export interface GenericDescriptor {
//   kind: "generic";
// }

// export type Descriptor =
//   | FieldDescriptor
//   | PropertyDescriptor
//   | NamespaceDescriptor<any>
//   | ClassDescriptor<any>
//   | InterfaceDescriptor<any>
//   | EnumDescriptor<any>
//   | StructDescriptor<any>
//   | RecordDescriptor<any>
//   | GenericDescriptor;


// export type ResolveDescriptor<D> =
//   D extends NamedTypeDescriptor<infer M> ?
//     LibrarySymbolReference & { [K in keyof M]: ResolveDescriptor<M[K]> }
//   : LibrarySymbolReference;

// export type LibraryFrom<T> = {
//   [K in keyof T]: ResolveDescriptor<T[K]>;
// } & LibrarySymbolReference;

// export function createLibrary<T extends Record<string, Descriptor>>(
//   rootNs: string,
//   props: T,
// ): LibraryFrom<T> {
//     // WIP
//     return undefined as any;
// }