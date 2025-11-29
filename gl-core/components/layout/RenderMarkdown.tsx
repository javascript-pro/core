// /Users/goldlabel/GitHub/example-app/gl-core/components/layout/RenderMarkdown.tsx
'use client';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Link as MuiLink,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import {
  GoogleMap,
  YouTube,
  PageAd,
  Mapbox,
  PrevNext,
  GitHub,
  ChildPages,
  PageGrid,
  LinkOut,
} from '../../../gl-core';

type TRenderMarkdown = {
  children: React.ReactNode;
  height?: number | string;
  width?: number | string;
  maxWidth?: number | string | null;
};

export default function RenderMarkdown({
  children = '',
  width,
  maxWidth,
}: TRenderMarkdown) {
  const theme = useTheme();
  const scrollRef = React.useRef<HTMLDivElement>(null);

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
      const attrRegex = /(\w+)="(.*?)"/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        let val: any = attrMatch[2];
        if (!isNaN(Number(val))) {
          val = Number(val);
        } else if (val === 'true' || val === 'false') {
          val = val === 'true';
        }
        props[attrMatch[1]] = val;
      }

      return <Component {...props} />;
    };

    // GoogleMap
    const google = parseShortcode(/\[GoogleMap\s+(.*?)\]/, GoogleMap);
    if (google) return google;

    // FlickrAlbum
    // const flickr = parseShortcode(/\[FlickrAlbum\s+(.*?)\]/, FlickrAlbum);
    // if (flickr) return flickr;

    // YouTube
    const youtube = parseShortcode(/\[YouTube\s+(.*?)\]/, YouTube);
    if (youtube) return youtube;

    // Flash
    // const flash = parseShortcode(/\[Flash\s+(.*?)\]/, Flash);
    // if (flash) return flash;

    // PageAd
    const pageAd = parseShortcode(/\[PageAd\s+(.*?)\]/, PageAd);
    if (pageAd) return pageAd;

    // Mapbox shortcode
    const mapbox = parseShortcode(/\[Mapbox\s+(.*?)\]/, Mapbox);
    if (mapbox) return mapbox;

    // PrevNext
    const prevNext = parseShortcode(/\[PrevNext\s+(.*?)\]/, PrevNext);
    if (prevNext) return prevNext;

    // GitHub
    const github = parseShortcode(/\[GitHub\s+(.*?)\]/, GitHub);
    if (github) return github;

    // ChildPages
    const childPages = parseShortcode(/\[ChildPages\s+(.*?)\]/, ChildPages);
    if (childPages) return childPages;

    // PageGrid
    const pageGrid = parseShortcode(/\[PageGrid\s+(.*?)\]/, PageGrid);
    if (pageGrid) return pageGrid;

    // LinkOut
    const linkOut = parseShortcode(/\[LinkOut\s+(.*?)\]/, LinkOut);
    if (linkOut) return linkOut;

    // fallback: simply return text
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

            blockquote: ({ children }) => (
              <Box
                component="blockquote"
                sx={{
                  borderLeft: `2px solid ${theme.palette.primary.main}`,
                  pl: 2,
                  ml: 0,
                  my: 2,
                  color: theme.palette.text.secondary,
                  fontStyle: 'italic',
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.05)
                      : alpha(theme.palette.primary.main, 0.02),
                }}
              >
                {children}
              </Box>
            ),

            p: ({ children }) => (
              <Typography
                variant="body1"
                component="span"
                display="block"
                sx={{ my: 1, fontWeight: 'normal' }}
              >
                {normalizeChildren(children).map((child, i) => (
                  <React.Fragment key={i}>
                    {typeof child === 'string' ? renderShortcode(child) : child}
                  </React.Fragment>
                ))}
              </Typography>
            ),
            li: ({ children }) => (
              <li>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'normal' }}
                >
                  {normalizeChildren(children).map((child, i) => (
                    <React.Fragment key={i}>
                      {typeof child === 'string'
                        ? renderShortcode(child)
                        : child}
                    </React.Fragment>
                  ))}
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
    </Box>
  );
}
