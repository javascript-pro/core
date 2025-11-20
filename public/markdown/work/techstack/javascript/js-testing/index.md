---
order: 95
title: JS Testing
description: Left looking approach
slug: /work/techstack/javascript/js-testing
icon: js
image: /png/3rdParty/playwright_og.png
tags: JavaScript, Vanilla JavaScript, TypeScript, React, frameworks, Jest, Playwright
---

## A Left looking approach

[PrevNext prev="/work/expertise/javascript/vanilla-js" next="/work/expertise/javascript/typescript"]

A left-looking approach in JavaScript testing should mean testing earlier in the development process before code reaches production. Using tools like Jest for unit and integration tests and Playwright for end-to-end browser testing, issues are caught as code is written rather than after release. This reduces rework, improves reliability, and keeps delivery cycles fast and confident. It’s about building quality in from the start, not inspecting it in at the end.

## JavaScript & Web Testing Framework Timeline

#### 1995–2000: The Early Manual Era

Context: JavaScript emerged (1995, Brendan Eich).

Testing: Almost all testing was manual — clicking through browsers, logging to console.

No formal frameworks; developers used ad hoc scripts or shell tools.

#### 2001 – JUnit & the xUnit Influence

Creator: Kent Beck (Java, 1997–2001 evolution).

Why it matters: The xUnit model (Arrange–Act–Assert) became the template for all testing frameworks to follow — including JS.

Focus: Unit testing and TDD mindset.

Impact: Inspired early JS frameworks like JsUnit and QUnit.

#### 2005 – JsUnit

Creator: Edward Hieatt and others at Pivotal Labs.

What it did: The first structured JS testing framework based on JUnit principles.

Good for: Early unit testing in browsers — before Node existed.

#### 2008 – QUnit

Creator: Developed by John Resig (creator of jQuery) and the jQuery team.

Good for: Testing frontend logic in jQuery-heavy apps.

Why it mattered: Simple assertions, browser-based runner, made testability part of frontend culture.

#### 2010 – Node.js + CommonJS Testing Revolution

Context: Node.js launched in 2009; backend JS testing became possible.

Frameworks emerged:

Vows (2010) – asynchronous testing for Node.

Expresso (2010) – early minimalist BDD runner for Node.

These laid groundwork for Mocha and Jasmine.

#### 2011 – Jasmine

Creator: Pivotal Labs.

Focus: Behavior-Driven Development (BDD) syntax — “describe / it / expect.”

Good for: Unit and integration testing of browser and Node apps.

Why it mattered: Removed the need for a DOM; clean syntax; widely adopted in AngularJS world.

#### 2011 – Mocha

Creator: TJ Holowaychuk.

Focus: Flexible testing framework with async support and plugin ecosystem.

Good for: Backend (Node) and later frontend testing with tools like Chai for assertions and Sinon for mocking.

Why it mattered: Became the de facto standard for Node for years.

#### 2014 – Karma

Creator: Angular team at Google (led by Vojta Jína).

Good for: Running tests in real browsers automatically via CLI.

Why it mattered: Great for CI/CD and multi-browser support — part of Angular’s ecosystem.

#### 2014–2015 – Jest

Creator: Facebook (now Meta).

Focus: “Zero-config” testing with snapshot testing, parallel runs, and built-in mocks.

Good for: React and TypeScript apps.

Why it mattered: Became dominant due to simplicity and ecosystem integration.

Key advantage: Great developer experience, fast feedback loop → perfect for shift-left workflows.

#### 2017 – Cypress

Creator: Brian Mann and the Cypress.io team.

Focus: E2E testing with built-in time travel debugging.

Good for: Testing browser apps visually and functionally, without Selenium.

Why it mattered: Simplified E2E and integrated seamlessly into CI/CD.

#### 2019 – Playwright

Creator: Microsoft (Andrey Lushnikov, ex-Google/Chrome DevTools).

Focus: Modern, reliable cross-browser automation (Chromium, WebKit, Firefox).

Good for: E2E testing, accessibility testing, PDF rendering, screenshot diffs.

Why it matters: Great reliability, full TypeScript support, and rich parallelization — becoming the new E2E standard.

#### 2020s – Modern Tooling & Shift-Left Integration

Vitest (2021) – created by the Vite team, fast Jest-compatible unit testing.

Testing Library (2018–ongoing) – Kent C. Dodds, focused on testing user behaviour over implementation details.

Cypress Component Testing / Playwright Test Runner (2022+) – merging E2E and component testing for React/Next.js apps.

Trend: Testing integrated directly into build tools and CI from day one — true shift-left.
