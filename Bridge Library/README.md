# Bridge Library

**Scope**: this file governs the Evening Bootcamp Series only — see
[CONVENTIONS.md](../CONVENTIONS.md) for the product boundary. One library, nine modules,
six configurations. Entry to the series is open: you can start at any bootcamp without
having taken the ones before it. The bridge is what makes that survivable — a short,
self-paced set of modules that gets you to the same starting line as someone who took
every earlier bootcamp, sized to exactly how far back you're starting from.

Stack details, model IDs and pinned versions live in [CONVENTIONS.md](../CONVENTIONS.md)
and are not repeated here.

## The nine modules

| | Module | Establishes | Status |
|---|---|---|---|
| B0 | Environment & Git | Node, pnpm, VS Code, GitHub, `.env` hygiene | Built — [brief.md](<B0 - Environment & Git/brief.md>) |
| B1 | TypeScript essentials | Types, functions, async/await, JSON | Not yet built |
| B2 | Your first LLM call | SDK, message roles, system prompts | Not yet built |
| B3 | Structured output | Zod, schema-validated responses | Not yet built |
| B4 | The tool-use loop | Model proposes → host runs → result returns | Not yet built |
| B5 | Retrieval basics | Embeddings, a vector store, top-k | Not yet built |
| B6 | Graphs & state | Nodes, edges, state as the through-line | Not yet built |
| B7 | The reference agent | A working, deliberately flawed agent to operate on | Not yet built |
| B8 | Reading an unfamiliar codebase | Navigation skills for Evening 3 | Not yet built |

B1–B8 are deliberate scope, not an unfinished file. Each is built by the plan preceding
the bootcamp that first requires it, on the same schedule as the rest of this series —
not before that bootcamp needs it, and not left behind afterward. A module without a
brief yet simply hasn't had its bootcamp built yet.

## The six configurations

Which modules you need depends only on where you enter, not on anything else about you:

| Entering at | Bridge required | Est. | Gate |
|---|---|---|---|
| BC1 | B0 | ~1 hr | Qualifier |
| BC2 | B0 · B1 · B2 | ~3 hrs | Qualifier |
| BC3 | B0–B4 | ~5 hrs | Qualifier |
| BC4 | B0–B4 · B6 | ~6 hrs | Qualifier |
| BC5 | B0–B5 · B7 | ~7 hrs | Qualifier **+ portfolio review** |
| BC6 | B0–B5 · B7 | ~7 hrs | Qualifier **+ portfolio review** |

A later entry point requires more of the same library, never a different one — adding a
seventh bootcamp later costs a configuration line here, not a new course.

## The qualifier

Each bridge configuration ends in one small project you already have — it ships inside
this repository, so cloning this repo is all it takes to get it. Make the failing tests
pass, push it to a repository of your own, and submit that link. It's objective and cheap
to grade, and it doubles as your first portfolio commit. Bridge and qualifier are due
**before Evening 1**, hard deadline — same for everyone, regardless of where they enter.

B0's qualifier lives at
[`B0 - Environment & Git/qualifier/`](<B0 - Environment & Git/qualifier/>), and its own
README walks you through copying it out into a repository of your own before you push.

## The portfolio review (BC5 and BC6 only)

BC5 and BC6 assume you already have a real agent to operate on, so they add one more
gate on top of the qualifier. It's satisfied by **either**:

- completion of the bootcamp immediately preceding the one you're entering, **or**
- a submitted repo containing a working agent you built yourself — one that runs from a
  clean clone, calls an LLM, and uses at least one tool.

An instructor reviews the submission and either admits you, admits you conditionally
with the specific bridge modules you still need to complete named, or — rarely —
declines. A decline always names the specific gap; it is never a bare rejection.
