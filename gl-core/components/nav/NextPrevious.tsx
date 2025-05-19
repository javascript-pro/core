'use client';

import * as React from 'react';
import navJSON from '../../../public/globalNav.json';
import { usePathname, useRouter } from 'next/navigation';
import { Box, useTheme, Typography } from '@mui/material';
import { MightyButton, ShareThis } from '../../../gl-core';

type NavItem = {
  title: string;
  description?: string;
  icon?: string;
  slug: string;
  type: 'file' | 'folder';
  order: number;
  parent?: string | null;
};

type NavButton = {
  label: string;
  title: string;
  description: string;
  disabled: boolean;
  visible: boolean;
  slug?: string;
};

export default function NextPrevious() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const isHome = pathname === '/';

  const obj: {
    home: NavButton;
    this: NavButton;
    up: NavButton;
    prev: NavButton;
    next: NavButton;
  } = {
    home: {
      label: 'Home',
      title: 'Reset',
      description: 'Back to the start',
      disabled: isHome,
      visible: !isHome,
    },
    this: {
      label: 'This',
      title: 'Title',
      description: 'Where you currently are',
      disabled: true,
      visible: true,
    },
    up: {
      label: 'Up',
      title: 'Up a level',
      description:
        "If you're in a folder, come up a level. Should only be disabled on the homepage",
      disabled: true,
      visible: false,
    },
    prev: {
      label: 'Prev',
      title: 'Previous',
      description:
        'Goes to the page in the same folder with the next lowest order or is disabled',
      disabled: true,
      visible: false,
    },
    next: {
      label: 'Next',
      title: 'Next',
      description:
        'Goes to the page in the same folder with the next highest order or is disabled',
      disabled: true,
      visible: false,
    },
  };

  // flatten the globalNav tree into a flat array of NavItem
  function flattenNav(items: any[], parentPath = ''): NavItem[] {
    let result: NavItem[] = [];

    for (const item of items) {
      const rawSlug = item.slug.replace(/^\/|\/$/g, '');
      const fullSlug = parentPath ? `${parentPath}/${rawSlug}` : rawSlug;
      const normalizedSlug = `/${fullSlug}`;

      result.push({
        title: item.title,
        description: item.description,
        slug: normalizedSlug,
        type: item.type,
        order: item.order ?? 999,
        parent: parentPath ? '/' + parentPath : null,
      });

      if (item.children?.length) {
        result = result.concat(flattenNav(item.children, fullSlug));
      }
    }

    return result;
  }

  const flatNav = flattenNav(navJSON as any[]);

  // find the object in the globalNav tree which matches the pathname
  const thisObj = flatNav.find((item) => item.slug === pathname);

  if (thisObj) {
    obj.this.title = thisObj.title;

    // UP
    if (thisObj.parent) {
      obj.up.visible = true;
      obj.up.disabled = false;
      obj.up.slug = thisObj.parent;
    }

    // SIBLINGS
    const siblings = flatNav
      .filter((item) => item.parent === thisObj.parent)
      .sort((a, b) => a.order - b.order);

    const index = siblings.findIndex((item) => item.slug === thisObj.slug);
    const prev = siblings[index - 1];
    const next = siblings[index + 1];

    if (prev) {
      obj.prev.visible = true;
      obj.prev.disabled = false;
      obj.prev.slug = prev.slug;
    }

    if (next) {
      obj.next.visible = true;
      obj.next.disabled = false;
      obj.next.slug = next.slug;
    }
  }

  obj.this.title = thisObj?.title as string;
  obj.this.description = thisObj?.description as string;

  const navigateTo = (slug: string | undefined) => {
    if (slug) router.push(slug);
  };

  return (
    <Box
      sx={{
        // background: 'rgba(255,255,255, 0.2)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        p: 2,
      }}
    >
      {obj.home.visible && (
        <MightyButton
          sx={{ mr: 1 }}
          mode="icon"
          onClick={() => navigateTo('/')}
          label="Home"
          icon="home"
          disabled={obj.home.disabled}
        />
      )}

      {obj.up.visible && (
        <MightyButton
          mode="icon"
          sx={{ mr: 1 }}
          color="inherit"
          disabled={obj.up.disabled}
          onClick={() => navigateTo(obj.up.slug)}
          label="Up"
          icon="up"
        />
      )}

      {obj.prev.visible && (
        <MightyButton
          mode="icon"
          sx={{ mr: 1 }}
          color="inherit"
          disabled={obj.prev.disabled}
          onClick={() => navigateTo(obj.prev.slug)}
          label="Previous"
          icon="left"
        />
      )}

      {obj.next.visible && (
        <MightyButton
          mode="icon"
          sx={{ mr: 1 }}
          color="inherit"
          disabled={obj.next.disabled}
          onClick={() => navigateTo(obj.next.slug)}
          label="Next"
          icon="right"
        />
      )}

      {obj.this.visible && (
        <>
          <ShareThis />
          <Typography
            sx={{
              my: 1,
            }}
            variant="body1"
            component={'h2'}
          >
            {obj.this.description}
          </Typography>
        </>
      )}
    </Box>
  );
}
