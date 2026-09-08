# w1-ts-essentials

Evening 1's lab for Bootcamp 1 — Foundations. TypeScript basics, no LLM calls,
no API key. Follow this live in the room in about an hour, then finish the
guided exercises alone before Evening 2.

## What you'll learn

- Declaring variables with explicit types and with inference
- Writing a typed function (typed parameters, typed return value)
- Common string operations
- Template literals
- Running a TypeScript file with `tsx`

## Setup

```bash
pnpm install
```

## Run it

```bash
pnpm basics
```

You should see seven lines of output: four lines of string operations on
`"agentic ai"`, a template-literal line, a greeting, and a seat count. If
you see that, TypeScript, `tsx`, and your Node install are all working.

## Check your types

```bash
pnpm typecheck
```

This runs the TypeScript compiler in check-only mode (`tsc --noEmit`) — it
reports type errors without producing any output files. `pnpm basics` does
**not** catch every type error on its own (`tsx` strips types fast, it
doesn't fully check them), so run `typecheck` too, especially after you
touch the guided exercises.

## The guided exercises

Open `src/basics.ts` and scroll to the bottom. Three exercises wait there,
each commented out. Uncomment one at a time, write the missing code, and
re-run `pnpm basics` after each one to see it work:

1. Declare your own name and greet yourself.
2. Write `weeksLeft(currentWeek: number): number` — how many weeks remain
   in this 4-week bootcamp.
3. Capitalise each word in `"learn build ship"`.

If you get stuck: read the hint comment above each exercise, then try
`console.log`-ing intermediate values to see what you actually have at
each step — that's the single most useful debugging habit in this
bootcamp, and it works whether you're inspecting a string or, later, a raw
LLM response.

## Where this goes next

Evening 2's lab (`w1-first-call`) uses the same syntax — typed functions,
template literals — to build your first working call to an LLM.
