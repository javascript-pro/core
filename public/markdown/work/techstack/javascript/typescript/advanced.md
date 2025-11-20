---
order: 30
title: Advanced TypeScript
description: TypeScript for the Reluctant Developer
slug: /work/techstack/javascript/typescript/advanced
icon: js
image: /png/3rdParty/typescript_og.png
tags: JavaScript, Vanilla JavaScript, TypeScript, React
---

[PrevNext prev="/work/expertise/javascript/typescript/get-started" next="/work/expertise/javascript/typescript/structural-typing"]

[PageAd slug="/work/expertise/javascript/typescript/structural-typing"]

[PageAd slug="/work/expertise/javascript/typescript/aliases"]

[PageAd slug="/work/expertise/javascript/typescript/union-types"]

- Type narrowing (if ('foo' in x), typeof, instanceof, discriminated unions)
- Enums, tuples, optional and readonly properties
- When to annotate explicitly vs. let TS infer.

## Generics

Create reusable, strongly typed components, functions, and utilities.

Example:

```
function wrap<T>(value: T): { value: T } {
  return { value };
}
```

- Constraints with extends (e.g. <T extends Record<string, any>>)
- Default generic parameters (<T = string>)

- Mapped Types
- Conditional Types
- Utility Types
- Template Literal Types

## Type-driven Architecture

At this level, TypeScript is used to define system boundaries and prevent invalid states:

- Shared types across frontend & backend (monorepo, full-stack typing)
- API contract typing (e.g. shared zod or io-ts schemas)
- Typed dependency injection or configuration
- Utility-first typing for test data, mocks, and fixtures
- Leveraging discriminated unions for predictable state machines (e.g. Redux or React Query states)
