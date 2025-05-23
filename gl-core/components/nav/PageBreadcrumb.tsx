'use client';

import React, { Suspense } from 'react';
import NextLink from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Box, Link as MUILink, Typography } from '@mui/material';

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

function formatSegment(segment: string) {
  return segment.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

export function PageBreadcrumb() {
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
      <NextLink href="/" passHref legacyBehavior>
        <MUILink underline="hover" color="inherit" variant="body2">
          Home
        </MUILink>
      </NextLink>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = '/' + segments.slice(0, index + 1).join('/');
        const label = formatSegment(segment);

        return (
          <React.Fragment key={href}>
            <span style={{ margin: '0 4px' }}>/</span>
            {isLast ? (
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: 500 }}
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
