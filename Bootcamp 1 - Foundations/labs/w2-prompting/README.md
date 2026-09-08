# w2-prompting

Evening 1's lab for Bootcamp 1 — Foundations. You'll send the *same* task to
the model three different ways and see, in one run, how much structure
changes the output.

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
nothing, **stop and fix your `.gitignore` before going any further.** (Same
rule as `w1-first-call` — see that lab's README if you want the full
explanation of why this order matters.)

## Run it

```bash
pnpm compare
```

With a real, funded key in `.env`, you'll see three clearly labelled
sections printed one after another:

- **Variant 1 — bare instruction**: the task, nothing else. Usually the
  longest and least predictable reply — maybe a preamble, maybe more than
  one sentence.
- **Variant 2 — instruction + system role**: the same task, but a system
  message now sets a persona and a hard constraint (exactly one sentence,
  no preamble). Usually shorter and more disciplined, but the model still
  has to guess what a *good* pitch sounds like.
- **Variant 3 — instruction + system role + few-shot examples**: the same
  system message, plus two worked examples showing a specific pitch
  template. Watch for the reply following that template even though the
  template itself was never written down as an instruction — only
  demonstrated.

Read all three top to bottom. That's the whole lab: seeing structure's
effect side by side in a single run, instead of taking it on faith.

**No key yet?** You'll still see this fail, and exactly how it fails tells
you what's still missing — same two failure modes as `w1-first-call`:

- `.env` left blank → `OpenAIError: Missing credentials`
- `.env` filled with a fake or expired value → `AuthenticationError: 401
  Incorrect API key provided`

Both are proof everything *except* the key itself is wired correctly. Drop
in a real, funded key and the same run should print three real replies.

**A variant that prints nothing under its heading**, with no error
anywhere, is the third failure mode — an empty `content` returned with
`finish_reason: "length"`. On this model family `max_completion_tokens`
bounds reasoning tokens as well as visible output, so too small a budget
lets the model spend the lot on thinking and return nothing to print.
`ask()` sets a generous budget plus `reasoning_effort: "low"` to prevent
it; if either was lowered, restore it. This one is worth recognising
quickly in *this* lab specifically: a blank variant looks exactly like
"that prompt structure produced no output," which is the wrong conclusion
to draw from it. Confirm it by printing
`response.choices[0].finish_reason` and `response.usage` — a `"length"`
finish with large `completion_tokens_details.reasoning_tokens` is the
signature.

## Check your types

```bash
pnpm typecheck
```

Runs `tsc --noEmit`. Should report nothing.

## What's actually happening in `compare-prompts.ts`

Open `src/compare-prompts.ts` and read the comments top to bottom. The
whole file is built around one reusable `ask()` function — it takes an
optional system prompt and a list of few-shot example turns, and returns
the model's reply text. The three variants in `main()` differ only in what
they pass to `ask()`; the task string (`TASK`) itself never changes. That's
deliberate: it isolates *structure* as the only variable, so the difference
you see in the output is caused by structure and nothing else.

Pay attention to how few-shot examples are represented: they're prior
`user`/`assistant` message pairs placed *before* the real question. The
model has no memory between API calls — those message objects are the only
reason it "remembers" the examples at all.

## Where this goes next

Evening 2's lab (`w2-structured-output`) takes the same call pattern one
step further: instead of free text, the model's reply is parsed as JSON and
validated against a schema — so a program, not a human, can safely branch
on the result.
