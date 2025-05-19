# Pingpong

Pingpong is a passive presence and interaction tracker for anonymous users.  
It runs entirely in the browser, requires no login, and doesn't rely on cookies or push notifications.

## What it Does

- Generates a **persistent browser fingerprint** using `@fingerprintjs/fingerprintjs`
- Looks up the user’s **IP address and geo location** using a public API
- Writes to a **Firestore document**, keyed by the fingerprint
- Tracks:
  - `userAgent`, `ip`, and `geo` metadata
  - `firstSeen` and `lastSeen` timestamps
  - An `events` array: visit, click, scroll, etc.

This lets us determine:
- If a user has been here before
- What routes they visited and when
- Whether they’re **currently active** (based on recent interaction)

## Why It Exists

Pingpong gives us the ability to

- Detect anonymous repeat visitors
- Identify active sessions without push or auth
- Build heatmaps or event trails over time
- React to live presence with UI updates, messages, or triggers

It’s like Google Analytics, minus the bloat and privacy baggage.  
The goal isn’t surveillance — just connection

## Firestore Schema

Each document in the `pingpong` collection is keyed by the user's fingerprint.

```ts
// Collection: pingpong
{
  ip: string;
  geo: {
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
    [key: string]: any;
  };
  userAgent: string;
  firstSeen: Timestamp;
  lastSeen: Timestamp;
  events: [
    {
      type: 'visit' | 'click' | 'scroll';
      path: string;
      ts: Timestamp;
    }
  ];
}
```