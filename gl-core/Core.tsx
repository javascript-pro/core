'use client';
import * as React from 'react';
import { 
  // IconButton, 
  Container, 
  Grid, 
  Typography, 
  CardMedia,
} from '@mui/material';
import { 
  Theme,
  Header,
  // Icon,
  useSlice,
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
  const slice = useSlice();
  const maxW = "md";

  return (
    <Theme>
      <Header
        maxW={maxW}
        icon={frontmatter?.icon}
        title={frontmatter?.title}
        subheader={frontmatter?.description}
      />
      <Container maxWidth={maxW} sx={{ mt: "100px" }}>

        <pre>
          slice {JSON.stringify(slice, null, 2)}
        </pre>

        {/* <IconButton onClick={resetUberedux}>
          <Icon icon="reset" />
        </IconButton> */}

        <div id="top"></div>

        <Grid container spacing={2}>
          <Grid size={{
            "xs": 12,
            "md": 6,
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
          </Grid>
          <Grid size={{
            "xs": 12,
            "md": 6,
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
