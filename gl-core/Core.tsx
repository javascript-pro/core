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
  useSlice,
  Theme,
  Header,
  MainMenu,
  useIsMobile,
  Footer,
  PageBreadcrumb,
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

  const slice = useSlice();
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
        <Container 
          maxWidth={maxW}
          sx={{ 
            mt: isMobile ? 2 : "100px", 
            mb: isMobile ? '64px' : 0,
            flexGrow: 1 
          }}
        >

{/* <pre>
  slice: { JSON.stringify(slice, null, 2)}
</pre> */}
          <Grid container spacing={2}>

            <Grid size={{
              "xs": 12,
              "md": 8,
            }}>
              {body && (
                <Container sx={{ py: 2 }}>
                  {frontmatter?.image && (
                    <CardMedia
                      component="img"
                      image={frontmatter.image}
                      alt={frontmatter.title || "Featured image"}
                      sx={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
                    />
                  )}

                  <Box sx={{mt:2}}>
                    <PageBreadcrumb />
                  </Box>
                  <Typography component={"div"}>
                    <ReactMarkdown>
                      {body}
                    </ReactMarkdown>
                  </Typography>
                </Container>
              )}
            </Grid>

            <Grid size={{
              "xs": 12,
              "md": 4,
            }}>
              
             { !isMobile && (
                <Box sx={{ my: 3 }}>
                  <MainMenu />
                </Box>
              )}
            </Grid>

          </Grid>
        </Container>

        <Footer />
      </Box>
    </Theme>
  );
}

/*
<pre>
  slice: { JSON.stringify(slice, null, 2)}
</pre>
*/