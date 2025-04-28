'use client';
import config from './config.json';
import * as React from 'react';
import {
  Container,
  Paper,
  // Typography,
} from '@mui/material';
import {
  HeaderAppbar,
} from "./"

export type TCore = {
  children: React.ReactNode;
  frontmatter?: any;
  body?: string | null;
  header?: any
  type: "page" | "404"
};

export default function Core({
  children = <>Nothing to show</>,
  frontmatter = null,
  body = null,
  // type = "page",
}: TCore ) {

  const maxW = "md";
  const {brandColor} = config;

  return (
    <>
      <HeaderAppbar
        maxW={maxW}
        title={frontmatter.title}
        subheader={frontmatter.description}
      />


      <Container maxWidth={maxW} sx={{mt: "100px" }}>
        <div id="top"></div>
        <Paper square>
          
          {/* <Typography variant='body1'>
            Type: {type}
          </Typography> */}
          <pre>
            frontmatter: {JSON.stringify(frontmatter, null, 2)}
          </pre>
          <pre>
            body: {JSON.stringify(body, null, 2)}
          </pre>
          <pre>
            brandColor: {JSON.stringify(brandColor, null, 2)}
          </pre>
          
          {children}
        </Paper>
      </ Container>
    </>
  );
}
