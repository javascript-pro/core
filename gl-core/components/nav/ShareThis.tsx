'use client';

import * as React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';
import { Box, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MightyButton, Icon } from '../../../gl-core';

export type TShareThis = {
  title?: string;
  description?: string;
  excerpt?: string;
  body?: string;
  image?: string;
  url?: string;
};

export default function ShareThis({
  title = 'Check this out',
  description = '',
  excerpt = '',
  url = typeof window !== 'undefined' ? window.location.href : '',
}: TShareThis) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [copied, setCopied] = React.useState(false);
  const open = Boolean(anchorEl);

  const buttonRef = React.useRef<HTMLSpanElement | null>(null);

  const handleClick = () => {
    if (buttonRef.current) {
      setAnchorEl(buttonRef.current);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fullWidth = { display: 'block', width: '100%' };

  return (
    <>
      <Box component="span" ref={buttonRef}>
        <MightyButton
          mode="icon"
          color="secondary"
          label="Share"
          icon="share"
          onClick={handleClick}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
              handleClose();
            }, 1500);
          }}
        >
          <ListItemIcon>
            <Icon icon="copy" />
          </ListItemIcon>
          <ListItemText primary={copied ? 'Copied!' : 'Copy Link'} />
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ p: 0 }}>
          <FacebookShareButton url={url} style={fullWidth}>
            <Box display="flex" alignItems="center" px={2} py={1}>
              <ListItemIcon>
                <Icon icon="facebook" />
              </ListItemIcon>
              <ListItemText primary="Facebook" />
            </Box>
          </FacebookShareButton>
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ p: 0 }}>
          <LinkedinShareButton
            url={url}
            title={title}
            summary={description || excerpt}
            source="Goldlabel"
            style={fullWidth}
          >
            <Box display="flex" alignItems="center" px={2} py={1}>
              <ListItemIcon>
                <Icon icon="linkedin" />
              </ListItemIcon>
              <ListItemText primary="LinkedIn" />
            </Box>
          </LinkedinShareButton>
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ p: 0 }}>
          <WhatsappShareButton
            url={url}
            title={title}
            separator=" - "
            style={fullWidth}
          >
            <Box display="flex" alignItems="center" px={2} py={1}>
              <ListItemIcon>
                <Icon icon="whatsapp" />
              </ListItemIcon>
              <ListItemText primary="WhatsApp" />
            </Box>
          </WhatsappShareButton>
        </MenuItem>
      </Menu>
    </>
  );
}
