---
order: 130
title: Paywall
description: Auth & Payments
slug: /work/goldlabel/cartridges/paywall
icon: admin
image: https://live.staticflickr.com/65535/53670802348_9bb887b680_b.jpg
tags: cartridges, cartridge, free, paywall
featured: true
---

## 🚀 Paywall Cartridge

- Auth

  - User Management
  - Community
  - Passwords
  - Avatars
  - Geo
  - Browsing History

- Payment
  - Membership

[GitHub url="https://github.com/javascript-pro/core/tree/staging/gl-core/cartridges/Paywall" label="/gl-core/cartridges/Paywall"]

🔒 Each signed-in user can read and write only their own Paywall document.

🔒 Nobody (not even other authenticated users) can read or modify anyone else’s paywall data.

🧑‍💻 Optionally, admins can access all (for billing dashboards, etc.).

The Paywall cartridge is responsible for two key features in Goldlabel Core: Authentication and Access Control System

1. Authentication (Firebase Auth + `paywall` collection)
2. Real‑time Visitor Tracking (Pings)

#### 1. Authentication

Paywall manages user authentication using Firebase Auth.  
Every user also has a corresponding document in the Firestore `paywall` collection that stores profile information and access level.

#### Auth Data Model (`paywall` collection)

Each document is keyed by `uid` and typically contains:

```ts
{
  uid: string,                // Firebase UID
  email: string,              // Authenticated email
  displayName: string,        // Name to show in UI
  avatar: string | null,      // URL to profile image
  accessLevel: string,        // e.g. "admin", "member"
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Auth Flow

- Sign Up  
  Create a new Firebase Auth user, then create a matching doc in `paywall` with default metadata.

- Sign In / Out  
  Handled via Firebase Auth. Paywall listens to `onAuthStateChanged` and updates local state (via Uberedux).

- Profile Updates  
  Update both Firebase Auth (displayName, photoURL) and Firestore `paywall`.

- Deletion  
  Delete user from Firebase Auth and Firestore `paywall`.
