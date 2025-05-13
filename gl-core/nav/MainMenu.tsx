'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import globalNav from '../../public/globalNav.json';

type NavItem = {
  title: string;
  slug: string;
  children?: NavItem[];
};

type MainMenuProps = {
  onSelect?: () => void;
};

const shouldShow = (item: NavItem) => item.slug !== 'cv';

function renderTree(
  item: NavItem,
  currentSlug: string,
  onSelect?: () => void,
): React.ReactNode {
  if (!shouldShow(item)) return null;

  const isCurrent = item.slug === currentSlug;

  const label = isCurrent ? (
    <span style={{ opacity: 0.6, fontWeight: 500, cursor: 'default' }}>
      {item.title}
    </span>
  ) : (
    <Link
      href={`/${item.slug}`}
      onClick={onSelect}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {item.title}
    </Link>
  );

  return (
    <TreeItem key={item.slug} itemId={item.slug} label={label}>
      {item.children
        ?.filter(shouldShow)
        .map((child) => renderTree(child, currentSlug, onSelect))}
    </TreeItem>
  );
}

function getExpandedPathWithSelf(items: NavItem[], target: string): string[] {
  const path: string[] = [];

  function walk(nodes: NavItem[], parents: string[] = []): boolean {
    for (const node of nodes) {
      if (!shouldShow(node)) continue;

      const currentPath = [...parents, node.slug];
      if (node.slug === target) {
        path.push(...currentPath); // include self
        return true;
      }
      if (node.children && walk(node.children, currentPath)) {
        path.push(node.slug); // add parent to path
        return true;
      }
    }
    return false;
  }

  walk(items);
  return path;
}

export default function MainMenu({ onSelect }: MainMenuProps) {
  const pathname = usePathname();
  const currentSlug = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const expanded = getExpandedPathWithSelf(globalNav, currentSlug);

  return (
    <Box sx={{ minWidth: 240, maxWidth: 300, px: 1 }}>
      <SimpleTreeView
        aria-label="Main navigation"
        selectedItems={[currentSlug]}
        defaultExpandedItems={expanded}
      >
        {globalNav.flatMap(
          (section) =>
            section.children
              ?.filter(shouldShow)
              .map((item) => renderTree(item, currentSlug, onSelect)) || [],
        )}
      </SimpleTreeView>
    </Box>
  );
}
