'use client';

import * as React from 'react';
import { Container, Typography, CardMedia } from '@mui/material';
import { 
  Theme,
  HeaderAppbar,
} from "./";
import ReactMarkdown from 'react-markdown';

export type TCore = {
  type?: "page" | "file" | "folder";
  children?: React.ReactNode;
  frontmatter?: {
    icon?: string;
    title?: string;
    description?: string;
    image?: string;
    [key: string]: any;
  } | null;
  body?: string | null;
  header?: any;
};

export default function Core({
  children = <>Nothing to show</>,
  frontmatter = null,
  body = null,
}: TCore) {
  const maxW = "md";

  return (
    <Theme>
      <HeaderAppbar
        maxW={maxW}
        icon={frontmatter?.icon}
        title={frontmatter?.title}
        subheader={frontmatter?.description}
      />
      <Container maxWidth={maxW} sx={{ mt: "100px" }}>
        <div id="top"></div>
        <>
          {/* Show featured image if available */}
          {frontmatter?.image && (
            <CardMedia
              component="img"
              image={frontmatter.image}
              alt={frontmatter.title || "Featured image"}
              sx={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
            />
          )}

          {/* Render markdown body if available */}
          {body && (
            <Container sx={{ py: 2 }}>
              <Typography component={"div"}>
                <ReactMarkdown>
                  {body}
                </ReactMarkdown>
              </Typography>
            </Container>
          )}
          {children}
        </>
      </Container>
    </Theme>
  );
}
