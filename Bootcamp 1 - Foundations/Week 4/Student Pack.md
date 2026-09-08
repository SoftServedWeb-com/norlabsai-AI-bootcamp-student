# Week 4 Student Pack — Bootcamp 1: Foundations

Everything you need to work Thursday through Sunday lives on this page — you won't see
the facilitator's run sheets, and you shouldn't need to. If something below sends you
looking for a file, it's linked.

## This Week

Three evenings, no new concepts, no new labs — everything left to do is integrating,
polishing, and shipping what you've already built:

- **Evening 1 (Mon)** — a short standup, then a long build block: you clone your own
  project into an empty directory and get it running there, following only your own
  README, with your facilitator floating pod to pod.
- **Evening 2 (Tue)** — a README workshop, then deploying (or proving a reliable local
  run), then a demo-recording workshop — budget time for a re-record, almost everyone
  needs one.
- **Evening 3 (Wed)** — Demo Night: you demo live, get scored against the rubric,
  peer-review each other's READMEs, and the cohort closes.
- **Thu–Sun** — nothing new to build; your last homework is your final build log entry,
  plus an optional public post if you're free to write one.

**This week has no labs.** Weeks 1 through 3 each had two guided labs; Week 4 has none —
there's nothing new to learn this week, only your own three capstone components (the
frozen spec, the schema-validated AI step, and last week's hardened, failure-surviving
version) to wire into one working program and ship.

By the end of this week your capstone runs as one integrated agent, has a README a
stranger could actually use, and you'll have demoed it live — or via your backup
recording — to the cohort.

## The README Structure

Five parts, taught in full on Evening 2, and the shape your finished README should
follow:

- **Problem** — one paragraph: what problem, for whom.
- **Demo** — what the demo shows, in order; a recording link belongs here.
- **Stack** — the model tier you chose, and your one-sentence reason (the same sentence
  from your frozen spec's Stack section).
- **Setup** — the exact steps a stranger runs on a clean machine to get this working:
  install, env vars, the command that runs it. If you had to remember a step that isn't
  written down, it's missing.
- **What You Learned** — a few honest sentences; specifics beat platitudes.

The test that matters: could someone who has never seen your project clone it and get it
running using only this file? That's dimension 1 and dimension 5 of the rubric at once.

## Demo Night — What to Expect

- 3–5 minutes to demo, live, on real input, followed by 2 minutes of questions from the
  room.
- Bring your recorded backup, made Tuesday. If your live demo fails, the recording plays
  in your slot instead, and it counts as your demo — that's normal, not a consolation
  prize. Make sure it's ready before Wednesday, not during your turn.
- Frame it the way the whole series does: you're showing this to your manager on Monday,
  not pitching a recruiter.
- You're scored against the five-dimension rubric in
  [ASSESSMENT.md](<../../ASSESSMENT.md>) — read it now if you haven't since Week 1. Pass
  is 7/10 with no zeros. Below that, or any single 0, is a resubmit within two weeks, not
  a fail — a fixable gap, not a closed door.
- After demos, you'll read a pod-mate's README cold and leave a note on it — someone will
  do the same for yours.

## Capstone Component

This week's deliverable is different in kind from Weeks 1–3: it isn't a new piece of
code — it's **shipped**. Your three components (the frozen spec's AI step, its schema
validation, and last week's retry/logging/failure-survival) wired into one program, with
a README a stranger can follow and a demo — live or recorded — that shows it working on
real input.

"Shipped" means, concretely:

- One command runs your agent end to end — not three separate scripts you run in
  sequence by hand.
- It still survives the bad-input and API-failure cases you built last week — integration
  doesn't get to undo that work.
- Your README passes the stranger test (see above).
- You have a demo ready before Wednesday — deployed, or a reliable local run, plus a
  recorded backup.

There's no new AI capability to add this week. If you're tempted to add back a feature
you cut in your spec's "Out of Scope" section, don't — that's exactly what dimension 2
of the rubric, scope discipline, is scoring.

## Homework (Thu-Sun)

- Nothing new to build. If Evening 1 or 2 left something unfinished — integration,
  README, deploy, recording — finish it before Demo Night, not during it.
- Write your **final Build Log Entry** for Bootcamp 1 — same three questions as every
  week, this time closing out the whole four weeks (see below).
- **Optional**: write a public post about what you shipped. This is genuinely optional,
  not a soft requirement — templates below if you want them. Some of you can't post
  about work, and that's completely fine; the requirement that always applies is the
  private build log, not this.
- Budget whatever time integration, README, and recording left unfinished from the
  evenings — ideally close to zero if Evenings 1 and 2 went to plan.

### Public post templates (optional)

**Long form**: problem → what you built → a link to your demo → three specific things
you learned → repo link → program tag.

**Compact form**: one or two sentences on what you built and for whom, the demo link,
the repo link.

Either way: show the demo, use specifics over adjectives, and write it in your own voice
rather than filling in the template like a form.

## Build Log Entry

Your final entry for Bootcamp 1 — same three questions as every week:

1. **What I built.** This time, make it the whole arc in a sentence or two: what your
   shipped agent actually does.
2. **What surprised me.** Across the whole four weeks, if one moment stands out more
   than this week alone, use that.
3. **What I'm stuck on.** If nothing — say so. It's fine for this one to be short.

Commit it in the same spot you've used every week. This closes out Bootcamp 1's build
log; Bootcamp 2 starts a new one.
