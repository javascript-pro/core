import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type MarkdownMeta = {
  title: string;
  description: string;
  image?: string;
  order?: number;
  slug: string;
};

export type MarkdownPage = {
  meta: MarkdownMeta;
  content: string;
};

const MARKDOWN_DIR = path.join(process.cwd(), 'public/markdown/apps');

export function getAllMarkdown(): MarkdownPage[] {
  const files = fs.readdirSync(MARKDOWN_DIR);

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(MARKDOWN_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, '');

      return {
        meta: {
          ...(data as Omit<MarkdownMeta, 'slug'>),
          slug,
        },
        content,
      };
    })
    .sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0));
}

export function getMarkdownBySlug(slug: string): MarkdownPage | null {
  const filePath = path.join(MARKDOWN_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    meta: {
      ...(data as Omit<MarkdownMeta, 'slug'>),
      slug,
    },
    content,
  };
}
