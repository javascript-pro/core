'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  IconButton,
  Link as MuiLink,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export type TRenderMarkdown = {
  children: React.ReactNode;
  height?: number | string;
};

export default function RenderMarkdown({ children = '', height = '80vh' }: TRenderMarkdown) {
  const theme = useTheme();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const lineHeight = 28;
  const scrollStep = lineHeight * 10;

  const handleScroll = (direction: 'up' | 'down') => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const amount = direction === 'up' ? -scrollStep : scrollStep;
      el.scrollBy({ top: amount, behavior: 'smooth' });
    }
  };

  // Keyboard handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleScroll('up');
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleScroll('down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <IconButton
        onClick={() => handleScroll('up')}
        size="small"
        sx={{ color: theme.palette.text.secondary }}
      >
        <ArrowDropUpIcon fontSize="large" />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          width: '100%',
          overflowY: 'scroll',
          padding: 2,
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          boxShadow: 2,
          outline: 'none',
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
        tabIndex={0} // ensures it can receive focus if needed
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

      <IconButton
        onClick={() => handleScroll('down')}
        size="small"
        sx={{ color: theme.palette.text.secondary }}
      >
        <ArrowDropDownIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}
