'use client';
import * as React from 'react';
import { 
  Box,
  Container, 
  Grid, 
  Typography, 
  CardMedia,
} from '@mui/material';
import { 
  Theme,
  Header,
  MainMenu,
  useIsMobile,
  // resetUberedux,
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
  const isMobile = useIsMobile();
  const maxW = "md";

  return (
    <Theme>
      <div id="scroll-top" />
      <Header
        maxW={maxW}
        icon={frontmatter?.icon}
        title={frontmatter?.title}
        subheader={frontmatter?.description}
      />
      <Container maxWidth={maxW} sx={{ mt: "100px" }}>        
        <Grid container spacing={2}>
          <Grid size={{
            "xs": 12,
            "md": 4,
          }}>
            {/* Show featured image if available */}
            {frontmatter?.image && (
              <CardMedia
                component="img"
                image={frontmatter.image}
                alt={frontmatter.title || "Featured image"}
                sx={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
              />
            )}

            { !isMobile && <Box sx={{ my:2 }}>
                            <MainMenu />
                          </Box> }
            
          </Grid>
          <Grid size={{
            "xs": 12,
            "md": 8,
          }}>
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
          </Grid>
        </Grid>
      </Container>
      
    </Theme>
  );
}

/*
{ process.env.NODE_ENV === 'development' && (
            <>
              <pre>
                slice {JSON.stringify(slice, null, 2)}
              </pre>
            </>
      )}
*/