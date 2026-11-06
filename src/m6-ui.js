/* Module 6 interactive tools: haemostasis-lab atlas entries, calculators, a virtual coagulometer with mixing
   studies, a light transmission aggregometry trainer and a viscoelastic (ROTEM-style) trainer.
   All are teaching models of the direction and rough size of each effect, not analyser algorithms.
   Depends on m6-data.js, the earlier data files, photos.js and app.js helpers ($, esc). */

const M6_CELLS = (() => {
  const src = Object.fromEntries(CELLS.concat(M2_CELLS, M2_NUCLEATED, M3_CELLS, M4_CELLS).map((c) => [c.id, c]));
  return M6_CELL_SPECS.map(([id, s, group, name, what, seen, tip]) => {
    if (PHOTOS[s] && !PHOTOS[id]) PHOTOS[id] = { ...PHOTOS[s], alias: true };
    return { ...src[s], id, name, group, lineage: group, what, seen, tip };
  });
})();

const M6_CALCS = {
  citrate: { title: "Citrate volume for a high haematocrit", inputs: [["cv", "Blood volume to collect (mL)", 4.5, 0.1], ["ch", "Haematocrit (%)", 62, 1]],
    run: ({ cv, ch }) => {
      if (!(cv > 0 && ch > 0 && ch < 100)) return null;
      const c = 0.00185 * cv * (100 - ch);
      return `Use <b>${c.toFixed(2)} mL</b> of 3.2% citrate for ${cv} mL of blood${ch <= 55 ? " (no adjustment is needed below a haematocrit of 55%; the standard 9:1 ratio is fine)" : ""}.<br><span class="muted">Formula: 0.00185 × blood volume × (100 − Hct%). Remove the excess citrate from a standard tube with a syringe, then fill exactly to the new volume.</span>`;
    } },
  bethesda: { title: "Bethesda titre", inputs: [["bra", "Residual FVIII activity (% of control)", 40, 1], ["bdil", "Dilution of patient plasma (1 in …)", 8, 1]],
    run: ({ bra, bdil }) => {
      if (!(bra > 0 && bdil >= 1)) return null;
      if (bra >= 100) return "Residual activity 100% or more: no inhibitor detected at this dilution.";
      const bu = ((2 - Math.log10(bra)) / 0.301) * bdil;
      const ok = bra >= 25 && bra <= 75;
      return `Inhibitor titre <b>${bu.toFixed(1)} BU/mL</b>: ${bu < 0.6 ? "negative (under 0.6 BU)" : bu < 5 ? "low titre (0.6–5 BU)" : "high titre (5 BU or more)"}.${ok ? "" : `<br><b>Residual activity outside 25–75%:</b> the calculation is less reliable. ${bra < 25 ? "Test a higher dilution." : "Test a lower dilution (or neat plasma)."}`}<br><span class="muted">BU = (2 − log₁₀ RA%) ÷ 0.301 × dilution. 1 BU destroys 50% of FVIII in 2 h at 37 °C.</span>`;
    } },
  lanr: { title: "Lupus anticoagulant ratios (dRVVT)", inputs: [["ls", "Screen: patient (s)", 58, 0.1], ["lsn", "Screen: normal pooled plasma (s)", 34, 0.1], ["lm", "Mix 1:1: patient (s)", 46, 0.1], ["lc", "Confirm: patient (s)", 36, 0.1], ["lcn", "Confirm: normal pooled plasma (s)", 31, 0.1], ["lcut", "Your normalised ratio cut-off", 1.2, 0.01]],
    run: ({ ls, lsn, lm, lc, lcn, lcut }) => {
      if (!(ls > 0 && lsn > 0 && lc > 0 && lcn > 0)) return null;
      const sr = ls / lsn, mr = lm / lsn, cr = lc / lcn, nr = sr / cr, pc = ((sr - cr) / sr) * 100;
      return `Screen ratio <b>${sr.toFixed(2)}</b> · Mix ratio <b>${lm > 0 ? mr.toFixed(2) : "–"}</b> · Confirm ratio <b>${cr.toFixed(2)}</b><br>Normalised ratio <b>${nr.toFixed(2)}</b> · Percent correction <b>${pc.toFixed(0)}%</b><br>${nr > lcut ? "Normalised ratio above the cut-off: <b>consistent with LA</b>, if the screen (and usually the mix) is also above its own cut-off and anticoagulants are excluded." : "Normalised ratio at or below the cut-off: LA not confirmed by this test."}<br><span class="muted">Each cut-off is the local 99th percentile. Repeat positive results after 12 weeks.</span>`;
    } },
  vwfr: { title: "VWF ratios", inputs: [["va", "VWF:Ag (IU/mL)", 0.62, 0.01], ["vb", "VWF activity, GPIbM/GPIbR/RCo (IU/mL)", 0.24, 0.01], ["vf", "FVIII:C (IU/mL)", 0.55, 0.01]],
    run: ({ va, vb, vf }) => {
      if (!(va > 0 && vb >= 0 && vf >= 0)) return null;
      const r = vb / va, f = vf / va, lo = Math.min(va, vb), notes = [];
      if (lo < 0.05) notes.push("<b>Undetectable VWF:</b> type 3 VWD likely.");
      else if (r < 0.7) notes.push("<b>Activity/Ag under 0.7:</b> qualitative (type 2) defect; do multimers and low-dose RIPA.");
      else if (lo < 0.3) notes.push("<b>VWF under 0.30 with a normal ratio:</b> type 1 VWD.");
      else if (lo <= 0.5) notes.push("<b>VWF 0.30–0.50:</b> type 1 VWD if the bleeding score is abnormal; otherwise low VWF.");
      if (f < 0.6 && va >= 0.3) notes.push("<b>FVIII low relative to VWF:</b> think type 2N or a haemophilia A carrier; VWF:FVIIIB assay.");
      if (!notes.length) notes.push("VWF values in the normal range. Repeat if bleeding is convincing; levels fluctuate.");
      return `Activity/Ag <b>${r.toFixed(2)}</b> · FVIII/Ag <b>${f.toFixed(2)}</b><br>${notes.join("<br>")}<br><span class="muted">ASH ISTH NHF WFH 2021 thresholds. Group O, stress and oestrogen change levels.</span>`;
    } },
  lmwh: { title: "LMWH anti-Xa check", inputs: [["lr", "Regimen", 2, 1, [[1, "Prophylactic dose"], [2, "Therapeutic, twice daily"], [3, "Therapeutic, once daily"]]], ["lh", "Hours since the last dose", 4, 0.5], ["lx", "Anti-Xa (IU/mL, LMWH-calibrated)", 0.62, 0.01]],
    run: ({ lr, lh, lx }) => {
      if (!(lh >= 0 && lx >= 0)) return null;
      const [lo, hi] = { 1: [0.2, 0.5], 2: [0.5, 1.0], 3: [1.0, 2.0] }[lr];
      if (lh < 2.5 || lh > 5) return `Sample taken ${lh} h after the dose: <b>not a peak sample</b>. The peak targets apply 3–4 h after a subcutaneous dose (after the 3rd or 4th dose). Repeat at the right time, or ask for a trough level if accumulation is the question.`;
      return `Peak anti-Xa ${lx.toFixed(2)} IU/mL against a typical target of ${lo}–${hi}: <b>${lx < lo ? "below target" : lx > hi ? "above target" : "within target"}</b>.${lx > hi ? " Check renal function and weight-based dosing." : lx < lo ? " Check the dose, injection technique and body weight." : ""}<br><span class="muted">Targets differ between guidelines and products; use your local protocol.</span>`;
    } },
  ddimer: { title: "Age-adjusted D-dimer", inputs: [["dage", "Age (years)", 72, 1], ["dval", "D-dimer result", 640, 10], ["dunit", "Unit", 1, 1, [[1, "µg/L FEU (ng/mL FEU)"], [2, "µg/L DDU (ng/mL DDU)"]]]],
    run: ({ dage, dval, dunit }) => {
      if (!(dage > 0 && dval >= 0)) return null;
      const feu = dunit === 2 ? dval * 2 : dval, cut = dage > 50 ? dage * 10 : 500;
      return `${dunit === 2 ? `${dval} DDU ≈ <b>${feu} µg/L FEU</b>. ` : ""}Cut-off <b>${cut} µg/L FEU</b>${dage > 50 ? " (age × 10)" : " (standard, age 50 or under)"}: result <b>${feu < cut ? "negative" : "positive"}</b>.<br>${feu < cut ? "With a low or intermediate clinical probability (Wells), VTE is excluded without imaging." : "A positive D-dimer does not diagnose VTE; go to imaging if clinically indicated."}<br><span class="muted">Use only with a validated quantitative assay; convert units carefully (1 DDU ≈ 2 FEU).</span>`;
    } }
};

