'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Box,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FolderContents, Featured } from '../';

export type FilePageProps = {
  content: {
    frontmatter: {
      title?: string;
      subheader?: string;
      excerpt?: string;
      image?: string;
      icon?: string;
      description?: string;
    };
    content: string;
  };
  globalNav?: any;
  featured?: any[];
};

export default function FilePage({ content, featured }: FilePageProps) {
  const { frontmatter, content: body } = content;
  const { title, image, description } = frontmatter;

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ px: 2 }}>
      <CardHeader title={title || 'Untitled'} subheader={description} />

      {image && (
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
            src={image}
            alt={title || 'Cover image'}
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
              <CardContent>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {body}
                </ReactMarkdown>
              </CardContent>
            </Box>
            <Box sx={{ maxWidth: 300 }}>
              <Featured featured={featured} />
              <FolderContents />
            </Box>
          </Box>
        ) : (
          <Box>
            <CardContent>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </CardContent>
            <FolderContents />
          </Box>
        )}
      </Box>
    </Box>
  );
}
