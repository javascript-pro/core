// /Users/goldlabel/GitHub/core/gl-core/components/nav/ThumbMenu.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
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
  useIsMobile,
  reset,
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const version = useVersion();
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

  return (
    <>
      {/* Floating Action Button in bottom-right corner */}
      <IconButton
        color="primary"
        onClick={handleClick}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 2,
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Icon icon="fingerprint" />
      </IconButton>

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
          sx={{ mt: 2, minWidth: 200 }}
          onClick={() => {
            dispatch(routeTo('/', router));
          }}
        >
          <ListItemIcon>
            <Icon icon="home" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </MenuItem>

        {/* Theme Switcher */}
        <ModeSwitch />

        <MenuItem
          onClick={() => {
            dispatch(routeTo('/bad-panda', router));
          }}
        >
          <ListItemIcon>
            <Icon icon="bug" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Bad panda" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            dispatch(reset());
          }}
        >
          <ListItemIcon>
            <Icon icon="reset" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Reset" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            dispatch(routeTo('/work/goldlabel/cartridges/flash', router));
          }}
        >
          <ListItemIcon>
            <Icon icon="flash" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Flash" />
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
            <Icon icon="share" color="primary" />
            <Typography variant="h6">Share</Typography>
          </Box>
          <IconButton onClick={handleShareClose}>
            <Icon icon="close" color="primary" />
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
