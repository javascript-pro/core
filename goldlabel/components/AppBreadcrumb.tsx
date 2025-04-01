'use client';

import React, { Suspense } from 'react';
import NextLink from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Box, Link as MUILink } from '@mui/material';

function Params() {
  const searchParams = useSearchParams()!;

  if (searchParams.toString().length === 0) return null;

  return (
    <Box className="px-2 text-gray-500 text-sm" component="span">
      ?
      {Array.from(searchParams.entries()).map(([key, value], index) => (
        <React.Fragment key={key}>
          {index !== 0 && <span>&</span>}
          <span className="px-1">
            <span className="animate-[highlight_1s_ease-in-out_1]">{key}</span>=
            <span className="animate-[highlight_1s_ease-in-out_1]">{value}</span>
          </span>
        </React.Fragment>
      ))}
    </Box>
  );
}

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function AppBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean);

  return (
    <Box my={2} px={2}>
      <Breadcrumbs aria-label="breadcrumb" separator="/" maxItems={8}>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const label = formatSegment(segment);

          return isLast ? (
            <Typography key={href} color="text.primary" variant="body2">
              {label}
            </Typography>
          ) : (
            <NextLink key={href} href={href} passHref legacyBehavior>
              <MUILink underline="hover" color="inherit" variant="body2">
                {label}
              </MUILink>
            </NextLink>
          );
        })}

        <Suspense>
          <Params />
        </Suspense>
      </Breadcrumbs>
    </Box>
  );
}
