import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const MARKDOWN_ROOT = path.join(process.cwd(), 'public/markdown');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'globalNav.json');

type NavNode = {
  title: string;
  slug: string;
  order?: number;
  icon?: string;
  image?: string;
  type: 'folder' | 'file';
  tags?: string[];
  excerpt?: string;
  description?: string;
  children?: NavNode[];
};

function extractExcerpt(content: string): string {
  return content
    .replace(/<!--.*?-->/gs, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/`{1,3}.*?`{1,3}/gs, '')
    .replace(/[#>*_`-]/g, '')
    .trim()
    .slice(0, 200);
}

function parseTags(rawTags?: string): string[] | undefined {
  if (!rawTags) return undefined;
  return rawTags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

// Build slugs from path segments
function createSlugFromSegments(segments: string[]): string {
  return '/' + segments.filter(Boolean).join('/').replace(/\/+/g, '/');
}

export async function getMarkdownPagesRecursively(
  dir: string,
  pathSegments: string[] = [],
): Promise<NavNode[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const fullIndexPath = path.join(dir, 'index.md');
  let folderNode: NavNode | null = null;

  try {
    const rawIndex = await fs.readFile(fullIndexPath, 'utf-8');
    const { data: indexData, content: indexContent } = matter(rawIndex);

    folderNode = {
      title: indexData.title || path.basename(dir),
      description: indexData.description || 'description',
      slug: createSlugFromSegments(pathSegments),
      order: indexData.order ?? 0,
      icon: indexData.icon,
      image: indexData.image,
      type: 'folder',
      tags: parseTags(indexData.tags),
      excerpt: extractExcerpt(indexContent),
      children: [],
    };
  } catch {
    // No index.md found — skip this folder
    return [];
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nextSegments = [...pathSegments, entry.name];
      const childNodes = await getMarkdownPagesRecursively(
        fullPath,
        nextSegments,
      );
      folderNode.children!.push(...childNodes);
    }

    if (
      entry.isFile() &&
      entry.name.endsWith('.md') &&
      entry.name !== 'index.md'
    ) {
      const raw = await fs.readFile(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      const baseName = entry.name.replace(/\.md$/, '');
      const fileSegments = [...pathSegments, baseName];

      folderNode.children!.push({
        title: data.title || baseName,
        slug: createSlugFromSegments(fileSegments),
        order: data.order ?? 0,
        icon: data.icon,
        image: data.image,
        type: 'file',
        tags: parseTags(data.tags),
        excerpt: extractExcerpt(content),
      });
    }
  }

  if (folderNode.children && folderNode.children.length > 0) {
    folderNode.children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  return [folderNode];
}

export async function generateGlobalNav() {
  const tree = await getMarkdownPagesRecursively(MARKDOWN_ROOT, []);
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(tree, null, 2));
  console.log(`✅ Generated /globalNav.json`);
}
