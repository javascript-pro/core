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
  resetUberedux,
  ShareMenu,
  useVersion,
  ModeSwitch,
  routeTo,
  toggleHideImage,
  useSlice,
  useIsMobile,
  ArrowMenu,
} from '../../../gl-core';
import { firebaseAuth } from '../../cartridges/Bouncer';

export type TTopRightMenu = {
  frontmatter?: {
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
  } | null;
  [key: string]: any;
};

export default function TopRightMenu({ frontmatter = null }: TTopRightMenu) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { hideImage } = useSlice();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const version = useVersion();

  // Use gl-core’s hook for mobile detection
  const isMobile = useIsMobile();

  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
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
            dispatch(routeTo('/', router));
          }}
          sx={{ my: 2 }}
        >
          <ListItemIcon>
            <Icon icon="home" />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </MenuItem>

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

        {/* Share Menu triggers dialog */}
        <MenuItem
          sx={{ width: 250, my: 2 }}
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

        <Box sx={{ my: 1, mx: 2 }}>
          <ArrowMenu />
        </Box>

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
                <>
                  <Image
                    src={frontmatter.image}
                    alt={frontmatter.title || 'Featured image'}
                    width={1200}
                    height={630}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </>
              )}
            </Box>
          )}
          <ShareMenu frontmatter={frontmatter} />
        </DialogContent>
      </Dialog>
    </>
  );
}
