'use client';

import * as React from 'react';
import navJSON from '../../../public/globalNav.json';
import { usePathname, useRouter } from 'next/navigation';
import { Box, /* useTheme, */ Typography } from '@mui/material';
import {
  MightyButton,
  ShareThis,
  /* Icon, */ useIsMobile,
} from '../../../gl-core';

export type TDoc = {
  title: string;
  description?: string;
  icon?: string;
  slug: string;
  type: 'file' | 'folder';
  order: number;
  parent?: string | null;
};

export type TNextPrev = {
  label: string;
  url?: string;
  title: string;
  github?: string;
  description: string;
  disabled: boolean;
  visible: boolean;
  slug?: string;
};

export default function NextPrevious() {
  const router = useRouter();
  const pathname = usePathname();
  // const theme = useTheme();
  const isMobile = useIsMobile();

  const isHome = pathname === '/';

  const obj: {
    home: TNextPrev;
    api: TNextPrev;
    github: TNextPrev;
    up: TNextPrev;
    prev: TNextPrev;
    next: TNextPrev;
  } = {
    api: {
      label: 'API',
      title: 'API',
      description: 'Base url /api/gl-api',
      disabled: false,
      visible: false,
    },
    github: {
      // url,
      label: 'GitHub',
      title: 'GitHub',
      description: 'View code',
      disabled: false,
      visible: false,
    },
    home: {
      label: 'Home',
      title: 'Reset',
      description: 'Back to the start',
      disabled: isHome,
      visible: !isHome,
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

  // flatten the globalNav tree into a flat array of TDoc
  function flattenNav(items: any[], parentPath = ''): TDoc[] {
    let result: TDoc[] = [];

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
      obj.prev.title = prev.title;
    }

    if (next) {
      obj.next.visible = true;
      obj.next.disabled = false;
      obj.next.slug = next.slug;
      obj.next.title = next.title;
    }
  }

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

      {obj.api.visible && (
        <MightyButton
          sx={{ mr: 1 }}
          mode="icon"
          onClick={() => {
            window.open('/api/gl-api', '_blank');
          }}
          label="API"
          icon="api"
          disabled={obj.github.disabled}
        />
      )}

      {obj.github.visible && (
        <MightyButton
          sx={{ mr: 1 }}
          mode="icon"
          onClick={() => navigateTo('/work/github')}
          label="GitHub"
          icon="github"
          disabled={obj.github.disabled}
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
          label={obj.prev.title}
          icon="left"
        />
      )}

      {obj.next.visible && (
        <MightyButton
          mode="button"
          sx={{ mr: 1 }}
          color="inherit"
          disabled={obj.next.disabled}
          onClick={() => navigateTo(obj.next.slug)}
          label={obj.next.title}
          icon="right"
        />
      )}
    </Box>
  );
}
