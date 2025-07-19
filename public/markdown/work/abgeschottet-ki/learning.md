---
order: 2
title: Learning
description: How does the AI learn?
slug: /work/abgeschottet-ki/learning
icon: ki
image: /jpg/abgeschotten-ki.jpg
tags: abgeschottet, KI
---

### How does the AI learn from the prompts over time?

> Used carefully, large language models can turn legal research into a faster, more focused process.

When we talk about learning, it’s important to distinguish between two very different concepts:

#### 1. The model itself is frozen

The underlying neural network weights of the Phi‑3 model do not change as you interact with it. Prompting alone does not permanently add knowledge.  
To truly alter the model, you would need to perform a separate fine‑tuning process, which involves preparing a large dataset and training new weights or adapters.

#### 2. Building memory outside the model

Instead of changing the model, we store and reuse context. This is often done with a technique called retrieval‑augmented generation (RAG).

How it works in Abgeschottet KI:

- Every prompt and its answer can be saved in a database (for example, SQLite).
- When a new prompt comes in, we search our stored history for relevant past prompts and answers.
- We then feed those relevant snippets back into the model as additional context.

This gives the effect that the model is _learning over time_, even though the model itself remains unchanged.

#### 3. Fine‑tuning (optional, advanced)

If you ever want to truly expand the model’s built‑in knowledge, you can create a fine‑tuning dataset and train new adapters or weights. This is a separate process that produces a new version of the model to load into your ring‑fenced environment.

#### 4. Practical takeaway

For Abgeschottet KI, the recommended path is to:

- Store prompt/response history in your database.
- Use similarity search to retrieve the most relevant past data.
- Inject those results into each new prompt.

This approach avoids retraining costs and keeps the system ring‑fenced, while still improving results over time.
