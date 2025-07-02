// core/gl-core/components/nav/ArrowMenu.tsx
'use client';

import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import { Advert, useDispatch, routeTo } from '../../../gl-core';
import { Icon, useIsMobile } from '../../../gl-core';
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
    return parentItem.children
      .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
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

  return (
    <Box
      id="arrowMenu"
      sx={{
        position: 'fixed',
        bottom: 12,
        left: isMobile ? '50%' : 'auto',
        right: isMobile ? 'auto' : 12,
        transform: isMobile ? 'translateX(-50%)' : 'none',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: '10px',
        backgroundColor: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(4px)',
        boxShadow: 2,
        minWidth: 'auto',
      }}
    >
      {showUp && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <IconButton color="primary" size="small" onClick={handleUp}>
            <Icon icon={parentItem?.icon || 'up'} />
          </IconButton>
          <Typography
            variant="caption"
            sx={{ fontSize: '0.6rem', textAlign: 'center' }}
          >
            {parentItem?.title}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 1 }}>
        {showLeft && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <IconButton color="primary" size="small" onClick={handleLeft}>
              <Icon icon={leftSibling?.icon || 'left'} />
            </IconButton>
            <Typography
              variant="caption"
              sx={{ fontSize: '0.6rem', textAlign: 'center' }}
            >
              {leftSibling?.title}
            </Typography>
          </Box>
        )}

        {showRight && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <IconButton color="primary" size="small" onClick={handleRight}>
              <Icon icon={rightSibling?.icon || 'right'} />
            </IconButton>
            <Typography
              variant="caption"
              sx={{ fontSize: '0.6rem', textAlign: 'center' }}
            >
              {rightSibling?.title}
            </Typography>
          </Box>
        )}
      </Box>

      {currentItem?.children?.filter((child) => child.type === 'folder')
        .length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          {currentItem.children
            .filter((child) => child.type === 'folder')
            .map((child) => (
              <Box
                key={child.slug}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => dispatch(routeTo(child.slug, router))}
                >
                  <Icon icon={child.icon || 'down'} />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{ fontSize: '0.6rem', textAlign: 'center' }}
                >
                  {child.title}
                </Typography>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
}
