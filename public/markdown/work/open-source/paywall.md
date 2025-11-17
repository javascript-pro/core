---
order: 130
title: Paywall
description: Access Control Cartridge
slug: /work/open-source/paywall
icon: paywall
image: /jpg/ai/SWAT-Baby.jpg
tags: cartridge, free, paywall, use cases, acess, auth, subscription
noImage: true
---

> User accounts, passwords, membership access and payment

## Use Cases

We have a page in our writing section for an e-book we are working on. It's not ready to be public yet, so we'll add the attribute `paywall: true` to the content's frontmatter markdown. Now only logged in users can view.

But how easy is it to become a logged in user and see the content? There is a direct relationship between that and how many users will do it.

So we don't ask for email. We don't ask for a password. We need then to be accountable, we need them to be logged in, but we don't need them to create an account with us. We just need them to click the contine with Google or GitHub links and that Authentication will be done by the respective providers

It still creates a user account on our firebase app, and should the user ever log out they can easily log back in by clicking the same button

In this way we can layer up the Paywall to include pages which are viewable if logged in, viewable only if the user has a Stripe subscription or viewable to only certain users.

In other words... Access control

## Examples

[PageGrid thumbnails="yes" pages="/work/cases/hertwig-auer, /balance/writing/not-here-to-fuck-spiders, /balance/writing/not-here-to-fuck-spiders/bez"]

#### More info

> The Paywall cartridge is responsible for two key features: Authentication/Access Control and Pings

- Authentication (Firebase Auth + `paywall` collection)
  - User Management
  - Community
  - Passwords
  - Avatars
  - Geo
  - Browsing History
- Payment

  - Membership

- 🔒 Each signed-in user can read and write only their own Paywall document.
- 🔒 Nobody (not even other authenticated users) can read or modify anyone else’s paywall data.

> 🧑‍💻 Optionally, admins can access all (for billing dashboards, etc.).

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

[GitHub url="https://github.com/javascript-pro/core/tree/staging/gl-core/cartridges/Paywall" label="/gl-core/cartridges/Paywall"]

#### 2. Real‑Time Visitor Tracking (Pings)

The second function is similar to lightweight analytics.  
Every visitor (authenticated or not) continuously creates or updates a ping document in Firestore.

#### Ping Data Model (`pings` collection)

```ts
export interface TPing {
  id: string;
  hostname?: string;
  pathname?: string;
  browser?: string;
  os?: string;
  platform?: string;
  model?: string;
  modelCode?: string;
  ip?: string;
  organization?: string;
  isp?: string;
  country_name?: string;
  country_code?: string;
  city?: string;
  state_prov?: string;
  timezone_name?: string;
  timezone_offset?: number;
  latitude?: string;
  longitude?: string;
  vendor?: string;
  isMobile?: boolean;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  created?: number;
  updated?: number;
  current_time?: string;
  currency_symbol?: string;
  currency_code?: string;
  languages?: string;
  history?: THistory[];
  messages: TMessage[];
  [key: string]: any;
}
```

#### Ping Flow

- Initialization

  - On first load, generate a fingerprint (`@fingerprintjs/fingerprintjs`).
  - Fetch geo info from a server‑side geo lookup (`/api/geo`).

- When Pings Are Sent

  - On every route change.
  - On an interval (e.g. every 10 seconds) while page is open.

- What Happens
  - `setDoc(doc(db, 'pings', fingerprint), { ... }, { merge: true })`
  - If authenticated, `uid`, `displayName`, and `avatar` are included.

#### Real‑Time Admin View

- The Admin cartridge subscribes to the `pings` collection in real time.
- An admin interface lists all visitors, showing:
  - Current route
  - Geo info
  - Auth info (if available)
  - Last seen time

#### Messaging Visitors

Admins can send a message to a visitor:

- Update the `message` field on that visitor’s ping document.
- Only the visitor with that fingerprint sees it (via their live subscription).

#### Security & Considerations

- Firestore Rules

  - `auth` collection: only admins or owner can update their own doc.
  - `pings` collection: allow anonymous writes for own fingerprint; only admins can send `message`

- Privacy
  - No cookies; fingerprints are anonymous unless user is authenticated

#### Dependencies

- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firestore](https://firebase.google.com/docs/firestore)
- [`@fingerprintjs/fingerprintjs`](https://github.com/fingerprintjs/fingerprintjs)
- GeoIP service (e.g. [ipapi.co](https://ipapi.co) or a custom `/api/geo` route)
