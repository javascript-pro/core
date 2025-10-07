---
order: 75
title: Unions and intersections
description: Union (|) and intersection (&) types
slug: /work/expertise/javascript/typescript/union-types
icon: js
image: /png/3rdParty/typescript_og.png
tags: JavaScript, Vanilla JavaScript, TypeScript, React
---

[PrevNext prev="/work/expertise/javascript/typescript/aliases"]

> Union Types are one of TypeScript’s most powerful and flexible features. They let you describe a value that can be one of several types — a way to express this or that

#### What a Union Type is

A union type combines multiple possible types using the pipe (|) operator:

```
let input: string | number;
```

That means input can be either a string or a number — nothing else.

```
input = "hello"; // ✅ OK
input = 42;      // ✅ OK
input = true;    // ❌ Error
```

So TypeScript is saying: "I accept any of these types, but no others."

Unions let you model _real-world flexibility_ without losing type safety.

```ts
function formatId(id: string | number) {
  return \`#\${id.toString()}\`;
}
```

You can pass either a string or a number, and TypeScript ensures you handle both correctly.

#### Type Narrowing

When you use a union, TypeScript forces you to _narrow_ the type before using it in a specific way.

```ts
function printLength(value: string | string[]) {
  if (typeof value === 'string') {
    console.log(value.length); // value is string here
  } else {
    console.log(value.length); // value is string[] here
  }
}
```

The compiler automatically **tracks type branches** — this is called _control flow analysis_.

#### Example with Literal Unions

You can use unions not just for _types_, but for _specific values_ too.

```ts
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction) {
  console.log(\`Moving \${direction}\`);
}

move("up"); // ✅
move("forward"); // ❌ Error — not allowed
```

This pattern is great for:

- config values
- API response states
- React component variants  
  (e.g. `variant: "primary" | "secondary"`)

#### Combining Unions with Other Types

Unions often work together with **intersections (`&`)** and **type aliases** to create rich models:

```ts
type ErrorResult = { success: false; message: string };
type SuccessResult = { success: true; data: string };

type Result = ErrorResult | SuccessResult;

function handle(result: Result) {
  if (result.success) {
    console.log(result.data); // TypeScript knows this is SuccessResult
  } else {
    console.log(result.message); // TypeScript knows this is ErrorResult
  }
}
```

That’s called a **discriminated union** — one of the cleanest ways to model state machines in TypeScript.
