'use client';

import * as React from 'react';
import navJSON from '../../../public/globalNav.json';
import { usePathname, useRouter } from 'next/navigation';
import { Box, CardHeader, IconButton } from '@mui/material';
import { MightyButton, Icon } from '../../../gl-core';

type NavItem = {
  title: string;
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

  // get the pathname and remove the starting slash because slugs don't have them
  const currentSlug = pathname.replace(/^\/|\/$/g, '');

  // flatten the globalNav tree into a flat array of NavItem
  function flattenNav(items: any[], parentPath = ''): NavItem[] {
    let result: NavItem[] = [];

    for (const item of items) {
      const rawSlug = item.slug.replace(/^\/|\/$/g, '');
      const fullSlug = parentPath ? `${parentPath}/${rawSlug}` : rawSlug;
      const normalizedSlug = fullSlug;

      result.push({
        title: item.title,
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

  console.log('flatNav', flatNav);

  const navigateTo = (slug: string | undefined) => {
    if (slug) router.push(slug);
  };

  return (
    <Box
      sx={{
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

      {obj.this.visible && (
        <CardHeader
          avatar={
            <IconButton
              color="inherit"
              onClick={() => {
                console.log('this');
              }}
            >
              <Icon icon="categories" />
            </IconButton>
          }
          title={`pathname: ${pathname}`}
          subheader={obj.this.description}
        />
      )}

      {obj.prev.visible && (
        <MightyButton
          sx={{ mr: 1 }}
          color="secondary"
          disabled={obj.prev.disabled}
          onClick={() => navigateTo(obj.prev.slug)}
          label="Previous"
          icon="left"
        />
      )}

      {obj.up.visible && (
        <MightyButton
          sx={{ mr: 1 }}
          color="secondary"
          disabled={obj.up.disabled}
          onClick={() => navigateTo(obj.up.slug)}
          label="Up"
          icon="up"
        />
      )}

      {obj.next.visible && (
        <MightyButton
          sx={{ mr: 1 }}
          color="secondary"
          disabled={obj.next.disabled}
          onClick={() => navigateTo(obj.next.slug)}
          label="Next"
          icon="right"
        />
      )}
    </Box>
  );
}
