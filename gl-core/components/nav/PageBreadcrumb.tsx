// /Users/goldlabel/GitHub/core/gl-core/components/nav/PageBreadcrumb.tsx
'use client';

import React, { Suspense } from 'react';
import NextLink from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Box, Link as MUILink, Typography } from '@mui/material';
import globalNav from '../../../public/globalNav.json';

/**
 * Recursively flatten globalNav into a dictionary of { [fullSlug]: title }
 */
function buildTitleMap(nav: any[], parentPath = ''): Record<string, string> {
  let map: Record<string, string> = {};
  for (const item of nav) {
    // Build this item's full path
    const fullPath = (parentPath + '/' + (item.slug || '')).replace(
      /\/+/g,
      '/',
    );

    if (item.title) {
      map[fullPath] = item.title;
    }

    if (item.children && Array.isArray(item.children)) {
      const childMap = buildTitleMap(item.children, fullPath);
      map = { ...map, ...childMap };
    }
  }
  return map;
}

// Build a lookup table once
const titleMap = buildTitleMap(globalNav);

function Params() {
  const searchParams = useSearchParams();
  if (!searchParams || searchParams.toString().length === 0) return null;

  return (
    <Box
      component="span"
      sx={{ px: 1, color: 'text.secondary', fontSize: '0.75rem' }}
    >
      ?
      {Array.from(searchParams.entries()).map(([key, value], index) => (
        <React.Fragment key={key}>
          {index !== 0 && <span>&</span>}
          <span className="px-1">
            <span className="animate-[highlight_1s_ease-in-out_1]">{key}</span>=
            <span className="animate-[highlight_1s_ease-in-out_1]">
              {value}
            </span>
          </span>
        </React.Fragment>
      ))}
    </Box>
  );
}

export function PageBreadcrumb({
  frontmatterTitle,
}: {
  frontmatterTitle?: string;
}) {
  const pathname = usePathname();
  const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean);

  if (segments.length === 0) return <>&nbsp;</>;

  return (
    <Box
      sx={{
        mx: 4,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Home link */}
      <NextLink href="/" passHref legacyBehavior>
        <MUILink underline="hover" color="inherit" variant="body2">
          {titleMap['/'] || 'Home'}
        </MUILink>
      </NextLink>

      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        // Always try to use the title from globalNav
        let label = titleMap[href];

        // Fallback: if no title in globalNav, use frontmatterTitle for last segment
        if (!label && isLast && frontmatterTitle) {
          label = frontmatterTitle;
        }

        // Final fallback: use raw segment (no casing changes)
        if (!label) {
          label = segment;
        }

        return (
          <React.Fragment key={href}>
            <span style={{ margin: '0 4px' }}>/</span>
            {isLast ? (
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: 'text.secondary' }}
              >
                {label}
              </Typography>
            ) : (
              <NextLink href={href} passHref legacyBehavior>
                <MUILink underline="hover" color="inherit" variant="body2">
                  {label}
                </MUILink>
              </NextLink>
            )}
          </React.Fragment>
        );
      })}

      <Suspense>
        <Params />
      </Suspense>
    </Box>
  );
}
