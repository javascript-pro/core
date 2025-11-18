// /Users/goldlabel/GitHub/core/gl-core/components/nav/OpenSource.tsx
'use client';

import * as React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '../../cartridges/DesignSystem';

export default function OpenSource() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleVisitRepo = () => {
    window.open(
      'https://github.com/javascript-pro/core',
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <Box>
      <IconButton color="primary" onClick={handleOpen} aria-label="Open Source">
        <Icon icon="github" />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Free & Open Source
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{}}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This App is built with Goldlabel Core, an open-source repository you
            can explore, clone, or contribute to the codebase on GitHub.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleVisitRepo}
            startIcon={<Icon icon="github" />}
            sx={{ mt: 1 }}
          >
            View on GitHub
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
