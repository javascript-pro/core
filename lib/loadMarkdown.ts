
import fs from 'fs/promises'; // use the async version
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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

const MARKDOWN_ROOT = path.join(process.cwd(), 'public/markdown');

export async function getAllMarkdown(folder: string): Promise<MarkdownPage[]> {
  const dir = path.join(MARKDOWN_ROOT, folder);
  try {
    const files = await fs.readdir(dir);
    const pages = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async file => {
          const filePath = path.join(dir, file);
          const raw = await fs.readFile(filePath, 'utf-8');
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
    );

    return pages.sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0));
  } catch {
    return [];
  }
}

export async function getHTMLBySlug(folder: string, slug: string): Promise<string | null> {
  const filePath = path.join(MARKDOWN_ROOT, folder, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const { content } = matter(raw);
    return marked(content);
  } catch {
    return null;
  }
}

export async function getMarkdownBySlug(folder: string, slug: string): Promise<MarkdownPage | null> {
  const filePath = path.join(MARKDOWN_ROOT, folder, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return {
      meta: {
        ...(data as Omit<MarkdownMeta, 'slug'>),
        slug,
      },
      content,
    };
  } catch {
    return null;
  }
}
