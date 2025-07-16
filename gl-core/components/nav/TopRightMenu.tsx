'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Fab,
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
  resetUberedux,
  ShareMenu,
  useVersion,
  ModeSwitch,
  routeTo,
  toggleHideImage,
  useSlice,
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
  const router = useRouter();
  const user = useUser();
  const { hideImage } = useSlice();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [shareOpen, setShareOpen] = React.useState(true);
  const open = Boolean(anchorEl);
  const version = useVersion();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShareOpen(false);
  };

  const handleToggleHideImage = () => {
    dispatch(toggleHideImage(!hideImage));
  };

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  const handleFactorySettings = () => {
    dispatch(resetUberedux());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      {/* Floating Action Button in bottom-right corner */}
      <Fab
        color="primary"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: (theme) => theme.zIndex.modal + 2,
        }}
      >
        <Icon icon="menu" />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ mt: -1 }}
      >
        <MenuItem
          onClick={() => {
            dispatch(routeTo('/admin', router));
          }}
          sx={{ my: 2 }}
        >
          <ListItemIcon>
            <Icon icon="admin" />
          </ListItemIcon>
          <ListItemText primary={'Admin'} />
        </MenuItem>

        {/* Theme Switcher */}
        <ModeSwitch />

        {/* Share Menu */}
        <MenuItem
          sx={{ width: 250, my: 2 }}
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

        {/* <MenuItem onClick={handleToggleHideImage} sx={{ my: 2 }}>
          <ListItemIcon>
            <Icon icon="photo" />
          </ListItemIcon>
          <ListItemText primary={`${hideImage ? 'Show' : 'Hide'} image`} />
        </MenuItem> */}



        {/* App Version */}
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
