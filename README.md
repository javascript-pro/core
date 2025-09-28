![OG Image](https://goldlabel.pro/jpg/github.jpg)

# Goldlabel Core

Goldlabel Core is a **Next.js application** that serves as a public-facing content hub, showcasing **static site generation from markdown files** while providing an optional admin panel for content management. This repository contains the **full codebase**, ideal for learning, reference, or as a foundation for your own projects.

## 🚀 Quick Start

```bash
git clone https://github.com/javascript-pro/core.git
cd core
yarn install
```

## 💾 [Cartridges](https://github.com/javascript-pro/core/tree/staging/gl-core/cartridges)

- [Theme](https://github.com/javascript-pro/core/tree/staging/gl-core/cartridges/Theme)
- [Uberedux](https://github.com/javascript-pro/core/tree/staging/gl-core/cartridges/Uberedux)

## 👍 Features

- **Next.js with App Router**: Modern routing and optimized builds.
- **Markdown-based content**: Pages and apps are generated from the `public/markdown` folder.
- **Static site generation (SSG)**: Fast, SEO-friendly pages with minimal runtime dependencies.
- **Admin section (optional)**: Role-based authentication and content management.
- **Responsive UI**: Built with **MUI (Material UI)** for clean, consistent design.
- **Open design**: Components and utilities are fully accessible for customization.

## Environment Setup

Create a `.env.local` file in the root directory with this variable. When you enable various parts of the apps which require other vars, the app will let you know

```dotenv
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Local Development

```bash
yarn dev
```

- Runs the app at [http://localhost:3000](http://localhost:3000).
- Firebase credentials and other API keys are loaded from `.env.local`.

## 🔑 Deployment

Goldlabel Core is optimized for **Vercel**, but can be deployed to any static-friendly hosting platform.

## License

MIT License – see `LICENSE` for details.

👉👇👍👌🙏
💾🗑️⚠️🔹
✅❌
➡️🔄
🔑🎉
