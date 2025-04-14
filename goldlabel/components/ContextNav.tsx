'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
} from '@mui/material'
import { Icon } from '../'
import { useKey } from '../../lib/useKey'

type ContextNavProps = {
  onClose?: () => void
};

export default function ContextNav({ 
  onClose = () => {
    console.log("NO onClose found")
  }
}: ContextNavProps) {
  
  const router = useRouter()
  const [darkmode, setDarkmode] = useKey('darkmode')

  const handleItemClick = (clickObj: { route?: string, action?: string }) => {
    if (clickObj.route) {
      router.push(clickObj.route)
    }
    if (clickObj.action) {
      switch (clickObj.action) {
        case 'TOGGLE_DARKMODE':
          setDarkmode(!darkmode)
          break
        case 'CLOSE_DIALOG':
          onClose()
          break
      }
    }
    if (!clickObj.route && !clickObj.action) {
      onClose()
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Typography variant='button'>Settings</Typography>
          <List dense>
            <ListItemButton onClick={() => handleItemClick({ route: "/admin" })}>
              <ListItemIcon>
                <Icon icon="admin" />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItemButton>

            <ListItemButton onClick={() => handleItemClick({ action: 'TOGGLE_DARKMODE' })}>
              <ListItemIcon>
                <Icon icon={darkmode ? 'lightmode' : 'darkmode'} />
              </ListItemIcon>
              <ListItemText primary={darkmode ? 'Light Mode' : 'Dark Mode'} />
            </ListItemButton>
          </List>
        </Grid>

        <Grid size={6}>
          <Typography variant='button'>Nav</Typography>
          <List dense>
            
            <ListItemButton onClick={() => handleItemClick({ route: "/work" })}>
              <ListItemIcon>
                <Icon icon="work" />
              </ListItemIcon>
              <ListItemText primary="Work" />
            </ListItemButton>
            <ListItemButton onClick={() => handleItemClick({ route: "/life" })}>
              <ListItemIcon>
                <Icon icon="life" />
              </ListItemIcon>
              <ListItemText primary="Life" />
            </ListItemButton>
            <ListItemButton onClick={() => handleItemClick({ route: "/balance" })}>
              <ListItemIcon>
                <Icon icon="balance" />
              </ListItemIcon>
              <ListItemText primary="Balance" />
            </ListItemButton>
            <ListItemButton onClick={() => handleItemClick({ route: "/" })}>
              <ListItemIcon>
                <Icon icon="left" />
              </ListItemIcon>
              {/* <ListItemText primary="Home" /> */}
            </ListItemButton>
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}
