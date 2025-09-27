---
order: 112
title: Web 3D
description:
slug: /work/expertise/fullstack/web3d
icon: web3d
image: https://live.staticflickr.com/65535/54747599061_445f0323cd_b.jpg
tags: expertise, web, 3D, WebGL, Three.js, Babylon.js, WebGPU, Flash, JavaScript, web development, history, VR, AR, performance
noImage: true
---

[YouTube src="https://www.youtube.com/watch?v=Qe2ZLYzQToQ"]

> Building for the web for more than twenty years

First with Flash, then with JavaScript — and through all that time, 3D in the browser never really worked. Bandwidth and processors simply couldn’t keep up. That has changed.

After two decades, the web has finally reached the point I imagined back in the 90s. Delivering real-time, interactive 3D experiences to any browser is no longer an experiment — it’s a practical, deployable reality.

#### Timeline of 3D on the Web

- **Mid-90s (56k era)** – VRML promised a “metaverse,” but on dial-up it was little more than wireframes crawling down the screen. At that point, the only way to experiment with 3D was offline. I remember getting a copy of **Poser** bundled with some software I bought. I used it to put together a short animated film — rough by today’s standards, but my first hands-on 3D work. Streaming that kind of content through a browser wasn’t even conceivable.

- **Early 2000s** – Flash offered limited 3D effects, mostly sprite-based tricks. I built interactive demos using Papervision3D, testing the limits of what Flash could do. It looked impressive to users, but under the hood it was a lot of workaround and compromise.

- **Java Applets / Shockwave 3D** – Plug-ins allowed real 3D, but adoption was low. Users didn’t want to install extra software, and consumer hardware couldn’t reliably handle complex scenes. I experimented with Java 3D applets, seeing firsthand how performance could kill an experience instantly.

- **2011** – WebGL arrives. Native 3D in the browser, powered by the GPU. I jumped in immediately, writing raw WebGL code and feeling the power — but also the pain. The learning curve was steep, and most developers stuck to demos rather than production work.

- **2013–2016** – Libraries like **Three.js** and **Babylon.js** matured. They abstracted boilerplate, made the browser approachable for real 3D projects, and finally allowed me to focus on design and interaction rather than low-level graphics plumbing.

- **2016+** – WebVR and WebXR appear. Mobile GPUs improve. I started testing immersive experiences, from simple VR viewers to AR prototypes, seeing the web catch up to what native apps had offered for years.

- **2020s** – WebAssembly, faster GPUs in every device, and **WebGPU** arrive. Performance bottlenecks are fading. Today, web-delivered 3D is production-ready, with frameworks that let developers move fast and focus on content, not infrastructure.

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
