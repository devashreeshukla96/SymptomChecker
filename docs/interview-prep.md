# CareCompass — Interview Prep

Study guide for talking about this project in interviews for healthcare strategy, operations, and
health-tech roles. Read `project-brief.md` first for the quick-reference version; this is the deep
dive.

---

## 1. How to talk about where this project came from (read this first)

Be direct and unbothered about this if it comes up — it's a completely normal way to build a
portfolio project, and trying to hide it is a much bigger risk than just saying it plainly:

> "I started from an open-source symptom-checker template — a Flask app with a from-scratch LSTM
> classifier — and rebuilt it into this case study. I kept the original prototype in the repo for
> transparency. What's original to me is the reframing: the care-pathway taxonomy, the
> safety-override logic, the operational metrics section, and the write-up connecting it to how a
> health system would actually evaluate a tool like this."

**Do not** claim you built the NLP/LSTM model from scratch as your own novel engineering — you
didn't, and that's fine, because that's not the point of the project anymore. **Do** own the
redesign fully — the taxonomy, the safety logic, the metrics framing, and the write-up are yours.
If pressed on technical depth of the original model, it's fine to say "that part was a
template — I didn't rebuild the LSTM, I replaced that whole approach with something simpler and
more auditable for exactly the reasons I described." That answer is *stronger* for a
strategy/ops role than defending someone else's ML code would be.

---

## 2. STAR stories

### Story A: Simplifying a complex system for a non-technical stakeholder audience

**Situation:** I inherited a symptom-checker project built as a machine-learning exercise — an
LSTM classifier with no explanation of *why* any given output was returned.

**Task:** I wanted to turn it into something that answered an operational question a health system
actually has: not "what disease might this be" but "where should this patient go."

**Action:** I replaced the black-box classifier with a rule-based system where every
recommendation traces back to an explicit, reviewable decision — a hand-built taxonomy mapping 66
conditions to one of four care tiers, plus a hard-coded safety override for red-flag symptoms that
bypasses the matcher entirely.

**Result:** The system is now fully auditable — anyone (a clinician, a compliance reviewer, an
interviewer) can trace any recommendation back to a specific, statable rule. That's a trade I'd
make again: in a regulated space, an auditable "good enough" system beats an unauditable "better"
one, especially before you have the validation data to trust the better one.

### Story B: Thinking in systems, not features

**Situation:** The original project was scoped as a Q&A chatbot — type symptoms, get a disease
name back.

**Task:** I wanted to reframe it around the actual decision a patient and a health system both
care about.

**Action:** I added a care-pathway layer on top of the existing condition data: every condition
got classified into self-care / primary care / urgent care / emergency, with a rationale, and I
built out a metrics section thinking through how a strategy/ops team would actually judge whether
a tool like this was working (ED diversion rate, under-triage rate, time-to-appropriate-care,
equity of routing).

**Result:** The project moved from "a chatbot that names diseases" to "a decision-support layer
with an explicit operational thesis." That's the reframing I'd want to be judged on.

### Story C: Prioritizing safety over sophistication

**Situation:** A keyword-matching symptom checker will inevitably produce false negatives —
missing a genuinely dangerous presentation because the phrasing didn't match well.

**Task:** Decide how to handle that risk in the design rather than ignore it.

**Action:** I added a red-flag override — a short, separate checklist (chest pain, breathing
trouble, stroke signs, uncontrolled bleeding) that, if checked, immediately shows an emergency
banner and skips the symptom-matching flow entirely. It doesn't rely on the matcher getting the
free-text description right.

**Result:** The design accepts that the free-text matcher is imperfect and doesn't let that
imperfection be safety-critical. That's the instinct I'd bring to any tool that touches real
patients: assume the primary mechanism will sometimes fail, and design a separate, simpler
mechanism to catch the cases that matter most.