/* ---------- Virtual coagulometer (teaching model) ---------- */
const COAG_FACTORS = ["II", "V", "VII", "VIII", "IX", "X", "XI", "XII"];
const NORMAL_SAMPLE = { II: 100, V: 100, VII: 100, VIII: 100, IX: 100, X: 100, XI: 100, XII: 100, fib: 3.0, fibAg: 3.0, hep: 0, la: 0, inh: 0, drug: "none", conc: 0, fdp: 0 };
const COAG_PRESETS = [
  ["normal", "Normal plasma", {}, "All results within the reference ranges."],
  ["haemA", "Severe haemophilia A", { VIII: 1 }, "Isolated long APTT that corrects on mixing (immediately and after incubation). FVIII under 1 IU/dL. PT, TT and fibrinogen are normal."],
  ["haemB", "Moderate haemophilia B", { IX: 3 }, "Isolated long APTT that corrects on mixing; FIX 3 IU/dL. Clinically identical to haemophilia A."],
  ["f11", "Factor XI deficiency", { XI: 20 }, "Mildly long APTT that corrects. Bleeding risk does not follow the level well; common in Ashkenazi Jewish families."],
  ["f12", "Factor XII deficiency", { XII: 2 }, "A very long APTT with no bleeding risk. Corrects on mixing. Prekallikrein and HMWK deficiency give the same picture."],
  ["f7", "Factor VII deficiency", { VII: 8 }, "Isolated long PT that corrects on mixing; the APTT and dRVVT are normal because they do not need FVII."],
  ["vka", "Warfarin (INR about 2.5)", { II: 30, VII: 15, IX: 30, X: 15 }, "Long PT (INR in range) with a mildly long APTT. dRVVT screen and confirm are both long, so the normalised ratio stays near 1."],
  ["liver", "Liver disease", { II: 30, V: 30, VII: 20, IX: 45, X: 30, XI: 45, fib: 1.2, fibAg: 1.5 }, "Long PT more than APTT, low fibrinogen. Factor V is low (unlike vitamin K deficiency), and FVIII is normal or high."],
  ["dic", "DIC", { II: 40, V: 25, VII: 35, VIII: 40, X: 35, fib: 0.8, fibAg: 0.8, fdp: 1 }, "Long PT, APTT and TT with low fibrinogen; FDPs prolong the TT and reptilase. Platelets would be low and D-dimer very high."],
  ["hep", "Unfractionated heparin 0.5 IU/mL", { hep: 0.5 }, "Long APTT, very long TT, normal reptilase, normal PT (the thromboplastin contains a heparin neutraliser). The mix does not correct. Anti-Xa 0.5 IU/mL."],
  ["la", "Lupus anticoagulant", { la: 2 }, "Long LA-sensitive APTT that does not correct on mixing; dRVVT screen long with a high normalised ratio. PT and TT normal."],
  ["ahA", "Acquired haemophilia A (12 BU)", { VIII: 4, inh: 12 }, "Long APTT that corrects (or nearly) on immediate mixing but prolongs again after 2 h at 37 °C: a time-dependent FVIII inhibitor."],
  ["dabi", "Dabigatran 150 ng/mL", { drug: "dabi", conc: 150 }, "Very long TT with normal reptilase, long APTT, little PT change. False-positive dRVVT. A calibrated dTT gives the level."],
  ["riva", "Rivaroxaban 250 ng/mL (peak)", { drug: "riva", conc: 250 }, "Long PT (reagent-dependent), smaller APTT effect, normal TT. The heparin-calibrated anti-Xa is off scale; dRVVT is falsely positive."],
  ["apix", "Apixaban 150 ng/mL", { drug: "apix", conc: 150 }, "PT and APTT barely change even at a therapeutic level; the anti-Xa shows the drug. dRVVT may be falsely positive."],
  ["dysfib", "Dysfibrinogenaemia", { fib: 0.7, fibAg: 3.0 }, "Low Clauss fibrinogen with a normal antigen (ratio 0.23). TT and reptilase long. PT and APTT normal or slightly long."]
];
let co = { s: { ...NORMAL_SAMPLE }, preset: "normal", mix: false, mystery: null, guess: null };
const lg = (x) => Math.max(0, Math.log10(40 / Math.max(x, 0.5)));
function coagCalc(s) {
  const fibF = s.fib < 0.1 ? 99 : 1 + Math.max(0, 1 - s.fib) * 0.8;
  const c = s.drug === "none" ? 0 : s.conc;
  const D = {
    riva: { pt: 1 + c / 250, aptt: 1 + c / 500, tt: 1, ds: 1 + c / 300, dc: 1 + c / 600, xa: c / 150 },
    apix: { pt: 1 + c / 1000, aptt: 1 + c / 1000, tt: 1, ds: 1 + c / 500, dc: 1 + c / 1000, xa: c / 150 },
    dabi: { pt: 1 + c / 800, aptt: 1 + c / 180, tt: 1 + c / 5, ds: 1 + c / 250, dc: 1 + c / 400, xa: 0 },
    none: { pt: 1, aptt: 1, tt: 1, ds: 1, dc: 1, xa: 0 }
  }[s.drug];
  const pt = 12 * (1 + 1.3 * lg(s.VII)) * (1 + lg(s.X)) * (1 + lg(s.V)) * (1 + lg(s.II)) * fibF * D.pt * (1 + Math.max(0, s.hep - 1) * 0.5) * (1 + 0.03 * s.la);
  const aptt = 30 * (1 + 1.2 * lg(s.VIII)) * (1 + 1.2 * lg(s.IX)) * (1 + lg(s.XI)) * (1 + 1.4 * lg(s.XII)) * (1 + 0.6 * lg(s.X)) * (1 + 0.6 * lg(s.V)) * (1 + 0.6 * lg(s.II)) * fibF * (1 + 2.0 * s.hep) * (1 + 0.25 * s.la) * D.aptt;
  const fibTT = s.fib < 0.1 ? 99 : s.fib < 1.5 ? 1 + (1.5 - s.fib) * 0.9 : 1;
  const tt = 16 * fibTT * (1 + 8 * s.hep) * (1 + 0.35 * s.fdp) * D.tt;
  const rep = 18 * fibTT * (1 + 0.35 * s.fdp) * (s.fibAg > s.fib * 1.5 ? 1.15 : 1);
  const fac = (1 + 0.5 * lg(s.X)) * (1 + 0.5 * lg(s.V)) * (1 + 0.5 * lg(s.II)) * fibF;
  const ds = fac * (1 + 0.35 * s.la) * D.ds * (1 + Math.max(0, s.hep - 1) * 0.6), dc = fac * (1 + 0.05 * s.la) * D.dc * (1 + Math.max(0, s.hep - 1) * 0.5);
  return { pt, inr: pt / 12, aptt, tt, rep, fib: s.fib, fibAg: s.fibAg, ds, nr: ds / dc, xa: s.hep + D.xa };
}
function coagMix(s, incubated) {
  const m = { ...s };
  COAG_FACTORS.forEach((f) => (m[f] = (s[f] + 100) / 2));
  m.fib = (s.fib + 3) / 2; m.fibAg = (s.fibAg + 3) / 2; m.hep = s.hep / 2; m.la = s.la * 0.8; m.conc = s.conc / 2; m.fdp = s.fdp / 2;
  if (s.inh) m.VIII = m.VIII * Math.pow(0.5, (s.inh / 2) * (incubated ? 1 : 0.1));
  return coagCalc(m);
}
const sec = (v) => (v > 150 ? "over 150 s" : v.toFixed(1) + " s");
function flag(v, lo, hi, txt) { const bad = v < lo || v > hi; return `<td style="font-family:var(--f-mono)${bad ? ";color:#c0392b;font-weight:700" : ""}">${txt}${bad ? (v > hi ? " ↑" : " ↓") : ""}</td>`; }
function coagHTML() {
  const r = coagCalc(co.s), P = COAG_PRESETS.find((p) => p[0] === co.preset);
  const rows = [
    ["PT", flag(r.pt, 11, 14, sec(r.pt)), "11–14 s"],
    ["INR (ISI 1.0)", flag(r.inr, 0.8, 1.2, r.pt > 150 ? "–" : r.inr.toFixed(1)), "0.8–1.2"],
    ["APTT", flag(r.aptt, 26, 36, sec(r.aptt)), "26–36 s"],
    ["Thrombin time", flag(r.tt, 14, 19, sec(r.tt)), "14–19 s"],
    ["Reptilase time", flag(r.rep, 15, 20, sec(r.rep)), "15–20 s"],
    ["Clauss fibrinogen", flag(r.fib, 1.5, 4.0, r.fib.toFixed(1) + " g/L"), "1.5–4.0 g/L"],
    ["Fibrinogen antigen", flag(r.fibAg, 1.5, 4.0, r.fibAg.toFixed(1) + " g/L"), "1.5–4.0 g/L"],
    ["dRVVT screen ratio", flag(r.ds, 0, 1.15, r.ds.toFixed(2)), "under 1.15"],
    ["dRVVT normalised ratio", flag(r.nr, 0, 1.2, r.nr.toFixed(2)), "under 1.20"],
    ["Anti-Xa (UFH-calibrated)", flag(r.xa, 0, 0.1, r.xa > 2 ? "over 2.0 IU/mL" : r.xa.toFixed(2) + " IU/mL"), "under 0.1 IU/mL"]
  ];
  let mixOut = "";
  if (co.mix) {
    const mi = coagMix(co.s, false), mc = coagMix(co.s, true), ri = ((mi.aptt - 30) / r.aptt) * 100;
    mixOut = `<div class="out"><b>1:1 mixing study</b> (normal pooled plasma: PT 12.0 s, APTT 30.0 s)<br>
      Immediate mix: PT <b>${sec(mi.pt)}</b>, APTT <b>${sec(mi.aptt)}</b> · Rosner index ${ri.toFixed(1)}<br>
      After 2 h at 37 °C: APTT <b>${sec(mc.aptt)}</b> (incubated controls 31 s)<br>
      <span class="muted">${mi.aptt <= 36 && mc.aptt <= 37 ? "The APTT corrects immediately and after incubation." : mi.aptt <= 36 ? "Corrects at first, prolongs after incubation: a time-dependent inhibitor." : r.aptt <= 36 ? "The APTT was normal to begin with; mixing adds little." : "No correction: an immediate-acting inhibitor."}</span></div>`;
  }
  const mys = co.mystery;
  const head = mys ? `<span class="label">Mystery sample</span><p style="margin:0">Read the results, run a mixing study if it helps, then choose the diagnosis.</p>`
    : `<div class="field"><label for="coPreset">Sample</label><select id="coPreset">${COAG_PRESETS.map(([k, t]) => `<option value="${k}" ${co.preset === k ? "selected" : ""}>${esc(t)}</option>`).join("")}</select></div><p class="muted" style="margin:0">${esc(P ? P[3] : "Your own sample: change any factor level below.")}</p>`;
  const guess = mys ? `<div class="row" style="flex-wrap:wrap">${COAG_PRESETS.filter((p) => p[0] !== "normal").map(([k, t]) => `<button class="btn small${co.guess === k ? (k === mys ? " primary" : "") : ""}" data-coguess="${k}" ${co.guess ? "disabled" : ""}>${esc(t)}</button>`).join("")}</div>
    ${co.guess ? `<div class="out"><strong>${co.guess === mys ? "Correct." : `Not quite: it was ${esc(COAG_PRESETS.find((p) => p[0] === mys)[1])}.`}</strong> ${esc(COAG_PRESETS.find((p) => p[0] === mys)[3])}</div>` : ""}` : "";
  const adv = mys ? "" : `<details><summary>Adjust the sample yourself</summary><div class="stack" style="margin-top:8px">
    ${COAG_FACTORS.map((f) => `<div class="field"><label for="co_${f}">Factor ${f} <b id="cov_${f}">${co.s[f]} IU/dL</b></label><input class="slider" id="co_${f}" type="range" min="1" max="150" step="1" value="${co.s[f]}"></div>`).join("")}
    <div class="field"><label for="co_fib">Clauss fibrinogen <b id="cov_fib">${co.s.fib.toFixed(1)} g/L</b></label><input class="slider" id="co_fib" type="range" min="0.2" max="6" step="0.1" value="${co.s.fib}"></div>
    <div class="field"><label for="co_hep">Unfractionated heparin <b id="cov_hep">${co.s.hep.toFixed(1)} IU/mL</b></label><input class="slider" id="co_hep" type="range" min="0" max="1.5" step="0.1" value="${co.s.hep}"></div>
    <div class="field"><label for="co_la">Lupus anticoagulant</label><select id="co_la">${[[0, "None"], [1, "Weak"], [2, "Strong"]].map(([v, t]) => `<option value="${v}" ${co.s.la === v ? "selected" : ""}>${t}</option>`).join("")}</select></div>
    <div class="field"><label for="co_inh">FVIII inhibitor <b id="cov_inh">${co.s.inh} BU</b></label><input class="slider" id="co_inh" type="range" min="0" max="30" step="1" value="${co.s.inh}"></div>
    <div class="field"><label for="co_drug">DOAC</label><select id="co_drug">${[["none", "None"], ["riva", "Rivaroxaban"], ["apix", "Apixaban"], ["dabi", "Dabigatran"]].map(([v, t]) => `<option value="${v}" ${co.s.drug === v ? "selected" : ""}>${t}</option>`).join("")}</select></div>
    <div class="field"><label for="co_conc">DOAC level <b id="cov_conc">${co.s.conc} ng/mL</b></label><input class="slider" id="co_conc" type="range" min="0" max="400" step="10" value="${co.s.conc}"></div>
    </div></details>`;
  return `<div class="odc">
    <div class="card stack">
      <span class="label">Coagulometer results</span>
      <div class="tablewrap"><table class="t"><thead><tr><th>Test</th><th>Result</th><th>Reference</th></tr></thead><tbody>${rows.map(([t, v, ref]) => `<tr><td>${t}</td>${v}<td class="muted">${ref}</td></tr>`).join("")}</tbody></table></div>
      ${mixOut}
    </div>
    <div class="card stack">
      ${head}
      <div class="row" style="flex-wrap:wrap"><button class="btn primary" data-comix>${co.mix ? "Hide mixing study" : "Run a 1:1 mixing study"}</button><button class="btn" data-comys>${mys ? "New mystery sample" : "Mystery sample"}</button>${mys ? `<button class="btn" data-coexit>Back to the presets</button>` : ""}</div>
      ${guess}${adv}
      <p class="note" style="margin:0">Teaching model: results show the direction and rough size of each effect. Reference ranges are illustrative. Real reagents differ greatly in sensitivity.</p>
    </div></div>`;
}
function coagSet(key) {
  const p = COAG_PRESETS.find((x) => x[0] === key);
  co.s = { ...NORMAL_SAMPLE, ...p[2] }; co.preset = key; co.mix = false;
}

