'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Link as MuiLink, Typography, useTheme } from '@mui/material';

export type TRenderMarkdown = {
  children: React.ReactNode;
  height?: number | string;
  width?: number | string;
  maxWidth?: number | string | null;
};

export default function RenderMarkdown({
  children = '',
  height,
  width,
  maxWidth,
}: TRenderMarkdown) {
  const theme = useTheme();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        width: width ?? '100%',
        height: height ?? 'calc(100vh - 200px)',
        maxWidth: maxWidth ?? '100%',
        minHeight: 0, // Critical for scroll inside flex container
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
          borderRadius: 1,
          minHeight: 0, // Ensure scroll area can shrink properly
          scrollbarWidth: 'auto',
          scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.paper,
          },
        }}
        tabIndex={0}
      >
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <Typography variant="h4">
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h5">
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h6">
                {children}
              </Typography>
            ),
            p: ({ children }) => (
              <Typography variant="body1" paragraph>
                {children}
              </Typography>
            ),
            li: ({ children }) => (
              <li>
                <Typography variant="body1">{children}</Typography>
              </li>
            ),
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            a: ({ href = '', children }) => {
              const isExternal = /^https?:\/\//.test(href);
              return (
                <MuiLink
                  href={href}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  color={theme.palette.text.primary}
                  underline="none"
                >
                  <strong>{children}</strong>
                </MuiLink>
              );
            },
          }}
        >
          {children as string}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}
