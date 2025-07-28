'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CardHeader,
} from '@mui/material';
import {
  Icon,
  useDispatch,
  ShareMenu,
  useVersion,
  ModeSwitch,
  routeTo,
  toggleHideImage,
  useSlice,
  useIsMobile,
  useThemeMode,
} from '../../../gl-core';

export type TThumbMenu = {
  frontmatter?: {
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
  } | null;
  [key: string]: any;
};

export default function ThumbMenu({ frontmatter = null }: TThumbMenu) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { hideImage } = useSlice();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const version = useVersion();
  const isMobile = useIsMobile();
  const themeMode = useThemeMode(); // "light" or "dark"

  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleGithub = () => {
    dispatch(routeTo('https://github.com/javascript-pro/core', router));
    setAnchorEl(null);
  };

  const handleShareOpen = () => {
    setShareDialogOpen(true);
    handleCloseMenu();
  };

  const handleShareClose = () => {
    setShareDialogOpen(false);
  };

  const handleToggleHideImage = () => {
    dispatch(toggleHideImage(!hideImage));
  };

  return (
    <>
      {/* Floating Action Button in bottom-right corner */}
      <Fab
        color={themeMode === 'light' ? 'default' : 'primary'}
        onClick={handleClick}
        sx={{
          position: 'fixed',
          background: themeMode === 'light' ? 'white' : 'primary',
          bottom: 16,
          right: 16,
          boxShadow: 0,
          zIndex: (theme) => theme.zIndex.modal + 2,
        }}
      >
        <Icon icon="menu" />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ mt: -1 }}
      >
        <MenuItem
          onClick={() => {
            dispatch(routeTo('/admin', router));
          }}
        >
          <ListItemIcon>
            <Icon icon="admin" />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </MenuItem>

        {/* OG Image toggle */}
        <MenuItem onClick={handleToggleHideImage}>
          <ListItemIcon>
            <Icon icon="photo" />
          </ListItemIcon>
          <ListItemText
            primary={hideImage ? 'Show OG' : 'Show Flickr'}
          />
        </MenuItem>

        {/* Git Open Sourcce */}
        <MenuItem onClick={handleGithub}>
          <ListItemIcon>
            <Icon icon="github" />
          </ListItemIcon>
          <ListItemText
            primary="GitHub"
          />
        </MenuItem>

        {/* Theme Switcher */}
        <ModeSwitch />

        {/* Share Menu triggers dialog */}
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleShareOpen();
          }}
        >
          <ListItemIcon>
            <Icon icon="share" />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </MenuItem>

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

      {/* Share Dialog */}
      <Dialog
        open={shareDialogOpen}
        onClose={handleShareClose}
        fullScreen={isMobile}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="share" />
            <Typography variant="h6">Share</Typography>
          </Box>
          <IconButton onClick={handleShareClose}>
            <Icon icon="close" />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {frontmatter && (
            <Box sx={{ mb: 1 }}>
              <CardHeader
                avatar={
                  frontmatter.icon ? (
                    <Icon icon={frontmatter.icon as any} />
                  ) : undefined
                }
                title={frontmatter.title}
                subheader={frontmatter.description}
              />

              {frontmatter.image && (
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title || 'Featured image'}
                  width={1200}
                  height={630}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </Box>
          )}
          <ShareMenu frontmatter={frontmatter} />
        </DialogContent>
      </Dialog>
    </>
  );
}
