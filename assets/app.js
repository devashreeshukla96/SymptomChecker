(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  var CARE_LABELS = {
    self_care: "Self-care",
    primary_care: "Primary care / telehealth",
    urgent_care: "Urgent care",
    emergency: "Emergency"
  };

  var conditions = [];
  var resultsEl = document.getElementById("results");
  var inputEl = document.getElementById("symptom-input");
  var checkBtn = document.getElementById("check-btn");
  var emergencyBanner = document.getElementById("emergency-banner");
  var redflagChecks = document.querySelectorAll("#redflag-chips input[type=checkbox]");

  fetch("assets/data/conditions.json")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      conditions = data;
    })
    .catch(function () {
      resultsEl.innerHTML = '<p class="results-empty">Could not load condition data. Try reloading the page.</p>';
    });

  function anyRedFlagChecked() {
    for (var i = 0; i < redflagChecks.length; i++) {
      if (redflagChecks[i].checked) return true;
    }
    return false;
  }

  function updateEmergencyBanner() {
    emergencyBanner.hidden = !anyRedFlagChecked();
  }

  redflagChecks.forEach(function (cb) {
    cb.addEventListener("change", updateEmergencyBanner);
  });

  function scoreCondition(cond, needle) {
    var score = 0;
    for (var i = 0; i < cond.keywords.length; i++) {
      var kw = cond.keywords[i];
      if (needle.indexOf(kw) !== -1) {
        score += kw.split(" ").length; // reward longer, more specific phrase matches
      }
    }
    return score;
  }

  function runCheck() {
    var raw = inputEl.value.trim().toLowerCase();
    updateEmergencyBanner();

    if (!raw) {
      resultsEl.innerHTML = '<p class="results-empty">Type a few symptoms above, or tap an example, to see suggested conditions and care pathways.</p>';
      return;
    }

    var scored = conditions
      .map(function (c) { return { c: c, score: scoreCondition(c, raw) }; })
      .filter(function (x) { return x.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 5);

    if (scored.length === 0) {
      resultsEl.innerHTML =
        '<p class="results-empty">No close matches in this prototype\'s 66-condition library. ' +
        "A production version would fall back to a broader clinical dataset or a live triage line rather than a dead end.</p>";
      return;
    }

    resultsEl.innerHTML = scored
      .map(function (x) {
        var c = x.c;
        return (
          '<div class="result-card">' +
            '<div class="result-card__top">' +
              '<span class="result-card__name">' + escapeHtml(c.name) + "</span>" +
              '<span class="result-card__badge badge--' + c.careLevel + '">' + CARE_LABELS[c.careLevel] + "</span>" +
            "</div>" +
            '<p class="result-card__summary">' + escapeHtml(c.summary) + "</p>" +
            '<p class="result-card__rationale">Why this pathway: ' + escapeHtml(c.rationale) + "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  checkBtn.addEventListener("click", runCheck);
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") runCheck();
  });

  document.querySelectorAll("#example-chips [data-example]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      inputEl.value = btn.getAttribute("data-example");
      runCheck();
      inputEl.focus();
    });
  });
})();
