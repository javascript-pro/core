'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
// import Link from 'next/link'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material'
import { Icon } from '#/goldlabel'
// import { NavItem } from '#/goldlabel/types/nav'

type ContextNavProps = {
}


export default function ContextNav({}: ContextNavProps) {
  const pathname = usePathname()

  return <Box sx={{ px: 0 }}>
            
            <Typography variant="button">
              Find
            </Typography>
            
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="home" />
                </ListItemIcon>
                <ListItemText 
                  primary="Home"
                />
              </ListItemButton>
            </List>
            <Divider sx={{mb:2}} />
            <Typography variant="button">
              Settings
            </Typography>
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="account" />
                </ListItemIcon>
                <ListItemText 
                  primary="Account"
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="settings" />
                </ListItemIcon>
                <ListItemText 
                  primary="Light Dark"
                />
              </ListItemButton>
            </List>
            <Divider sx={{mb:2}} />
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="close" />
              </ListItemIcon>
              <ListItemText 
                primary="Close"
              />
            </ListItemButton>

          </Box>
}
