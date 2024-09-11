import { code } from "@alloy-js/core";

export interface FrontmatterProps {
  title: string;
}

export function Frontmatter(props: FrontmatterProps) {
  return code`
    ---
    title: ${props.title}
    ---

    import { Tabs, TabItem } from '@astrojs/starlight/components';
    import { Code } from '@astrojs/starlight/components';
    import { Badge } from '@astrojs/starlight/components';
    
    
  `;
}