*(Use this story if asked about risk management, safety-critical design, or "tell me about a time
you had to think about failure modes.")*

---

## 3. Likely questions and model answers

**"Walk me through this project."**
Use the elevator pitch from `project-brief.md`, then go one level deeper into the care-pathway
taxonomy and the safety override if they want more.

**"Why isn't this using real AI to diagnose?"**
See the project-brief answer. Core idea: explainability and auditability are operational
requirements in healthcare, not just engineering preferences — a rule-based system a governance
committee can review is a better starting point than a more "accurate" black box.

**"How would you validate this before a real health system used it?"**
"I'd start with a clinical advisor — a nurse triage lead or ED physician — reviewing every
self-care and primary-care classification, since those are the ones with the most downside if
wrong. Then I'd want to backtest the logic against real historical visit data: given the intake
symptoms a health system actually recorded, would this tool have recommended the setting the
patient ultimately needed? That gives you a real diversion-rate and miss-rate estimate before you
ever put a number in a deck."

**"What's the most important metric for a tool like this?"**
Under-triage / miss rate — see project-brief. Be ready to explain *why* it beats cost savings or
diversion rate as the top metric: a tool that saves money by diverting people from the ED but
occasionally sends a heart attack home isn't a net positive, it's a liability.

**"What are the equity or access risks here?"**
"Symptom phrasing varies by language proficiency, health literacy, and cultural background — a
keyword matcher tuned on one population's phrasing may perform worse for others. There's also an
access gap: a tool that recommends telehealth doesn't help someone without reliable internet or
a smartphone. I'd want routing quality and follow-through measured *by segment*, not just in
aggregate, before trusting an average performance number."

**"If you had a data science team, what would you have them build next?"**
"Two things, in order. First, a properly validated triage model trained on real, de-identified
utilization outcomes — not to replace the rule-based logic, but to test it against and find where
it disagrees. Second, a way to track the tool's recommendations against what patients actually did
and what they turned out to need, so the miss-rate metric is measured, not assumed."

**"This is a pretty small dataset / simple tool — why should I be impressed?"**
Don't oversell it — agree with the premise and pivot to what it demonstrates. "You're right, it's
intentionally small and simple — 66 conditions, keyword matching, no ML. That's the point: I built
it to demonstrate how I think about the *operational* problem — care-pathway design, safety
overrides, the metrics that would actually matter to a health system — rather than to demonstrate
ML engineering. If this role needs the modeling depth, I'd point to [insert a different
project/coursework/experience you actually have], but this is the artifact that shows how I think
about turning a technical capability into an operational decision."

**"How does this connect to healthcare strategy/operations work specifically, versus product or
engineering?"**
"The core skill this project is meant to show is translating a technical capability — symptom
matching — into an operational lever: reducing avoidable ED visits, improving time-to-appropriate
care, and doing it in a way a governance and compliance process could actually sign off on. That's
squarely a strategy/ops problem: the technology is almost incidental to the harder questions of
which metric matters, who owns the risk, and how you'd pilot and validate it."

---

## 4. Glossary — tie each term back to the project

| Term | What it means | How it shows up here |
|---|---|---|
| Digital front door | The first digital touchpoint a patient uses to access a health system (app, chatbot, portal) | This tool is a prototype of one digital-front-door component: symptom-based navigation |
| ED diversion rate | Share of patients who would have gone to the ED but are routed elsewhere appropriately | Named as the primary "growth" metric in the metrics section |
| Under-triage / miss rate | Share of genuinely urgent/emergent cases not flagged as such | Named as the primary safety metric — the one to protect above all others |
| Triage acuity | How urgent a patient's condition is, used to prioritize care | The basis for the four-tier care-pathway taxonomy |
| Care pathway | The sequence of care settings/steps a patient is routed through for a given need | The four-tier framework (self-care → primary → urgent → emergency) *is* the care pathway design |
| Utilization management | Health system/payer practices to ensure care is delivered in the right setting at the right cost | The strategic motivation for building a tool like this at all |
| Clinical governance | The oversight structure (clinicians, compliance, legal) that signs off on clinical-adjacent tools | Named explicitly in the limitations section as a real deployment's missing piece |
| Value-based care | Payment/care models rewarding outcomes and appropriate utilization over volume | Context for *why* a health system or payer would fund a tool like this |

---

## 5. Weaknesses you should be ready to name yourself

Naming your own project's weaknesses unprompted reads as strategic self-awareness — do it before
they ask if it fits naturally.

- The care-tier mapping is my own judgment call, not a clinically validated taxonomy — I'm upfront
  about this in the limitations section on the live site.
- The matcher doesn't account for symptom severity, duration, or patient history — real triage
  always does.
- There's no pediatric- or geriatric-specific logic, and symptom presentation differs meaningfully
  across age groups.
- It's a solo project built without a clinical advisor, which is exactly the gap the roadmap names
  as the first next step.
