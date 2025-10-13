---
order: 700
title: Architecture
description: WordPress remains the source of truth
slug: /work/expertise/wordpress/architecture
icon: wordpress
image: https://live.staticflickr.com/8504/8434232637_2a7e8b697f_o.jpg
tags: expertise, wordpress, source of truth,
---

WordPress builds everything on a single stack — PHP renders pages on the server, pulling directly from a MySQL database. Themes and plugins share the same environment, which makes it flexible but also fragile: every new feature touches the core.

Goldlabel, by contrast, separates content from presentation. WordPress (or any CMS) remains the content engine, while Goldlabel runs as a modern JavaScript layer on top — a React + TypeScript app that fetches data through APIs and renders it client- or server-side via Next.js.
That means:

- WordPress keeps managing content and SEO.
- Goldlabel handles performance, interactivity, and modular UI.

The two are loosely coupled — no PHP conflicts, no rebuilds, no downtime. In short: WordPress is monolithic; Goldlabel is composable

[PrevNext prev="/work/expertise/wordpress/case-study" next="/work/expertise/wordpress/modernising"]
