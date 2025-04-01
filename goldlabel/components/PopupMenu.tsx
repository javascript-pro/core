'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { Icon } from '#/goldlabel';

type MenuItem = {
  title: string;
  slug: string;
  type: 'file' | 'folder';
  order?: number;
  icon?: string;
  excerpt?: string;
  children?: MenuItem[];
};

type PopupMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function PopupMenu({ open, onClose }: PopupMenuProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);

  React.useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/globalNav.json');
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error('Failed to load globalNav.json', err);
      }
    };
    fetchMenu();
  }, []);

  const renderItem = (item: MenuItem, depth = 0, index = 0) => {
    if (item.type === 'folder') {
      return (
        <Accordion
          key={item.slug}
          defaultExpanded={depth === 0 && index === 0}
          sx={{ boxShadow: 0, ml: depth * 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Icon icon={item.icon as any} />
            </ListItemIcon>
            <Typography fontWeight="bold">{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              <ListItemButton
                component={Link}
                href={`/${item.slug}`}
                onClick={onClose}
                sx={{ ml: (depth + 1) * 2 }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Icon icon="right" />
                </ListItemIcon>
              </ListItemButton>

              {[...(item.children || [])]
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((child, i) => renderItem(child, depth + 1, i))}
            </List>
          </AccordionDetails>
        </Accordion>
      );
    }

    return (
      <Tooltip key={item.slug} title={item.excerpt || ''} arrow placement="right">
        <ListItemButton
          component={Link}
          href={`/${item.slug}`}
          sx={{ ml: depth * 2 }}
          onClick={onClose}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Icon icon={item.icon as any} />
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </Tooltip>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          m: fullScreen ? 0 : 2,
          borderRadius: fullScreen ? 0 : 2,
        },
      }}
    >
      <DialogTitle sx={{ border: 0 }}>
        <Typography>&nbsp;</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 16, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {menuItems.length === 0 ? (
          <Typography variant="body2">Loading menu...</Typography>
        ) : (
          menuItems
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((item, i) => renderItem(item, 0, i))
        )}
      </DialogContent>
    </Dialog>
  );
}
