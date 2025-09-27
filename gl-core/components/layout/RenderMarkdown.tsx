'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Link as MuiLink, Typography, useTheme } from '@mui/material';
import { MightyButton } from '../../../gl-core';
import { GoogleMap, FlickrAlbum, YouTube } from '../../../gl-core';
import { Flash } from '../../cartridges/Flash';

export type TRenderMarkdown = {
  children: React.ReactNode;
  height?: number | string;
  width?: number | string;
  maxWidth?: number | string | null;
};

export default function RenderMarkdown({
  children = '',
  // height,
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

  // --- Normalize children to array to prevent map errors ---
  const normalizeChildren = (children: any) =>
    Array.isArray(children) ? children : [children];

  // --- Shortcode parser ---
  const renderShortcode = (text: string) => {
    const parseShortcode = (
      regex: RegExp,
      Component: React.ElementType,
    ): React.ReactNode | null => {
      const match = text.match(regex);
      if (!match) return null;

      const attrs = match[1];
      const props: Record<string, any> = {};

      // capture all key="value" pairs
      const attrRegex = /(\w+)="(.*?)"/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        let val: any = attrMatch[2];
        if (!isNaN(Number(val))) {
          val = Number(val); // turn "350" into 350
        } else if (val === 'true' || val === 'false') {
          val = val === 'true'; // handle booleans
        }
        props[attrMatch[1]] = val;
      }

      return <Component {...props} />;
    };

    // GoogleMap
    const google = parseShortcode(/\[GoogleMap\s+(.*?)\]/, GoogleMap);
    if (google) return google;

    // FlickrAlbum
    const flickr = parseShortcode(/\[FlickrAlbum\s+(.*?)\]/, FlickrAlbum);
    if (flickr) return flickr;

    // YouTube
    const youtube = parseShortcode(/\[YouTube\s+(.*?)\]/, YouTube);
    if (youtube) return youtube;

    // Flash
    const flash = parseShortcode(/\[Flash\s+(.*?)\]/, Flash);
    if (flash) return flash;

    // fallback: just return text
    return text;
  };

  return (
    <Box
      sx={{
        width: width ?? '100%',
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
          px: 4,
          flexGrow: 1,
          overflowY: 'auto',
          minHeight: 0,
          scrollbarWidth: 'auto',
          scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
          '&::-webkit-scrollbar': { width: '12px' },
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
              <Typography variant="h4" sx={{ my: 1, fontWeight: 'normal' }}>
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h5" sx={{ my: 1, fontWeight: 'normal' }}>
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h6" sx={{ my: 1, fontWeight: 'normal' }}>
                {children}
              </Typography>
            ),
            p: ({ children }) => (
              <Typography
                variant="body1"
                component="span"
                display="block"
                sx={{ my: 1, fontWeight: 'normal' }}
              >
                {normalizeChildren(children).map((child, i) =>
                  typeof child === 'string' ? renderShortcode(child) : child,
                )}
              </Typography>
            ),
            li: ({ children }) => (
              <li>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'normal' }}
                >
                  {normalizeChildren(children).map((child, i) =>
                    typeof child === 'string' ? renderShortcode(child) : child,
                  )}
                </Typography>
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
            disabled={!canScrollDown}
            mode="icon"
            color="inherit"
            variant="outlined"
            label="Scroll Down"
            icon="down"
            onClick={handleScrollDown}
          />
        )}

        {canScrollUp && (
          <MightyButton
            disabled={!canScrollUp}
            mode="icon"
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
