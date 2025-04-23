'use client';
import * as React from 'react';
import { 
  Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Icon } from '../';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';

export interface IShare {
  anyKey?: any;
}

export default function Share() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = 'Check this out!';

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton 
        
        onClick={handleClick}>
        <Icon icon={'share' as any} />
      </IconButton>

      <Menu 
        anchorEl={anchorEl} 
        open={open} 
        onClose={handleClose}
      >
      
        <MenuItem
          sx={{
            minWidth: 250,
          }}
        >
          <FacebookShareButton url={url} title={title}>
            <ListItemText primary="Facebook" />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem>
          <TwitterShareButton url={url} title={title}>
            <ListItemText>Twitter</ListItemText>
          </TwitterShareButton>
        </MenuItem>
        <MenuItem>
          <LinkedinShareButton url={url} title={title}>
            <ListItemText>LinkedIn</ListItemText>
          </LinkedinShareButton>
        </MenuItem>
        <MenuItem>
          <WhatsappShareButton url={url} title={title}>
            <ListItemText>WhatsApp</ListItemText>
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem>
          <EmailShareButton url={url} subject={title}>
            <ListItemText>Email</ListItemText>
          </EmailShareButton>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(url);
            handleClose();
          }}
        >
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open('about:blank', '_blank'); // placeholder for Messenger or bookmark
            handleClose();
          }}
        >
          <ListItemText>Bookmark</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
