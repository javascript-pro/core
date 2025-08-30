---
order: 25
title: Next Level
description: What 3D looks like on the Web in 2025
slug: /work/expertise/web3d/next-level
icon: web3d
image: https://live.staticflickr.com/65535/54747599061_445f0323cd_b.jpg
tags: expertise, web, 3D, WebGL, Three.js, Babylon.js, WebGPU, Flash, JavaScript, web development, history, VR, AR, performance
---

> For **control, longevity, and custom UX**, pick **Three.js**. Assemble your own stack (R3F, Zustand/Jotai, glTF toolchain, physics/post-processing). The early investment pays off in flexibility and scale.

Web 3D has matured over the last two decades, and today there’s a variety of libraries and engines, each with different trade-offs. Here’s a concise comparison.

- **Three.js**

  - **What it is:** Low-level rendering library (WebGL2/WebGPU)
  - **Strengths:** Maximum control, huge community, works well with React (R3F)
  - **Trade-offs:** You build everything yourself (asset pipeline, state, tooling)
  - **When to use:** You want full control; “React over Angular” approach—harder upfront, but scales with ambition

- **Babylon.js**

  - **What it is:** Full-featured 3D engine
  - **Strengths:** Fast to production for game-like apps, batteries-included features, strong WebGPU/WGSL support
  - **Trade-offs:** More framework conventions
  - **When to use:** You need engine features out-of-box and faster iteration

- **PlayCanvas**

  - **What it is:** Open-source engine + hosted browser editor
  - **Strengths:** Team-friendly, easy asset workflows, collaborative editor
  - **Trade-offs:** Complex customizations heavier than Three.js
  - **When to use:** Teams wanting quick iteration and hosted pipeline

- **CesiumJS**
  - **What it is:** Globe/geospatial specialist
  - **Strengths:** Best for planet-scale streaming, terrain, photogrammetry, 3D Tiles
  - **Trade-offs:** Not a general-purpose engine
  - **When to use:** You need large-scale geospatial visualization

## Core standards shaping web 3D

- **glTF 2.0** – standard format for assets and PBR materials; widely supported across engines.
- **WebGPU** – stable in Chrome/Edge, Firefox on Windows, Safari behind flag; Three.js and Babylon.js have early WebGPU support. Keep WebGL2 fallback for now.
