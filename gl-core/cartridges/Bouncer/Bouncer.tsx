'use client';
// core/gl-core/cartridges/Bouncer/Bouncer.tsx
import * as React from 'react';
import {
  Button, 
  Container,
  IconButton, Tooltip, Typography, Card } from '@mui/material';
import { Icon } from '../../../gl-core';
import { TBouncer } from '../Bouncer';
import { AuthForm } from '../Bouncer';

export default function Bouncer({
  frontmatter = null,
  content = null,
}: TBouncer) {
  // const [authModalOpen, setAuthModalOpen] = useKey('authModalOpen');
  // console.log("Bouncer", frontmatter, content);

  return (
    <Container maxWidth={"xs"} sx={{pt: 5}}>
      <AuthForm frontmatter={frontmatter} />
    </Container>
  );
}
