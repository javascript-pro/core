# CV Cartridge – Goldlabel Core

This is the official CV cartridge for the Goldlabel Core site, located at:

```
public/markdown/work/cv/index.md
```

It serves as the source of truth for rendering the `/work/cv` route and is designed to be readable by both humans and AI models.

---

## 📁 CV Source

The markdown file is located at:

```
public/markdown/work/cv/index.md
```

It is statically loaded at build time and rendered by the site’s dynamic page system. This file includes frontmatter metadata used for routing, SEO, and Open Graph sharing.

---

## ✍️ Updating the CV Markdown

To make content changes:

1. Edit the markdown file directly:

```bash
nano public/markdown/work/cv/index.md
```

2. Use standard Markdown formatting.
3. Preserve frontmatter (YAML block at the top).
4. Run the app locally to preview changes.

```bash
yarn dev
```

Then visit:

```
http://localhost:3000/work/cv
```

---

## 🧩 Branching Strategy

We use a feature branch named `cartridges/cv` for all updates related to the CV.

### Creating a Fresh Branch

```bash
git checkout staging
git pull origin staging
git push origin --delete cartridges/cv || true
git checkout -b cartridges/cv
git push --set-upstream origin cartridges/cv
```

---

## ✅ Commit & PR: Finalising the CV Cartridge

Once you've updated the markdown and verified it locally:

```bash
git add public/markdown/work/cv/index.md
git commit -m "chore(cv): update CV content and metadata"
git push origin cartridges/cv
```

Then open a pull request to `staging`. Example:

### PR Title

```
Enhances CV cartridge with updated content and metadata
```

### PR Description

```
Updates the CV cartridge located at /work/cv, refreshing content and improving structure for better presentation and AI consumption.

- Rewrites content for clarity, professionalism, and consistency
- Moves CV source to public/markdown/work/cv/index.md
- Adds frontmatter metadata for title, slug, icon, and SEO
- Updates skill list with focus on core specialisms
- Uses British English conventions and accessible markdown formatting
```

---

## 🧹 Why Squash & Merge

We use **Squash and Merge** to keep the commit history clean:

- Reduces noise from intermediate commits
- Keeps each feature or update atomic
- Ideal for solo development and cartridges

This is preferred over a traditional merge because it keeps `staging` and `main` easier to audit.

---

## 🚀 Deployment via Vercel

All branches are auto-deployed to Vercel as **preview deployments**.

### QA Checklist

1. Log into the [Vercel dashboard](https://vercel.com)
2. Find the latest deployment for the `staging` branch
3. Confirm the correct branch name and commit message
4. Visit the preview URL (e.g. `staging-goldlabel.vercel.app`)
5. Run a smoke test:
   - Verify route `/work/cv` loads correctly
   - Confirm updated content is live
   - Check styling, links, and layout
6. If everything looks good, click **Promote to Production**

---

## 🧪 Final Words

You're free to cross the streams here. As long as the last deployment looks right and passes your QA, hit *Promote*. That’s how we ship CVs in style.

