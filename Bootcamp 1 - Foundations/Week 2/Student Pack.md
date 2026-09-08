# Week 2 Student Pack — Bootcamp 1: Foundations

Everything you need to work Thursday through Sunday lives on this page — you won't see
the facilitator's run sheets, and you shouldn't need to. If something below sends you
looking for a file, it's linked.

## This Week

Three evenings, two concepts, two labs, and your capstone's first working AI step:

- **Evening 1 (Mon)** — a huddle where your pod hears whether `CAPSTONE-1-SPEC.md` got
  committed, then prompting as programming, then Lab A.
- **Evening 2 (Tue)** — a Lab A checkpoint, then structured output and why free text
  breaks programs, then Lab B.
- **Evening 3 (Wed)** — a look at how a real system assembles its prompts from parts, a
  capstone clinic with your pod, and week close.
- **Thu–Sun** — finish both labs, then build and commit your capstone's AI step. See
  Homework below for the exact list.

By the end of this week you'll be able to structure a prompt deliberately instead of
guessing at it, get schema-validated output back from a model instead of free text, and
you'll have your own capstone's AI step running end to end on real input.

## Concept A: Prompting as Programming

The prompt is the only "code" an LLM runs — there's no other artifact telling it what to
do. Writing one deliberately, the way you'd write a function, is a real skill.

A chat message has one of three roles:

- **`system`** — standing instructions, a persona, hard constraints. Set once, applies
  to everything that follows.
- **`user`** — the actual request.
- **`assistant`** — the model's reply, or a prior reply in a multi-turn exchange.

Two things reliably change what comes back:

**Constraints beat hope.** "Tell me about dogs" produces something different every time.
"List exactly 3 things a new dog owner must do in the first week. One sentence each, no
preamble" produces roughly the same shape every time — because you told the model what
shape you wanted instead of hoping it would guess.

**Few-shot examples teach by demonstration.** Showing 2–3 worked input→output pairs,
placed as prior `user`/`assistant` messages before your real question, often gets a
model to match a format you never described in words at all:

```ts
const messages = [
  { role: "user", content: "Write a pitch for a password manager aimed at freelancers." },
  { role: "assistant", content: "For freelancers juggling a dozen client logins, ..." },
  // a second worked example goes here, same shape
  { role: "user", content: TASK }, // the real question, asked last
];
```

The model has no memory between separate API calls. Those example messages are the only
reason it "remembers" the pattern at all — they're resent, in full, every single time.

## Lab A

[`../labs/w2-prompting`](<../labs/w2-prompting>) — sends one task to the model three
different ways, back to back, so you see structure's effect in a single run.

```bash
cd "labs/w2-prompting"
pnpm install
cp .env.example .env      # then paste your real key
git check-ignore -v .env  # confirm it's protected before running anything
pnpm compare
```

You'll see three labelled sections print in order: a bare instruction with no system
prompt and no examples, the same instruction with a system role and hard constraints
added, and finally the same again plus two few-shot examples demonstrating a specific
pitch template. Read all three top to bottom. Watch specifically whether Variant 3
follows the template the examples showed — even though that template was never written
down as an instruction anywhere, only demonstrated.

No key yet? You'll still see exactly how the wiring is correct: a blank `.env` gives
`OpenAIError: Missing credentials`, a fake or expired key gives a real `401
AuthenticationError`. Neither is a broken lab. Full walkthrough, including exactly what
`ask()` does with the system prompt and the examples array, is in the lab's own
[README](<../labs/w2-prompting/README.md>).

```bash
pnpm typecheck
```

## Concept B: Structured Output with Zod

Free text is the worst format to build a program around. Code that checks whether a
reply `.includes("urgent")` breaks the moment the model writes "Urgent." instead —
same meaning, different string, broken branch.

