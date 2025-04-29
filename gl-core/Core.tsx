'use client';
import * as React from 'react';
import { 
  Box,
  Divider,
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
  Footer,
} from "./";
import ReactMarkdown from 'react-markdown';

export type TCore = {
  type?: "page" | "file" | "folder";
  frontmatter?: {
    icon?: string;
    title?: string;
    description?: string;
    image?: string;
    [key: string]: any;
  } | null;
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
        <Divider sx={{my:1}} />
        
        <Container 
          maxWidth={maxW}
          sx={{ 
            mt: isMobile ? 2 : "100px", 
            mb: isMobile ? '64px' : 0,
            flexGrow: 1 
          }}
        >        
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

              { !isMobile && (
                <Box sx={{ my: 3 }}>
                  <MainMenu />
                </Box>
              )}
            </Grid>

            <Grid size={{
              "xs": 12,
              "md": 8,
            }}>
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

        {/* Footer */}
        <Footer />
      </Box>
    </Theme>
  );
}
