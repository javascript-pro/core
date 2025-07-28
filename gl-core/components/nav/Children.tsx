// core/gl-core/components/nav/Children.tsx
'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import globalNav from '../../../public/globalNav.json';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { Icon } from '../../../gl-core';

type NavItem = {
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  children?: NavItem[];
};

// Recursive lookup of node by slug
function findNode(items: NavItem[], slug: string): NavItem | null {
  for (const item of items) {
    if (item.slug === slug) return item;
    if (item.children) {
      const found = findNode(item.children, slug);
      if (found) return found;
    }
  }
  return null;
}

export default function Children() {
  const pathname = usePathname();
  const router = useRouter();

  // Find current node
  const currentNode = React.useMemo(
    () => findNode(globalNav as NavItem[], pathname),
    [pathname],
  );

  // If current node has children, sort them
  const children = React.useMemo(() => {
    if (!currentNode || !currentNode.children) return null;
    if (currentNode.children.length === 0) return null;
    return [...currentNode.children].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );
  }, [currentNode]);

  if (!children || children.length === 0) return null;

  return (
    <Box>
      <List dense disablePadding>
        {children.map((child) => {
          const isCurrent = child.slug === pathname;
          return (
            <ListItemButton
              key={child.slug}
              disabled={isCurrent}
              onClick={() => {
                if (!isCurrent) router.push(child.slug);
              }}
            >
              <ListItemIcon>
                <Icon icon={child.icon as any} />
              </ListItemIcon>
              <ListItemText
                primary={child.title}
                // secondary={child.description || undefined}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
