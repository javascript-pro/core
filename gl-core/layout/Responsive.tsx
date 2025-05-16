'use client';
import React from 'react';
// import Image from 'next/image';
import { Box, Container, Grid } from '@mui/material';
import { Header } from '../';

export type TResponsive = {
  body?: string;
  frontmatter?: any;
};

export default function Responsive({
  body = '',
  frontmatter = null,
}: TResponsive) {
  //   const isMobile = useIsMobile();
  const featuredImage = frontmatter?.image || null;

  return <Container>Flash</Container>;
}
