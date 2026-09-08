# w3-model-choice

Evening 1's lab for Bootcamp 1 — Foundations. You'll send the *same* task
to all three model tiers this series uses (see `CONVENTIONS.md#models` in
the repo root) and get back a table of output, latency, and token counts —
one run, three rows, side by side.

## Setup

```bash
pnpm install
cp .env.example .env
```

Open `.env` and set your real key:

```
OPENAI_API_KEY=sk-...your-key...
```

`.env` is already covered by `.gitignore` — check it yourself:

```bash
git check-ignore -v .env
```

If that prints a line pointing at `.gitignore`, you're safe. If it prints
nothing, **stop and fix your `.gitignore` before going any further.**

## Run it

```bash
pnpm compare
```

With a real, funded key in `.env`, you'll see three labelled blocks — one
full reply per tier — followed by a summary table like this (your numbers,
and the exact model IDs in the `Model` column, will come from running it —
see "What's actually happening" below for why this README doesn't print
them itself):

```
Tier      Model     Latency (ms)  Prompt Tokens  Completion Tokens  Total Tokens
--------  --------  ------------  -------------  -----------------  ------------
fast      ...           412             24                 38            62
default   ...           891             24                 41            65
frontier  ...          2103             24                 97           121
```

Read it left to right, one row per tier. This lab does not tell you which
row is "best" — that depends entirely on the task. That judgement call is
the actual lab.

**No key yet?** Same two failure modes as the earlier labs:

- `.env` left blank → `OpenAIError: Missing credentials`
- `.env` filled with a fake or expired value → `AuthenticationError: 401
  Incorrect API key provided`

Both are proof the wiring — `.env` loading, three separate calls, the
table — is correct; only the key itself is missing.

**A tier whose reply block is blank while its table row still fills in**
is the third failure mode: empty `content` returned with
`finish_reason: "length"`. On this model family `max_completion_tokens`
bounds reasoning tokens as well as visible output, so too small a budget
lets a model spend all of it thinking and return nothing to print.
`runOne()` sets a generous budget plus `reasoning_effort: "low"` for
exactly this reason, identically across all three tiers. Expect it to bite
the frontier tier first if it bites at all — that tier reasons the most
for the same task, so it hits the ceiling soonest. The table itself gives
you the diagnosis for free: a blank reply above a row with a high
completion-token count means the tokens were spent, just not on anything
you can read.

## Check your types

```bash
pnpm typecheck
```

Runs `tsc --noEmit`. Should report nothing.

## What's actually happening in `compare-models.ts`

Open `src/compare-models.ts` and read the comments top to bottom. The
shape to notice:

1. `TIERS` lists all three tiers this series names — see
   `CONVENTIONS.md#models` in the repo root for what each is for and when
   to reach for it. This file is "runnable lab source," which
   `CONVENTIONS.md` explicitly allows to name real model IDs — this
   README deliberately doesn't repeat them, so if they ever change you
   only have to update `CONVENTIONS.md` and this one file.
2. `runOne()` times a single call with `Date.now()` before and after, and
   reads `response.usage` for the token counts the OpenAI API returns
   alongside every reply.
3. `printTable()` is the part worth studying if the numbers-lining-up
   trick is new to you: it computes each column's width from the longest
   value that has to fit in it (header included), then pads every cell to
   that width with `padStart`/`padEnd` before printing. That's what makes
   the table's numbers actually comparable at a glance, instead of
   drifting out of alignment because "412" and "2103" are different
   lengths.
4. The task itself (`TASK`) is deliberately a one-sentence request. A
   multi-paragraph task would produce output too long to sit legibly in a
   side-by-side comparison — the lab's value is in seeing the trade-off in
   one glance, not in reading three long essays.

## Where this goes next

Evening 2's lab (`w3-shippable`) takes a script like this one and hardens
it: retries with backoff, structured logging, and exit codes a caller can
actually trust.
