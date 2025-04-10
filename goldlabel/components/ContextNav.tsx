'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Icon } from '#/goldlabel'
import { NavItem } from '#/goldlabel/types/nav'

type ContextNavProps = {
  globalNav: NavItem[] | null
  parentDepth?: number
  onClose?: () => void
}

function joinPaths(...parts: string[]) {
  return parts.join('/').replace(/\/+/g, '/')
}

function findPathToSlug(
  nav: NavItem[],
  slug: string,
  path: NavItem[] = [],
  parentPath = ''
): NavItem[] | null {
  for (const item of nav) {
    const fullPath = item.slug.startsWith('/')
      ? item.slug
      : joinPaths(parentPath, item.slug)

    const newPath = [...path, item]

    if (fullPath === slug) return newPath

    if (item.children) {
      const found = findPathToSlug(item.children, slug, newPath, fullPath)
      if (found) return found
    }
  }
  return null
}

function trimTreeToPath(nav: NavItem[], path: NavItem[]): NavItem[] {
  if (path.length === 0) return []
  const [first, ...rest] = path
  const match = nav.find((item) => item.slug === first.slug)
  if (!match) return []
  const trimmedItem: NavItem = {
    ...match,
    children: rest.length > 0 && match.children
      ? trimTreeToPath(match.children, rest)
      : match.children,
  }
  return [trimmedItem]
}

export default function ContextNav({
  globalNav,
  parentDepth = 1,
  onClose = () => {},
}: ContextNavProps) {
  const pathname = usePathname()

  const renderList = (items: NavItem[], parentPath = '', depth = 0) => {
    const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    const indent = 2 + depth * 2

    return (
      <List component="div" disablePadding>
        {sorted.map((item) => {
          const fullPath = item.slug.startsWith('/')
            ? item.slug
            : joinPaths(parentPath, item.slug)

          return (
            <React.Fragment key={fullPath}>
              <ListItemButton
                component={Link}
                href={fullPath}
                onClick={onClose}
                selected={pathname === fullPath}
                sx={{ pl: indent + 2 }}
              >
                <ListItemIcon>
                  <Icon icon={item.icon as any || 'doc'} color="secondary" />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
              {item.children && item.children.length > 0
                ? renderList(item.children, fullPath, depth + 1)
                : null}
            </React.Fragment>
          )
        })}
      </List>
    )
  }

  if (!globalNav || globalNav.length === 0) {
    return (
      <Box sx={{ p: 2, color: 'text.secondary' }}>
        Navigation not found for this route.
      </Box>
    )
  }

  const pathToCurrent = findPathToSlug(globalNav, pathname)
  const relevantPath = pathToCurrent?.slice(-1 * parentDepth) || []
  const trimmedNav = trimTreeToPath(globalNav, relevantPath)

  return <Box sx={{ px: 0 }}>{renderList(trimmedNav)}</Box>
}
