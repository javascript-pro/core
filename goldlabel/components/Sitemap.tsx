'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { Icon } from '#/goldlabel'

export type SitemapProps = {
  globalNav: NavItem[]
}

type NavItem = {
  title: string
  slug: string
  order: number
  icon: string
  type: 'file' | 'folder'
  excerpt?: string
  tags?: string[]
  children?: NavItem[]
}

export default function Sitemap({ globalNav }: SitemapProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    globalNav.forEach(item => {
      if (item.type === 'folder') {
        const slug = item.slug.startsWith('/') ? item.slug : `/${item.slug}`
        initial[slug] = true
      }
    })
    return initial
  })

  const toggleFolder = (slug: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [slug]: !prev[slug],
    }))
  }

  const renderList = (items: NavItem[], parentPath = '', depth = 0) => {
    const sorted = [...items].sort((a, b) => a.order - b.order)
    const indent = 2 + depth * 2 // e.g. pl: 2 for top-level, 4, 6, etc.

    return (
      <List component="div" disablePadding>
        {sorted.map((item) => {
          const fullPath = item.slug.startsWith('/') ? item.slug : `/${item.slug}`
          const isOpen = openFolders[fullPath] ?? false

          if (item.type === 'folder') {
            return (
              <React.Fragment key={fullPath}>
                <Box display="flex" alignItems="center" sx={{ pl: indent }}>
                  <ListItemButton onClick={() => toggleFolder(fullPath)} sx={{ flexGrow: 1 }}>
                    <ListItemIcon>
                      <Icon icon={item.icon as any || 'folder'} />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <IconButton
                    component={Link}
                    href={fullPath}
                    aria-label={`Go to ${item.title}`}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <ChevronRight fontSize="small" />
                  </IconButton>
                </Box>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  {renderList(item.children || [], fullPath, depth + 1)}
                </Collapse>
              </React.Fragment>
            )
          }

          return (
            <ListItemButton
              key={fullPath}
              component={Link}
              href={fullPath}
              sx={{ pl: indent + 2 }}
            >
              <ListItemIcon>
                <Icon icon={item.icon as any || 'description'} />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          )
        })}
      </List>
    )
  }

  return (
    <Box sx={{ px: 2 }}>
      {renderList(globalNav)}
    </Box>
  )
}
