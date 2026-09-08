# Week 1 Student Pack — Bootcamp 1: Foundations

Everything you need to work Thursday through Sunday lives on this page — you won't see
the facilitator's run sheets, and you shouldn't need to. If something below sends you
looking for a file, it's linked.

## This Week

Three evenings, two concepts, two labs, and one written spec:

- **Evening 1 (Mon)** — TypeScript for agent work, then Lab A.
- **Evening 2 (Tue)** — how an LLM call actually works, then Lab B.
- **Evening 3 (Wed)** — a look at how a real agent system is structured, a scoping
  clinic with your pod, and your capstone spec frozen for the rest of the bootcamp.
- **Thu–Sun** — finish both labs and write, then commit, `CAPSTONE-1-SPEC.md`. See
  Homework below for the exact list.

By the end of this week you'll have run TypeScript, made a real call to an LLM from your
own code, and turned a real problem into a one-page spec you're committed to shipping
over the next three weeks.

## Concept A: TypeScript for Agent Work

A type annotation is a promise about what a value is — `: string`, `: number`,
`: boolean`. TypeScript checks that promise when you compile, so a mistake (a number
where a string belongs) is caught immediately instead of surfacing later as a confusing
runtime bug.

You won't annotate everything. TypeScript often infers the type for you:

```ts
const seats = 20; // TypeScript infers `number` — no annotation needed
```

Most annotations belong at function boundaries, where it matters that callers know
exactly what goes in and what comes out:

```ts
function greet(name: string): string {
  return `Welcome to Bootcamp 1 — Foundations, ${name}!`;
}
```

This matters specifically for agent code: every agent you build from here on passes
structured data between small parts constantly — a prompt assembled here, a response
parsed there. Types make that data trustworthy and make mistakes loud and early instead
of quiet and late. This is the language every capstone in the series runs on.

## Lab A

[`../labs/w1-ts-essentials`](<../labs/w1-ts-essentials>) — no LLM call, no API key.

```bash
cd "labs/w1-ts-essentials"
pnpm install
pnpm basics       # seven lines of output if everything's working
pnpm typecheck     # tsc --noEmit — catches what tsx's fast run doesn't
```

Open `src/basics.ts` and scroll to the bottom. Three exercises wait there, each
commented out — uncomment one at a time, write the code, and re-run `pnpm basics` after
each:

1. Declare `const yourName: string` and call `greet(yourName)`.
2. Write `weeksLeft(currentWeek: number): number` — how many weeks remain in this
   4-week bootcamp.
3. Take `"learn build ship"` and print it with each word capitalised.

Stuck? Read the hint comment above each exercise, then `console.log` intermediate
values to see what you actually have at each step — the single most useful debugging
habit in this bootcamp, whether you're inspecting a string or, from tomorrow, a raw LLM
response. Full details, including exactly what output to expect, are in the lab's own
[README](<../labs/w1-ts-essentials/README.md>).

## Concept B: Your First LLM Call

An LLM is a next-token predictor trained on huge amounts of text — it predicts what
comes next, it doesn't look anything up. Text is split into tokens, roughly ¾ of a word
each, and everything the model can "see" at once — your prompt, the conversation, the
reply — has to fit inside a fixed-size context window.

