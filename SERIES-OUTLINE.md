# The Evening Bootcamp Series

**Scope**: this document describes the Evening Bootcamp Series — six stackable 4-week
bootcamps for working professionals. It is a different product from the pre-existing
24-week Agentic AI Developer Program (`Instructor Guide/`, the root course outline files,
`Certifications/`). It is not that program rescheduled into evenings; it is a separate
series built for a different audience. If you are looking for the full-time program, this
is not it.

| | |
|---|---|
| **Format** | 3 consecutive evenings a week, live, 2 hours each, plus 2–4 hours of asynchronous build work between blocks, varying by week |
| **Duration** | 4 weeks per bootcamp |
| **Audience** | Working professionals — you keep your job, you show up three evenings a week |
| **Prerequisite** | You can read code and you have written scripts before. You do not need to be a working developer. See "Who this is for" below |

Stack details, model IDs, SDK versions and pinned tool versions live in
[CONVENTIONS.md](CONVENTIONS.md) and are not repeated here.

---

## What this is

Six bootcamps. Each one stands on its own: its own outcome, its own capstone, its own
certificate. You can take Bootcamp 1 and stop there with something real to show for it.

The six also stack into a progression. Each bootcamp assumes the skills of the ones
before it, and each one hands you a working piece of software you keep — not a
certificate of attendance, a shipped artifact.

You choose where to get off. Nobody is promising you a job title at the end of this. What
you get instead is the ability to build agent systems and read any agent codebase put in
front of you — and six working things you built to prove it.

Every bootcamp runs the same rhythm: two new concepts a week for three weeks, each one
landing as a piece of that bootcamp's capstone, then a fourth week with no new material
where those pieces get integrated, polished and shipped. You are never building from a
blank page in week 4 — by then, the capstone already exists in parts; the last week is
about making it whole.

Across every bootcamp, one evening a week is spent reading a real, working agent
codebase rather than a toy example — the same reference codebase throughout the series,
read a little deeper each time your own skills grow. The point is not to memorise that
one codebase; it is to practise the skill of opening an unfamiliar agent project and
making sense of it, because that is what the work actually looks like once the bootcamp
ends. You do this work in a small fixed group of four or five people — your pod — who
you check in with, build alongside, and get capstone feedback from for the whole
bootcamp.

---

## The six bootcamps

| Bootcamp | Promise | Capstone | Entry requirement |
|---|---|---|---|
| **BC1 — Foundations & Your First Agent** | "I can write TypeScript that calls an LLM, structure prompts deliberately, and ship a working single-purpose agent." | A CLI agent doing one real job on real input — classify, summarise, extract or draft. | Open entry — bridge pre-work |
| **BC2 — Tool-Using Agents & MCP** | "I can build an agent that calls tools, returns schema-validated output, and expose my own tools over MCP." | A 2–3 tool agent plus a small MCP server wrapping one real tool from your own work. | Open entry — bridge pre-work |
| **BC3 — RAG & Context Engineering** | "I can build a retrieval agent over my own documents and treat context as a budget." | A chat-with-your-data agent over a corpus you choose, with a streaming chat UI (starter scaffold provided). | Open entry — bridge pre-work |
| **BC4 — Orchestration with LangGraph** | "I can build stateful, multi-step, multi-agent systems that survive a restart." | A supervisor-plus-workers research and synthesis system with persistence. | Open entry — bridge pre-work |
| **BC5 — Production AgentOps** | "I can instrument, evaluate, harden and deploy an agent I'd let a colleague use." | Take an existing agent — your own, or the supplied reference agent — and deliver it traced, eval-suited, injection-hardened, HITL-gated and deployed. | Bridge pre-work **+ portfolio review** |
| **BC6 — Build Studio** | "I shipped one real production-grade agent system, with a demo." | No new concepts — four weeks of facilitated building, solo or in pairs, ending in a demo. | Bridge pre-work **+ portfolio review** |

---

## The weekly shape

| Evening | Shape |
|---|---|
| **1 (Mon)** | Huddle (20 min) · Concept A (40 min) · Lab A (60 min) |
| **2 (Tue)** | Lab A checkpoint round (15 min) · Concept B (45 min) · Lab B (60 min) |
| **3 (Wed)** | Reference-codebase dissection (60 min) · Capstone clinic in small pods (40 min) · Week close (20 min) |
| **Thu–Sun** | Asynchronous, 2–4 hours depending on the week: finish the lab exercises, build the week's capstone component, and commit it |

The forcing function: the week's capstone component is committed before Monday's huddle.
No commit, nothing to report. This is a stated rule, not a nudge — it is how a
part-time, mostly-async format stays honest about progress.

---

## Who this is for

**The floor, stated plainly**: you can read code, and you have written scripts before —
in any language. You do not need to be a working developer, and you do not need prior AI
or machine learning experience.

