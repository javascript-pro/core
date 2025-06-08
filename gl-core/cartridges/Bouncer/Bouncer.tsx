'use client';
// core/gl-core/cartridges/Bouncer/Bouncer.tsx
import * as React from 'react';
import config from '../../config.json';
import { Box } from '@mui/material';
import { Theme } from '../../../gl-core';
import { TBouncer } from '../Bouncer';
import { 
  AuthForm, 
  Feedback,
  // updateFeedback,
} from '../Bouncer';
// import { useDispatch } from 'react-redux';

export default function Bouncer({ frontmatter = null }: TBouncer) {
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(updateFeedback({
  //     severity: 'info',
  //     title: 'Loading Bouncer',
  //     description: 'Please wait while we get things ready...',
  //   }));
  // }, [dispatch]);

  return (
    <Theme theme={config.themes.bouncer as any}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
          px: 2,
        }}
      >
        <Feedback />
        <AuthForm frontmatter={frontmatter} />
      </Box>
    </Theme>
  );
}
