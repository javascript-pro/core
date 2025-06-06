---
order: 20
title: MUI Toolpad
description: React-based dashboards powered by live data
slug: /work/techstack/design-system/toolpad
icon: design
image: /png/default.png
tags: techstack, Design, MUI
---

> MUI Toolpad is a low-code builder for internal tools. It runs as part of your Next.js project and gives you a drag-and-drop environment to create React-based dashboards powered by live data.

We’re using Toolpad inside **Goldlabel Cloud** to build internal interfaces quickly — things like:

- Role-based user dashboards
- Firestore management UIs
- App settings editors
- Lightweight content tools

Toolpad helps us stay productive and impress outsiders. It feels like a real product — because it is.

## Why Toolpad?

Toolpad is not just a dashboard builder. It fits naturally into our stack:

- **Next.js-native**: It becomes part of our app, not a separate platform
- **Firebase-ready**: Supports Firestore, Auth, and REST APIs with minimal config
- **MUI-styled**: The UI looks like our product — because it uses the same design system
- **Low-code, but not no-code**: You can eject to raw React when needed

It’s perfect for building internal tools **that matter** — fast.

## Local Setup

You only need to install Toolpad once:

```bash
npx @mui/toolpad init
```

This creates a `toolpad/` folder in your Next.js project. To launch the editor:

```bash
npx @mui/toolpad dev
```

From here, you can start dragging components, binding data, and building apps — no page reloads required.

## Firebase Integration

Toolpad can bind directly to Firebase with no middleware layer.

- Add Firestore as a **REST data source**
- Secure with a Firebase Auth token from the logged-in user
- Display collections with table components
- Enable CRUD actions with update bindings

We'll document each of these steps separately in the next chapter.

## Deployment

Toolpad runs as part of the Next.js build — so once you're done:

```bash
yarn build && yarn start
```

Your dashboards are live. They can be nested under a secure route like `/admin`, gated by our Bouncer auth system.

## What It’s For

Toolpad is not for everything. We’re using it for:

- Internal views
- Admin dashboards
- Role control interfaces
- Feature toggles and settings

We are **not** using it to build the public-facing UI or landing pages. Those are hand-crafted in React with MUI.
