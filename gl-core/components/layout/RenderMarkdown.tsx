'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Link as MuiLink, Typography, useTheme } from '@mui/material';
import { MightyButton } from '../../../gl-core';

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
  const [canScrollDown, setCanScrollDown] = React.useState(false);
  const [canScrollUp, setCanScrollUp] = React.useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 10);
      setCanScrollUp(el.scrollTop > 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const observer = new ResizeObserver(checkScroll);
    if (scrollRef.current) {
      observer.observe(scrollRef.current);
      scrollRef.current.addEventListener('scroll', checkScroll);
    }

    return () => {
      observer.disconnect();
      scrollRef.current?.removeEventListener('scroll', checkScroll);
    };
  }, [children]);

  const handleScrollDown = () => {
    scrollRef.current?.scrollBy({ top: 300, behavior: 'smooth' });
  };

  const handleScrollUp = () => {
    scrollRef.current?.scrollBy({ top: -300, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        width: width ?? '100%',
        height: 'calc(100vh - 370px)',
        maxWidth: maxWidth ?? '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 1,
          minHeight: 0,
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

      <Box sx={{ m: 2, display: 'flex', gap: 2, justifyContent: 'left' }}>
        {canScrollDown && (
          <MightyButton
            mode="listitem"
            color="inherit"
            variant="outlined"
            label="Scroll Down"
            icon="down"
            onClick={handleScrollDown}
          />
        )}
        {canScrollUp && (
          <MightyButton
            mode="listitem"
            color="inherit"
            variant="outlined"
            label="Scroll Up"
            icon="up"
            onClick={handleScrollUp}
          />
        )}
      </Box>
    </Box>
  );
}
