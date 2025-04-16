'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Divider,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@mui/material';
import { Icon } from '../';
import { useKey } from '../../goldlabel/features/Uberedux';
import {
  Featured,
} from '../'

type ContextNavProps = {
  onClose?: () => void;
};

export default function ContextNav({
  onClose = () => {
    console.log('No onClose found');
  },
}: ContextNavProps) {
  const router = useRouter();
  const [darkmode, setDarkmode] = useKey('darkmode');

  const handleItemClick = (clickObj: { route?: string; action?: string }) => {
    if (clickObj.route) {
      router.push(clickObj.route);
      onClose();
    }
    if (clickObj.action) {
      switch (clickObj.action) {
        case 'TOGGLE_DARKMODE':
          setDarkmode(!darkmode);
          onClose();
          break;
        case 'CLOSE_DIALOG':
          onClose();
          break;
      }
    }
    if (!clickObj.route && !clickObj.action) {
      onClose();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <List dense>
            <ListItemButton onClick={() => handleItemClick({ route: '/' })}>
              <ListItemIcon>
                <Icon icon="home" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton onClick={() => handleItemClick({ route: '/work' })}>
              <ListItemIcon>
                <Icon icon="work" />
              </ListItemIcon>
              <ListItemText primary="Work" />
            </ListItemButton>
            <ListItemButton onClick={() => handleItemClick({ route: '/life' })}>
              <ListItemIcon>
                <Icon icon="life" />
              </ListItemIcon>
              <ListItemText primary="Life" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleItemClick({ route: '/balance' })}
            >
              <ListItemIcon>
                <Icon icon="balance" />
              </ListItemIcon>
              <ListItemText primary="Balance" />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleItemClick({ route: '/sitemap' })}
            >
              <ListItemIcon>
                <Icon icon="sitemap" />
              </ListItemIcon>
              <ListItemText primary="Sitemap" />
            </ListItemButton>


          </List>



        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Featured />
          <Divider />
          <List dense>
            <ListItemButton
              onClick={() => handleItemClick({ route: '/admin' })}
            >
              <ListItemIcon>
                <Icon icon="admin" />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleItemClick({ action: 'TOGGLE_DARKMODE' })}
            >
              <ListItemIcon>
                <Icon icon={darkmode ? 'lightmode' : 'darkmode'} />
              </ListItemIcon>
              <ListItemText primary={darkmode ? 'Light Mode' : 'Dark Mode'} />
            </ListItemButton>

            <ListItemButton
              onClick={() => handleItemClick({ route: '/uberedux' })}
            >
              <ListItemIcon>
                <Icon icon="js" />
              </ListItemIcon>
              <ListItemText primary="Uberedux" />
            </ListItemButton>


            <ListItemButton
              onClick={() => handleItemClick({ route: '/api/goldlabel' })}
            >
              <ListItemIcon>
                <Icon icon="techstack" />
              </ListItemIcon>
              <ListItemText primary="API" />
            </ListItemButton>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
