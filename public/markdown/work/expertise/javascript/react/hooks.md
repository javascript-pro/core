---
order: 10
title: Hooks
description: React Hooks were introduced in React 16.8 (February 2019)
slug: /work/expertise/javascript/react/hooks
icon: js
image: /png/3rdParty/react.png
tags: React, hooks
---

> In short, Hooks let React functions become stateful and reactive without classes

At a fundamental level, Hooks hook into React’s internal lifecycle and state system from within functional components.

They give functions access to capabilities that previously only class components had. State, context, lifecycle events, and refs, but in a simpler, composable way. Think of them as bridges between your component logic and React’s engine. Best used for:

- useState / useReducer → managing local component state
- useEffect → reacting to lifecycle events (mount, update, unmount)
- useContext → consuming shared context data
- useMemo / useCallback → optimising render performance
- Custom hooks → encapsulating and reusing logic across components

## In 2019 hooks solved two main problems:

- State and lifecycle reuse — before Hooks, only class components could use state and lifecycle methods, making logic sharing clumsy (via HOCs or render props).

- Complex component logic — class components often became bloated and hard to maintain.

Today, Hooks are the standard for building React components — used for state, effects, context, refs, and custom logic reuse — effectively replacing most class components.

Example:

`useEffect` runs side effects — code that affects things outside React’s render cycle (e.g. fetching data, setting up subscriptions, updating the DOM). It executes after render.

```
useEffect(() => {
  fetchData();
}, []);
```

useMemo is for performance optimisation — it memoises an expensive computation so it’s only recalculated when its dependencies change. It runs during render, not after.
Example:

```
const value = useMemo(() => heavyCalc(data), [data]);
```

In short:

- useEffect → handles side effects
- useMemo → caches pure calculations
