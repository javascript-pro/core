---
order: 130
title: Pings
description: Real Time Analytics
slug: /work/goldlabel/cartridges/pings
icon: admin
image: /png/n64/test.png
tags: cartridges, cartridge, free, bouncer
featured: true
---

#### 2. Real‑Time Visitor Tracking (Pings)

The second function is similar to lightweight analytics.  
Every visitor (authenticated or not) continuously creates or updates a ping document in Firestore.

#### Ping Data Model (`pings` collection)

Each document is keyed by a fingerprint (from `fingerprint.js`):

```ts
{
  fingerprint: string,        // Unique device fingerprint
  lastSeen: Timestamp,        // Updated with each ping
  route: string,              // Current route (e.g. "/apps/app1")
  geo: {
    country: string,
    city: string,
    lat: number,
    lon: number
  },
  uid: string | null,         // Populated if user is authed
  displayName: string | null, // From auth profile
  avatar: string | null,      // From auth profile
  message: {
    text: string,
    createdAt: Timestamp
  } | null
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
  - `pings` collection: allow anonymous writes for own fingerprint; only admins can send `message`.

- Rate Limiting

  - Consider throttling or Cloud Functions if high traffic.

- Privacy
  - No cookies; fingerprints are anonymous unless user is authenticated.

#### Dependencies

- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firestore](https://firebase.google.com/docs/firestore)
- [`@fingerprintjs/fingerprintjs`](https://github.com/fingerprintjs/fingerprintjs)
- GeoIP service (e.g. [ipapi.co](https://ipapi.co) or a custom `/api/geo` route)
