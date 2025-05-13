'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link as MuiLink, Typography, useTheme } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import { useIsMobile, Icon, Nav } from '../';

export type TRenderMarkdown = {
  markdown: string;
};

export default function RenderMarkdown({ markdown = '' }: TRenderMarkdown) {
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
            <Typography variant="body2">{children}</Typography>
          </li>
        ),
        strong: ({ children }) => <strong>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        a: ({ href, children }) => (
          <MuiLink
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            color={linkCol}
            underline="none"
          >
            {children}
          </MuiLink>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
