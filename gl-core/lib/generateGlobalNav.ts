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

/**
 * Extracts a short text summary from markdown content.
 */
function extractExcerpt(content: string): string {
  return content
    .replace(/<!--.*?-->/gs, '') // comments
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[.*?\]\(.*?\)/g, '') // links
    .replace(/`{1,3}.*?`{1,3}/gs, '') // inline code
    .replace(/[#>*_`-]/g, '') // markdown punctuation
    .trim()
    .slice(0, 200);
}

/**
 * Parses comma-separated tags from frontmatter.
 */
function parseTags(rawTags?: string): string[] | undefined {
  if (!rawTags) return undefined;
  return rawTags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * Builds a normalized slug from an array of path segments.
 */
function createSlugFromSegments(segments: string[]): string {
  return '/' + segments.filter(Boolean).join('/').replace(/\/+/g, '/');
}

/**
 * Recursively walk the markdown directory tree and build navigation nodes.
 * Folders are included even if they lack index.md — the folder name is used as fallback.
 */
export async function getMarkdownPagesRecursively(
  dir: string,
  pathSegments: string[] = [],
): Promise<NavNode[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const fullIndexPath = path.join(dir, 'index.md');

  // Default folder node (fallback if no index.md)
  let folderNode: NavNode = {
    title: path.basename(dir),
    description: '',
    slug: createSlugFromSegments(pathSegments),
    order: 0,
    type: 'folder',
    children: [],
  };

  // Try to load metadata from index.md if present
  try {
    const rawIndex = await fs.readFile(fullIndexPath, 'utf-8');
    const { data, content } = matter(rawIndex);
    folderNode = {
      ...folderNode,
      title: data.title || folderNode.title,
      description: data.description || folderNode.description,
      order: data.order ?? folderNode.order,
      icon: data.icon,
      image: data.image,
      tags: parseTags(data.tags),
      excerpt: extractExcerpt(content),
    };
  } catch {
    // no index.md — fall back to folder defaults (don’t return [])
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

  // Sort by order if present
  if (folderNode.children && folderNode.children.length > 0) {
    folderNode.children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  // Skip truly empty folders (no index.md, no child files)
  try {
    await fs.access(fullIndexPath);
  } catch {
    if (!folderNode.children?.length) return [];
  }

  return [folderNode];
}

/**
 * Generate the global navigation JSON file from markdown.
 */
export async function generateGlobalNav() {
  const tree = await getMarkdownPagesRecursively(MARKDOWN_ROOT, []);
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(tree, null, 2));
  console.log(`✅ Generated /public/globalNav.json`);
}

// Run directly (if executed with `node scripts/generateGlobalNav.js`)
if (process.argv[1] === __filename) {
  generateGlobalNav().catch((err) => {
    console.error('❌ Failed to generate globalNav.json', err);
    process.exit(1);
  });
}
