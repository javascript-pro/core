import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useSlice } from '../../../';

export default function Resume() {
  const slice = useSlice();
  const { resume } = slice.cv;

  return (
    <Box sx={{ mb: '100px', mt: 4 }}>
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
              color="#303030"
              underline="none"
            >
              {children}
            </MuiLink>
          ),
        }}
      >
        {resume}
      </ReactMarkdown>
    </Box>
  );
}
