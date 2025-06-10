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
    setShareOpen(false); // collapse share section when closing menu
  };

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  const handleAdmin = () => {
    dispatch(navigateTo('/admin'));
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
        {/* <MenuItem
          sx={{
            my: 2,
          }}
          onClick={handleAdmin}
        >
          <ListItemIcon>
            <Icon icon="admin" />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </MenuItem> */}

        {user ? (
          <MenuItem onClick={handleSignout}>
            <ListItemIcon>
              <Icon icon="signout" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </MenuItem>
        ) : null}
        <Card>
          <CardHeader
            sx={{ width: 275 }}
            avatar={<Icon icon={frontmatter?.icon as any} />}
            title={<Typography variant="h6">{frontmatter?.title}</Typography>}
          />
        </Card>

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

        <Box sx={{ px: 2, py: 1 }}>
          {user?.email && (
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          )}
          <Typography variant="caption">vs {version}</Typography>
        </Box>
      </Menu>
    </>
  );
}
