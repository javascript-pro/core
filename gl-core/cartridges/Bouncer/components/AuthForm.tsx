'use client';
// core/gl-core/cartridges/Bouncer/components/AuthForm.tsx
import * as React from 'react';
import {
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { Icon, navigateTo, useDispatch } from '../../../../gl-core';
import { TAuthForm } from '../../Bouncer';
import { updateFeedback } from '../../Bouncer/actions/updateFeedback';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AuthForm({
  frontmatter = {
    icon: 'settings',
    title: 'title',
    description: 'description',
  },
}: TAuthForm) {
  const dispatch = useDispatch();
  const canResetPassword = false;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const isFormValid = React.useMemo(() => {
    return isValidEmail(email) && password.length >= 6;
  }, [email, password]);

  React.useEffect(() => {
    if (!email && !password) {
      // dispatch(updateFeedback({
      //   severity: 'info',
      //   title: 'Waiting for Input',
      //   description: 'Please enter your email and password.',
      // }));
    } else if (!isValidEmail(email)) {
      dispatch(updateFeedback({
        severity: 'info',
        title: 'Please enter a valid email address',
      }));
    } else if (password.length < 6) {
      dispatch(updateFeedback({
        severity: 'info',
        title: 'Password must be at least 6 characters',
      }));
    } else {
      dispatch(updateFeedback(null));
    }
  }, [email, password, dispatch]);

  return (
    <Card>
      <CardHeader
        avatar={<Icon icon={frontmatter.icon} />}
        action={
          <IconButton onClick={() => dispatch(navigateTo('/'))}>
            <Icon icon={'close'} />
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 2 }}
        />
      </CardContent>

      <CardActions>
        {canResetPassword && (
          <Box>
            <Button onClick={() => console.log('Password?')}>
              Password?
            </Button>
          </Box>
        )}
          <Button
            fullWidth
            variant={isFormValid ? 'contained' : 'outlined'}
            disabled={!isFormValid}
            onClick={() => {
              console.log('Sign In');
            }}
          >
            Sign In
          </Button>
      </CardActions>
    </Card>
  );
}
