'use client';
import * as React from 'react';
import { 
  Box,
} from '@mui/material';
import { 
  Theme,
  Header,
  useIsMobile,
  Footer,
  Main,
} from "./";

export type TFrontmatter = {
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

export type TCore = {
  type?: "page" | "file" | "folder";
  frontmatter?: TFrontmatter | null;
  body?: string | null;
  children?: React.ReactNode;
};

export default function Core({
  frontmatter = null,
  body = null,
}: TCore) {

  const isMobile = useIsMobile();
  const maxW = "md";
  
  return (
    <Theme>
      <Box 
        id="scroll-top"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header
          maxW={maxW}
          icon={frontmatter?.icon}
          title={frontmatter?.title}
          subheader={frontmatter?.description}
        />

        <Box sx={{ mt: !isMobile ? 10 : 1 }}>
          <Main 
            body={body as any} 
            frontmatter={frontmatter as any}
          />
        </Box>
        
        <Footer />

      </Box>
    </Theme>
  );
}
