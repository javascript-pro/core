---
order: 130
title: Pings
description: Real Time Analytics
slug: /work/goldlabel/cartridges/pings
icon: blokey
image: /png/n64/test.png
tags: cartridges, cartridge, free, bouncer
featured: true
---

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
