---
order: 70
title: GraphQL
slug: /work/techstack/other/graphql
description: No over-fetching, no under-fetching
icon: techstack
image: /png/wei-zang/wei-zang.png
tags: graphql, api, restful
---

> Things that actually matter day-to-day as a React developer using GraphQL

### **1. You fetch exactly what you need**

No over-fetching, no under-fetching.
Components request the precise fields they use, nothing more.

### **2. Backend shape matches frontend needs**

You design queries around UI components, not server endpoints.
The client drives the data shape.

### **3. One endpoint for everything**

No sprawling REST paths.
One `/graphql` endpoint, infinite queries.

### **4. Strong typing everywhere**

The schema becomes a contract.
With TypeScript + codegen you get fully typed hooks like `useGetUserQuery()`.
Autocompletion becomes insanely good.

### **5. Automatic caching and cache-normalisation (Apollo/Urql/Relay)**

Out of the box:

- Query deduping
- Automatic updates when mutations return data
- Pagination helpers
- Persisted cache

Feels “state-management-lite” for server data.

### **6. Co-located data and UI**

A component defines its query right next to its JSX.
Dependency is obvious. Refactoring is safer.

### **7. No more custom serializers**

REST often needs backend changes for new UI screens.
GraphQL lets the frontend assemble data from existing fields without new endpoints.

### **8. Built-in introspection**

You get:

- GraphiQL
- Playground
- Schema exploration
- Auto-generated docs

Zero backend documentation drift.

### **9. Powerful real-time (Subscriptions)**

Stream updates:

- chat messages
- presence
- stock ticks
- dashboard data

No polling hacks.

### **10. Great with component-driven thinking**

UI components → small GQL fragments → composed queries.
Each component declares what fields it uses.
The server stitches everything together.

### **11. Better network efficiency on complex pages**

One request gathers everything a page needs.
No waterfall of fetch calls.
Massive win for dashboards.

### **12. Evolution without breaking clients**

Schema can be extended by adding new fields/resolvers.
Old clients keep working.
New clients get new data instantly.

### **13. Cleaner error handling**

Errors return with field-level detail.
UI can surface partial data plus errors without collapsing entirely.

### **14. Middlewares become generic**

Rate-limiting, auth, logging, tracing — all sit in one place: the GraphQL resolver layer.

### **15. Fits modern API ecosystems**

GraphQL meshes with:

- Serverless functions
- Edge runtimes
- Microservices
- Federated schemas

[graphql.org](https://graphql.org/)
