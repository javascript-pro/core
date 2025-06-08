'use client';
// core/gl-core/cartridges/Bouncer/components/AuthForm.tsx
import * as React from 'react';
import config from '../../../config.json';
import { useRouter } from 'next/navigation';
import {
  Box,
  Tooltip,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  Avatar,
} from '@mui/material';
import { Icon, navigateTo, useDispatch } from '../../../../gl-core';
import { TAuthForm } from '../../Bouncer';

export default function AuthForm({
  frontmatter = {
    icon: 'settings',
    title: 'title',
    description: 'description',
  },
}: TAuthForm) {
  // console.log("frontmatter", frontmatter);
  const dispatch = useDispatch();
  const canResetPassword = false;
  return (
    <Card>
      <CardHeader
        avatar={
          <>
            <Tooltip title={`${config.app} Home`}>
              <IconButton onClick={() => dispatch(navigateTo('/'))}>
                <Avatar src={config.images.favicon} alt={config.app} />
              </IconButton>
            </Tooltip>
          </>
        }
        action={
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
            mb: 1,
            mx: 1,
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          sx={{
            mb: 1,
            mx: 1,
          }}
        />
      </CardContent>

      <CardActions sx={{}}>
        <Box sx={{ flexGrow: 1 }} />
        {canResetPassword && <Box>
          <Button
            sx={{ ml: 1 }}
            onClick={() => {
              console.log('Password?');
            }}
          >
            Password?
          </Button>
        </Box>}
        

        <Box sx={{}}>
          <Button
            variant="contained"
            sx={{ mx: 1 }}
            onClick={() => {
              console.log('Sign In');
            }}
          >
            Sign In
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

/* 
<pre>authModalMode: {JSON.stringify(authModalMode, null, 2)}</pre> 
*/
