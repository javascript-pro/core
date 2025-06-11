'use client';
import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from '@mui/material';
import {
  Icon,
  useDispatch,
  navigateTo,
  ShareMenu,
  useVersion,
} from '../../../gl-core';
import { firebaseAuth, useUser } from '../../cartridges/Bouncer';

export type TTopRightMenu = {
  frontmatter?: {
    title?: string;
    description?: string;
    icon?: string;
  } | null;
  [key: string]: any;
};

export default function TopRightMenu({ frontmatter = null }: TTopRightMenu) {
  const dispatch = useDispatch();
  const user = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [shareOpen, setShareOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const version = useVersion();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShareOpen(false);
  };

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="more" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <CardHeader
          sx={{ width: 275 }}
          avatar={<Icon icon={frontmatter?.icon as any} />}
          title={<Typography variant="body1">{frontmatter?.title}</Typography>}
          subheader={
            <Typography variant="body2">{frontmatter?.description}</Typography>
          }
        />

        <MenuItem
          sx={{ my: 2 }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setShareOpen((prev) => !prev);
          }}
        >
          <ListItemIcon>
            <Icon icon="share" />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </MenuItem>

        <Collapse in={shareOpen} timeout="auto" unmountOnExit>
          <Box sx={{ px: 2, pt: 1 }}>
            <ShareMenu frontmatter={frontmatter} />
          </Box>
        </Collapse>

        {user ? (
          <MenuItem onClick={handleSignout}>
            <ListItemIcon>
              <Icon icon="signout" />
            </ListItemIcon>
            <ListItemText secondary={user.email} primary={'Sign Out'} />
          </MenuItem>
        ) : null}


        <MenuItem
          sx={{ my: 2 }}
          onClick={(e) => {
            // e.stopPropagation();
            // e.preventDefault();
            // setShareOpen((prev) => !prev);
            console.log("factorySettings")
          }}
        >
          <ListItemIcon>
            <Icon icon="reset" />
          </ListItemIcon>
          <ListItemText primary="Factory settings" />
        </MenuItem>

        <Box sx={{ pr: 3, py: 1, textAlign: 'right' }}>
          <Typography
            sx={{
              width: '100%',
              flexGrow: 1,
            }}
            variant="caption"
          >
            vs {version}
          </Typography>
        </Box>
      </Menu>
    </>
  );
}
