import { SourceDirectoryProps as CoreSourceDirectoryProps,SourceDirectory as CoreSourceDirectory, Scope, SourceDirectoryContext, useContext } from "@alloy-js/core";

export interface SourceDirectoryProps extends CoreSourceDirectoryProps {
}

export function SourceDirectory(props: SourceDirectoryProps) {
    const directoryContext = useContext(SourceDirectoryContext)!;
    return (
        <CoreSourceDirectory path={props.path}>
            <Scope value={}>
                {props.children}
            </Scope>
            {props.children}
        </CoreSourceDirectory>
    )
}