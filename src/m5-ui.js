/* Module 5 interactive tools: lab-method atlas entries, calculators, haemocytometer counting trainer,
   Westgard QC trainer and ESR simulator. Depends on m5-data.js, data files, photos.js and photos-ui.js. */

const M5_CELLS = (() => {
  const src = Object.fromEntries(CELLS.concat(M2_CELLS, M2_NUCLEATED, M3_CELLS, M4_CELLS).map((c) => [c.id, c]));
  return M5_CELL_SPECS.map(([id, s, group, name, what, seen, tip]) => {
    if (PHOTOS[s] && !PHOTOS[id]) PHOTOS[id] = { ...PHOTOS[s], alias: true };
    return { ...src[s], id, name, group, lineage: group, what, seen, tip };
  });
})();

const M5_CALCS = {
  indices: { title: "Red cell indices", inputs: [["xhb", "Hb (g/L)", 118, 1], ["xrbc", "RBC (×10¹²/L)", 4.9, 0.01], ["xhct", "Haematocrit (L/L)", 0.36, 0.01]],
    run: ({ xhb, xrbc, xhct }) => {
      if (!(xrbc > 0 && xhct > 0)) return null;
      const mcv = (xhct / xrbc) * 1000, mch = xhb / xrbc, mchc = xhb / xhct;
      const flag = mchc > 370 ? "<br><b>MCHC over 370 g/L:</b> suspect an artefact (cold agglutinin, lipaemia, high WBC) unless many spherocytes are present." : mchc < 300 ? "<br>Low MCHC: hypochromia (iron deficiency, thalassaemia), or a falsely high haematocrit." : "";
      return `MCV <b>${mcv.toFixed(0)} fL</b> · MCH <b>${mch.toFixed(1)} pg</b> · MCHC <b>${mchc.toFixed(0)} g/L</b>${flag}<br><span class="muted">Adult guide: MCV 80–100 fL, MCH 27–32 pg, MCHC 320–360 g/L.</span>`;
    } },
  chamber: { title: "Haemocytometer count", inputs: [["xn", "Cells counted", 92, 1], ["xsq", "Large (1 mm²) squares counted", 4, 1], ["xdil", "Dilution (1 in …)", 20, 1]],
    run: ({ xn, xsq, xdil }) => {
      if (!(xsq > 0 && xdil > 0 && xn >= 0)) return null;
      const perUL = (xn * xdil) / (xsq * 0.1), u = 2 * Math.sqrt(xn);
      const lo = ((xn - u) * xdil) / (xsq * 0.1), hi = ((xn + u) * xdil) / (xsq * 0.1);
      return `Count <b>${(perUL / 1000).toFixed(2)} × 10⁹/L</b> (${Math.round(perUL)} per µL)<br>95% counting range about ${(Math.max(0, lo) / 1000).toFixed(2)}–${(hi / 1000).toFixed(2)} × 10⁹/L (±${xn ? ((u / xn) * 100).toFixed(0) : "–"}%).<br><span class="muted">Each large square of an Improved Neubauer chamber holds 0.1 µL. For red cells (1 in 200, 80 small squares), enter 0.2 squares.</span>`;
    } },
  inr: { title: "INR from the PT", inputs: [["xpt", "Patient PT (s)", 30, 0.1], ["xmn", "Mean normal PT (s)", 12, 0.1], ["xisi", "Thromboplastin ISI", 1.1, 0.01]],
    run: ({ xpt, xmn, xisi }) => {
      if (!(xpt > 0 && xmn > 0 && xisi > 0)) return null;
      const r = xpt / xmn, inr = Math.pow(r, xisi);
      return `PT ratio ${r.toFixed(2)} · <b>INR ${inr.toFixed(1)}</b><br><span class="muted">Valid only for patients stable on a vitamin K antagonist. The MNPT is the geometric mean of at least 20 healthy adults on your own reagent and instrument.</span>`;
    } },
  fmh: { title: "Fetomaternal haemorrhage (Kleihauer)", inputs: [["xf", "Fetal cells counted", 48, 1], ["xa", "Adult cells counted", 10000, 100]],
    run: ({ xf, xa }) => {
      if (!(xa > 0 && xf >= 0)) return null;
      const ml = 1800 * (xf / xa) * 1.22 * 1.09, iu = ml * 125;
      return `Estimated bleed <b>${ml.toFixed(1)} mL</b> fetal red cells<br>Anti-D needed: about <b>${Math.ceil(iu / 25) * 25} IU</b> intramuscularly (125 IU per mL), rounded up to the vial sizes available.${ml > 4 ? "<br>Over 4 mL: confirm by flow cytometry and recheck at 72 h." : ""}<br><span class="muted">Mollison's formula: 1800 × F/A × 1.22 (fetal cell size) × 1.09 (staining efficiency).</span>`;
    } },
  para: { title: "Malaria parasitaemia", inputs: [["xi", "Infected red cells (thin film)", 36, 1], ["xr", "Red cells counted", 1000, 100], ["xp", "Parasites (thick film)", 0, 1], ["xw", "WBC counted alongside (thick film)", 200, 1], ["xwbc", "Patient WBC (×10⁹/L)", 8, 0.1]],
    run: ({ xi, xr, xp, xw, xwbc }) => {
      if (!(xr > 0)) return null;
      const pct = (xi / xr) * 100;
      let out = `Thin film: <b>${pct.toFixed(1)}%</b> of red cells infected${pct >= 2 ? " (2% or more: a marker of severe falciparum malaria)" : ""}.`;
      if (xp > 0 && xw > 0) out += `<br>Thick film: <b>${Math.round((xp / xw) * xwbc * 1000)} parasites per µL</b>.`;
      return out + `<br><span class="muted">Count at least 1000 red cells on the thin film, or parasites against 200 WBC on the thick film. If the WBC is unknown, 8 × 10⁹/L is often assumed.</span>`;
    } }
};

