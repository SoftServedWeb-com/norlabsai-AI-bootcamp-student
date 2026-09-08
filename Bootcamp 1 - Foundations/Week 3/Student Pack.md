# Week 3 Student Pack — Bootcamp 1: Foundations

Everything you need to work Thursday through Sunday lives on this page — you won't see
the facilitator's run sheets, and you shouldn't need to. If something below sends you
looking for a file, it's linked.

## This Week

Three evenings, two concepts, two labs, and your capstone's third component:

- **Evening 1 (Mon)** — a huddle where your pod hears whether Week 2's AI step got
  committed, then model selection and the quality/latency/cost triangle, then Lab A.
- **Evening 2 (Tue)** — a Lab A checkpoint, then from script to shippable (retries,
  logging, exit codes), then Lab B.
- **Evening 3 (Wed)** — a look at how a real system routes by model instead of
  hardcoding one, a capstone clinic with your pod, and week close.
- **Thu–Sun** — finish both labs, then harden your capstone's AI step so it survives bad
  input and a failing API, logging what it did either way. See Homework below for the
  exact list.

By the end of this week you'll be able to justify a model-tier choice with evidence
instead of a guess, and your capstone's AI step will survive the two things that break
scripts in the real world — bad input and a failing API — logging what happened either
way.

## Concept A: Model Selection & the Quality/Latency/Cost Triangle

LLM providers ship a family of models, not one — typically a fast/cheap tier, a
balanced/default tier, and a frontier tier (see
[CONVENTIONS.md](<../../CONVENTIONS.md#models>) for the three tiers this series names).
Frontier and reasoning-capable models spend more computation before answering — better at
multi-step logic and planning, and slower and more expensive because of it.

**The triangle: quality, latency, cost.** You rarely get all three at once. Choosing a
model tier is choosing a corner of this triangle for a specific task, not a
once-and-forever decision. A one-line support ticket to classify probably doesn't need
the frontier tier; a multi-step research plan probably does.

A practical rule: prototype on the strongest tier to confirm a task is even possible,
then move down to the cheapest tier that still passes. This is a judgement call you'll
keep making for the rest of the series — the goal this week is reasoning about it with
evidence, not memorising tier names.

## Lab A

[`../labs/w3-model-choice`](<../labs/w3-model-choice>) — sends the *same* one-sentence
task to all three model tiers in a single run and prints a side-by-side table.

```bash
cd "labs/w3-model-choice"
pnpm install
cp .env.example .env      # then paste your real key
git check-ignore -v .env  # confirm it's protected before running anything
pnpm compare
```

You'll see three labelled blocks — one full reply per tier — followed by a summary table
of latency, prompt tokens, completion tokens, and total tokens, one row per tier. This
lab doesn't tell you which row is "best" — that judgement call, made with real numbers
in front of you instead of a guess, is the actual lab (the exact model IDs in the table's
`Model` column, and the numbers themselves, come from running it yourself; full detail in
the lab's own [README](<../labs/w3-model-choice/README.md>)).

No key yet? Same two failure modes as every earlier lab — `OpenAIError: Missing
credentials` for a blank `.env`, a real `401` for a fake one. Both prove the wiring, not
a broken lab.

```bash
pnpm typecheck
```

## Concept B: From Script to Shippable

A script that only works when everything goes right isn't shippable. A flaky network
call, a rate limit, a timeout — these are normal conditions a real caller hits, not
exceptional ones a demo gets to ignore.

**Retries with backoff**: try again, but not immediately and not forever — a growing
delay between attempts, a hard cap on how many happen, and the original failure
preserved, never thrown away, if every attempt fails.

**Structured logging**: one machine-parseable line per run — a timestamp, what happened,
how long it took, the outcome — instead of `console.log`s scattered through the code.
This is what gets read at 2am when something breaks, not the source.

**Exit codes**: `0` means "trust this ran," anything else means "don't." A caller — a
cron job, a CI pipeline, another program — decides what to do next from that number
alone, never by parsing printed text.

Never swallow a failure into `null` or an empty result. That silence is exactly the
signal a caller needs in order to detect and act on the failure.

## Lab B

[`../labs/w3-shippable`](<../labs/w3-shippable>) — the last guided lab in the bootcamp.
Takes a script that works and hardens it: retries with backoff, one structured log line
per run, and an exit code a caller can actually trust.

```bash
cd "labs/w3-shippable"
pnpm install
cp .env.example .env      # then paste your real key
git check-ignore -v .env
pnpm run:agent "the export button times out on large files"
echo "exit=$?"
```

With a funded key you'll see one JSON log line, then the classified result, then
`exit=0`. Now break it on purpose — put a fake value in `.env` and re-run the same
command. You should see three `withRetry(): attempt N/3 failed` lines with a visibly
growing wait between each pair, a final structured log line with
`"outcome":"failure"`, and `exit=1`. That's proof the retry logic is real, not just
claimed. **Put your real key back in `.env` when you're done.** Full walkthrough of all
three files (`classify.ts`, `retry.ts`, `run.ts`) is in the lab's own
[README](<../labs/w3-shippable/README.md>).

```bash
pnpm typecheck
```

## Capstone Component

This week's deliverable: **your agent survives bad input and a failing API, and logs
what it did.**

Build it the way `w3-shippable` is built: wrap your Week 2 AI-step call in
retry-with-backoff (bounded — never forever), log one structured line per run regardless
of outcome, and exit nonzero on failure so a caller can trust the number without parsing
your output text. Then test it, on purpose, two ways:

1. **Bad input** — an empty string, garbage text, the wrong type. Your code should log
   what happened and fail cleanly, not crash with no trace.
2. **A simulated API failure** — the same trick as tonight's lab: a fake key, or
   whatever forces your own call to fail. You should see retries fire, a structured
   failure log, and a nonzero exit — not a silent `null`.

Demo both cases, actually running, live, to your pod at Wednesday's clinic — not a
description of what your code would do if it failed.

## Homework (Thu-Sun)

- Finish `w3-model-choice` and `w3-shippable` if you didn't in the room; confirm
  `pnpm typecheck` is clean for each. Commit.
- Harden your capstone's AI step: retry-with-backoff, one structured log line per run,
  nonzero exit on failure. Test both failure paths above and confirm both log correctly.
  Commit.
- **Budget three to four hours** — the same ask as last week, and for the same reason:
  two labs plus hardening your own capstone's AI step and deliberately testing both of
  its failure paths. A floor, not a cap. This is the last capstone-component deadline
  before shipping, so it is also the worst week to under-budget.

**This is the forcing function, not a suggestion**: your capstone component has to be
committed before Monday's huddle in Week 4. No commit, nothing to report — the same
stated rule from Week 1. This is also the **last** capstone-component deadline before
shipping: Week 4 adds no new capability, so anything not landed this week has to be cut
now, not carried forward.

## Build Log Entry

Same three questions as every week:

1. **What I built.** One or two sentences, concrete — not "worked on the lab," but what
   actually exists now that didn't before.
2. **What surprised me.** Something that didn't go the way you expected — a concept that
   clicked differently than you thought, an error message that taught you something.
3. **What I'm stuck on.** Naming it here is what makes it visible to you next week, and
   to your pod if you bring it to the huddle.

Commit it alongside your code, in the same spot you've used every week. It's private or
public, your choice, but it has to exist.
