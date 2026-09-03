# CareCompass — One-Page Brief

Use this as your 60-second warm-up before an interview. Read `interview-prep.md` for the deep dive.

## Elevator pitch (30 seconds)

"CareCompass is a prototype I built that takes a patient's described symptoms and recommends not
just possible conditions, but the right *care setting* — self-care, primary care, urgent care, or
emergency. It started from an open-source NLP chatbot template, but I redesigned it around a
healthcare operations problem: patients routinely end up in the wrong setting — mild things go to
the ED, urgent things get delayed — and that mismatch is expensive and sometimes unsafe. The
interesting part isn't the matching algorithm, it's the care-pathway taxonomy and the safety logic
behind the recommendation."

## The one sentence to remember if you remember nothing else

**The project is a demonstration of care-pathway design and triage judgment, not a machine
learning showcase — and that's a deliberate choice, not a compromise.**

## Facts to have cold

| Fact | Detail |
|---|---|
| Live demo | https://devashreeshukla96.github.io/SymptomChecker/ |
| Conditions covered | 66, hand-classified into 4 care tiers |
| Care tiers | Self-care → Primary care/telehealth → Urgent care → Emergency |
| Matching approach | Client-side keyword overlap scoring — no ML in the live demo |
| Safety mechanism | Red-flag checkboxes (chest pain, breathing trouble, stroke signs, uncontrolled bleeding) short-circuit to an immediate "call 911" banner |
| Data handling | 100% client-side — nothing is transmitted or stored anywhere |
| Origin | Started from an open-source Flask + PyTorch LSTM symptom-checker template; redesigned into this static case study |
| Original prototype | Preserved in `/legacy-prototype`, not used by the live site |

## The four care tiers, with one example each

1. **Self-care** — common cold. No visit needed; monitor and treat at home.
2. **Primary care / telehealth** — hypothyroidism. Needs a clinician and labs, not urgently.
3. **Urgent care** — gout flare. Needs same-day in-person care, not life-threatening.
4. **Emergency** — heart attack symptoms. Call 911 now.

## The metric you should never forget

**Under-triage / miss rate** — the percentage of genuinely emergent cases the tool fails to flag
as an emergency. This is the metric you optimize hardest against, even if it means the tool is
"less efficient" by over-flagging borderline cases. If you're asked "what's the most important
metric," this is the answer — cost savings and diversion rates don't matter if the tool misses a
heart attack.

## If asked "why didn't you use real AI/ML for this"

"I intentionally kept the live demo rule-based. In a regulated healthcare context, a decision a
clinical governance committee and a legal team can fully audit is worth more early on than a model
that scores better on accuracy but can't explain itself. Explainability is itself an operational
requirement in this space — not just an engineering nice-to-have. If I were building the production
version, I'd want a validated model eventually, but I'd want the taxonomy and the safety logic
nailed down and auditable first."
