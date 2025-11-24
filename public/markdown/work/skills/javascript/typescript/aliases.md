---
order: 65
title: Interface vs Types
description:
slug: /work/skills/javascript/typescript/aliases
icon: js
image: /png/3rdParty/typescript_og.png
tags: JavaScript, Vanilla JavaScript, TypeScript, React
---

## At first glance, they look identical

```
// Interface
interface User {
  id: number;
  name: string;
}

// Type
type User = {
  id: number;
  name: string;
};
```

Both define a “shape” with an id and name. You can use either for variables, parameters, and return types. So why do both exist?

## Conceptual Difference

- Interface: A contract for object shapes or class structures
- Type: A name for any type — objects, unions, primitives, etc.

#### Design intent

- Interface: To describe extensible object-like shapes
- Type: To define composable or computed types

#### Extensibility

- Interface: ✅ Open — can be merged or reopened
- Type: 🚫 Closed — cannot be redefined once declared

#### Composition style

- Interface: Uses extends keyword for inheritance
- Type: Uses & intersection operator for composition

#### Supports unions

- Interface: ❌ No
- Type: ✅ Yes

#### Supports primitives / tuples

- Interface: ❌ No
- Type: ✅ Yes

#### Declaration merging

- Interface: ✅ Supported
- Type: ❌ Not supported

#### Typical use case

- Interface: Object interfaces, React props, class contracts, extending libraries
- Type: Union types, conditional types, mapped types, or complex compositions
