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
import { Icon } from '#/goldlabel'
import { NavItem } from '#/goldlabel/types/nav' // ✅ shared type

export type SitemapProps = {
  globalNav?: NavItem[] | null
  openTopLevelByDefault?: number // now a number (default = 1)
  onClose?: () => void
}

// Simplified FolderItem: no viewport scrolling
function FolderItem({
  item,
  fullPath,
  indent,
  depth,
  isOpen,
  toggleFolder,
  renderList,
}: {
  item: NavItem
  fullPath: string
  indent: number
  depth: number
  isOpen: boolean
  toggleFolder: (slug: string) => void
  renderList: (items: NavItem[], parentPath: string, depth: number) => React.ReactNode
}) {
  return (
    <React.Fragment>
      <Box display="flex" alignItems="center" sx={{ pl: indent }}>
        <ListItemButton onClick={() => toggleFolder(fullPath)} sx={{ flexGrow: 1 }}>
          <ListItemText primary={item.title} />
          {isOpen ? (
            <Icon icon="up" color="secondary" />
          ) : (
            <Icon icon="down" color="secondary" />
          )}
        </ListItemButton>
        <IconButton component={Link} href={fullPath} aria-label={`Go to ${item.title}`}>
          <Icon icon="right" color="secondary" />
        </IconButton>
      </Box>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {renderList(item.children || [], fullPath, depth + 1)}
      </Collapse>
    </React.Fragment>
  )
}

export default function Sitemap({
  onClose = () => {},
  globalNav,
  openTopLevelByDefault = 0,
}: SitemapProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({})

  const toggleFolder = (slug: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [slug]: !prev[slug],
    }))
  }

  const renderList = (items: NavItem[], parentPath = '', depth = 0) => {
    const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    const indent = 2 + depth * 2

    return (
      <List component="div" disablePadding>
        {sorted.map((item) => {
          const fullPath = item.slug.startsWith('/') ? item.slug : `/${item.slug}`
          const isToggled = openFolders[fullPath]
          const isOpen =
            typeof isToggled === 'boolean'
              ? isToggled
              : depth < openTopLevelByDefault

          if (item.type === 'folder') {
            return (
              <FolderItem
                key={fullPath}
                item={item}
                fullPath={fullPath}
                indent={indent}
                depth={depth}
                isOpen={isOpen}
                toggleFolder={toggleFolder}
                renderList={renderList}
              />
            )
          }

          return (
            <ListItemButton
              key={fullPath}
              component={Link}
              href={fullPath}
              onClick={onClose}
              sx={{ pl: indent + 2 }}
            >
              <ListItemIcon>
                <Icon icon={item.icon as any || 'doc'} color="secondary" />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          )
        })}
      </List>
    )
  }

  if (!globalNav || globalNav.length === 0) {
    return <Box sx={{ px: 2 }}>No navigation available.</Box>
  }

  return <Box sx={{ px: 0 }}>{renderList(globalNav)}</Box>
}