/* ---------- Light transmission aggregometry trainer ---------- */
const narrow = () => window.innerWidth < 640;
const LTA_AGONISTS = [["adp", "ADP 5 µM"], ["col", "Collagen 2 µg/mL"], ["aa", "Arachidonic acid 1 mM"], ["epi", "Epinephrine 5 µM"], ["ris", "Ristocetin 1.2 mg/mL"], ["risl", "Ristocetin 0.5 mg/mL"]];
const LTA_NORMAL = { adp: { a1: 75 }, col: { lag: 50, a1: 80 }, aa: { lag: 15, a1: 80 }, epi: { a1: 25, a2: 78 }, ris: { a1: 82 }, risl: { a1: 4 } };
const LTA_CONDS = [
  ["normal", "Normal", {}, "Full aggregation to every agonist; epinephrine gives a primary and a secondary wave; low-dose ristocetin gives no response."],
  ["asp", "Aspirin (or COX-1 defect)", { adp: { a1: 45, rev: 15 }, col: { lag: 80, a1: 30 }, aa: { a1: 3 }, epi: { a1: 22, rev: 6 } }, "No thromboxane A2: absent arachidonic acid response, primary-wave-only ADP and epinephrine, reduced collagen. Ristocetin normal. Stop aspirin and NSAIDs for 7–10 days and repeat."],
  ["p2y", "P2Y12 defect (or clopidogrel)", { adp: { a1: 30, rev: 8 }, col: { lag: 60, a1: 50 }, aa: { lag: 20, a1: 55 }, epi: { a1: 20, rev: 10 } }, "ADP aggregation is small and reverses even at high doses; other agonists are mildly reduced because released ADP cannot amplify them."],
  ["gt", "Glanzmann thrombasthenia", { adp: { a1: 2 }, col: { lag: 50, a1: 2 }, aa: { lag: 15, a1: 2 }, epi: { a1: 1 } }, "Only the shape-change dip appears: no GPIIb/IIIa, so no fibrinogen bridges. Ristocetin agglutination needs only VWF and GPIb, so it is normal. Confirm with flow cytometry (CD41/CD61)."],
  ["bss", "Bernard–Soulier syndrome", { ris: { a1: 3 }, risl: { a1: 2 } }, "Normal aggregation to all agonists, absent ristocetin agglutination, giant platelets and thrombocytopenia. Type 3 VWD gives the same tracings, but adding normal plasma (VWF) corrects it; in Bernard–Soulier it does not. Flow: low CD42b."],
  ["vwd2b", "Type 2B or platelet-type VWD", { risl: { a1: 65 } }, "Everything normal except enhanced agglutination with low-dose ristocetin, which normal platelets ignore. Often with thrombocytopenia and loss of HMW multimers."],
  ["spd", "Storage pool or secretion defect", { adp: { a1: 35, rev: 12 }, col: { lag: 70, a1: 35 }, aa: { lag: 20, a1: 60 }, epi: { a1: 22, rev: 8 } }, "Primary waves without second waves, and reduced collagen response, because the platelets cannot release ADP from dense granules. Lumiaggregometry shows low ATP release."],
  ["mpn", "Myeloproliferative neoplasm", { epi: { a1: 4 }, adp: { a1: 60 } }, "Typically absent or much reduced epinephrine response, from loss of α2-adrenergic receptors; other responses are normal or mildly reduced. Very high counts can also cause acquired VWS."]
];
let lta = { cond: "normal", t: 300, timer: null, mystery: null, guess: null };
function ltaSpec(cond, ag) {
  const c = LTA_CONDS.find((x) => x[0] === cond)[2];
  return { lag: 0, a2: null, rev: null, ...LTA_NORMAL[ag], ...(c[ag] || {}) };
}
function ltaY(sp, ag, t) {
  if (t < 10) return 0;
  const dip = ["adp", "col", "aa"].includes(ag) ? -4 * Math.exp(-Math.pow((t - 20) / 7, 2)) : 0;
  const t0 = 10 + sp.lag;
  if (t < t0) return dip;
  let y = sp.a1 * (1 - Math.exp(-(t - t0) / 22));
  if (sp.a2 != null && t > t0 + 70) y += (sp.a2 - sp.a1) * (1 - Math.exp(-(t - t0 - 70) / 30));
  if (sp.rev != null && t > t0 + 45) { const peak = sp.a1 * (1 - Math.exp(-45 / 22)); y = peak - (peak - sp.rev) * (1 - Math.exp(-(t - t0 - 45) / 45)); }
  return y + dip;
}
function ltaSVG() {
  const cond = lta.mystery || lta.cond, cols = narrow() ? 2 : 3;
  let g = "";
  LTA_AGONISTS.forEach(([ag, name], k) => {
    const ox = (k % cols) * 215 + 10, oy = Math.floor(k / cols) * 165 + 10, W = 195, H = 120;
    const X = (t) => ox + 22 + (t / 300) * (W - 26), Y = (v) => oy + 14 + ((v + 6) / 106) * (H - 14);
    g += `<rect x="${ox}" y="${oy}" width="${W}" height="${H + 22}" rx="8" fill="var(--card, #fff)" stroke="#d6cdd9"/>`;
    g += `<text x="${ox + 8}" y="${oy + 12}" style="font-size:10.5px;font-weight:700;fill:var(--ink, #2a2230)">${name}</text>`;
    [0, 50, 100].forEach((v) => { g += `<line x1="${X(0)}" y1="${Y(v)}" x2="${X(300)}" y2="${Y(v)}" stroke="#e6dfe9" stroke-dasharray="${v ? "3 3" : "0"}"/><text x="${ox + 18}" y="${Y(v) + 3}" text-anchor="end" style="font-size:8.5px;fill:var(--muted)">${v}</text>`; });
    const sp = ltaSpec(cond, ag), pts = [];
    for (let t = 0; t <= lta.t; t += 3) pts.push(`${X(t).toFixed(1)},${Y(ltaY(sp, ag, t)).toFixed(1)}`);
    g += `<polyline points="${pts.join(" ")}" fill="none" stroke="#4a3891" stroke-width="2"/>`;
    if (lta.t >= 300) g += `<text x="${X(300)}" y="${oy + H + 16}" text-anchor="end" style="font-size:9.5px;fill:var(--muted)">max ${Math.max(0, ...Array.from({ length: 101 }, (_, i) => ltaY(sp, ag, i * 3))).toFixed(0)}%</text>`;
    g += `<text x="${X(0)}" y="${oy + H + 16}" style="font-size:9px;fill:var(--muted)">0–5 min</text>`;
  });
  return `<svg viewBox="0 0 ${cols * 215 + 5} ${Math.ceil(6 / cols) * 165 + 10}" role="img" aria-label="Aggregation tracings for six agonists" style="min-width:0">${g}</svg>`;
}
function ltaHTML() {
  const mys = lta.mystery, C = LTA_CONDS.find((x) => x[0] === (mys || lta.cond));
  return `<div class="stack">
    <div class="svgwrap" style="padding:8px" id="ltaWrap">${ltaSVG()}</div>
    <div class="card stack">
      ${mys ? `<span class="label">Mystery patient</span><p style="margin:0">Read the six tracings (y axis: % aggregation, light transmission with PPP as 100%). Which disorder is this?</p>
        <div class="row" style="flex-wrap:wrap">${LTA_CONDS.map(([k, t]) => `<button class="btn small${lta.guess === k ? (k === mys ? " primary" : "") : ""}" data-ltaguess="${k}" ${lta.guess ? "disabled" : ""}>${esc(t)}</button>`).join("")}</div>
        ${lta.guess ? `<div class="out"><strong>${lta.guess === mys ? "Correct." : `Not quite: this is ${esc(C[1])}.`}</strong> ${esc(C[3])}</div>` : ""}`
      : `<div class="field"><label for="ltaCond">Patient</label><select id="ltaCond">${LTA_CONDS.map(([k, t]) => `<option value="${k}" ${lta.cond === k ? "selected" : ""}>${esc(t)}</option>`).join("")}</select></div><div class="out">${esc(C[3])}</div>`}
      <div class="row" style="flex-wrap:wrap"><button class="btn primary" id="ltaPlay">▶ Run the aggregometer</button><button class="btn" data-ltamys>${mys ? "Next mystery patient" : "Mystery patient"}</button>${mys ? `<button class="btn" data-ltaexit>Back to the list</button>` : ""}</div>
      <p class="note" style="margin:0">Schematic tracings from a teaching model. The small dip at the start is platelet shape change; ristocetin causes agglutination, which needs VWF and GPIb but not GPIIb/IIIa.</p>
    </div></div>`;
}

