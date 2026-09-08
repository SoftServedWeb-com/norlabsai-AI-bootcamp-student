// src/run.ts
//
// Evening 2 lab: the piece that turns `classify()` + `withRetry()` into
// something you could actually run in production — or at least something
// that fails the way production code should fail. Run it with
// `pnpm run:agent "some text"`.
//
// Three things this file adds on top of what Week 2 had:
//   1. Every call to the model goes through `withRetry()` instead of being
//      called directly — a transient failure gets a few more chances.
//   2. Every run — success or failure — prints one structured JSON log
//      line, not a scattering of free-text console.log calls. A structured
//      line is the difference between "readable by a human squinting at a
//      terminal" and "parseable by whatever collects your logs."
//   3. The process's exit code tells the truth: 0 only on success, 1 on
//      any failure. A caller (a shell script, a CI job, a scheduler)
//      should never have to parse stdout to find out whether this worked.
import { withRetry } from "./retry.js";

// `classify` is imported dynamically inside `main()`'s try block below,
// not with a static `import` up here. Reason: `classify.ts` builds its
// `OpenAI` client at module load time (`const client = new OpenAI();`),
// and the SDK checks for a key *at construction*. A static import runs
// that construction before this file's own code — including its
// try/catch — ever executes, so a missing key would crash before this
// file gets a chance to log it or set an exit code. A dynamic `import()`
// inside the try block brings that construction under the same try/catch
// as everything else, so every failure — bad key, network error, schema
// mismatch — goes through the same structured-logging path below.

// The model `classify()` calls internally (see src/classify.ts). It isn't
// exported from there — classify.ts is an unmodified copy of Week 2's file
// — so it's named again here, once, for the log line below. If you change
// the model inside classify.ts, update this to match.
const MODEL = "gpt-5-mini";

interface RunLog {
  timestamp: string;
  inputLength: number;
  model: string;
  latencyMs: number;
  outcome: "success" | "failure";
  error?: string;
}

async function main() {
  // process.argv[0] is the node binary, [1] is this script's path — the
  // first real command-line argument is [2].
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: pnpm run:agent "some text to classify"');
    process.exit(1);
  }

  const start = Date.now();

  try {
    // withRetry() gives the classify call up to 3 attempts (its default)
    // with exponential backoff between them before it gives up and throws.
    // The dynamic import happens inside this same function passed to
    // withRetry — see the note above `import { withRetry }` for why.
    const result = await withRetry(async () => {
      const { classify } = await import("./classify.js");
      return classify(input);
    });
    const latencyMs = Date.now() - start;

    const log: RunLog = {
      timestamp: new Date().toISOString(),
      inputLength: input.length,
      model: MODEL,
      latencyMs,
      outcome: "success",
    };
    console.log(JSON.stringify(log));
    console.log(result);

    // Explicit success exit code — don't rely on falling off the end of
    // main() to mean "it worked." That's what makes `echo "exit=$?"` after
    // this command print 0.
    process.exit(0);
  } catch (err) {
    const latencyMs = Date.now() - start;
    const errorMessage = err instanceof Error ? err.message : String(err);

    const log: RunLog = {
      timestamp: new Date().toISOString(),
      inputLength: input.length,
      model: MODEL,
      latencyMs,
      outcome: "failure",
      error: errorMessage,
    };
    // Failure logs go to stderr, not stdout — same convention as the
    // retry attempts logged inside withRetry() itself, and it keeps stdout
    // clean for whatever a successful run prints there.
    console.error(JSON.stringify(log));

    // Non-zero exit on failure. This is the whole point of this file:
    // a script that swallows its failure and exits 0 anyway teaches
    // exactly the wrong lesson to anything that calls it.
    process.exit(1);
  }
}

main();