/* ---------- Haemocytometer counting trainer ---------- */
let hc = { sq: 0, marks: new Set(), checked: false, log: [] };
function hcRng(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
function hcCells(k) {
  const r = hcRng(7919 * (k + 3)), out = [];
  const n = 18 + Math.floor(r() * 9);
  for (let i = 0; i < n; i++) out.push({ x: 18 + r() * 264, y: 18 + r() * 264, edge: "in" });
  ["top", "left", "bottom", "right"].forEach((e) => {
    const m = 1 + Math.floor(r() * 3);
    for (let i = 0; i < m; i++) {
      const a = 40 + r() * 220;
      out.push(e === "top" ? { x: a, y: 0, edge: e } : e === "bottom" ? { x: a, y: 300, edge: e } : e === "left" ? { x: 0, y: a, edge: e } : { x: 300, y: a, edge: e });
    }
  });
  for (let i = 0; i < 3; i++) out.push({ x: 330 + r() * 30, y: 20 + r() * 260, edge: "out" });
  return out.map((c, i) => ({ ...c, i, count: c.edge === "in" || c.edge === "top" || c.edge === "left" }));
}
function hcytHTML() {
  if (hc.sq >= 4) {
    const N = hc.log.reduce((a, l) => a + l.right, 0), U = hc.log.reduce((a, l) => a + l.user, 0);
    const wbc = (n) => ((n * 20) / 0.4 / 1000).toFixed(2);
    return `<div class="card stack" style="max-width:640px"><h3 style="margin:0">Your count</h3>
      <div class="tablewrap"><table><tr><th>Square</th><th>You counted</th><th>Correct</th></tr>${hc.log.map((l, k) => `<tr><td>${k + 1}</td><td>${l.user}</td><td>${l.right}</td></tr>`).join("")}<tr><td><b>Total</b></td><td><b>${U}</b></td><td><b>${N}</b></td></tr></table></div>
      <p style="margin:0">Four large squares hold 0.4 µL at a 1 in 20 dilution, so WBC = cells × 20 ÷ 0.4.</p>
      <div class="out">Correct WBC <b>${wbc(N)} × 10⁹/L</b>; your count gives <b>${wbc(U)} × 10⁹/L</b>.<br>Counting error alone is about ±${((2 / Math.sqrt(N)) * 100).toFixed(0)}% with ${N} cells: counting more squares improves precision.</div>
      <div class="row"><button class="btn primary" data-hcreset>Count again</button></div></div>`;
  }
  const cells = hcCells(hc.sq);
  let g = `<rect x="-30" y="-30" width="420" height="360" fill="#f6f2f7"/>`;
  for (let k = 1; k < 4; k++) g += `<line x1="${k * 75}" y1="0" x2="${k * 75}" y2="300" stroke="#b5a8bd" stroke-width="1"/><line x1="0" y1="${k * 75}" x2="300" y2="${k * 75}" stroke="#b5a8bd" stroke-width="1"/>`;
  [-4, 0, 4].forEach((d) => { g += `<rect x="${d}" y="${d}" width="${300 - 2 * d}" height="${300 - 2 * d}" fill="none" stroke="#6f6278" stroke-width="${d ? 1 : 2}"/>`; });
  cells.forEach((c) => {
    const m = hc.marks.has(c.i);
    let ring = "";
    if (hc.checked) {
      if (m && c.count) ring = `<circle cx="${c.x}" cy="${c.y}" r="12" fill="none" stroke="#23714f" stroke-width="3"/>`;
      else if (!m && c.count) ring = `<circle cx="${c.x}" cy="${c.y}" r="12" fill="none" stroke="#d9822b" stroke-width="3" stroke-dasharray="4 3"/>`;
      else if (m && !c.count) ring = `<path d="M${c.x - 10} ${c.y - 10} L${c.x + 10} ${c.y + 10} M${c.x + 10} ${c.y - 10} L${c.x - 10} ${c.y + 10}" stroke="#c0392b" stroke-width="3"/>`;
    } else if (m) ring = `<circle cx="${c.x}" cy="${c.y}" r="12" fill="none" stroke="#4a3891" stroke-width="3"/>`;
    g += `<g data-hc="${c.i}" style="cursor:pointer"><circle cx="${c.x}" cy="${c.y}" r="14" fill="transparent"/><circle cx="${c.x}" cy="${c.y}" r="7.5" fill="#d9cfe6" stroke="#8d7aa8"/><circle cx="${c.x - 1}" cy="${c.y}" r="4.6" fill="#4b2f7a"/>${ring}</g>`;
  });
  const user = hc.marks.size, right = cells.filter((c) => c.count).length;
  const wrong = [...hc.marks].filter((i) => !cells[i].count).length, missed = cells.filter((c) => c.count && !hc.marks.has(c.i)).length;
  return `<div class="odc">
    <div class="svgwrap" style="padding:8px"><svg viewBox="-30 -30 420 360" role="img" aria-label="One large square of a haemocytometer with white cells to count" style="min-width:0;touch-action:manipulation">${g}</svg></div>
    <div class="card stack">
      <span class="label">Large corner square ${hc.sq + 1} of 4</span>
      <p style="margin:0">Tap each white cell you would count in this 1 mm² square. Count cells touching the <b>top and left</b> lines, not those touching the bottom or right, and ignore cells outside.</p>
      <div class="out">${hc.checked ? `You counted <b>${user}</b>; the correct count is <b>${right}</b>.${wrong ? ` ${wrong} should not be counted (red ×).` : ""}${missed ? ` ${missed} missed (orange).` : ""}${!wrong && !missed ? " Perfect." : ""}` : `Marked so far: <b>${user}</b>`}</div>
      <div class="row">${hc.checked ? `<button class="btn primary" data-hcnext>${hc.sq < 3 ? "Next square →" : "See the result"}</button>` : `<button class="btn primary" data-hccheck>Check this square</button><button class="btn" data-hcclear>Clear marks</button>`}</div>
      <p class="note" style="margin:0">WBC count, 1 in 20 in acetic acid with gentian violet. Simulated chamber; cells are not to scale.</p>
    </div></div>`;
}

/* ---------- Westgard QC trainer ---------- */
let qcs = { i: 0, ans: null };
function westgard(z) {
  for (let i = 0; i < z.length; i++) {
    if (Math.abs(z[i]) > 3) return { rule: "1-3s", pts: [i] };
    if (i >= 1 && ((z[i] > 2 && z[i - 1] > 2) || (z[i] < -2 && z[i - 1] < -2))) return { rule: "2-2s", pts: [i - 1, i] };
    if (i >= 1 && ((z[i] > 2 && z[i - 1] < -2) || (z[i] < -2 && z[i - 1] > 2))) return { rule: "R-4s", pts: [i - 1, i] };
    if (i >= 3) { const w = z.slice(i - 3, i + 1); if (w.every((v) => v > 1) || w.every((v) => v < -1)) return { rule: "4-1s", pts: [i - 3, i - 2, i - 1, i] }; }
    if (i >= 9) { const w = z.slice(i - 9, i + 1); if (w.every((v) => v > 0) || w.every((v) => v < 0)) return { rule: "10x", pts: Array.from({ length: 10 }, (_, k) => i - 9 + k) }; }
  }
  return { rule: "none", pts: [] };
}
const QC_EXPLAIN = {
  none: "No rejection rule is broken: accept the run. Points beyond 1 SD occur about a third of the time by chance.",
  "1-3s": "One control beyond 3 SD: random error or a blunder. Reject; check the control vial, mixing, aperture, bubbles and transcription.",
  "2-2s": "Two consecutive results beyond 2 SD on the same side: systematic error. Reject; check calibration and reagent or control lot changes.",
  "R-4s": "Consecutive results beyond +2 SD and −2 SD: random error (imprecision). Reject; check mixing, pipetting and fluidics.",
  "4-1s": "Four consecutive results beyond 1 SD on one side: a systematic shift. Reject; investigate calibration and reagents.",
  "10x": "Ten consecutive results on one side of the mean, all within 2 SD: a small systematic shift. Reject; look for a new reagent lot or slow drift."
};
function qcHTML() {
  const S = QC_SCENARIOS[qcs.i], res = westgard(S.z);
  const X = (k) => 50 + k * 18, Y = (v) => 170 - v * 40;
  let g = "";
  [[3, "+3 SD", "#c0392b"], [2, "+2 SD", "#d9822b"], [1, "+1 SD", "#b5a8bd"], [0, "Mean", "#4a3891"], [-1, "−1 SD", "#b5a8bd"], [-2, "−2 SD", "#d9822b"], [-3, "−3 SD", "#c0392b"]].forEach(([v, t, c]) => {
    g += `<line x1="44" y1="${Y(v)}" x2="${X(S.z.length - 1) + 10}" y2="${Y(v)}" stroke="${c}" stroke-width="${v ? 1.2 : 2}" ${Math.abs(v) === 1 ? 'stroke-dasharray="4 4"' : ""}/><text x="40" y="${Y(v) + 4}" text-anchor="end" style="font-size:10px;fill:var(--muted)">${t}</text>`;
  });
  g += `<polyline points="${S.z.map((v, k) => `${X(k)},${Y(Math.max(-3.6, Math.min(3.6, v)))}`).join(" ")}" fill="none" stroke="#8a7f8f" stroke-width="1.5"/>`;
  S.z.forEach((v, k) => {
    const hit = qcs.ans != null && res.pts.includes(k);
    g += `<circle cx="${X(k)}" cy="${Y(Math.max(-3.6, Math.min(3.6, v)))}" r="${hit ? 6 : 4}" fill="${hit ? "#c0392b" : "#4a3891"}"/>`;
  });
  g += `<text x="${(X(0) + X(S.z.length - 1)) / 2}" y="330" text-anchor="middle" style="font-size:11px;fill:var(--muted)">Run number →</text>`;
  const right = qcs.ans === res.rule;
  return `<div class="odc">
    <div class="svgwrap" style="padding:8px"><svg viewBox="0 0 450 340" role="img" aria-label="Levey–Jennings chart, ${esc(S.name)}" style="min-width:0">${g}</svg></div>
    <div class="card stack">
      <span class="label">${esc(S.name)} of ${QC_SCENARIOS.length}</span>
      <p style="margin:0">${esc(S.note)} Read the chart from left to right. Which Westgard rejection rule is broken first?</p>
      <div class="row" style="flex-wrap:wrap">${QC_RULES.map(([k, t]) => `<button class="btn small${qcs.ans === k ? (right ? " primary" : "") : ""}" data-qcans="${k}" ${qcs.ans != null ? "disabled" : ""}>${t}</button>`).join("")}</div>
      ${qcs.ans != null ? `<div class="out"><strong>${right ? "Correct." : `Not quite: the answer is ${res.rule === "none" ? "no rule broken" : res.rule}.`}</strong> ${QC_EXPLAIN[res.rule]}${res.pts.length ? " The red points show where it happens." : ""}</div>
      <div class="row"><button class="btn primary" data-qcnext>${qcs.i < QC_SCENARIOS.length - 1 ? "Next run →" : "Start again"}</button></div>` : ""}
      <p class="note" style="margin:0">1-2s is a warning, not a rejection rule. Simulated data.</p>
    </div></div>`;
}

/* ---------- ESR simulator (teaching model) ---------- */
let esr = { fib: 3, hct: 0.42, shape: "normal", para: 0, tilt: 0, warm: 0, t: 60, timer: null };
function esrAt60() {
  const base = 2 + 6 * Math.max(0, esr.fib - 2);
  const v = base * Math.pow(0.45 / esr.hct, 2.2) * (esr.para ? 2.5 : 1) * { normal: 1, sickle: 0.1, sphero: 0.4 }[esr.shape] * (esr.tilt ? 1.6 : 1) * (esr.warm ? 1.3 : 1);
  return Math.max(1, Math.min(150, v));
}
function esrAt(t) { const S = (x) => 1 / (1 + Math.exp(-(x - 22) / 6)); return esrAt60() * ((S(t) - S(0)) / (S(60) - S(0))); }
function esrSVG() {
  const h = esrAt(esr.t), px = (mm) => 30 + mm * 1.5;
  let g = `<rect x="70" y="20" width="40" height="320" rx="6" fill="#fff" stroke="#8a7f8f" stroke-width="2"/>`;
  g += `<rect x="73" y="${px(0)}" width="34" height="${px(h) - px(0)}" fill="#f7efc9"/><rect x="73" y="${px(h)}" width="34" height="${px(200) - px(h)}" fill="#a8243a"/>`;
  for (let mm = 0; mm <= 200; mm += 10) g += `<line x1="${mm % 50 ? 112 : 108}" y1="${px(mm)}" x2="118" y2="${px(mm)}" stroke="#6f6278"/>${mm % 50 ? "" : `<text x="124" y="${px(mm) + 4}" style="font-size:11px;fill:var(--muted)">${mm}</text>`}`;
  g += `<line x1="40" y1="${px(h)}" x2="70" y2="${px(h)}" stroke="#4a3891" stroke-width="2"/><text x="36" y="${px(h) + 4}" text-anchor="end" style="font-size:12px;font-weight:700;fill:#4a3891">${h.toFixed(0)} mm</text>`;
  return `<svg viewBox="0 0 170 350" role="img" aria-label="Westergren tube" style="min-width:0;max-height:420px;${esr.tilt ? "transform:rotate(8deg)" : ""}">${g}</svg>`;
}
function esrHTML() {
  return `<div class="odc">
    <div class="svgwrap" style="padding:8px;display:flex;justify-content:center" id="esrTube">${esrSVG()}</div>
    <div class="card stack">
      <p style="margin:0">Change the blood and the conditions, then play the 60 minutes. The clear plasma above the red cells is the ESR.</p>
      <div class="field"><label for="esrFib">Fibrinogen <b id="esrFibV">${esr.fib.toFixed(1)} g/L</b></label><input class="slider" id="esrFib" type="range" min="1.5" max="10" step="0.5" value="${esr.fib}"></div>
      <div class="field"><label for="esrHct">Haematocrit <b id="esrHctV">${esr.hct.toFixed(2)} L/L</b></label><input class="slider" id="esrHct" type="range" min="0.2" max="0.6" step="0.01" value="${esr.hct}"></div>
      <div class="field"><label for="esrShape">Red cell shape</label><select id="esrShape">${[["normal", "Normal discocytes"], ["sickle", "Sickle cells"], ["sphero", "Spherocytes"]].map(([k, t]) => `<option value="${k}" ${esr.shape === k ? "selected" : ""}>${t}</option>`).join("")}</select></div>
      <label><input type="checkbox" id="esrPara" ${esr.para ? "checked" : ""}> Paraprotein (myeloma)</label>
      <label><input type="checkbox" id="esrTilt" ${esr.tilt ? "checked" : ""}> Tube not vertical</label>
      <label><input type="checkbox" id="esrWarm" ${esr.warm ? "checked" : ""}> Warm room (about 30 °C)</label>
      <div class="field"><label for="esrT">Time <b id="esrTV">${esr.t} min</b></label><input class="slider" id="esrT" type="range" min="0" max="60" step="1" value="${esr.t}"></div>
      <div class="row"><button class="btn primary" id="esrPlay">▶ Play 60 minutes</button></div>
      <div class="out" id="esrOut">${esrOut()}</div>
      <p class="note" style="margin:0">Teaching model of the direction and rough size of each effect, not a formula. Westergren: citrate 4 + 1, 200 mm, vertical, 18–25 °C, read at exactly 60 min.</p>
    </div></div>`;
}
function esrOut() {
  const v = esrAt60(), notes = [];
  if (esr.fib > 4) notes.push("fibrinogen promotes rouleaux");
  if (esr.para) notes.push("paraprotein causes marked rouleaux");
  if (esr.hct < 0.36) notes.push("anaemia speeds sedimentation");
  if (esr.hct > 0.5) notes.push("a high haematocrit slows it");
  if (esr.shape !== "normal") notes.push(`${esr.shape === "sickle" ? "sickle cells" : "spherocytes"} cannot form rouleaux`);
  if (esr.tilt) notes.push("a tilted tube falsely raises the ESR");
  if (esr.warm) notes.push("a warm room falsely raises it");
  return `ESR at 60 min ≈ <b>${v.toFixed(0)} mm/h</b>${notes.length ? `: ${notes.join("; ")}.` : "."}`;
}
function esrUpdate() { const tube = $("#esrTube"); if (!tube) return false; tube.innerHTML = esrSVG(); $("#esrOut").innerHTML = esrOut(); $("#esrTV").textContent = esr.t + " min"; $("#esrT").value = esr.t; return true; }

document.addEventListener("click", (e) => {
  const c = e.target.closest("[data-hc]");
  if (c && !hc.checked) { const i = +c.dataset.hc; hc.marks.has(i) ? hc.marks.delete(i) : hc.marks.add(i); $("#m5sim").innerHTML = hcytHTML(); return; }
  const t = e.target.closest("button"); if (!t) return;
  const d = t.dataset;
  if ("hccheck" in d) { const cells = hcCells(hc.sq); hc.checked = true; hc.log[hc.sq] = { user: hc.marks.size, right: cells.filter((x) => x.count).length }; $("#m5sim").innerHTML = hcytHTML(); return; }
  if ("hcclear" in d) { hc.marks = new Set(); $("#m5sim").innerHTML = hcytHTML(); return; }
  if ("hcnext" in d) { hc.sq++; hc.marks = new Set(); hc.checked = false; $("#m5sim").innerHTML = hcytHTML(); return; }
  if ("hcreset" in d) { hc = { sq: 0, marks: new Set(), checked: false, log: [] }; $("#m5sim").innerHTML = hcytHTML(); return; }
  if (d.qcans) { qcs.ans = d.qcans; $("#m5sim").innerHTML = qcHTML(); return; }
  if ("qcnext" in d) { qcs = { i: (qcs.i + 1) % QC_SCENARIOS.length, ans: null }; $("#m5sim").innerHTML = qcHTML(); return; }
  if (t.id === "esrPlay") {
    clearInterval(esr.timer); esr.t = 0; esrUpdate();
    esr.timer = setInterval(() => { esr.t = Math.min(60, esr.t + 1); if (!esrUpdate() || esr.t >= 60) { clearInterval(esr.timer); esr.timer = null; } }, 90);
  }
});
document.addEventListener("input", (e) => {
  const id = e.target.id;
  if (!id.startsWith("esr")) return;
  if (id === "esrFib") { esr.fib = +e.target.value; $("#esrFibV").textContent = esr.fib.toFixed(1) + " g/L"; }
  if (id === "esrHct") { esr.hct = +e.target.value; $("#esrHctV").textContent = esr.hct.toFixed(2) + " L/L"; }
  if (id === "esrShape") esr.shape = e.target.value;
  if (id === "esrPara") esr.para = e.target.checked ? 1 : 0;
  if (id === "esrTilt") esr.tilt = e.target.checked ? 1 : 0;
  if (id === "esrWarm") esr.warm = e.target.checked ? 1 : 0;
  if (id === "esrT") { clearInterval(esr.timer); esr.timer = null; esr.t = +e.target.value; }
  esrUpdate();
});
