import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export const dynamic = 'force-static';

export default async function CVPage() {
  const filePath = path.join(process.cwd(), 'gl-core/lib/cv.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(fileContent);
  const html = marked.parse(content);

  return (
    <html lang="en">
      <head>
        <title>{data.name} – CV</title>
      </head>
      <body style={{ fontFamily: 'sans-serif', maxWidth: 720, margin: '2rem auto' }}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </body>
    </html>
  );
}
