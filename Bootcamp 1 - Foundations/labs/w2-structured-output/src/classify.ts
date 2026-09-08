// src/classify.ts
//
// Evening 2 lab: schema-validated structured output. Run it with
// `pnpm classify "some text"`.
//
// This reuses the exact call mechanism from w1-first-call/src/hello.ts and
// w2-prompting/src/compare-prompts.ts — same `--env-file=.env`, same
// `new OpenAI()` with no arguments. What's new here is what happens
// *after* the call: instead of printing the model's reply as free text,
// this file parses it as JSON and validates it against a Zod schema before
// anything else is allowed to use it.
//
// Deliberate choice: this lab does NOT use the OpenAI SDK's
// `zodResponseFormat` / `chat.completions.parse` helper. That helper
// enforces the schema at the API level, which means a validation failure
// can basically never happen — there'd be nothing to catch or retry. This
// lab asks for JSON in the system prompt instead, and validates it
// ourselves, so the failure path below is real: it can and does happen
// (see "Try the failure path on purpose" in the README).
import OpenAI from "openai";
import { z } from "zod";

// 1. The schema — exactly what we want the model to return. This is the
// interface a later lab (Week 3) copies in and builds on, so its shape is
// fixed: don't rename the exports below or change the field names.
export const ClassificationSchema = z.object({
  category: z.enum(["bug", "question", "feature"]),
  confidence: z.number().min(0).max(1),
  summary: z.string(),
});

// `z.infer` reads the TypeScript type back out of the schema. Write the
// shape once, get both runtime validation (below) and a compile-time type
// (used by everything that calls `classify()`) from that single source.
export type Classification = z.infer<typeof ClassificationSchema>;

const client = new OpenAI();

const SYSTEM_PROMPT =
  "You triage incoming product feedback. Classify the user's message and " +
  "reply with ONLY a JSON object — no markdown fences, no commentary — " +
  'shaped exactly like: {"category": "bug" | "question" | "feature", ' +
  '"confidence": number between 0 and 1, "summary": string}. ' +
  '"category" must be one of exactly those three words.';

// Thrown when both the original attempt and the one retry fail schema
// validation. `rawReply` carries the model's actual (invalid) text — that
// is the debugging signal a caller needs; a caught-and-discarded error
// would throw that signal away.
export class ClassificationValidationError extends Error {
  constructor(
    message: string,
    public readonly rawReply: string,
  ) {
    super(message);
    this.name = "ClassificationValidationError";
  }
}

// One call to the model, returning its raw reply text (not yet parsed or
// validated — that happens in `classify()` below).
async function callModel(text: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    // Same budget pair as the earlier labs: `max_completion_tokens` caps
    // reasoning tokens and visible output together, so a generous ceiling
    // plus a low reasoning effort is what guarantees there's room left for
    // the reply. Getting this wrong is especially confusing here — an
    // empty reply doesn't look like a budget problem, it looks like a
    // schema-validation failure, because empty text fails `JSON.parse()`
    // and lands in exactly the same error path as genuinely malformed
    // JSON.
    max_completion_tokens: 2000,
    reasoning_effort: "low",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: text },
    ],
  });
  return response.choices[0].message.content ?? "";
}

// Try to turn a raw reply into a validated Classification. Two ways this
// can fail: the text isn't valid JSON at all (`JSON.parse` throws), or it's
// valid JSON that doesn't match the schema (e.g. a `category` outside the
// enum, or a missing field) — `safeParse` catches that second case without
// throwing, which is why we use it instead of `.parse()`.
function tryValidate(
  raw: string,
): { success: true; data: Classification } | { success: false } {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return { success: false };
  }

  const result = ClassificationSchema.safeParse(json);
  if (!result.success) {
    return { success: false };
  }
  return { success: true, data: result.data };
}

export async function classify(text: string): Promise<Classification> {
  // Attempt 1.
  const firstRaw = await callModel(text);
  const firstResult = tryValidate(firstRaw);
  if (firstResult.success) {
    return firstResult.data;
  }

  // Attempt 1 failed validation — retry once. LLM output is nondeterministic,
  // so the same prompt sent again is a reasonable, cheap first fix before
  // giving up.
  console.error(
    "classify(): first reply failed schema validation, retrying once. " +
      "Raw reply was:",
    firstRaw,
  );
  const secondRaw = await callModel(text);
  const secondResult = tryValidate(secondRaw);
  if (secondResult.success) {
    return secondResult.data;
  }

  // Both attempts failed. Do not swallow this — throw with the raw reply
  // attached so whoever's debugging this can see exactly what the model
  // sent instead of guessing.
  throw new ClassificationValidationError(
    "classify(): model reply failed schema validation twice in a row. " +
      "See .rawReply on this error for the model's actual text.",
    secondRaw,
  );
}

// --- CLI entry point -----------------------------------------------------
// `pnpm classify "some text"` runs this file directly. `process.argv[0]` is
// the node binary, `[1]` is this script's path, so the first real argument
// is `[2]`.
async function main() {
  const text = process.argv[2];
  if (!text) {
    console.error('Usage: pnpm classify "some text to classify"');
    process.exit(1);
  }

  const result = await classify(text);
  console.log(result);
}

// Only run the CLI when this file is executed directly (`tsx src/classify.ts`),
// not when it's imported by another module (e.g. a future test file or the
// Week 3 lab that copies this in) — importing it should never trigger a
// network call as a side effect.
if (process.argv[1] && process.argv[1].endsWith("classify.ts")) {
  main();
}
