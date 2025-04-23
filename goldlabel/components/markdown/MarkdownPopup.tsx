'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  CardHeader,
} from '@mui/material';
import { Icon } from '../../';

export type MarkdownPopupProps = {
  icon: string;
  title: string;
  markdown: string;
};

export default function MarkdownPopup({
  icon = 'settings',
  title = 'Title',
  markdown = '> Nothing to see here',
}: MarkdownPopupProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box>
        <Dialog open={open} fullWidth>
          <DialogTitle>
            <CardHeader avatar={<Icon icon={icon as any} />} title={title} />
          </DialogTitle>
          <DialogContent>{markdown}</DialogContent>
          <DialogActions>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Icon icon="close" />
              <Box sx={{ mx: 1 }}>Close</Box>
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Button 
          variant="outlined"
          color="error"
          onClick={() => {
            setOpen(true)
          }}>
          <Icon icon={icon as any} />
          <Box sx={{ mx: 1 }}>View our CV</Box>
        </Button> */}
      </Box>
    </>
  );
}
