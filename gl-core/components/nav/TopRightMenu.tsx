'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
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
  toggleFeedback,
  resetUberedux,
  ShareMenu,
  useVersion,
  ModeSwitch,
  routeTo,
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

  const handleFactorySettings = () => {
    dispatch(resetUberedux());
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
            handleFactorySettings();
          }}
        >
          <ListItemIcon>
            <Icon icon="reset" />
          </ListItemIcon>
          <ListItemText primary="Factory settings" />
        </MenuItem>

        <MenuItem
          sx={{ my: 2 }}
          onClick={(e) => {
            dispatch(routeTo('/fallmanager', router));
          }}
        >
          <ListItemIcon>
            <Icon icon="clients" />
          </ListItemIcon>
          <ListItemText primary="Fallmanager" />
        </MenuItem>

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

        <ModeSwitch />

        {user ? (
          <MenuItem onClick={handleSignout} sx={{ mt: 1 }}>
            <ListItemIcon>
              <Icon icon="signout" />
            </ListItemIcon>
            <ListItemText primary={user.email} />
          </MenuItem>
        ) : null}

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
