---
order: 10
title: Real World TypeScript
description: Rescuing a Brittle App with TypeScript
slug: /work/expertise/javascript/typescript/real-world
icon: js
image: /png/3rdParty/typescript_og.png
tags: JavaScript, Vanilla JavaScript, TypeScript, React
---

[PrevNext prev="/work/expertise/javascript/typescript/get-started" next="/work/expertise/javascript/typescript/advanced"]

> Sometimes you join a project where the existing codebase has become brittle, error-prone and crash-heavy. Developers are regularly firefighting bugs that TypeScript could have prevented at compile time. The lack of typing and weak structure made changes risky and slowed delivery.

## Goal

My goal was to stabilise the software and restore developer confidence without halting active development. I needed a strategy that could introduce TypeScript incrementally, improve type safety, and reduce runtime errors — all while keeping the team productive.

## Action

- Auditing the codebase to find the most fragile areas — places where null values, incorrect props, and API data mismatches caused crashes.

- Introducing TypeScript gradually, file by file, starting with utility and model layers where the risk was lowest.

- Setting up tsconfig and strict mode to enforce good practices.

- Working with the team to train developers on typing patterns and common refactors.

- Refactoring shared components to leverage TypeScript interfaces, type guards and generics — eliminating a huge class of silent failures.

It wasn’t always easy — the early weeks involved tedious refactoring and resolving thousands of small type issues — but each fix improved our understanding of the code and revealed hidden bugs.

## Result

- Crashes and runtime errors dropped dramatically.

- Confidence increased: developers could refactor safely with the help of the compiler.

- Code readability and onboarding improved, since types now served as living documentation.

The app became more resilient, and new features shipped faster with fewer regressions.

By embracing TypeScript, we transformed a fragile system into a stable, predictable, and maintainable codebase — proof that typing isn’t bureaucracy; it’s a form of collective safety.