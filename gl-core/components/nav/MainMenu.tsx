'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import globalNav from '../../../public/globalNav.json';

type NavItem = {
  title: string;
  slug: string;
  type: 'file' | 'folder';
  children?: NavItem[];
};

type MainMenuProps = {
  onSelect?: () => void;
};

const shouldShow = (item: NavItem) => item.slug !== '/cv';

function renderTree(
  item: NavItem,
  currentPath: string,
  onSelect?: () => void,
): React.ReactNode {
  if (!shouldShow(item)) return null;

  const isCurrent = item.slug === currentPath;

  const label = isCurrent ? (
    <span style={{ opacity: 0.6, fontWeight: 500, cursor: 'default' }}>
      {item.title}
    </span>
  ) : (
    <Link
      href={item.slug}
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
        .map((child) => renderTree(child, currentPath, onSelect))}
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
        path.push(...currentPath);
        return true;
      }
      if (node.children && walk(node.children, currentPath)) {
        path.push(node.slug);
        return true;
      }
    }
    return false;
  }

  walk(items);
  return path;
}

export default function MainMenu({ onSelect }: MainMenuProps) {
  const pathname = usePathname(); // e.g. "/flash"
  const currentPath = pathname;
  const expanded = getExpandedPathWithSelf(globalNav, currentPath);

  return (
    <Box sx={{ minWidth: 240, maxWidth: 300, px: 1 }}>
      <SimpleTreeView
        aria-label="Main navigation"
        selectedItems={[currentPath]}
        defaultExpandedItems={expanded}
      >
        {globalNav.flatMap(
          (section) =>
            section.children
              ?.filter(shouldShow)
              .map((item) => renderTree(item, currentPath, onSelect)) || [],
        )}
      </SimpleTreeView>
    </Box>
  );
}
