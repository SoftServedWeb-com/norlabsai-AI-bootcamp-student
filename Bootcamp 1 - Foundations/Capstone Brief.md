# Capstone 1 — Your First Agent

**Student-facing.** This is what you're building over the next four weeks, and the spec
template you'll fill in, commit, and freeze at the end of Week 1.

## The Shape

A CLI agent doing one real job on real input — classify, summarise, extract or draft.
That's it. One AI step, done well, on something real, is worth more here than three AI
steps done halfway.

By the end of Week 1 you will have chosen a problem, written a one-page spec, and
committed it. From Week 2 on, no new concept lands without a piece of your capstone
landing alongside it — Week 2 builds one component, Week 3 builds another, and Week 4
introduces no new material at all: just integrating, polishing and shipping what already
exists in parts by then. You are never staring at a blank page in Week 4.

## Choosing a Problem

Pick something with a real input you can actually get your hands on — an email, a
support ticket, a set of notes, a transcript, a spreadsheet column — and a real person
who'd want the output, even if that person is you. Then reduce it to exactly one AI
step: does the model classify it, summarise it, extract structured data from it, or
draft something from it? If your idea needs two of those chained together, you've found
a later bootcamp's project, not this one — cut it down to the single step that matters
most and ship that.

**Bring a real problem from your own job if you can — this is the default suggestion,
not a requirement.** A working professional building something that triages their own
team's tickets or summarises their own weekly reports gets a better demo and a head
start nobody else in the cohort has. But company data is not required, and it isn't the
differentiator here — a personal problem, sized the same way, ships exactly as well.
Some students genuinely cannot use work data, and a spec built around a personal problem
is not a lesser capstone.

## Requirements

Your finished capstone has:

- A **real input** — not a hard-coded string, something that actually varies
- A **real AI step** — classify, summarise, extract, or draft; pick one
- A **real output** — something the user actually reads or uses, **schema-validated
  where the task calls for it** (see "The Job" below — it calls for it more often than
  people expect)
- **Runs from the command line** — no server, no browser
- A **README** — problem, demo, stack, setup, what you learned
- A **build log** — one short entry per week, committed alongside the code

How this gets scored is in [ASSESSMENT.md](<../ASSESSMENT.md>) — read it once now so
Demo Night isn't the first time you see the rubric.

## What it is not

Every one of these is a real, good project — just not this one. Building any of them
instead of what's asked will cost you a resubmission, not earn you credit for ambition:

- **Not a chatbot.** A back-and-forth conversational interface is Bootcamp 3's capstone,
  built once you've covered retrieval and context budgeting. Your agent runs once per
  input and produces one output; it doesn't hold a conversation.
- **Not a multi-tool agent.** One AI step, not a chain of tool calls with control flow
  between them. That's Bootcamp 2 — a 2–3 tool agent plus an MCP server — built directly
  on top of what you ship here.
- **Not a web app.** No frontend, no server framework, no deployment target beyond your
  own terminal.
- **Not a perfect product.** A real, narrow, working agent that does one job on real
  input beats an unfinished impressive one, every time. If you're behind in Week 3, cut
  scope — don't cut whether it runs.

## The Spec — `CAPSTONE-1-SPEC.md`

Copy the template below into a file named `CAPSTONE-1-SPEC.md` at the root of your
project repo. Fill in every section, commit it before Monday's huddle in Week 2, and
treat it as frozen from that point on — new features after that need your instructor's
sign-off, not just your own second thoughts.

```markdown
# Capstone 1 — [your project title]

## Problem
One paragraph. What problem, for whom?

## User
Specific. ("Me" is allowed. Your team counts.)

## The Job
**Input:** where the text comes from
**The AI step:** [classify | summarise | extract | draft]
**Output:** what the user sees, and where

## Demo Plan
What does the 3–5 minute demo show, in order?

## Stack
Model tier chosen, and one sentence on why.

## Out of Scope (be explicit)
Three things you are deliberately NOT building.

## Risks
One sentence each. What could break this by week 4?
```

For **The Job**, write down the shape your output has to come back in — that shape is
what your Zod schema validates before anything downstream is allowed to use it, and the
rubric scores schema-validated output *where the task calls for it* (dimension 3 in
[ASSESSMENT.md](<../ASSESSMENT.md>)). Concretely, per job type: a **classifier** returns
a category from a fixed set, so the schema is an enum plus whatever travels with it — a
confidence number, a one-line reason. An **extractor** returns the named fields you're
pulling out, each typed, so validation catches a missing field or a date that came back
as prose. A **summariser** returns the summary as a field in an object rather than as
bare text, with the constraints that matter to you — a non-empty string, a bullet count,
a maximum length — so an empty or runaway summary is caught rather than printed. A
**drafter** does the same for free text: the draft is prose, but the envelope around it
isn't, so validate the envelope — `{ subject, body }` with both non-empty, or the draft
plus the fields it was required to mention. Every one of the four has a shape; "it's
free text" is not an exemption, it just means the schema validates the container instead
of the prose.

For **Stack**, pick a model tier from
[CONVENTIONS.md](<../CONVENTIONS.md#models>) and say why in one sentence — that sentence
is graded (dimension 3 in [ASSESSMENT.md](<../ASSESSMENT.md>)).

For **Out of Scope**, don't reach for filler. Name the three real features you can
already see yourself wanting to add — the second input format, the extra flag, the
nicer output — and rule them out on purpose. That list is what your instructor holds you
to at the Week 3 capstone clinic if you're behind and need to cut.
