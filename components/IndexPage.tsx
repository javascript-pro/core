'use client'

import Link from 'next/link'

type TreeNode = {
  type: 'file' | 'folder'
  name: string
  slug?: string
  children?: TreeNode[]
}

type Props = {
  section: string
  tree: TreeNode[] | null
}

export default function IndexPage({ section, tree }: Props) {
  if (!tree) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">No content found in /{section}</h1>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 capitalize">{section}</h1>
      <ul className="space-y-2">{renderTree(tree)}</ul>
    </div>
  )
}

function renderTree(tree: TreeNode[], depth = 0): React.ReactElement[] {
  return tree.map((node, index) => {
    const indentClass = `pl-${depth * 4}`
    if (node.type === 'file' && node.slug) {
      return (
        <li key={index} className={indentClass}>
          <Link href={node.slug}>
            <span className="block py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200">
              {node.name}
            </span>
          </Link>
        </li>
      )
    }

    if (node.type === 'folder' && node.children) {
      return (
        <li key={index} className={indentClass}>
          <div className="font-semibold">{node.name}</div>
          <ul className="space-y-1">{renderTree(node.children, depth + 1)}</ul>
        </li>
      )
    }

    return <></>
  })
}
