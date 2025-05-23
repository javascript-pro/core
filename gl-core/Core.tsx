'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { CssBaseline, Box } from '@mui/material';
import {
  Theme,
  Flash,
  MovieClip,
  Photo,
  RenderMarkdown,
  Header,
  PageBreadcrumb,
  useIsMobile,
} from '../gl-core';
import { Flickr } from './cartridges/Flickr';

export type TFrontmatter = {
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
  [key: string]: any;
};

export type TCore = {
  type?: 'page' | 'file' | 'folder' | 'cv';
  frontmatter?: any;
  body?: string | null;
  children?: React.ReactNode;
};

export default function Core({ frontmatter, body = null }: TCore) {
  const pathname = usePathname();
  const showFlickr = pathname.includes('balance/flickr');
  const isMobile = useIsMobile();

  // console.log("isMobile", isMobile);
  const maxHeight = isMobile ? 150 : 180;

  return (
    <Theme>
      <CssBaseline />
      <Flash id="core">
        <MovieClip id="content" opacity={0}>
          <Header frontmatter={frontmatter} />
          {pathname !== "/" ? <PageBreadcrumb /> : null }
          

          <Box sx={{ height: 8 }}/>
          {showFlickr ? (
            // bilbao "72157594233009954"
            // mimizan "72177720326289602"
            // cartridge "72177720326317140"
            <Flickr album="72177720326317140" frontmatter={frontmatter} />
          ) : (
            <>
              <Photo 
                maxHeight={maxHeight} 
                src={frontmatter?.image ?? null} 
              />
            </>
          )}
          <Box sx={{ height: 16 }}/>
          <RenderMarkdown>{body}</RenderMarkdown>
        </MovieClip>
      </Flash>
    </Theme>
  );
}
