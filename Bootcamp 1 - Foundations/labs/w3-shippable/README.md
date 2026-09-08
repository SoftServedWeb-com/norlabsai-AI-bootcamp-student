# w3-shippable

Evening 2's lab for Bootcamp 1 — Foundations, and the last lab of the
bootcamp. You'll take a script that works and turn it into something you'd
actually trust running unattended: retries with backoff instead of a single
fragile call, one structured log line per run instead of scattered
`console.log`s, and an exit code a caller can rely on without reading your
output.

## `src/classify.ts` is a copy, not an import

This lab's classifier is `w2-structured-output/src/classify.ts`, copied in
byte-for-byte (its exported names — `ClassificationSchema`, `Classification`,
`classify` — are unchanged). Every lab in this series is standalone: you
should be able to `cd` into any one lab folder, `pnpm install`, and have it
work without reaching into a sibling folder's `node_modules` or source.
Importing across `labs/w2-structured-output` and `labs/w3-shippable` would
break that — a student who only cloned or zipped up `w3-shippable` would
find a broken import. Copying costs you a little duplication; it buys every
lab folder true independence. See the top of `src/classify.ts` for the
same note in context.

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
pnpm run:agent "the export button times out on large files"
echo "exit=$?"
```

With a real, funded key in `.env`, you should see one JSON log line, then
the classified result, then `exit=0`:

```
{"timestamp":"2026-...","inputLength":45,"model":"...","latencyMs":812,"outcome":"success"}
{ category: 'bug', confidence: 0.9, summary: '...' }
exit=0
```

**No key yet?** You'll still see this fail, and exactly how it fails tells
you what's still missing — and now you'll also see `withRetry()` earn its
keep. Both failure modes from earlier labs go through the same three
attempts before giving up:

- `.env` left blank → three attempts, each failing with
  `OpenAIError: Missing credentials`, a structured log line with
  `"outcome":"failure"`, and `exit=1`.
- `.env` filled with a fake or expired value → three attempts, each
  failing with `AuthenticationError: 401 Incorrect API key provided`, a
  structured log line with `"outcome":"failure"`, and `exit=1`.

Try it on purpose — put a fake value in `.env` (e.g.
`OPENAI_API_KEY=sk-fake`) and re-run the command above. Watch the terminal:
you should see three `withRetry(): attempt N/3 failed: ...` lines with a
visibly growing `waiting ...ms before retry...` line between each pair
(roughly 300ms, then 600ms — see `src/retry.ts` for exactly why), a final
structured log line with `"outcome":"failure"`, and `exit=1`. That's proof
the retry logic is real, not just claimed: it tries more than once, the
delay between attempts actually grows, and it still gives up rather than
retrying forever. Put your real key back in `.env` when you're done.

### One more failure mode, and it retries badly

A call can also return empty `content` with `finish_reason: "length"`. On
this model family `max_completion_tokens` bounds the model's reasoning
tokens as well as its visible output, so too small a budget lets the model
spend the whole thing thinking and return nothing.
`src/classify.ts`'s `callModel()` sets a generous budget plus
`reasoning_effort: "low"` to prevent it.

Recognising it here takes one extra step, because two layers of retry sit
between you and the cause. Empty text fails `JSON.parse()`, so
`classify()` reads it as a validation failure and retries once; when that
also comes back empty it throws a `ClassificationValidationError`, which
`withRetry()` then treats as a failed attempt and retries up to three more
times. What you see is a full cascade of retries and a
`"outcome":"failure"` log line — the same shape as the fake-key exercise
above, but with no authentication error anywhere in it.

Two tells separate it from a real schema problem: the error message names
schema validation while `.rawReply` is empty, and the attempt log shows no
`401` or network error at all. If you hit it, print
`response.choices[0].finish_reason` and `response.usage` inside
`callModel()` — a `"length"` finish with large
`completion_tokens_details.reasoning_tokens` confirms it. (It is also a
live example of the distinction in `src/retry.ts`'s header: this failure
is deterministic, so retrying it four times only spends money slower than
failing once would.)

## Check your types

```bash
pnpm typecheck
```

Runs `tsc --noEmit`. Should report nothing.

## What's actually happening

Three files, three jobs:

- **`src/classify.ts`** — unchanged from Week 2 (see above). Given text,
  returns a schema-validated `Classification`.
- **`src/retry.ts`** — exports `withRetry<T>(fn, attempts = 3)`. Calls
  `fn()`; on failure, logs the attempt, waits (300ms, then 600ms, then
  1200ms, ... — doubling every time), and tries again. Bounded by
  `attempts`: once every attempt has failed, it stops — it does not retry
  forever — and throws a `RetryExhaustedError` with `.attempts` and
  `.lastError` attached, so the original failure is never thrown away.
- **`src/run.ts`** — the entry point `pnpm run:agent` actually calls. Reads
  the input off `process.argv[2]`, then calls `withRetry()` with a
  function that dynamically `import()`s `classify.ts` and calls
  `classify(input)`. (The import is dynamic, not a normal top-of-file
  `import`, specifically so a failure while constructing the `OpenAI`
  client — e.g. a missing key — happens *inside* the try block below and
  gets retried and logged like any other failure, instead of crashing
  before `main()` even starts. See the comment above `main()` in the file
  for the full reasoning.) Either way — success or failure — this file
  prints exactly one structured JSON line (timestamp, input length, model,
  latency in ms, outcome, and the error message if it failed) before
  exiting: `process.exit(0)` on success, `process.exit(1)` on failure.
  Nothing in this file lets a failure exit 0 by accident — that's the one
  property Step 4 above exists to prove.

Read all three files' comments top to bottom — they walk through the
reasoning for each of those choices, not just the mechanics.

## Where this goes next

This is the last guided lab in Bootcamp 1. Your capstone reuses this same
shape: a classifier or agent call, wrapped in retry logic, logging
structured lines, exiting the way a real caller can depend on.
