# Legacy prototype

This is the original technical implementation this project started from: a Flask web app backed
by a from-scratch LSTM intent classifier (PyTorch) trained on `intents.json`, plus a
location-lookup feature (`medical_centers.json`) that found nearby hospitals by haversine distance
from an IP-based geolocation.

It is kept here for reference and is **not** used by the live site at the repo root — that site is
a static HTML/CSS/JS case study built separately. See the top-level [README](../README.md) for why.

## Running it

```bash
pip install -r requirements.txt
python app.py
# visit http://localhost:5000
```

Requires the pretrained weights in `data_rnn.pth` (included) or re-running `train.py` against
`intents.json`.

## Known rough edges (left as-is, since this isn't the active part of the project)

- `chat.py`'s location feature calls an IP-geolocation service and reads `medical_centers.json`,
  a hardcoded list of hospitals in Chennai, India — it won't return sensible results for a user
  elsewhere.
- The original repo also included a fake admin panel and login page with a hardcoded plaintext
  password. Those were removed entirely rather than carried forward, since they were a security
  anti-pattern (`admin` / `admin@123`, checked client-side in JavaScript) with no place in a
  portfolio piece.
