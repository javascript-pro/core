'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Icon } from '../'

type ContextNavProps = {
  onClose?: () => void
};

export default function ContextNav({ 
  onClose = () => {
    console.log("NO onClose found")
  }
}: ContextNavProps) {
  
  const router = useRouter()

  const onItemClick = (clickObj: { route?: string, action?: string }) => {
   // console.log("onItemClick", clickObj)

    if (clickObj.route) {
      router.push(clickObj.route)
    }

    if (clickObj.action) {
      if (clickObj.action === 'CLOSEDIALOG') {
        onClose()
      }
    } else {
      onClose()
    }
  }

  return (
    <Box sx={{}}>


      <List dense>

        <ListItemButton onClick={() => onItemClick({ route: "/" })}>
          <ListItemIcon>
            <Icon icon="home" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => onItemClick({ route: "/account" })}>
          <ListItemIcon>
            <Icon icon="account" />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItemButton>

        <ListItemButton onClick={() => onItemClick({ route: "/work" })}>
          <ListItemIcon>
            <Icon icon="work" />
          </ListItemIcon>
          <ListItemText primary="Work" />
        </ListItemButton>

        <ListItemButton onClick={() => onItemClick({ route: "/life" })}>
          <ListItemIcon>
            <Icon icon="life" />
          </ListItemIcon>
          <ListItemText primary="Life" />
        </ListItemButton>

        <ListItemButton onClick={() => onItemClick({ route: "/balance" })}>
          <ListItemIcon>
            <Icon icon="balance" />
          </ListItemIcon>
          <ListItemText primary="Balance" />
        </ListItemButton>
      </List>
    </Box>
  )
}
