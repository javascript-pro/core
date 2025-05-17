'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
// import { Icon } from '../../gl-core';
import { Box, Link as MuiLink, Typography, useTheme } from '@mui/material';

export type TRenderMarkdown = {
  children: React.ReactNode;
  height?: number | string;
  width?: number | string;
  maxWidth?: number | string | null;
};

export default function RenderMarkdown({
  children = '',
  height = '50vh',
  width = '90vw',
  maxWidth = null,
}: TRenderMarkdown) {
  const theme = useTheme();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        width,
        height,
        maxWidth,
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
          padding: 2,
          borderRadius: 1,
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
              <Typography variant="h4" gutterBottom>
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h5" gutterBottom>
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h6" gutterBottom>
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