/* ---------- Viscoelastic (ROTEM-style) trainer ---------- */
const VE_CH = [["EXTEM", "Tissue factor"], ["INTEM", "Contact activation"], ["FIBTEM", "Platelets blocked: fibrin only"], ["APTEM", "With antifibrinolytic"], ["HEPTEM", "With heparinase"]];
const VE_NORMAL = { EXTEM: { ct: 60, mcf: 60, k: 110, ml: 5 }, INTEM: { ct: 180, mcf: 58, k: 110, ml: 5 }, FIBTEM: { ct: 60, mcf: 15, k: 130, ml: 2 }, APTEM: { ct: 60, mcf: 60, k: 110, ml: 4 }, HEPTEM: { ct: 180, mcf: 58, k: 110, ml: 5 } };
const VE_REF = { EXTEM: [38, 79, 50, 72], INTEM: [100, 240, 50, 72], FIBTEM: [38, 79, 9, 25], APTEM: [38, 79, 50, 72], HEPTEM: [100, 240, 50, 72] };
const VE_CONDS = [
  ["normal", "Normal", {}, "All clotting times, firmness and lysis within range."],
  ["factors", "Coagulation factor deficiency", { EXTEM: { ct: 115, mcf: 54 }, INTEM: { ct: 300, mcf: 52 }, APTEM: { ct: 112, mcf: 54 }, HEPTEM: { ct: 295, mcf: 52 } }, "Long EXTEM and INTEM clotting times with adequate firmness: thrombin generation is slow (dilution, warfarin, consumption). Consider plasma or PCC."],
  ["lowfib", "Low fibrinogen", { EXTEM: { mcf: 42, k: 170 }, INTEM: { mcf: 41, k: 170 }, FIBTEM: { mcf: 5, k: 200 }, APTEM: { mcf: 42, k: 170 }, HEPTEM: { mcf: 41, k: 170 } }, "Low firmness in EXTEM with a very low FIBTEM (under about 8–10 mm): fibrinogen is the problem. Give fibrinogen concentrate or cryoprecipitate."],
  ["lowplt", "Low platelets", { EXTEM: { mcf: 38, k: 200 }, INTEM: { mcf: 37, k: 200 }, APTEM: { mcf: 38, k: 200 }, HEPTEM: { mcf: 37, k: 200 } }, "Low EXTEM firmness with a normal FIBTEM: the fibrin is fine, so the missing strength is platelets. Consider platelet transfusion."],
  ["lysis", "Hyperfibrinolysis", { EXTEM: { ml: 85 }, INTEM: { ml: 85 }, FIBTEM: { ml: 100 } }, "The clot forms and then breaks down (ML over 15%) in EXTEM, INTEM and FIBTEM, but stays firm in APTEM, where an antifibrinolytic is added. Give tranexamic acid."],
  ["heparin", "Heparin effect", { INTEM: { ct: 650, mcf: 54 }, EXTEM: { ct: 78 } }, "Very long INTEM clotting time that corrects in HEPTEM (heparinase). EXTEM is little affected. Typical after cardiopulmonary bypass: consider more protamine."],
  ["hyper", "Hypercoagulable", { EXTEM: { ct: 42, mcf: 75 }, INTEM: { ct: 120, mcf: 74 }, FIBTEM: { mcf: 30 }, APTEM: { ct: 42, mcf: 75 }, HEPTEM: { ct: 120, mcf: 74 } }, "Short clotting times with high firmness and high FIBTEM: high fibrinogen and platelet contribution, as after surgery or in inflammation. No product is needed; think about thromboprophylaxis."]
];
let ve = { cond: "normal", t: 3600, timer: null, mystery: null, guess: null };
const veSpec = (cond, ch) => ({ ...VE_NORMAL[ch], ...(VE_CONDS.find((x) => x[0] === cond)[2][ch] || {}) });
function veA(sp, t) {
  if (t < sp.ct) return 0;
  let a = sp.mcf * (1 - Math.exp(-(t - sp.ct) / (sp.k * 3)));
  if (sp.ml > 0) { const s = Math.min(1, Math.max(0, (t - sp.ct - 900) / 1500)); a *= 1 - (sp.ml / 100) * (s * s * (3 - 2 * s)); }
  return a;
}
function veParams(sp) {
  const a10 = veA(sp, sp.ct + 600), mcf = Math.max(...Array.from({ length: 121 }, (_, i) => veA(sp, i * 30)));
  const ml = mcf > 0 ? ((mcf - veA(sp, 3600)) / mcf) * 100 : 0;
  return { ct: sp.ct, a10, mcf, ml };
}
function veSVG() {
  const cond = ve.mystery || ve.cond, cols = narrow() ? 2 : 3;
  let g = "";
  VE_CH.forEach(([ch, sub], k) => {
    const ox = (k % cols) * 215 + 10, oy = Math.floor(k / cols) * 150 + 10, W = 195, H = 110, mid = oy + 20 + (H - 20) / 2;
    const X = (t) => ox + 10 + (t / 3600) * (W - 20), S = (a) => (a / 80) * ((H - 30) / 2);
    g += `<rect x="${ox}" y="${oy}" width="${W}" height="${H + 18}" rx="8" fill="var(--card, #fff)" stroke="#d6cdd9"/>`;
    g += `<text x="${ox + 8}" y="${oy + 13}" style="font-size:10.5px;font-weight:700;fill:var(--ink, #2a2230)">${ch}</text><text x="${ox + W - 8}" y="${oy + 13}" text-anchor="end" style="font-size:8.5px;fill:var(--muted)">${sub}</text>`;
    g += `<line x1="${X(0)}" y1="${mid}" x2="${X(3600)}" y2="${mid}" stroke="#e6dfe9"/>`;
    const sp = veSpec(cond, ch), up = [], dn = [];
    for (let t = 0; t <= ve.t; t += 30) { const a = S(veA(sp, t)); up.push(`${X(t).toFixed(1)},${(mid - a).toFixed(1)}`); dn.unshift(`${X(t).toFixed(1)},${(mid + a).toFixed(1)}`); }
    g += `<polygon points="${up.concat(dn).join(" ")}" fill="#7b5fc4" fill-opacity=".55" stroke="#4a3891" stroke-width="1.2"/>`;
    g += `<text x="${X(0)}" y="${oy + H + 13}" style="font-size:9px;fill:var(--muted)">0–60 min</text>`;
  });
  return `<svg viewBox="0 0 ${cols * 215 + 5} ${Math.ceil(5 / cols) * 150 + 10}" role="img" aria-label="Viscoelastic traces for five channels" style="min-width:0">${g}</svg>`;
}
function veTable() {
  const cond = ve.mystery || ve.cond;
  return `<div class="tablewrap"><table class="t"><thead><tr><th>Channel</th><th>CT (s)</th><th>A10 (mm)</th><th>MCF (mm)</th><th>ML (%)</th></tr></thead><tbody>${VE_CH.map(([ch]) => {
    const p = veParams(veSpec(cond, ch)), [c1, c2, m1, m2] = VE_REF[ch];
    return `<tr><td>${ch}</td>${flag(p.ct, c1, c2, p.ct.toFixed(0))}${flag(p.a10, 0, 999, p.a10.toFixed(0))}${flag(p.mcf, m1, m2, p.mcf.toFixed(0))}${flag(p.ml, 0, 15, p.ml.toFixed(0))}</tr>`;
  }).join("")}</tbody></table></div>`;
}
function veHTML() {
  const mys = ve.mystery, C = VE_CONDS.find((x) => x[0] === (mys || ve.cond));
  return `<div class="stack">
    <div class="svgwrap" style="padding:8px" id="veWrap">${veSVG()}</div>
    <div class="card stack">
      ${veTable()}
      ${mys ? `<span class="label">Mystery bleeding patient</span><p style="margin:0">Read the traces and the table. What is the main problem?</p>
        <div class="row" style="flex-wrap:wrap">${VE_CONDS.map(([k, t]) => `<button class="btn small${ve.guess === k ? (k === mys ? " primary" : "") : ""}" data-veguess="${k}" ${ve.guess ? "disabled" : ""}>${esc(t)}</button>`).join("")}</div>
        ${ve.guess ? `<div class="out"><strong>${ve.guess === mys ? "Correct." : `Not quite: this is ${esc(C[1])}.`}</strong> ${esc(C[3])}</div>` : ""}`
      : `<div class="field"><label for="veCond">Pattern</label><select id="veCond">${VE_CONDS.map(([k, t]) => `<option value="${k}" ${ve.cond === k ? "selected" : ""}>${esc(t)}</option>`).join("")}</select></div><div class="out">${esc(C[3])}</div>`}
      <div class="row" style="flex-wrap:wrap"><button class="btn primary" id="vePlay">▶ Run 60 minutes</button><button class="btn" data-vemys>${mys ? "Next mystery patient" : "Mystery patient"}</button>${mys ? `<button class="btn" data-veexit>Back to the list</button>` : ""}</div>
      <p class="note" style="margin:0">ROTEM-style teaching model. CT clotting time, A10 firmness 10 min after CT, MCF maximum clot firmness, ML maximum lysis. Reference ranges are approximate; thresholds and treatment algorithms are device- and hospital-specific.</p>
    </div></div>`;
}

