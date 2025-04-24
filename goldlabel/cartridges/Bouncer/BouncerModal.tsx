'use client';
import config from '../../config.json';
import * as React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  useMediaQuery,
  useTheme,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Icon } from '../../';
import { useKey } from '../../cartridges/Uberedux';

export type IBouncerModal = {
  onClose?: () => void;
};

export default function BouncerModal({}: IBouncerModal) {
  const [authModalOpen, setAuthModalOpen] = useKey('authModalOpen');
  const [authModalMode, setAuthModalMode] = useKey('authModalMode');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={authModalOpen as boolean}
      onClose={() => {
        setAuthModalOpen(false);
      }}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      sx={{
        '& .MuiDialog-paper': {
          m: fullScreen ? 0 : 2,
          borderRadius: fullScreen ? 0 : 2,
        },
      }}
    >
      <DialogTitle>
        <Typography
          sx={{
            mt: 2,
          }}
        >
          {config.appTitle}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        {authModalMode === 'login' ? (
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
        ) : null}

        <Button
          size="small"
          sx={{}}
          color="inherit"
          variant="text"
          onClick={() => {
            setAuthModalMode('create');
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
            setAuthModalMode('reset');
          }}
        >
          New password
        </Button>

        <Button
          sx={{
            ml: 1,
          }}
          variant="contained"
        >
          Login
        </Button>

        {/* <pre>authModalMode: {JSON.stringify(authModalMode, null, 2)}</pre> */}
      </DialogContent>

      <DialogActions sx={{ p: 1 }}>
        <IconButton
          onClick={() => {
            setAuthModalOpen(false);
          }}
        >
          <Icon icon="close" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
