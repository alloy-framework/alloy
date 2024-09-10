import { code } from "@alloy-js/core";
export function Frontmatter(props) {
    return code `
    ---
    title: ${props.title}
    ---

    import { Tabs, TabItem } from '@astrojs/starlight/components';
    import { Code } from '@astrojs/starlight/components';
    import { Badge } from '@astrojs/starlight/components';
    
    
  `;
}
//# sourceMappingURL=Frontmatter.js.map