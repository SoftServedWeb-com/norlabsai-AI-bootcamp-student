# w2-structured-output

Evening 2's lab for Bootcamp 1 — Foundations. You'll get the model to
return JSON instead of free text, validate it with a Zod schema, and see
what happens — deliberately, not by accident — when that validation fails.

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
pnpm classify "the login button does nothing on Safari"
```

With a real, funded key in `.env`, you should see a validated object
printed, something like:

```
{
  category: 'bug',
  confidence: 0.9,
  summary: 'Login button is unresponsive on Safari.'
}
```

That object isn't just text the model happened to produce — it passed
through `ClassificationSchema.safeParse()` first. If `category` had come
back as anything other than `"bug"`, `"question"`, or `"feature"`, or if
`confidence` had been missing or out of range, the code below would have
caught that and retried before you ever saw a result.

**No key yet?** Same two failure modes as the earlier labs:

- `.env` left blank → `OpenAIError: Missing credentials`
- `.env` filled with a fake or expired value → `AuthenticationError: 401
  Incorrect API key provided`

Both are proof the wiring — `.env` loading, schema, call site — is correct;
only the key itself is missing.

**A third failure mode wears a disguise in this lab.** If a call returns
empty `content` with `finish_reason: "length"`, you don't see a blank
line — you see a *validation* failure: the retry line, then a
`ClassificationValidationError` with an empty `.rawReply`. Empty text
fails `JSON.parse()` and lands in the same error path as genuinely
malformed JSON, so the symptom points at the schema when the cause is the
token budget. On this model family `max_completion_tokens` bounds
reasoning tokens as well as visible output, so too small a budget lets the
model spend the whole thing thinking and emit nothing. `callModel()` sets
a generous budget plus `reasoning_effort: "low"` to prevent it.

**The tell is `.rawReply`.** An empty or whitespace-only `.rawReply` means
the model said nothing and the budget is the suspect; a `.rawReply` full
of actual text that doesn't match the schema is a real validation failure,
which is what the exercise below is for. Confirm by printing
`response.choices[0].finish_reason` and `response.usage` inside
`callModel()`.

## Check your types

```bash
pnpm typecheck
```

Runs `tsc --noEmit`. Should report nothing.

## What's actually happening in `classify.ts`

Open `src/classify.ts` and read the comments top to bottom. The shape to
notice:

1. `ClassificationSchema` — a Zod schema — is both the runtime validator
   *and*, via `z.infer<typeof ClassificationSchema>`, the TypeScript type
   `Classification`. One definition, two uses.
2. `classify()` asks the model for JSON (the system prompt spells out the
   exact shape), then hands the reply to `tryValidate()`, which tries
   `JSON.parse()` and then `ClassificationSchema.safeParse()`.
3. If validation fails, `classify()` doesn't give up immediately — it
   retries once, since LLM output is nondeterministic and the same prompt
   sent again is a cheap first fix.
4. If the retry *also* fails, `classify()` throws a
   `ClassificationValidationError` with the model's actual raw reply
   attached as `.rawReply`. That's the important part: the failure is
   never silently swallowed into a `null` or an empty object. Whoever is
   debugging this gets to see exactly what the model sent.

Notice what this lab does **not** use: the OpenAI SDK ships a
`zodResponseFormat` helper that enforces your schema at the API level,
which makes validation failures almost impossible to trigger — there'd be
nothing left to catch or retry. This lab asks for JSON in a plain system
prompt instead and validates it itself, specifically so the failure path
is real and you can watch it happen (next section).

## Try the failure path on purpose

This is the part that matters most in this lab: prove to yourself the
retry-then-throw logic actually runs, rather than taking it on faith.

1. Open `src/classify.ts` and find this line:

   ```ts
   category: z.enum(["bug", "question", "feature"]),
   ```

   Temporarily narrow it so nothing the model produces can possibly match:

   ```ts
   category: z.enum(["feature"]),
   ```

2. Re-run the same command:

   ```bash
   pnpm classify "the login button does nothing on Safari"
   ```

   The model will (correctly, from its point of view) classify this as a
   `"bug"` — which the narrowed schema now rejects. You should see:
   - a `console.error` line reporting the first reply failed validation
     and that it's retrying, with the raw reply printed,
   - a second attempt that also fails (same reasoning, same rejection),
   - and finally an uncaught `ClassificationValidationError` with the raw
     model reply visible in the thrown error.

3. **Revert the schema** back to
   `z.enum(["bug", "question", "feature"])` before you do anything else —
   don't leave the narrowed version in your working copy or commit it.

If you don't see the retry line and the eventual throw, something in the
validation logic isn't wired the way this README describes — that's a bug
worth chasing down, not a step to skip.

## Where this goes next

Week 3 copies `classify.ts` in as-is and builds on `ClassificationSchema`,
`Classification`, and `classify()` — that's why their names and shapes are
fixed. If you rename any of them while experimenting, rename them back
before moving on.
