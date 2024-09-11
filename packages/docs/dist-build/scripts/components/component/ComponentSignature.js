import { IndentContext, stc, useContext } from "@alloy-js/core";
export function ComponentSignature(props) {
    let paramHelp = "";
    let stcParamHelp = "";
    if (props.component.componentProps) {
        const propType = props.component.componentProps;
        const allParamHelp = propType.members
            .filter((prop) => prop.name !== "children")
            .map(propHelp);
        if (allParamHelp.join(" ").length > 80) {
            paramHelp = "\n    " + allParamHelp.join("\n    ") + "\n";
        }
        else {
            paramHelp = allParamHelp.join(" ");
        }
        const allStcParamHelp = propType.members
            .filter((prop) => prop.name !== "children")
            .map(stcPropHelp);
        if (allStcParamHelp.join(" ").length > 80) {
            stcParamHelp = "\n    " + allStcParamHelp.join(",\n    ") + "\n";
        }
        else {
            stcParamHelp = allStcParamHelp.join(", ");
        }
    }
    const name = props.component.componentFunction.name;
    const currentIndent = useContext(IndentContext);
    return stc(IndentContext.Provider)({
        value: { ...currentIndent, indent: "    " },
    }).code `
      <Tabs syncKey="component-style">
        <TabItem label="jsx">
          <Code code={\`import { ${name} } from "@alloy-js/core" 

          <${name} ${paramHelp}>
          \t{children}
          </${name}>\`} lang="tsx" />
        </TabItem>
        <TabItem label="stc">
          <Code code={\`import { ${name} } from "@alloy-js/core/stc" 

          ${name}({ ${stcParamHelp}}).children(children)\` } lang="ts" />
        </TabItem>
      </Tabs>


    `;
}
function propHelp(prop) {
    if (prop.propertyTypeExcerpt.text === "boolean") {
        return `${prop.name}`;
    }
    else if (prop.propertyTypeExcerpt.text === "string") {
        return `${prop.name}="string"`;
    }
    else if (prop.propertyTypeExcerpt.text === "number") {
        return `${prop.name}={number}`;
    }
    else {
        return `${prop.name}={${prop.propertyTypeExcerpt.text}}`;
    }
}
function stcPropHelp(prop) {
    return `${prop.name}: ${prop.propertyTypeExcerpt.text}`;
}
//# sourceMappingURL=ComponentSignature.js.map