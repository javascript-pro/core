---
order: 65
title: Uberedux
description:
slug: /work/cartridges/uberedux
icon: uberedux
image: /png/weizang.png
featured: false
---

> Top 3 reasons Redux still makes sense

#### 1. **Cross-Page UI State (especially in Admin Mode)**

Goldlabel Core is meant to feel like a unified experience across public and private views. Redux helps:

- sync global UI state like sidebar open/closed
- manage toast queues, modals, and snackbars
- coordinate things like edit mode, preview state, or selected nav item across routes

This is especially important if we’re using the App Router pattern with layouts and async components. You want state that doesn’t get wiped just because a user navigated.

#### 2. **Real-Time Firestore Sync with Flexibility**

We’ll be pulling in data from Firestore — some of it for public routes, some for admin-only routes. With Redux, we can:

- store Firestore docs in slices (e.g. `pages`, `apps`, `users`)
- layer in loading/error state management
- optionally cache results or subscribe to updates via listeners

That’s much cleaner than managing everything with `useEffect` + local state in each component.

---

#### 3. **Shared Auth-Driven State Across the App**

Goldlabel Core will use Firebase Auth + Firestore roles. Once a user logs in, their session should:

- populate a user profile (`uid`, `role`, etc.)
- grant permissions to edit/create content
- unlock admin UI elements conditionally

That logic is best held in Redux so it’s available everywhere — not just the auth context. This also gives you flexibility to override per-component logic based on state.

So yeah — **Redux gives Goldlabel Core structure and control**, especially when it evolves into a more complex app with editable pages, nested routes, and real-time content management.
