// src/compare-prompts.ts
//
// Evening 1 lab: the SAME task, sent to the model three different ways.
// Run it with `pnpm compare`.
//
// This reuses the exact call pattern from w1-first-call/src/hello.ts — same
// `--env-file=.env` mechanism, same `new OpenAI()` with no arguments, same
// `.choices[0].message.content` shape. Nothing new there. What's new is the
// `messages` array: this lab holds the task constant and varies only how
// much *structure* surrounds it, so you can see structure's effect in one
// run instead of trusting a description of it.
import OpenAI from "openai";

const client = new OpenAI();

// The task never changes across the three variants below — that's the
// point. Only the surrounding structure changes.
const TASK = "Write a pitch for a to-do list app aimed at busy parents.";

// A reusable helper: give it an optional system prompt and a list of
// few-shot example turns, get the model's reply text back. Everything below
// is built from this one function — the three variants differ only in what
// they pass to it.
async function ask(
  systemPrompt: string | null,
  fewShotExamples: Array<{ user: string; assistant: string }>,
  userPrompt: string,
): Promise<string> {
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];

  // Omit the system message entirely when there isn't one, rather than
  // sending an empty string — that keeps Variant 1 genuinely "bare."
  if (systemPrompt) {
    messages.push({ role: "system", content: systemPrompt });
  }

  // Few-shot examples are prior user/assistant turns placed *before* the
  // real question. The model has no memory between API calls — this array
  // is the only reason it "remembers" the examples. Each turn shows the
  // model the input->output shape we want, so it can match that shape on
  // the real task without us describing the shape in words.
  for (const example of fewShotExamples) {
    messages.push({ role: "user", content: example.user });
    messages.push({ role: "assistant", content: example.assistant });
  }

  messages.push({ role: "user", content: userPrompt });

  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    // Same budget pair as w1-first-call/src/hello.ts, for the same
    // reason: `max_completion_tokens` caps reasoning tokens *and* visible
    // output together, so a tight cap can be spent entirely on thinking
    // and return empty content. A generous ceiling plus a low reasoning
    // effort leaves room for the reply. It matters more here than in
    // Week 1: this file makes three calls per run, and a budget squeeze
    // would silently blank a variant and make it look like structure
    // caused the difference.
    max_completion_tokens: 2000,
    reasoning_effort: "low",
    messages,
  });

  return response.choices[0].message.content ?? "";
}

async function main() {
  // --- Variant 1: bare instruction -----------------------------------
  // No system prompt, no examples, no constraints. Just the task, exactly
  // as a first-time user might type it. Expect a free-form reply — likely
  // more than one sentence, maybe with a "Sure, here's a pitch:" preamble.
  console.log("=".repeat(70));
  console.log("VARIANT 1 — bare instruction");
  console.log("=".repeat(70));
  const bare = await ask(null, [], TASK);
  console.log(bare);

  // --- Variant 2: instruction + system role ---------------------------
  // Same task, but now a system message sets a persona and hard
  // constraints: exactly one sentence, no preamble, no quotation marks.
  // Expect a shorter, more disciplined reply — but the model still has to
  // *infer* what a good pitch sounds like from the description alone.
  console.log("\n" + "=".repeat(70));
  console.log("VARIANT 2 — instruction + system role");
  console.log("=".repeat(70));
  const systemPrompt =
    "You are a senior product marketer. When asked to pitch a product, " +
    "respond with exactly one sentence. No preamble, no quotation marks, " +
    "no closing remarks — the sentence itself is the entire reply.";
  const withSystem = await ask(systemPrompt, [], TASK);
  console.log(withSystem);

  // --- Variant 3: instruction + system role + two few-shot examples ---
  // Same system message as Variant 2, plus two worked examples that show
  // a specific pitch template ("For <audience>, <product> is the
  // <category> that <benefit>."). That template was never written down as
  // an instruction anywhere — the examples teach it by demonstration.
  // Expect the reply to follow the same template, which neither Variant 1
  // nor Variant 2 has any reason to produce.
  console.log("\n" + "=".repeat(70));
  console.log("VARIANT 3 — instruction + system role + few-shot examples");
  console.log("=".repeat(70));
  const fewShotExamples = [
    {
      user: "Write a pitch for a password manager aimed at freelancers.",
      assistant:
        "For freelancers juggling a dozen client logins, Vaultly is the " +
        "password manager that turns one click into total peace of mind.",
    },
    {
      user: "Write a pitch for a habit tracker aimed at night-shift workers.",
      assistant:
        "For night-shift workers whose days don't run on a normal clock, " +
        "Rhythm is the habit tracker that adapts to whatever schedule " +
        "you're actually living.",
    },
  ];
  const withFewShot = await ask(systemPrompt, fewShotExamples, TASK);
  console.log(withFewShot);

  console.log("\n" + "=".repeat(70));
  console.log(
    "Compare the three outputs above: length, tone, and whether Variant 3\n" +
      "follows the 'For <audience>, <product> is the <category> that\n" +
      "<benefit>.' template that only the examples demonstrated.",
  );
}

main();