function m6Redraw(html) { const el = $("#m6sim"); if (el) el.innerHTML = html; }
function pickMystery(list, current) { const ks = list.map((x) => x[0]).filter((k) => k !== "normal" && k !== current); return ks[Math.floor(Math.random() * ks.length)]; }
function animate(obj, max, step, wrap, draw) {
  clearInterval(obj.timer); obj.t = 0;
  obj.timer = setInterval(() => { obj.t = Math.min(max, obj.t + step); const w = $(wrap); if (!w) { clearInterval(obj.timer); return; } w.innerHTML = draw(); if (obj.t >= max) { clearInterval(obj.timer); obj.timer = null; } }, 40);
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("button"); if (!t) return;
  const d = t.dataset;
  if ("comix" in d) { co.mix = !co.mix; m6Redraw(coagHTML()); return; }
  if ("comys" in d) { const k = pickMystery(COAG_PRESETS, co.mystery); coagSet(k); co.mystery = k; co.guess = null; m6Redraw(coagHTML()); return; }
  if ("coexit" in d) { co.mystery = null; co.guess = null; coagSet("normal"); m6Redraw(coagHTML()); return; }
  if (d.coguess) { co.guess = d.coguess; m6Redraw(coagHTML()); return; }
  if (t.id === "ltaPlay") { animate(lta, 300, 6, "#ltaWrap", ltaSVG); return; }
  if ("ltamys" in d) { lta.mystery = pickMystery(LTA_CONDS, lta.mystery); lta.guess = null; lta.t = 0; m6Redraw(ltaHTML()); animate(lta, 300, 6, "#ltaWrap", ltaSVG); return; }
  if ("ltaexit" in d) { lta.mystery = null; lta.guess = null; lta.t = 300; m6Redraw(ltaHTML()); return; }
  if (d.ltaguess) { lta.guess = d.ltaguess; m6Redraw(ltaHTML()); return; }
  if (t.id === "vePlay") { animate(ve, 3600, 60, "#veWrap", veSVG); return; }
  if ("vemys" in d) { ve.mystery = pickMystery(VE_CONDS, ve.mystery); ve.guess = null; ve.t = 0; m6Redraw(veHTML()); animate(ve, 3600, 60, "#veWrap", veSVG); return; }
  if ("veexit" in d) { ve.mystery = null; ve.guess = null; ve.t = 3600; m6Redraw(veHTML()); return; }
});
document.addEventListener("input", (e) => {
  const id = e.target.id;
  if (id === "coPreset") { coagSet(e.target.value); m6Redraw(coagHTML()); return; }
  if (id === "ltaCond") { lta.cond = e.target.value; lta.t = 0; m6Redraw(ltaHTML()); animate(lta, 300, 6, "#ltaWrap", ltaSVG); return; }
  if (id === "veCond") { ve.cond = e.target.value; ve.t = 0; m6Redraw(veHTML()); animate(ve, 3600, 60, "#veWrap", veSVG); return; }
  if (!id.startsWith("co_")) return;
  const k = id.slice(3), v = e.target.value;
  co.s[k] = k === "drug" ? v : +v;
  if (k === "fib") co.s.fibAg = +v;
  co.preset = "custom";
  const lab = $("#cov_" + k);
  if (lab) lab.textContent = k === "fib" ? (+v).toFixed(1) + " g/L" : k === "hep" ? (+v).toFixed(1) + " IU/mL" : k === "inh" ? v + " BU" : k === "conc" ? v + " ng/mL" : v + " IU/dL";
  /* Update only the results card so the open slider panel keeps focus. */
  const wrap = $("#m6sim"); if (!wrap) return;
  const tmp = document.createElement("div"); tmp.innerHTML = coagHTML();
  wrap.querySelector(".card").replaceWith(tmp.querySelector(".card"));
  const sel = $("#coPreset"); if (sel) sel.value = "";
});
