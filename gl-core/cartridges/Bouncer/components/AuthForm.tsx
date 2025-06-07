'use client';
// core/gl-core/cartridges/Bouncer/components/AuthForm.tsx
import * as React from 'react';
import {
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { Icon } from '../../../../gl-core';
import { TAuthForm } from '../../Bouncer';

export default function AuthForm({
  frontmatter = {
    icon: 'settings',
    title: 'title',
    description: 'description',
  },
}: TAuthForm) {
  // console.log("frontmatter", frontmatter);

  return (
    <Card>
      <CardHeader
        avatar={
          <IconButton disabled>
            <Icon icon={frontmatter.icon} />
          </IconButton>
        }
        title={<Typography variant="h6">{frontmatter.title}</Typography>}
        subheader={
          <Typography variant="body2">{frontmatter.description}</Typography>
        }
      />
      <CardContent>
        <TextField
          autoFocus
          label="Email"
          type="email"
          variant="standard"
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          sx={{
            mb: 2,
          }}
        />
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          sx={{ ml: 1 }}
          onClick={() => {
            console.log('Sign In');
          }}
        >
          Sign In
        </Button>

        <Button
          sx={{}}
          onClick={() => {
            console.log('Reset Password');
          }}
        >
          Reset Password
        </Button>
      </CardActions>
    </Card>
  );
}

/* 
<pre>authModalMode: {JSON.stringify(authModalMode, null, 2)}</pre> 
*/