**This is not for you if:**
- You have never written or run a script and are looking to start from zero. This series
  cuts the no-code on-ramp the full-time program includes; if that's the gap you're at,
  this format will move too fast.
- You want a promise of a job or a job title at the end. That promise is not made here —
  see "What this does not include" below.
- You cannot commit three consecutive evenings a week for four weeks. There is no
  lighter-touch version of the live sessions; the async time is on top of them, not
  instead of them.
- You want a fully self-paced, watch-whenever course. The live evenings, the pods and the
  weekly commit deadline are load-bearing, not optional extras.

If a work crisis or travel hits mid-bootcamp, a deferral policy exists: pause and rejoin
the next cohort at the same week, rather than losing the bootcamp entirely. This series
is built around the fact that its students have jobs, and the deferral policy is the
main way that shows up in practice — it is a genuine differentiator from a course that
simply expects you to keep up or drop out.

---

## What you get

- **Six certificates**, one per bootcamp, each naming a concrete capability and the
  shipped artifact that proves it — never attendance alone.
- **A series credential** if you complete all six.
- **Six shipped artifacts** — real, working agent systems you built and keep, not
  toy exercises: a CLI agent, a tool-using agent with an MCP server, a retrieval agent
  with a chat UI, a multi-agent orchestration system, a hardened and deployed agent, and
  a production-grade capstone of your own scope.
- **A build log** — one short entry per week, committed to your own repo, private or
  public as you choose. Publishing it publicly is optional, with templates supplied if
  you want to; it is never a requirement that quietly fails for people whose employer
  wouldn't allow it.
- **A demo recording** from each bootcamp's Demo Night, which is yours to use — in an
  internal presentation, a performance review, or a public post.

Each Demo Night is framed as a rehearsal for showing your work to your own manager, not
a recruiter — 3 to 5 minutes per student, plus a peer README review from your pod. The
capstone clinic that leads into it treats the questions a working professional actually
gets asked about a piece of software: how would you get this approved, what data can't
leave the company, who owns it while you're on leave, what it costs to run every month.
Where the brief allows it, your capstone can be a real problem from your own job rather
than a synthetic exercise — a better demo, and the closest thing this series offers to
immediate return on the time you put in.

---

## What this does not include

This series does not include interview preparation, data-structures-and-algorithms
practice, or job placement. There is no mock-interview track and no resume workshop.

That is a deliberate cut, not an oversight. This series sells capability — the ability
to build and ship working agent systems — not a job outcome. If you are looking for a
hiring-focused program, this is not it; the pre-existing 24-week Agentic AI Developer
Program is built for job-seeking candidates and carries that spine instead.

---

## Entry & bridges

You do not need to have taken an earlier bootcamp to start at BC1–BC4. Each entry point
has a bridge — short, self-paced pre-work that gets you to the same starting line as
someone who took every bootcamp before it. Bridges are drawn from one shared library of
short modules and combined differently depending on where you're entering, so a later
entry point simply requires more of the library, not a different course. The bridge
ends in a small qualifier repo: clone it, make the failing tests pass, submit the link —
objective, cheap to grade, and it doubles as your first portfolio commit. Bridge and
qualifier are due before Evening 1 of week 1, as a hard deadline.

BC5 and BC6 add one more gate, because the work they ask of you assumes you already have
a real agent to operate on.

| Entering at | Bridge required | Gate |
|---|---|---|
| BC1 | Environment & Git setup | Qualifier |
| BC2 | Environment & Git · TypeScript essentials · Your first LLM call | Qualifier |
| BC3 | Environment & Git through the tool-use loop | Qualifier |
| BC4 | Environment & Git through the tool-use loop, plus graphs & state | Qualifier |
| BC5 | Environment & Git through retrieval basics, plus the reference agent | Qualifier **+ portfolio review** |
| BC6 | Environment & Git through retrieval basics, plus the reference agent | Qualifier **+ portfolio review** |

**The portfolio review** (BC5 and BC6 only) is satisfied by either of two things:
completion of the immediately preceding bootcamp, or a submitted repo containing a
working agent you built yourself — one that runs from a clean clone, calls an LLM, and
uses at least one tool. An instructor reviews the submission and either admits you,
admits you conditionally with named bridge modules to complete first, or — rarely —
declines, always naming the specific gap.

---

## Assessment

Every bootcamp is graded on the same rubric across five dimensions — does it run, does
it match its own frozen spec, is the bootcamp's core technique correctly applied, can a
non-expert follow a 3–5 minute demo, and is it documented well enough for a stranger to
use. Scoring happens on Demo Night; a below-bar submission is a two-week resubmission,
not a fail. The full rubric, the pass bar, and the intervention ladder for falling
behind are in [ASSESSMENT.md](ASSESSMENT.md).
