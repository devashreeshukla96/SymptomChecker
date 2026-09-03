# CareCompass — A Care Navigation Decision-Support Prototype

**Live demo:** https://devashreeshukla96.github.io/SymptomChecker/

![License](https://img.shields.io/badge/license-MIT-blue.svg)

CareCompass is a case-study prototype for a problem healthcare strategy and operations teams
spend a lot of time on: **patients don't reliably know where to seek care.** Mild symptoms end
up in the emergency department; genuinely urgent symptoms get delayed by slow scheduling. Neither
is good for the patient or for the system absorbing the cost of the mismatch.

The prototype takes a plain-language symptom description and suggests both likely conditions and
a **recommended care setting** — self-care, primary care/telehealth, urgent care, or emergency —
along with a one-line rationale for that recommendation. The full write-up (problem framing,
design rationale, care-pathway taxonomy, success metrics, limitations, and roadmap) lives on the
[live site](https://devashreeshukla96.github.io/SymptomChecker/) — this README covers the
technical side.

## What this project is actually about

The interesting part of this project isn't the symptom-matching logic — it's deliberately simple
(client-side keyword matching, no ML). The interesting part is the **care-pathway taxonomy**:
mapping 66 conditions to an operational triage tier, with an explicit safety-first override for
red-flag symptoms, and thinking through what a real deployment would need (clinical governance,
an under-triage/miss-rate metric, equity testing, integration with a real provider directory).
That's the systems-thinking exercise this repo is meant to demonstrate.

## Repository structure

```
index.html                 Live site: case study + interactive demo
assets/
  style.css                Styling
  app.js                   Client-side symptom matcher + UI logic
  data/conditions.json     66 conditions, each tagged with a care-pathway tier and rationale
docs/
  interview-prep.md        Study notes: likely questions, talking points, glossary
  project-brief.md         One-page cheat sheet
legacy-prototype/          The original Flask + PyTorch/LSTM chatbot this project evolved from
```

## Running the live site locally

No build step or dependencies — it's static HTML/CSS/JS.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Everything runs client-side; no data is sent to a server.

## About `legacy-prototype/`

This project started from an open-source NLP symptom-checker template: a Flask app backed by an
LSTM intent classifier (PyTorch), with a hardcoded list of hospitals for a location-lookup
feature. That original implementation is preserved in [`legacy-prototype/`](legacy-prototype/)
for reference. It has its own `requirements.txt` and is not required to run the live site above.

I rebuilt the project from that starting point into the static case study in this repo because the
original implementation optimized for the wrong thing for what I wanted to show: a from-scratch
RNN classifier demonstrates ML engineering, not the operational/strategic judgment involved in
designing a care-navigation product. The redesign — the care-pathway taxonomy, the safety-override
logic, and the accompanying write-up — is original to this version.

## License

MIT — see [LICENSE](LICENSE).
