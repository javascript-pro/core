---
order: 130
title: Bouncer
description: Authentication and Access Control System
slug: /work/core/cartridges/bouncer
icon: admin
image: /png/clouds/default_whitecloud.png
tags: cartridges, cartridge, free, bouncer
featured: true
---

## Authentication and Access Control System

> Bouncer is the name of our authentication and access control system built on Firebase Authentication and Firestore. It is included in the Core as a reusable component, available globally from any cartridge

Each user has a numeric access level, stored in the users Firestore collection. Access level 1 is the lowest, and higher numbers unlock more functionality.

### ✅ Example Usage

To enable Bouncer on any page or component, just include the Bouncer component from cartridges.

```tsx
import { Bouncer } from '<path-to>/core/cartridges/Bouncer';
<Bouncer level={3}>{/* Protected content goes here */}</Bouncer>;
```

### 🔐 What that does

- If the user is not logged in:

  - The page is blurred beyond readability.
  - A modal popup appears, explaining they must sign in.
  - The modal cannot be closed until login is successful.

- If the user is logged in but unverified:

  - Same behavior as above, with instruction to verify their email.

- If the user is logged in and verified, but access level is too low:

  - Same behavior, with a message explaining that higher access is required.

- If the user meets or exceeds the required access level:
  - Content is rendered normally with no interruptions.

### ⚙️ Firebase

Ships with Firebase Authentication, Email/Password only

- Signup
- Email Verification (required)
- Password Reset
- Access Levels (numeric, ascending)

Each authenticated user has a document in the users collection with at least:

```json
{
  uid: string,
  email: string,
  accessLevel: number, // default is 1
  createdAt: Timestamp
}
```

This document is created at signup and can be manually updated by admins to promote user access levels.

### 🛠 Notes

- Modal logic and blur effect are handled inside the Bouncer component.

- Email verification is enforced through onAuthStateChanged — access is locked until Firebase confirms emailVerified: true.
