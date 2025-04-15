import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';

type ShortcodeNode = {
  type: 'shortcode';
  name: string;
  attributes: Record<string, string>;
};

export const remarkShortcodes: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!node.children || node.children.length !== 1) return;

      const textNode = node.children[0];
      if (textNode.type !== 'text') return;

      const match = textNode.value.match(/^\[(\w+)(.*?)\]$/);
      if (!match) return;

      const [, name, attrs] = match;
      const attrObj: Record<string, string> = {};
      const attrRegex = /(\w+)="(.*?)"/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrs))) {
        attrObj[attrMatch[1]] = attrMatch[2];
      }

      const shortcode: ShortcodeNode = {
        type: 'shortcode',
        name,
        attributes: attrObj,
      };

      if (parent && typeof index === 'number') {
        parent.children.splice(index, 1, shortcode as any);
      }
    });
  };
};