A chat completion call looks like this (the `model:` line is left out here on purpose —
it names a specific tier from [CONVENTIONS.md](<../../CONVENTIONS.md#models>), which is
the one place that value is allowed to live; open `src/hello.ts` for the exact, current,
runnable line):

```ts
const response = await client.chat.completions.create({
  // model: — the Default tier, see CONVENTIONS.md#models
  max_completion_tokens: 2000,
  reasoning_effort: "low",
  messages: [
    { role: "user", content: "Explain what an AI agent is in two sentences." },
  ],
});

console.log(response.choices[0].message.content);
```

Those two budget lines are worth understanding rather than copying.
`max_completion_tokens` is a ceiling on everything the model generates for this reply —
and on modern models that includes the *reasoning* tokens it spends thinking, which you
are billed for but never see, not only the answer you read. Set that ceiling too low and
the model can spend the entire budget reasoning and return an empty reply: a call that
succeeds, costs money, and prints nothing. A generous ceiling plus
`reasoning_effort: "low"` — don't think hard about something this simple — leaves room
for the answer either way. The lab's README has the full diagnosis if you ever see a
blank reply.

`new OpenAI()` with no arguments reads your key from the `OPENAI_API_KEY` environment
variable automatically — you never type the key itself in a file that gets committed.

**Say this once, out loud, to yourself:** your API key is a password. If it reaches a
public GitHub repo, anyone can spend your money on it. `.env` plus a `.gitignore` that
already excludes it — written *before* `.env` ever exists — is how you stop that from
happening.

## Lab B

**You need a funded LLM provider account for this one, tonight.** B0's "Before you
start" told you to create one with billing enabled — this is the evening it gets used.
The provider is the one named in
[CONVENTIONS.md](<../../CONVENTIONS.md#sdks--libraries>). If you haven't set it up yet,
do it now rather than during the lab block: an account that exists but has no payment
method on it fails at the first call exactly like no account at all, and sorting that out
mid-evening costs you the lab.

[`../labs/w1-first-call`](<../labs/w1-first-call>) — extends the same TypeScript into a
real LLM call.

```bash
cd "labs/w1-first-call"
pnpm install
cp .env.example .env      # then open .env and paste your real key
git check-ignore -v .env  # should print a line pointing at .gitignore — that's your proof
pnpm hello
pnpm typecheck
```

With a real, funded key, `pnpm hello` prints a real two-sentence reply. No key yet? You
still see exactly how the wiring is correct: a blank `.env` gives `OpenAIError: Missing
credentials` (the SDK never found a key), and a fake or expired key gives a real `401
AuthenticationError` from OpenAI's own servers (the request reached the right place and
was rejected there). Neither is a bug in the lab. Full walkthrough, including what's
happening in every line of `src/hello.ts`, is in the lab's own
[README](<../labs/w1-first-call/README.md>).

## Capstone Component

This week's capstone work is one deliverable: **write and commit `CAPSTONE-1-SPEC.md`.**
Nothing else — no code, no scaffolding. That's the labs' job this week.

Read [Capstone Brief.md](<../Capstone Brief.md>) in full — it has the requirements, what
your capstone is *not* (not a chatbot, not a multi-tool agent, not a web app), and the
exact spec template to copy into `CAPSTONE-1-SPEC.md` at the root of your project repo.

Your spec needs a real input, one AI step (classify, summarise, extract, or draft), a
real user, a 3–5 minute demo plan, a model-tier choice with a one-sentence reason, and
three things you're deliberately leaving out of scope.

**This is frozen once you commit it.** From that point, new features need your
instructor's sign-off — not just your own second thoughts. You'll say your one-sentence
version of it out loud to your pod on Evening 3 before you go write the full spec at
home; write down the same version you said, not a bigger one.

## Homework (Thu-Sun)

- Finish `w1-ts-essentials`'s three exercises if you didn't in the room; confirm
  `pnpm typecheck` is clean. Commit.
- Get `hello.ts` answering **three different questions** — change the `content` string,
  run `pnpm hello`, and commit after each change, so you end up with three separate
  commits, not one.
- Write `CAPSTONE-1-SPEC.md` from the template in
  [Capstone Brief.md](<../Capstone Brief.md>) and commit it to the root of your project
  repo.
- **Budget about two hours** — three lab exercises, three one-line edits to
  `hello.ts`, and a one-page spec. That figure is a floor, not a cap: it is what this
  week takes if nothing goes wrong, and week 1 is the lightest async week of the four.
  Weeks 2 and 3 ask for more; plan for that now rather than being surprised by it.

**This is the forcing function, not a suggestion**: your capstone component has to be
committed before Monday's huddle in Week 2. No commit, nothing to report — that's a
stated rule from week one, not a nudge that gets softer later.

## Build Log Entry

Every week from here on, add one short entry to your repo answering three questions.
Establishing them now — you'll reuse the same three every week for the rest of the
bootcamp:

1. **What I built.** One or two sentences, concrete — not "worked on the lab," but what
   actually exists now that didn't before.
2. **What surprised me.** Something that didn't go the way you expected — a concept that
   clicked differently than you thought, an error message that taught you something.
3. **What I'm stuck on.** Naming it here is what makes it visible to you next week, and
   to your pod if you bring it to the huddle.

Commit it alongside your code — a `BUILD-LOG.md` at the root of your repo works well;
pick a spot and keep it in the same place every week. It's private or public, your
choice, but it has to exist. This is what your instructor and your pod see of your week
when you can't be in the room to say it yourself.
