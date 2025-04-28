'use client';

import * as React from 'react';
import { Container, Paper } from '@mui/material';
import { 
  Theme,
  HeaderAppbar,
} from "./";

export type TCore = {
  type?: "page" | "file" | "folder";
  children?: React.ReactNode;
  frontmatter?: {
    [key: string]: any;
  } | null;
  image?: string;
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
        <Paper square>
          {process.env.NODE_ENV === 'development' && (
            <>
              <pre>frontmatter: {JSON.stringify(frontmatter, null, 2)}</pre>
              <pre>body: {JSON.stringify(body, null, 2)}</pre>
            </>
          )}
          {children}
        </Paper>
      </Container>
    </Theme>
  );
}
