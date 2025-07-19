// /Users/goldlabel/GitHub/core/gl-core/components/nav/PageBreadcrumb.tsx
'use client';

import React, { Suspense } from 'react';
import NextLink from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Box, Link as MUILink, Typography } from '@mui/material';
import globalNav from '../../../public/globalNav.json';

// Helper: flatten globalNav tree into { [slug]: title }
function buildTitleMap(nav: any[], parentPath = ''): Record<string, string> {
  let map: Record<string, string> = {};
  for (const item of nav) {
    const fullPath = (parentPath + '/' + (item.slug || '')).replace(
      /\/+/g,
      '/',
    );
    if (item.title) {
      map[fullPath] = item.title;
    }
    if (item.children && Array.isArray(item.children)) {
      map = { ...map, ...buildTitleMap(item.children, fullPath) };
    }
  }
  return map;
}

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
        const isLast = index === segments.length - 1;
        const href = '/' + segments.slice(0, index + 1).join('/');
        const label =
          isLast && frontmatterTitle
            ? frontmatterTitle
            : titleMap[href] ?? segment; // no case modifications

        return (
          <React.Fragment key={href}>
            <span style={{ margin: '0 4px' }}>/</span>
            {isLast ? (
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: 'text.secondary' }} // muted color
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
