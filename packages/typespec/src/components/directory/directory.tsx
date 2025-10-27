import { Children, Scope, SourceDirectory } from "@alloy-js/core";
import { createDirectoryScope } from "../../symbols/factories.js";

export interface DirectoryProps {
    path: string;
    children?: Children;
};

export function Directory(props: DirectoryProps) {
    const scope = createDirectoryScope(props.path);
    return (
        <SourceDirectory path={props.path}>
            <Scope value={scope}>
                {props.children}
            </Scope>
        </SourceDirectory>
    );
}