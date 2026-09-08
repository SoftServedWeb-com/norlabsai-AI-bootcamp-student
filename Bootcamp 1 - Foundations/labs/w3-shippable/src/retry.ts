// src/retry.ts
//
// Evening 2 lab: turn a script into something shippable. This file is the
// first piece — retries with exponential backoff — that `src/run.ts` wraps
// around every call to `classify()`.
//
// Every LLM call can fail for reasons that have nothing to do with your
// code: a dropped connection, a rate limit, a momentary 500 from the
// provider. A script that gives up on the very first failure is fragile in
// a way that has nothing to do with whether the underlying task is
// possible. `withRetry()` is a generic wrapper — it doesn't know or care
// what `fn` does — that gives a transient failure a few more chances before
// it's treated as a real failure.
//
// Which failures deserve a retry, and which don't
// ------------------------------------------------
// Retry *transient* failures: a 429 rate limit, a 5xx from the provider, a
// dropped socket or a timeout. Those are failures of the moment, not of the
// request — the same call a second later may well work. Fail *fast* on 4xx
// authentication and validation errors: a 401 means your key is wrong, a
// 400 means your request is malformed, and neither of those changes because
// you asked again. Retrying them costs you the backoff delay, three times
// the log noise, and — worst of all — turns an instant, obvious failure
// into a slow, ambiguous one. In production the difference matters: a
// retried 429 recovers, a retried 401 just fails later.
//
// `withRetry()` as written here retries everything, deliberately, because
// its job in this lab is to teach the backoff mechanism and the bounded
// loop without a second concept layered on top. Which means the README's
// fake-key exercise — put `sk-fake` in `.env`, watch three attempts fire —
// is a convenient *trigger* for observing backoff, not an example of
// something you should retry. A 401 is exactly the case real shippable code
// fails fast on. Use it to watch the delays grow, then remember which
// column it belongs in. Adding that distinction to this function is a
// worthwhile exercise once the bootcamp is over: inspect the error, retry
// on 429 and 5xx, rethrow immediately on anything else.

// Base delay for the first retry, in milliseconds. Doubled after each
// subsequent failed attempt — see the comment on `delayMs` below for why
// that's "exponential" and not just "a fixed wait."
const BASE_DELAY_MS = 300;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Thrown when every attempt has failed. `attempts` and `lastError` are
// attached directly to the error object — that's the "attempt count
// attached" the interface below promises. A caller that only logs
// `error.message` still gets a readable message; a caller that wants more
// (a log aggregator, a test) can read `.attempts` and `.lastError` off the
// same object instead of re-parsing a string.
export class RetryExhaustedError extends Error {
  constructor(
    message: string,
    public readonly attempts: number,
    public readonly lastError: unknown,
  ) {
    super(message);
    this.name = "RetryExhaustedError";
  }
}

// The interface this lab's later step depends on. Signature is fixed —
// don't change the parameter names, the default, or the return type.
export async function withRetry<T>(
  fn: () => Promise<T>,
  attempts = 3,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const message = err instanceof Error ? err.message : String(err);
      console.error(
        `withRetry(): attempt ${attempt}/${attempts} failed: ${message}`,
      );

      // Only sleep if another attempt is actually coming — no point
      // waiting after the last failure, we're about to give up anyway.
      if (attempt < attempts) {
        // Exponential backoff: 300ms, 600ms, 1200ms, ... — each wait
        // doubles the one before it (2 ** (attempt - 1) is 1, 2, 4, ...).
        // Bounded by `attempts`: this loop runs at most `attempts` times,
        // full stop, so a persistently failing `fn` cannot retry forever —
        // it gives up and throws once the loop above is exhausted.
        const delayMs = BASE_DELAY_MS * 2 ** (attempt - 1);
        console.error(`withRetry(): waiting ${delayMs}ms before retry...`);
        await sleep(delayMs);
      }
    }
  }

  // Every attempt failed. Rethrow — never swallow — with the attempt count
  // and the original error attached, so whoever's debugging this sees
  // exactly what happened and how many times it was tried.
  const lastMessage = lastError instanceof Error ? lastError.message : String(lastError);
  throw new RetryExhaustedError(
    `withRetry(): failed after ${attempts} attempt(s). Last error: ${lastMessage}`,
    attempts,
    lastError,
  );
}
