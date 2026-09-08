# Bootcamp 1 — Foundations & Your First Agent

**Promise**: "I can write TypeScript that calls an LLM, structure prompts deliberately, and ship a working single-purpose agent."

Four weeks. Three evenings a week, live, plus your own build time between blocks. You
ship one working agent and demo it on the final evening.

Before anything else, finish [B0 — Environment & Git](<../Bridge Library/B0 - Environment & Git/brief.md>)
and its qualifier. That's the entry gate, and it's due before Evening 1.

---

## Your week, every week

1. Read that week's **Student Pack** — it carries everything for the week.
2. Do both **labs**. They're not exercises; each one becomes a component of your capstone.
3. Commit that week's **capstone component** to your own repo before Monday's huddle.
4. Write your **build-log entry** — what I built, what surprised me, what I'm stuck on.

## Everything in this bootcamp

| Week | Concepts | File | What it is |
|---|---|---|---|
| — | — | [Capstone Brief](<Capstone Brief.md>) | What you're building, and the spec you freeze in Week 1 |
| 1 | TypeScript essentials for agent work · Your first LLM call + secrets hygiene | [Week 1 Student Pack](<Week 1/Student Pack.md>) | Start of Week 1 |
| 1 | | [labs/w1-ts-essentials](<labs/w1-ts-essentials/README.md>) | TypeScript basics — no LLM call, no key needed |
| 1 | | [labs/w1-first-call](<labs/w1-first-call/README.md>) | First real LLM call + `.env` hygiene |
| 2 | Prompting as programming · Structured output with Zod | [Week 2 Student Pack](<Week 2/Student Pack.md>) | Start of Week 2 |
| 2 | | [labs/w2-prompting](<labs/w2-prompting/README.md>) | Same task, three prompt structures, one run |
| 2 | | [labs/w2-structured-output](<labs/w2-structured-output/README.md>) | JSON output validated against a Zod schema |
| 3 | Model selection & the quality/latency/cost triangle · From script to shippable | [Week 3 Student Pack](<Week 3/Student Pack.md>) | Start of Week 3 |
| 3 | | [labs/w3-model-choice](<labs/w3-model-choice/README.md>) | Same task, three model tiers, one comparison table |
| 3 | | [labs/w3-shippable](<labs/w3-shippable/README.md>) | Retries with backoff, structured logs, real exit codes |
| 4 | No new concepts — integration, polish, ship | [Week 4 Student Pack](<Week 4/Student Pack.md>) | Integration, README, demo, Demo Night |

Six labs, four Student Packs, one Capstone Brief. Week 4 has no labs — it's the week you
put the pieces together and ship.

## Not in this folder, but you need it

- [CONVENTIONS.md](<../CONVENTIONS.md>) — every model ID, pinned version, and the project
  skeleton each lab starts from. If a version looks wrong, this is the file that's right.
- [ASSESSMENT.md](<../ASSESSMENT.md>) — the five dimensions your capstone is scored on,
  the pass bar, and what happens if you don't clear it the first time. Read it in Week 1,
  not Week 4.
- [Bridge Library → B0](<../Bridge Library/B0 - Environment & Git/brief.md>) — the entry
  gate, plus its [qualifier](<../Bridge Library/B0 - Environment & Git/qualifier/>).

## Working a lab

Each lab is a standalone project. From inside its folder:

```bash
pnpm install
pnpm typecheck
```

then the one run command its README documents. Every lab's README is self-contained —
setup, what to run, what you should see, and what the common failures actually mean.

Five of the six labs call a real model, so they need your funded provider key in a local
`.env`. `w1-ts-essentials` doesn't — you can do that one before your account exists.
