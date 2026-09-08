# B0 Qualifier

This is the admission gate for Bootcamp 1. It's a tiny repo with one failing test
suite. Your job is to make both tests pass — that's it, that's the whole exercise.

## Get it running

You already have this folder: it came with the curriculum repository you cloned in
step 5 of [B0's brief](<../brief.md>). There is nothing further to download, and there
is no separate qualifier repository — a subdirectory can't be cloned on its own. Work
in place, here, inside your clone:

```bash
pnpm install
pnpm test
```

**Windows students**: if `pnpm install` or `pnpm test` fails at startup rather than at
the tests, look at how deep your clone sits. A corporate OneDrive folder is often
several levels down before your own files even begin, and the resulting paths can exceed
what the toolchain handles — the errors it produces rarely mention path length at all.
Re-clone the repository somewhere short, like `C:\dev\`, and run from there.

You should see both tests in `tests/greet.test.ts` fail, with an error message that
starts with `Not implemented`. That's expected — this qualifier ships broken on
purpose.

## What to do

Open `src/greet.ts`. It currently throws instead of returning a greeting. Read
`tests/greet.test.ts` to see exactly what `greet` is expected to return for two
inputs, then edit `src/greet.ts` so both tests pass. Do not edit the test file —
the tests describe the requirement, not the other way around.

Re-run `pnpm test` after each change. When both tests are green, you're done.

## How to submit

1. Copy this `qualifier/` folder out of your clone into a folder of its own, and push
   that (with the tests passing) to a new repository under your own GitHub account.
   Push to your own repository, never back to the curriculum repository — you only
   ever read from that one.
2. Submit the link to that repository.

## Deadline

This qualifier is due **before Evening 1** of Bootcamp 1 — the same hard deadline
every entrant works to, regardless of which bootcamp they're entering the series at.
If your tests aren't passing by then, you're not ready for Evening 1; get help
before the deadline, not after.
