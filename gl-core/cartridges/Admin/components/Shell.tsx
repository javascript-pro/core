'use client';

import React from 'react';
import config from '../../../config.json';
import { styled, Theme as TTheme, CSSObject } from '@mui/material/styles';
import {
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  Divider,
  IconButton,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CardHeader,
  Typography,
} from '@mui/material';
import { Icon, useDispatch } from '../../../../gl-core';
import { useRouter, usePathname } from 'next/navigation';
import { useNav } from '../../Admin';

const drawerWidth = 220;
const defaultIcon = 'settings';

const openedMixin = (theme: TTheme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: `1px solid ${theme.palette.divider}`,
});

const closedMixin = (theme: TTheme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export function Shell({ children }: { children: React.ReactNode }) {
  const nav = useNav();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleClick = (item: any) => {
    if (item.route) {
      router.push(item.route);
    } else if (item.action && typeof item.action === 'string') {
      try {
        const actionFn = require('../../Admin')[item.action];
        if (typeof actionFn === 'function') {
          dispatch(actionFn());
        } else {
          console.warn(`Action "${item.action}" is not a valid function`);
        }
      } catch (err) {
        console.error(`Failed to dispatch action "${item.action}"`, err);
      }
    }
  };

  const renderNavItems = () =>
    nav.map((item, idx) => {
      const key = item.route || item.url || `${item.label}-${idx}`;
      const isExternal = Boolean(item.url);
      const href = item.route || item.url || '#';
      const isActive = pathname === item.route;

      return (
        <ListItem key={key} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => handleClick(item)}
            href={!item.route && isExternal ? href : undefined}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            disabled={isActive}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Icon icon={(item.icon || defaultIcon) as any} color="primary" />
            </ListItemIcon>
            <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      );
    });

  return (
    <>
      <AppBar
        color="default"
        position="fixed"
        open={open}
        elevation={1}
        sx={{ boxShadow: 0 }}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 3, ...(open && { display: 'none' }) }}
          >
            <Icon icon="right" />
          </IconButton>
          <CardHeader
            sx={{ flexGrow: 1 }}
            title={
              <Typography variant="h6" color="primary">
                {config.app} Admin
              </Typography>
            }
            action={
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ mr: 1 }}>
                  <IconButton
                    onClick={() => {
                      router.push('/');
                    }}
                  >
                    <Icon icon="home" />
                  </IconButton>
                </Box>
              </Box>
            }
          />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <Icon icon="left" />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{renderNavItems()}</List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </>
  );
}
