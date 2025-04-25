---
order: 130
title: Bouncer
description: Access Control System
slug: /work/free/cartridges/bouncer
icon: cartridge
image: /png/goldlabel.png
tags: cartridges, cartridge, free
featured: false
---

> Bouncer is the name of our authentication and access control system built on Firebase Authentication and Firestore. It is included in the Core as a reusable component, available globally from any cartridge

🔐 Authentication Setup
We use Firebase Authentication, Email/Password only:

✅ Signup

✅ Email Verification (required)

✅ Password Reset

✅ Access Levels (numeric, ascending)

Each user has a numeric access level, stored in the users Firestore collection. Access level 1 is the lowest, and higher numbers unlock more functionality.
