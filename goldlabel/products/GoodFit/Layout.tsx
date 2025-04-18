'use client';

import * as React from 'react';
import {
  Box,
  CardHeader,
  CardContent,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { Featured, FolderContents } from '../../';
import ReactMarkdown from 'react-markdown';
import { NavItem } from '../../../goldlabel/types/goldlabelTypes';

export type Frontmatter = {
  order?: number;
  title?: string;
  description?: string;
  slug?: string;
  icon?: string;
  image?: string;
  tags?: string[];
  excerpt?: string;
};

export type FolderPageProps = {
  section: string;
  featured?: any[];
  tree: NavItem[] | null;
  frontmatter: Frontmatter | null;
  content: string | null;
  globalNav: NavItem[];
};

export default function Layout({
  section,
  frontmatter,
  content,
  featured,
}: FolderPageProps) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ px: 2 }}>
      <CardHeader
        title={frontmatter?.title || section}
        subheader={frontmatter?.description}
      />
      {frontmatter?.image && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 900,
            aspectRatio: {
              xs: '16/9',
              sm: '16/9',
              md: '16/4.5',
            },
            mb: { xs: 1, sm: 4 },
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Image
            priority
            src={frontmatter.image}
            alt={frontmatter.title || 'Cover image'}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 900px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex' }}>
        {isSmUp ? (
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ mt: { xs: 0, sm: -3 } }}>
              {content && (
                <CardContent>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </CardContent>
              )}
            </Box>
            <Box sx={{ maxWidth: 300 }}>
              <FolderContents />
              <Featured featured={featured} />
            </Box>
          </Box>
        ) : (
          <Box>
            {content && <ReactMarkdown>{content}</ReactMarkdown>}

            <FolderContents />
            <Featured featured={featured} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
