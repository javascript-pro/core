'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Icon, useConfig } from '../../gl-core';
import {
  Box,
  IconButton,
  Link as MuiLink,
  Typography,
  useTheme,
} from '@mui/material';

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
  // const config = useConfig();
  const theme = useTheme();
  
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const lineHeight = 28;
  const scrollStep = lineHeight * 10;

  const [canScrollUp, setCanScrollUp] = React.useState(false);
  const [canScrollDown, setCanScrollDown] = React.useState(false);

  const handleScroll = (direction: 'up' | 'down') => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const amount = direction === 'up' ? -scrollStep : scrollStep;
      el.scrollBy({ top: amount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      setCanScrollUp(el.scrollTop > 0);
      setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight);
    }
  };

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

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();

    const handleScrollEvent = () => updateScrollButtons();
    el.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

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
      {/* Up/Down Buttons on the Left */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1,
        }}
      >
        <IconButton
          onClick={() => handleScroll('up')}
          size="small"
          sx={{
            color: theme.palette.text.secondary,
            visibility: canScrollUp ? 'visible' : 'hidden',
          }}
        >
          <Icon icon="up" />
        </IconButton>

        <IconButton
          onClick={() => handleScroll('down')}
          size="small"
          sx={{
            color: theme.palette.text.secondary,
            visibility: canScrollDown ? 'visible' : 'hidden',
          }}
        >
          <Icon icon="down" />
        </IconButton>
      </Box>

      {/* Scrollable Markdown Box */}
      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
          padding: 2,
          borderRadius: 1,
          borderLeft: '1px solid ' + theme.palette.background.paper,
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
