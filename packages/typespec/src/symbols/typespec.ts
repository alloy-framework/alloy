import { Namekey, OutputDeclarationSpace, OutputMemberSpace, OutputSpace, OutputSymbol, OutputSymbolOptions } from "@alloy-js/core";
import { NamespaceSymbol } from "./namespace.js";
import { TypeSpecScope } from "../scopes/typespec.js";

// Need to think over the options here
export interface TypeSpecSymbolOptions extends OutputSymbolOptions {
    /**
     * Whether the value held by this symbol could be null. Specifically `foo?: string;`
     */
    // isOptional?: boolean;
};

export type TypeSpecSymbolKinds = 
    | "symbol"
    | "field"
    | "model"
    | "enum"
    | "interface"
    | "union"
    | "alias";

export class TypeSpecSymbol extends OutputSymbol {

    constructor(
        name: string | Namekey,
        spaces: OutputSpace[] | OutputSpace | undefined,
        options: TypeSpecSymbolOptions = {},
    ) {
        super(name, spaces, options);
    }

    // TODO: this class is very incomplete

    copy(): OutputSymbol {
        throw new Error("Method not implemented.");
    }

    get enclosingNamespace(): NamespaceSymbol | undefined {
        if (this.spaces.length === 0) {
        return undefined;
        }

        // todo: probably need to validate that a symbol can't belong to spaces in
        // multiple namespaces.
        const firstSpace = this.spaces[0];

        if (firstSpace instanceof OutputMemberSpace) {
        // this symbol is a member of something, so get the enclosing namespace from
        // the symbol.

        if (firstSpace.symbol.constructor.name === "NamespaceSymbol") {
            // this is a namespace symbol, so return the namespace symbol itself.
            // can't use instanceof here due to circular reference issues.
            return firstSpace.symbol as NamespaceSymbol;
        }

        return (firstSpace.symbol as TypeSpecSymbol).enclosingNamespace;
        } else if (firstSpace instanceof OutputDeclarationSpace) {
        // this symbol is in a lexical scope, so get the namespace symbol from the
        // scope.
        return (firstSpace.scope as TypeSpecScope).enclosingNamespace;
        }
        throw new Error("No place to get namespace symbol from");

        // return undefined;
    }
    
}