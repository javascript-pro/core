---
order: 60
title: Prompt Engineering
description: The art of designing clear, structured instructions
slug: /work/skills/ai/prompt-engineering
icon: ai
image: https://live.staticflickr.com/65535/53669705662_bd523946ef_b.jpg
tags: ui, ai
newContent: true
---

> The art of designing clear, structured instructions that make AI features behave reliably inside your app

Prompt engineering, from a React developer’s perspective, is the design and optimisation of the text instructions you send to an LLM so that your UI behaves consistently and your app returns predictable, useful results.

In practical terms, it’s about treating prompts as part of your frontend logic, not as static strings.

What it means in a React context

1. Designing prompts as part of component behaviour
   You shape the prompt based on UI state, user input, mode, or feature flags.
   Example: different prompts for summarising, translating, or generating UI copy.

2. Structuring prompts as data models
   You build them like config: objects, templates, or composable strings.
   This makes them testable and easier to maintain.

3. Guarding model behaviour
   You add rules, constraints, and tone so the LLM behaves like a controlled service.
   The prompt becomes a contract between your component and the model.

4. Handling streaming responses
   You write prompts that fit well with streaming output and incremental rendering in React (e.g., chat UIs, Markdown, or partial updates).

5. Integrating prompts with business logic
   You’re shaping the LLM’s role: assistant, translator, data extractor, etc.
   This becomes part of your app architecture.

6. Creating reusable prompt “components”
   Just like hooks or utilities, prompts become reusable parts of your codebase.
