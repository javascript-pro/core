// goldlabel/types/nav.ts

export type NavItem = {
    title: string
    slug: string
    type: 'file' | 'folder'
    order?: number
    icon?: string
    excerpt?: string
    children?: NavItem[]
  }
  