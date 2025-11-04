'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import { useDispatch, routeTo } from '../../../gl-core';
import { useIsMobile } from '../../../gl-core';
import globalNav from '../../../public/globalNav.json';

function normalizeSlug(slug: string): string {
  return slug.replace(/\/+$/, '');
}

function findNavItemBySlug(nav: any[], slug: string): any | null {
  for (const item of nav) {
    if (normalizeSlug(item.slug) === slug) return item;
    if (item.children) {
      const match = findNavItemBySlug(item.children, slug);
      if (match) return match;
    }
  }
  return null;
}

function findParentBySlug(
  nav: any[],
  slug: string,
  parent: any = null,
): any | null {
  for (const item of nav) {
    if (normalizeSlug(item.slug) === slug) return parent;
    if (item.children) {
      const found = findParentBySlug(item.children, slug, item);
      if (found) return found;
    }
  }
  return null;
}

export default function ArrowMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();
  const pathname = normalizeSlug(usePathname());

  const currentItem = React.useMemo(() => {
    return findNavItemBySlug(globalNav, pathname);
  }, [pathname]);

  const parentItem = React.useMemo(() => {
    return findParentBySlug(globalNav, pathname);
  }, [pathname]);

  const siblings = React.useMemo(() => {
    if (!parentItem?.children) return [];
    return parentItem.children.sort(
      (a, b) => (a.order ?? 9999) - (b.order ?? 9999),
    );
  }, [parentItem]);

  const currentIndex = siblings.findIndex(
    (child: any) => normalizeSlug(child.slug) === pathname,
  );
  const leftSibling = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const rightSibling =
    currentIndex >= 0 && currentIndex < siblings.length - 1
      ? siblings[currentIndex + 1]
      : null;

  const showUp = !!parentItem;
  const showLeft = !!leftSibling;
  const showRight = !!rightSibling;

  const handleUp = () => {
    if (parentItem) dispatch(routeTo(parentItem.slug, router));
  };

  const handleLeft = () => {
    if (leftSibling) dispatch(routeTo(leftSibling.slug, router));
  };

  const handleRight = () => {
    if (rightSibling) dispatch(routeTo(rightSibling.slug, router));
  };

  const upLabel = parentItem?.slug === '/' ? 'Home' : parentItem?.title || '↑';

  return (
    <Box id="arrowMenu">
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {showLeft && (
          <Typography
            variant="caption"
            sx={{ fontSize: '0.75rem', cursor: 'pointer', mt: 1 }}
            onClick={handleLeft}
          >
            ← {leftSibling?.title}
          </Typography>
        )}
        {showUp && (
          <Typography
            variant="caption"
            sx={{ fontSize: '0.75rem', cursor: 'pointer' }}
            onClick={handleUp}
          >
            ↑ {upLabel}
          </Typography>
        )}
        {showRight && (
          <Typography
            variant="caption"
            sx={{ fontSize: '0.75rem', cursor: 'pointer', mt: 1 }}
            onClick={handleRight}
          >
            {rightSibling?.title} →
          </Typography>
        )}
      </Box>

      {currentItem?.children?.filter((child: any) => child.type === 'folder')
        .length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          {currentItem.children
            .filter((child) => child.type === 'folder')
            .map((child) => (
              <Typography
                key={child.slug}
                variant="caption"
                sx={{ fontSize: '0.75rem', cursor: 'pointer' }}
                onClick={() => dispatch(routeTo(child.slug, router))}
              >
                ↓ {child.title}
              </Typography>
            ))}
        </Box>
      )}
    </Box>
  );
}
