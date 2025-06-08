'use client';
// core/gl-core/cartridges/Bouncer/Bouncer.tsx
import * as React from 'react';
import config from '../../config.json';
import { Container } from '@mui/material';
import { Theme } from '../../../gl-core';
import { TBouncer } from '../Bouncer';
import { AuthForm } from '../Bouncer';

export default function Bouncer({ frontmatter = null }: TBouncer) {
  return (
    <Theme theme={config.themes.bouncer as any}>
      <Container maxWidth={'xs'} sx={{ pt: 5 }}>
        <AuthForm frontmatter={frontmatter} />
      </Container>
    </Theme>
  );
}
