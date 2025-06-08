'use client';

import * as React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';
import {
  Box,
  Typography,
  CardHeader,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon } from '../../../gl-core';

export type TShareMenu = {
  frontmatter?: any;
  [key: string]: any;
};

export default function ShareMenu({ frontmatter = null }: TShareMenu) {
  const [copied, setCopied] = React.useState(false);
  const { title, description, icon } = frontmatter;
  const fullWidth = { display: 'block' };
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <CardHeader
        avatar={<Icon icon={icon as any} />}
        title={<Typography variant="h6">{title}</Typography>}
        // subheader={<Typography>{description}</Typography>}
      />

      <MenuItem
        onClick={() => {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1500);
        }}
      >
        <ListItemIcon>
          <Icon icon="copy" />
        </ListItemIcon>
        <ListItemText primary={copied ? 'Copied!' : 'Copy Link'} />
      </MenuItem>

      <MenuItem sx={{ p: 0 }}>
        <FacebookShareButton url={url} style={fullWidth}>
          <Box display="flex" alignItems="center" px={2} py={1}>
            <ListItemIcon>
              <Icon icon="facebook" />
            </ListItemIcon>
            <ListItemText primary="Facebook" />
          </Box>
        </FacebookShareButton>
      </MenuItem>

      <MenuItem sx={{ p: 0 }}>
        <LinkedinShareButton
          url={url}
          title={title}
          summary={description}
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

      <MenuItem sx={{ p: 0 }}>
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
    </>
  );
}
