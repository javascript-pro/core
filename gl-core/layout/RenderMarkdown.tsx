'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link as MuiLink, Typography, useTheme } from '@mui/material';

export type TRenderMarkdown = {
  children: React.ReactNode;
};

export default function RenderMarkdown({ 
  children = '',
}: TRenderMarkdown) {

  const theme = useTheme();
  const linkCol = theme.palette.text.primary;

  return (
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
              color={linkCol}
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
  );
}
