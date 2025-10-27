import { OutputScope, OutputScopeOptions } from "@alloy-js/core";


export interface DirectoryScopeOptions extends OutputScopeOptions {
}

export class DirectoryScope extends OutputScope {
    get path() {
        return this.#path;
    }
    #path: string;

    constructor(path: string, parent?: DirectoryScope, options?: DirectoryScopeOptions) {
        super(path, parent, options);
        this.#path = path;
    }
}