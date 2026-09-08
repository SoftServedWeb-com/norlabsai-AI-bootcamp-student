// src/compare-models.ts
//
// Evening 1 lab: the SAME task, sent to all three model tiers from
// CONVENTIONS.md#models. Run it with `pnpm compare`.
//
// This reuses the exact call pattern from earlier labs — `--env-file=.env`,
// `new OpenAI()` with no arguments, `.choices[0].message.content`. What's
// new here is what gets measured: instead of only reading the reply text,
// this file times each call and reads `response.usage` for token counts,
// then lines all three results up in one table. You draw the conclusion —
// this file only measures.
import OpenAI from "openai";

const client = new OpenAI();

// The three tiers this series names in CONVENTIONS.md#models. Fixed here
// on purpose: this is "runnable lab source," the documented exception in
// CONVENTIONS.md that's allowed to name real model values so the lab can
// actually run. Verify these IDs still resolve before each cohort — see
// CONVENTIONS.md's "Verify Before Each Cohort" checklist.
const TIERS: Array<{ tier: string; model: string }> = [
  { tier: "fast", model: "gpt-5-nano" },
  { tier: "default", model: "gpt-5-mini" },
  { tier: "frontier", model: "gpt-5" },
];

// A single-sentence task, deliberately: a one-line reply is what makes the
// table below legible. A multi-paragraph task would force you to squint at
// wrapped text crammed into a table cell, which defeats the point of a
// side-by-side comparison.
const TASK =
  "In exactly one sentence, explain what a race condition is in " +
  "concurrent programming.";

interface RunResult {
  tier: string;
  model: string;
  output: string;
  latencyMs: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

async function runOne(tier: string, model: string): Promise<RunResult> {
  const start = Date.now();

  const response = await client.chat.completions.create({
    model,
    // Same budget pair as the earlier labs — `max_completion_tokens` caps
    // reasoning tokens and visible output together, so a generous ceiling
    // plus a low reasoning effort keeps room for the reply. Both values
    // are deliberately identical across all three tiers below: the whole
    // point of this lab is that the *only* thing varying between rows is
    // the model, so a per-tier budget would quietly make the comparison
    // meaningless. Note that the frontier tier will still spend more
    // reasoning tokens than the fast one at the same effort setting —
    // that difference is a result to read in the table, not a knob to
    // tune.
    max_completion_tokens: 2000,
    reasoning_effort: "low",
    messages: [{ role: "user", content: TASK }],
  });

  const latencyMs = Date.now() - start;
  const output = (response.choices[0].message.content ?? "").trim();

  return {
    tier,
    model,
    output,
    latencyMs,
    promptTokens: response.usage?.prompt_tokens ?? 0,
    completionTokens: response.usage?.completion_tokens ?? 0,
    totalTokens: response.usage?.total_tokens ?? 0,
  };
}

// --- Table rendering -------------------------------------------------------
// Numbers only look comparable when they're right-aligned in fixed-width
// columns — a raw template string ("${latencyMs} ms") lines up by accident
// at best. padStart/padEnd here is what makes "aligned, with units" true
// instead of just claimed.
function padCell(value: string, width: number, align: "left" | "right"): string {
  return align === "right" ? value.padStart(width) : value.padEnd(width);
}

function printTable(results: RunResult[]): void {
  const columns: Array<{
    header: string;
    align: "left" | "right";
    get: (r: RunResult) => string;
  }> = [
    { header: "Tier", align: "left", get: (r) => r.tier },
    { header: "Model", align: "left", get: (r) => r.model },
    { header: "Latency (ms)", align: "right", get: (r) => String(r.latencyMs) },
    { header: "Prompt Tokens", align: "right", get: (r) => String(r.promptTokens) },
    { header: "Completion Tokens", align: "right", get: (r) => String(r.completionTokens) },
    { header: "Total Tokens", align: "right", get: (r) => String(r.totalTokens) },
  ];

  // Column width = widest of the header or any row's value in that column,
  // so every row's cell is padded to the same width regardless of how many
  // digits a latency or token count happens to have.
  const widths = columns.map((col) =>
    Math.max(col.header.length, ...results.map((r) => col.get(r).length)),
  );

  const headerLine = columns
    .map((col, i) => padCell(col.header, widths[i], "left"))
    .join("  ");
  const separatorLine = widths.map((w) => "-".repeat(w)).join("  ");
  const rowLines = results.map((r) =>
    columns.map((col, i) => padCell(col.get(r), widths[i], col.align)).join("  "),
  );

  console.log(headerLine);
  console.log(separatorLine);
  for (const line of rowLines) {
    console.log(line);
  }
}

async function main() {
  const results: RunResult[] = [];

  // Sequential, not Promise.all: running one tier at a time keeps each
  // printed block cleanly separated and keeps the timing per-call
  // (parallel requests would contend for the same rate limit and skew
  // latency numbers against each other).
  for (const { tier, model } of TIERS) {
    console.log("=".repeat(70));
    console.log(`${tier.toUpperCase()} — ${model}`);
    console.log("=".repeat(70));
    const result = await runOne(tier, model);
    console.log(result.output);
    console.log();
    results.push(result);
  }

  console.log("=".repeat(70));
  console.log("SUMMARY — same task, three tiers");
  console.log("=".repeat(70));
  printTable(results);
  console.log();
  console.log(
    "Look at the three rows above: which tier gave the best answer for\n" +
      "the extra latency and tokens it cost? That judgement call — not a\n" +
      "fixed rule — is what this lab is teaching. Your capstone will need\n" +
      "you to make the same call for its own tasks.",
  );
}

main();
