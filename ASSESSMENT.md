# Assessment, Gates & Intervention

**Scope**: this file governs the Evening Bootcamp Series (Bootcamps 1–6) only — the same
product `SERIES-OUTLINE.md` and `CONVENTIONS.md` describe. It does not govern the
pre-existing 24-week Agentic AI Developer Program.

This file is the rubric every capstone is scored against, the rule for when a certificate
is issued, and what happens when a student falls behind. It exists because the source
24-week program has no student rubric at all — for a paid, certificate-issuing product
that is a defensibility problem. A certificate means something only if there is a written,
consistent standard behind it, and that standard has to be usable by an instructor from
this file alone, without asking anyone a question.

No volatile facts live here — no model IDs, SDK versions, prices, or dates. Those live
only in `CONVENTIONS.md`.

---

## The rubric

One shape, six specialisations. Every capstone — the reference artifact each bootcamp's
students design, build and ship — is scored 0–2 on each of five dimensions. Four
dimensions are identical across all six bootcamps; the fifth is redefined per bootcamp to
match that bootcamp's core technique.

| # | Dimension | 0 | 1 | 2 |
|---|---|---|---|---|
| 1 | It works | Doesn't run | Runs, but only with an undocumented manual step, or crashes on an edge case a reviewer hits in ordinary use | Runs from a clean clone following the README alone |
| 2 | Scope discipline | Spec abandoned | Matches the frozen spec with minor undocumented drift | Matches the frozen spec; "out of scope" honoured |
| 3 | The technique *(per-bootcamp)* | Absent or wrong | Present but applied carelessly | The bootcamp's core method correctly applied |
| 4 | Demoable | Nobody can tell what it does | Demo shows the artifact but doesn't make its value clear to a non-expert | 3–5 min demo makes the value clear to a non-expert |
| 5 | Documented | Placeholder README | README exists but a stranger would still get stuck | README a stranger can use; build log complete |

Each dimension's 1 sits between its 0 and 2. Dimension 1 is the one case worth spelling
out, because two instructors could otherwise split on it: a capstone that runs but only
with an undocumented manual step, or that runs but crashes on an edge case a reviewer
reaches through ordinary use of the README's own instructions, is a 1, not a 2. "Runs
from a clean clone following the README alone" means exactly that — no undocumented
step, and no crash on the paths the README itself leads a reviewer through. Only
dimension 3 is redefined per bootcamp; dimensions 1, 2, 4 and 5 are scored the same way
in every bootcamp.

### Pass rule

**Pass = 7 out of 10, with no zeros.** A single 0 on any dimension fails the capstone
regardless of the total — a project that doesn't run, or abandons its own spec, or ships
undocumented, hasn't demonstrated the thing the bootcamp promises, no matter how strong
the rest of the work is.

**Below 7, or any dimension scored 0, is not a fail — it is resubmit within two weeks.**
These are paying adults with jobs. A hard fail converts a fixable gap — a missing README
section, a demo that needed one more pass — into a refund conversation, and that is the
wrong failure mode for this audience. Two weeks is enough time to close a gap without
turning the bootcamp into an open-ended commitment. A resubmission is scored against the
same rubric, on the same terms, as the original submission.

### Demo Night scoring

Scoring happens on Demo Night, instructor-led. The instructor scores all five dimensions.
A structured peer review runs alongside the instructor's scoring and feeds dimensions 4
(Demoable) and 5 (Documented) — peers watch the demo and read the README, then answer
the same structured questions the instructor uses for those two dimensions. Peers do not
score the rubric themselves; peer review is input to the instructor's score on those two
dimensions, not a separate or averaged score. Dimensions 1–3 are scored by the instructor
alone, from the running artifact and the code.

---

## Dimension 3 by bootcamp

Dimension 3 is the only dimension redefined per bootcamp — it names that bootcamp's core
technique. BC2 through BC6 are deliberately left as stubs here: each one is defined by
the plan that builds that bootcamp, not written in advance in this file. That is scope,
not an unfinished section — writing BC2–BC6's dimension 3 now, before those bootcamps'
capstones and techniques are locked, would mean guessing at criteria this file has no
basis to set.

### BC1 — dimension 3

*0*: no LLM call, or the call is copy-pasted without comprehension. *1*: calls an LLM and
gets output, but prompt structure is accidental — no system prompt, or no reasoning about
what belongs in context. *2*: a deliberately structured prompt (roles used correctly,
instructions separated from data), schema-validated output where the task calls for it,
and a documented reason for the model tier chosen.

### BC2 — dimension 3

Defined by the plan that builds Bootcamp 2.

### BC3 — dimension 3

Defined by the plan that builds Bootcamp 3.

### BC4 — dimension 3

Defined by the plan that builds Bootcamp 4.

### BC5 — dimension 3

Defined by the plan that builds Bootcamp 5.

### BC6 — dimension 3

Defined by the plan that builds Bootcamp 6.

---

## The intervention ladder

Four triggers, escalating in severity, ending in a policy rather than a penalty.

| Trigger | Response |
|---|---|
| No commit before Monday's huddle | Pod lead pings, same day |
| Two consecutive missed checkpoints | Instructor 1:1 before the next evening |
| Week 3 with no capstone components | Instructor-convened scope-cut conversation; explicit permission to ship smaller |
| Work crisis or travel | **Deferral (student-requested, instructor-granted) — pause and rejoin the next cohort at the same week** |

The first three rows catch a student drifting before the drift becomes a missed capstone.
Row 3 is instructor-convened, not student-raised: the instructor is the one who can see
which components are missing at week 3, and waiting for a struggling student to raise it
is exactly the failure the row exists to catch.

The fourth row is not an escalation of the first three — it is a separate, standing
option for the thing that actually derails working professionals: a deadline at work, a
family emergency, travel that collides with the schedule. A student requests deferral and
an instructor grants it — it is neither automatic nor imposed. Deferral lets a student
pause without losing progress and rejoin the next cohort at the same week they left off,
instead of being pushed toward the resubmit path or dropping out. The deferral policy is
load-bearing for this audience and is a genuine differentiator against a fixed-schedule
program that has no answer for a student who has to miss a week.

---

## Credentials

BC1 cannot be run without something to issue on Demo Night. This section defines that
certificate and the rule behind it.

### The naming rule

Every certificate in this series names a **concrete capability and a shipped artifact —
never attendance**. "Attended Bootcamp 1" is not a credential; it certifies nothing about
what the holder can do. A certificate that names the capability and points at the
artifact that proves it is verifiable, specific, and worth more to the holder in front of
a manager or a hiring panel than a generic completion certificate.

### BC1 certificate

```
Certificate of Completion — Bootcamp 1: Foundations & Your First Agent
<student name> designed, built and shipped a working command-line AI agent
in TypeScript, and can structure prompts and validate model output deliberately.
Assessed against the five-dimension rubric. Artifact: <repo URL>
<date> · <issuer> · <signature>
```

### Issuance rule

The certificate is issued only on a rubric score of **7/10 or above with no zeros** — the
same pass rule that governs the capstone itself. A resubmission that reaches the bar is
issued the certificate on identical terms to a first-attempt pass: nothing on the
certificate, or in how it is issued, marks it as a resubmission or distinguishes it from
a first-pass certificate. Marking a resubmitted certificate would make the resubmit
policy punitive in practice, undoing the reasoning behind treating "below 7" as a
resubmit rather than a fail.
