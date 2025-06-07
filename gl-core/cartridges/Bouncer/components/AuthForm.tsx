'use client';
// core/gl-core/cartridges/Bouncer/components/AuthForm.tsx
import * as React from 'react';
import config from '../../../config.json';
import {
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { TAuthForm } from '../../Bouncer';

export default function AuthForm({}: TAuthForm) {
  return (
    <>
      <DialogTitle>
        <Typography
          sx={{
            mt: 2,
          }}
        >
          {config.app} Auth Form
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        <>
          <TextField
            fullWidth
            id="email"
            sx={{
              mb: 2,
            }}
            label="Email"
          />
          <TextField
            fullWidth
            id="password"
            sx={{
              mb: 2,
            }}
            label="Password"
            type="password"
          />
        </>

        <Button
          size="small"
          sx={{}}
          color="inherit"
          variant="text"
          onClick={() => {
            console.log('New Account');
          }}
        >
          New Account
        </Button>

        <Button
          size="small"
          sx={{}}
          color="inherit"
          variant="text"
          onClick={() => {
            console.log('Reset password');
          }}
        >
          Reset password
        </Button>

        <Button sx={{ ml: 1 }} variant="contained">
          Login
        </Button>

        {/* <pre>authModalMode: {JSON.stringify(authModalMode, null, 2)}</pre> */}
      </DialogContent>
    </>
  );
}