**Structured output** asks the model to reply with JSON matching a shape you define, and
then a validator — not you, eyeballing the output — decides whether to trust it. In
TypeScript, that validator is usually [Zod](<https://zod.dev>), and a Zod schema does
double duty: it's the runtime check *and*, through `z.infer`, the compile-time
TypeScript type. Write the shape once, get both:

```ts
export const ClassificationSchema = z.object({
  category: z.enum(["bug", "question", "feature"]),
  confidence: z.number().min(0).max(1),
  summary: z.string(),
});

export type Classification = z.infer<typeof ClassificationSchema>;
```

`safeParse()` checks a value against that schema and returns a result object instead of
throwing — so your code can branch cleanly on success or failure instead of wrapping
everything in `try`/`catch`. Even a well-behaved model occasionally returns something
that doesn't fit (a stray field, a category outside the enum), so the reply always has
to pass through the schema before anything downstream is allowed to use it.

Tonight's lab pattern goes one step further than "validate and move on": if the first
reply fails validation, it retries once (LLM output is nondeterministic — asking again
is a cheap first fix), and if the retry *also* fails, it throws an error carrying the
model's actual raw reply — never a silently swallowed `null`. Whoever debugs it later
gets to see exactly what the model sent.

## Lab B

[`../labs/w2-structured-output`](<../labs/w2-structured-output>) — gets the model to
return JSON, validates it against a schema, and has you trigger the failure path on
purpose so you see the retry-then-throw logic actually run.

```bash
cd "labs/w2-structured-output"
pnpm install
cp .env.example .env      # then paste your real key
git check-ignore -v .env
pnpm classify "the login button does nothing on Safari"
```

With a funded key, you'll see a validated object — not raw text — something like
`{ category: 'bug', confidence: 0.9, summary: '...' }`. That object passed through
`ClassificationSchema.safeParse()` before you ever saw it.

The part of this lab that matters most: proving to yourself the failure path is real,
not theoretical. The README's "Try the failure path on purpose" section walks you
through temporarily narrowing the schema's `category` enum so nothing the model produces
can match, re-running against clearly bug-shaped input, and watching a
`console.error`, a retry, and finally a thrown `ClassificationValidationError` fire in
sequence. **Revert the schema afterward** — a narrowed enum left in place breaks next
week's lab, which copies this file in as-is.

No key yet? Same two failure modes as every earlier lab — a blank `.env` or a fake key —
both proof the wiring is correct except the key itself. Full walkthrough of
`classify.ts`, including exactly what it deliberately does *not* use and why, is in the
lab's own [README](<../labs/w2-structured-output/README.md>).

```bash
pnpm typecheck
```

## Capstone Component

This week's deliverable: **your AI step works end to end on real input, returning
validated output.** Not a hard-coded string — an actual input you can point at (an
email, a ticket, a transcript, whatever your spec names), run through the one job your
spec commits to (classify, summarise, extract, or draft), coming back as something a
program can act on rather than something you have to read and interpret yourself.

What "validated" means depends on the job, and the rubric says so: schema-validated
output is required **where the task calls for it** (dimension 3 in
[ASSESSMENT.md](<../../ASSESSMENT.md>)), and it is a narrower escape hatch than it
sounds. All four job types have a shape worth validating —
[Capstone Brief.md](<../Capstone Brief.md>)'s "For **The Job**" note spells out what
that shape is for each of them. If yours is `draft` or `summarise`, the prose inside is
free text but the envelope around it isn't: validate the envelope. If you conclude your
job genuinely doesn't call for a schema, say so in one sentence in your build log —
that's a decision to make on purpose, not a step to quietly skip.

Build this the way `w2-structured-output`'s `classify.ts` is built: define a schema for
your own output shape (mirroring your spec's "The Job" → Output section), write a
function that calls the model and validates the reply against it, retry once on
failure, and throw — with the raw reply attached — if the retry also fails. Don't
swallow a bad reply into `null` or an empty object; that hides exactly the signal you'd
need to debug it.

It does not need a polished CLI yet, error handling for every edge case, or logging —
that's Week 3's concept (script to shippable). This week is specifically: does the AI
step itself run, on your real input, and come back validated. Demo it — even a rough
`console.log` of the result — to your pod at Wednesday's clinic.

## Homework (Thu-Sun)

- Finish `w2-prompting`'s three variants if you didn't in the room; confirm
  `pnpm typecheck` is clean. Commit.
- Finish `w2-structured-output`, including running the failure path on purpose and
  reverting the schema afterward; confirm `pnpm typecheck` is clean. Commit.
- Build your capstone's AI step: a schema for your output shape where your job calls for
  one, a function that calls the model and validates against it (retry once, throw with
  the raw reply on a second failure), run against your real input. Commit it to your
  project repo.
- **Budget three to four hours** — more than last week, and honestly so. This week is
  two full LLM labs (including deliberately breaking `w2-structured-output`'s schema,
  watching the retry-then-throw fire, and reverting it), plus your own Zod schema, your
  own call-and-validate function with retry-then-throw, and a real run against real
  input. That is a floor, not a cap. If you block out two hours for this week because
  last week took two, the capstone component is what gets dropped — and that is the
  commit the Monday huddle asks about.

**This is the forcing function, not a suggestion**: your capstone component has to be
committed before Monday's huddle in Week 3. No commit, nothing to report — the same
stated rule from Week 1, not a nudge that gets softer later.

## Build Log Entry

Same three questions as last week — you'll answer them every week for the rest of the
bootcamp:

1. **What I built.** One or two sentences, concrete — not "worked on the lab," but what
   actually exists now that didn't before.
2. **What surprised me.** Something that didn't go the way you expected — a concept that
   clicked differently than you thought, an error message that taught you something.
3. **What I'm stuck on.** Naming it here is what makes it visible to you next week, and
   to your pod if you bring it to the huddle.

Commit it alongside your code, in the same spot you used last week. It's private or
public, your choice, but it has to exist — it's what your instructor and your pod see of
your week when you can't be in the room to say it yourself.
