'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '#/components/Breadcrumb';
import { useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import navItems from '#/public/globalNav.json';

import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type NavNode = {
  title: string;
  slug: string;
  order?: number;
  icon?: string;
  children?: NavNode[];
};

const drawerWidth = 240;

export function GlobalNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const segment = useSelectedLayoutSegment();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerContent = (
    <Box sx={{ width: drawerWidth, p: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <Image
            priority
            src="/svg/favicon_black.svg"
            width={40}
            height={40}
            alt="Goldlabel Core"
          />
        </Link>
      </Box>
      <List>
        {navItems[0]?.children?.map((item: NavNode) => (
          <NavItem
            key={item.slug}
            item={item}
            depth={1}
            close={() => setMobileOpen(false)}
            currentSegment={segment}
          />
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar 
        position="fixed"
        color="default"
        sx={{ 
          boxShadow: 0,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" passHref>
            <IconButton edge="start" color="inherit" aria-label="home">
              <Image
                priority
                src="/svg/favicon_black.svg"
                width={32}
                height={32}
                alt="Goldlabel Core"
              />
            </IconButton>
          </Link>

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="end"
              onClick={toggleDrawer}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
        <Drawer
          anchor="right"
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Breadcrumb />
      </Box>
    </Box>
  );
}

function NavItem({
  item,
  depth,
  close,
  currentSegment,
}: {
  item: NavNode;
  depth: number;
  close: () => void;
  currentSegment: string | null;
}) {
  const href = item.slug.startsWith('/') ? item.slug : `/${item.slug}`;
  const isActive = currentSegment === item.slug.split('/').pop();
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const theme = useTheme();

  const indent = theme.spacing(1 * depth); // reduce nesting indent

  if (hasChildren) {
    return (
      <Accordion
        disableGutters
        square
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          pl: indent,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1" fontWeight="bold">
            {item.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <List disablePadding>
            {item.children!.map((child) => (
              <NavItem
                key={child.slug}
                item={child}
                depth={depth + 1}
                close={close}
                currentSegment={currentSegment}
              />
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <ListItem disablePadding sx={{ pl: indent }}>
      <ListItemButton
        component={Link}
        href={href}
        onClick={close}
        selected={isActive}
      >
        <ListItemText primary={item.title} />
      </ListItemButton>
    </ListItem>
  );
}
