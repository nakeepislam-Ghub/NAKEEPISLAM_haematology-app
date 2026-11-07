/* Module 6 3D animations: a small dependency-free 3D canvas renderer (perspective projection, depth-sorted
   shaded spheres and lines, drag to rotate) and three bench scenes: the centrifuge (PRP and PPP), the
   coagulometer (fibrin mesh, mechanical and optical clot detection) and the aggregometer (stirred platelets,
   shape change and aggregation). Teaching models only. Works offline; no libraries. Depends on $ and esc. */

const S3 = { raf: 0, cam: { yaw: 0.5, pitch: 0.28, dist: 340 }, drag: null, playing: true, scene: null };
const rnd3 = (a, b) => a + Math.random() * (b - a);

function p3(p, W, H, k) {
  const c = S3.cam, cy = Math.cos(c.yaw), sy = Math.sin(c.yaw), cp = Math.cos(c.pitch), sp = Math.sin(c.pitch);
  const x = p[0] * cy - p[2] * sy, z0 = p[0] * sy + p[2] * cy;
  const y = p[1] * cp - z0 * sp, z = p[1] * sp + z0 * cp;
  const f = c.dist / (c.dist + z);
  return [W / 2 + x * f * k, H / 2 - y * f * k, z, f * k];
}
function ball(g, q, r, col, hi) {
  const R = Math.max(0.6, r * q[3]);
  const gr = g.createRadialGradient(q[0] - R * 0.35, q[1] - R * 0.35, R * 0.1, q[0], q[1], R);
  gr.addColorStop(0, hi || "#ffffff"); gr.addColorStop(0.35, col); gr.addColorStop(1, "rgba(0,0,0,0.85)");
  g.fillStyle = gr; g.beginPath(); g.arc(q[0], q[1], R, 0, 7); g.fill();
}
function seg(g, a, b, col, w) { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); }
function ring3(y, r, n = 40) { return Array.from({ length: n + 1 }, (_, i) => [r * Math.cos((i / n) * 6.283), y, r * Math.sin((i / n) * 6.283)]); }
function poly3(g, pts, W, H, k, col, w) { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); pts.forEach((p, i) => { const q = p3(p, W, H, k); i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]); }); g.stroke(); }
function tube3(g, W, H, k, R, y0, y1, col) {
  poly3(g, ring3(y1, R), W, H, k, col, 1.4); poly3(g, ring3(y0, R), W, H, k, col, 1.4);
  [0, Math.PI].forEach((a0) => { const a = a0 - S3.cam.yaw; poly3(g, [[R * Math.cos(a), y0, R * Math.sin(a)], [R * Math.cos(a), y1, R * Math.sin(a)]], W, H, k, col, 1.4); });
}
function box3(g, W, H, k, s, h, col) {
  const v = [[-s, -h, -s], [s, -h, -s], [s, -h, s], [-s, -h, s], [-s, h, -s], [s, h, -s], [s, h, s], [-s, h, s]];
  [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]].forEach(([a, b]) => seg(g, p3(v[a], W, H, k), p3(v[b], W, H, k), col, 1.2));
}
function chart3(g, W, H, pts, opts) {
  const w = Math.min(190, W * 0.42), h = W < 500 ? 62 : 92, x0 = W - w - 10, y0 = H - h - 10;
  g.fillStyle = "rgba(15,12,26,0.82)"; g.fillRect(x0, y0, w, h); g.strokeStyle = "#5b4f78"; g.strokeRect(x0, y0, w, h);
  g.fillStyle = "#d9d2ea"; g.font = "11px system-ui, sans-serif"; g.fillText(opts.title, x0 + 7, y0 + 14);
  const X = (t) => x0 + 8 + (t / opts.tmax) * (w - 16), Y = (v) => (opts.down ? y0 + 22 + (v / opts.vmax) * (h - 30) : y0 + h - 8 - (v / opts.vmax) * (h - 30));
  g.strokeStyle = "#ffd36b"; g.lineWidth = 1.8; g.beginPath();
  pts.forEach(([t, v], i) => (i ? g.lineTo(X(t), Y(v)) : g.moveTo(X(t), Y(v)))); g.stroke();
  if (opts.mark != null) { g.strokeStyle = "#ff7a8a"; g.setLineDash([3, 3]); g.beginPath(); g.moveTo(X(opts.mark), y0 + 18); g.lineTo(X(opts.mark), y0 + h - 4); g.stroke(); g.setLineDash([]); }
}
function bg3(g, W, H) {
  const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#251d3d"); gr.addColorStop(1, "#120e1f");
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
}
function label3(g, txt, x, y, col = "#efeaf7", size = 12) { g.fillStyle = col; g.font = `${size}px system-ui, sans-serif`; g.fillText(txt, x, y); }
function drawSorted(g, items) { items.sort((a, b) => b.z - a.z).forEach((it) => it.d()); }

/* ---------- Scene 1: centrifuge ---------- */
const CF = { R: 14, y0: -40, y1: 40 };
function cfInit(second, count0) {
  const P = [], rr = () => Math.sqrt(Math.random()) * (CF.R - 2.5), a = () => rnd3(0, 6.283);
  const push = (t, n) => { for (let i = 0; i < n; i++) { const r = rr(), an = a(); P.push({ t, x: r * Math.cos(an), z: r * Math.sin(an), y: rnd3(CF.y0 + 2, CF.y1 - 2), f: Math.random() < 0.06 ? 0.08 : rnd3(0.6, 1.4) }); } };
  if (!second) { push("r", 230); push("w", 10); }
  push("p", second ? 90 : 130);
  const rbc = P.filter((p) => p.t === "r").sort((a, b) => a.y - b.y);
  const top = second ? CF.y0 : CF.y0 + 0.45 * (CF.y1 - CF.y0);
  rbc.forEach((p, i) => (p.ty = CF.y0 + 2 + (i / rbc.length) * (top - CF.y0 - 3)));
  P.forEach((p) => { if (p.t === "w") p.ty = top + rnd3(0.5, 2); if (p.t === "p") p.ty = top + rnd3(2, 3.5); });
  return { kind: "cf", P, g: 0, min: 0, dur: 0, top, second, count0: count0 || 455, done: false, spin: 0, label: second ? "Second spin of the plasma" : "Whole blood in 3.2% citrate" };
}
function cfStep(s, dt) {
  if (!s.g || s.done) return;
  s.min = Math.min(s.dur, s.min + dt * (s.dur / 9)); s.spin += dt * 20;
  const step = dt * (s.dur / 9);
  s.P.forEach((p) => {
    const v = p.t === "r" ? 10 * Math.pow(s.g / 1500, 0.4) : p.t === "w" ? 7 * Math.pow(s.g / 1500, 0.4) : 6 * (s.g / 1500) * p.f;
    p.y = Math.max(p.ty, p.y - v * step);
  });
  if (s.min >= s.dur) s.done = true;
}
function cfCount(s) { const pl = s.P.filter((p) => p.t === "p"); return Math.round(s.count0 * (pl.filter((p) => p.y > s.top + 4).length / pl.length)); }
function cfDraw(g, W, H, s) {
  bg3(g, W, H); const k = Math.min(W, H) / 105;
  const plasmaTop = CF.y1 - 2;
  const items = [];
  s.P.forEach((p) => {
    const q = p3([p.x, p.y, p.z], W, H, k);
    const col = p.t === "r" ? "#c8283c" : p.t === "w" ? "#e8e4f2" : "#a77be0";
    const r = p.t === "r" ? 3.1 : p.t === "w" ? 3.8 : 1.4;
    items.push({ z: q[2], d: () => ball(g, q, r, col, p.t === "r" ? "#ff9aa6" : "#ffffff") });
  });
  /* plasma tint behind the cells */
  const a = p3([0, plasmaTop, 0], W, H, k), b = p3([0, CF.y0, 0], W, H, k), e = p3([CF.R, 0, 0], W, H, k), c0 = p3([0, 0, 0], W, H, k);
  g.fillStyle = "rgba(246, 214, 120, 0.13)"; g.fillRect(c0[0] - (e[0] - c0[0]) * 1.02, a[1], (e[0] - c0[0]) * 2.04, b[1] - a[1]);
  drawSorted(g, items);
  tube3(g, W, H, k, CF.R, CF.y0, CF.y1, "rgba(220,214,240,0.75)");
  /* rotor icon */
  const cx = 34, cy = 34; g.strokeStyle = s.g && !s.done ? "#ffd36b" : "#8f84aa"; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, 18, 0, 7); g.stroke();
  for (let i = 0; i < 4; i++) { const an = s.spin + (i * Math.PI) / 2; seg(g, [cx, cy], [cx + 16 * Math.cos(an), cy + 16 * Math.sin(an)], g.strokeStyle, 2); }
  label3(g, s.g ? `${s.g} g · ${s.min.toFixed(1)} of ${s.dur} min` : s.label, 62, 30);
  label3(g, `Platelets left in the plasma ≈ ${cfCount(s)} × 10⁹/L`, 62, 48, "#ffd36b");
  if (s.done) label3(g, s.second || s.g >= 1000 ? (cfCount(s) < 10 ? "Platelet-poor plasma (under 10 × 10⁹/L)" : "Not yet platelet-poor: spin the plasma again") : "Platelet-rich plasma: ready for aggregometry", 62, 66, "#9fe3b8");
}
function cfHTML() {
  return `<p style="margin:0">Spin citrated blood and watch the cells separate. Red cells pack first, white cells form the buffy coat, and the tiny platelets settle last.</p>
    <div class="row" style="flex-wrap:wrap"><button class="btn primary" data-spin="200">Soft spin: 200 g, 10 min (PRP)</button><button class="btn primary" data-spin="1500">Hard spin: 1500 g, 15 min (PPP)</button></div>
    <div class="row" style="flex-wrap:wrap"><button class="btn" data-spin="again">Spin the plasma again (double spin)</button><button class="btn" data-spin="reset">New tube</button></div>
    <div class="out" id="o3d">Platelet-rich plasma (PRP) is for aggregometry. Platelet-poor plasma (PPP, under 10 × 10⁹/L) is for clotting tests; double-spin it before freezing or lupus anticoagulant testing, because broken platelets release phospholipid.</div>`;
}

/* ---------- Scene 2: coagulometer ---------- */
const CL_SAMPLES = [
  ["norm", "Normal plasma, PT", 12, 3.0, 0, "Fibrin strands appear at about 12 s. Both the steel ball and the light beam detect the clot."],
  ["vka", "Warfarin, PT (INR about 2.5)", 30, 3.0, 0, "The same clot, but thrombin is generated later: PT about 30 s."],
  ["haem", "Severe haemophilia A, APTT", 88, 3.0, 0, "Without FVIII the intrinsic tenase is missing, so the APTT clot forms very late (about 90 s)."],
  ["lowfib", "Low fibrinogen (0.8 g/L), PT", 15, 0.8, 0, "A thin, loose mesh. The ball still slows, but the optical signal is small: optical analysers may report 'low signal' or 'no clot'."],
  ["lip", "Lipaemic sample, PT", 12, 3.0, 1, "The fat droplets scatter light, so the optical baseline is near the detector's limit and the clot cannot be seen. The mechanical method, which feels the clot, works normally."]
];
function clInit(key) {
  const S = CL_SAMPLES.find((x) => x[0] === key), n = Math.round(30 + 25 * Math.min(3, S[3]));
  const N = Array.from({ length: n }, () => [rnd3(-17, 17), rnd3(-14, 22), rnd3(-17, 17)]), E = [];
  N.forEach((a, i) => {
    const near = N.map((b, j) => [j, (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2]).filter(([j]) => j !== i).sort((x, y) => x[1] - y[1]).slice(0, 3);
    near.forEach(([j]) => { if (j > i) E.push([i, j, S[2] * rnd3(0.82, 1.35)]); });
  });
  const L = S[4] ? Array.from({ length: 110 }, () => [rnd3(-18, 18), rnd3(-23, 23), rnd3(-18, 18)]) : [];
  return { kind: "cl", S, N, E, L, t: 0, run: false, tmax: Math.max(40, S[2] * 1.6), od: [], mech: null, opt: null, phase: 0 };
}
function clFrac(s) { return s.E.length ? s.E.filter((e) => e[2] <= s.t).length / s.E.length : 0; }
function clStep(s, dt) {
  if (!s.run) return;
  s.t = Math.min(s.tmax, s.t + dt * s.tmax / 8); s.phase += dt * 9;
  const f = clFrac(s), base = s.S[4] ? 1.82 : 0.15, rise = (s.S[3] / 3) * 0.55, od = Math.min(2.0, base + rise * f);
  s.od.push([s.t, od]);
  if (s.mech == null && f > 0.45) s.mech = s.t;
  if (s.opt == null && !s.S[4] && s.S[3] > 1 && f > 0.5) s.opt = s.t;
  if (s.t >= s.tmax) s.run = false;
}
function clDraw(g, W, H, s) {
  bg3(g, W, H); const k = Math.min(W, H) / 70, f = clFrac(s);
  box3(g, W, H, k, 20, 25, "rgba(220,214,240,0.7)");
  /* light beam */
  const od = s.od.length ? s.od[s.od.length - 1][1] : s.S[4] ? 1.82 : 0.15, bright = Math.max(0.05, 1 - od / 2);
  seg(g, p3([-34, 4, 0], W, H, k), p3([-20, 4, 0], W, H, k), "rgba(255,230,120,0.95)", 3);
  seg(g, p3([20, 4, 0], W, H, k), p3([34, 4, 0], W, H, k), `rgba(255,230,120,${bright.toFixed(2)})`, 3);
  const items = [];
  s.L.forEach((p) => { const q = p3(p, W, H, k); items.push({ z: q[2], d: () => ball(g, q, 1.5, "rgba(250,248,235,0.75)", "#ffffff") }); });
  s.E.forEach(([i, j, t]) => { if (t <= s.t) { const a = p3(s.N[i], W, H, k), b = p3(s.N[j], W, H, k); items.push({ z: (a[2] + b[2]) / 2, d: () => seg(g, a, b, "rgba(250,231,168,0.85)", 1.3) }); } });
  s.N.forEach((p) => { const q = p3(p, W, H, k); items.push({ z: q[2], d: () => ball(g, q, 0.9, "#e8cf7a") }); });
  const amp = 12 * (1 - 0.92 * Math.min(1, f * 1.4)), bx = amp * Math.sin(s.phase), bq = p3([bx, -19, 0], W, H, k);
  items.push({ z: bq[2], d: () => ball(g, bq, 4, "#9aa3ad", "#ffffff") });
  drawSorted(g, items);
  label3(g, `${s.S[1]} · ${s.t.toFixed(1)} s`, 12, 22);
  label3(g, s.mech != null ? `Mechanical (steel ball): clot at ${s.mech.toFixed(1)} s` : "Mechanical (steel ball): waiting", 12, 40, "#c9d4df");
  label3(g, s.opt != null ? `Optical (light beam): clot at ${s.opt.toFixed(1)} s` : !s.run && s.t > 0 && (s.S[4] || s.S[3] <= 1) ? "Optical: no clot detected (flag)" : "Optical (light beam): waiting", 12, 58, "#ffd36b");
  chart3(g, W, H, s.od, { title: "Optical density", tmax: s.tmax, vmax: 2.1, mark: s.opt });
}
function clHTML() {
  return `<p style="margin:0">Add the reagent and watch fibrin polymerise. The steel ball, swung by a magnet, slows as the clot grips it; the light beam dims as the fibrin mesh scatters light.</p>
    <div class="field"><label for="clS">Sample</label><select id="clS">${CL_SAMPLES.map(([kk, t]) => `<option value="${kk}">${esc(t)}</option>`).join("")}</select></div>
    <div class="row"><button class="btn primary" data-cl="go">Add reagent and start</button></div>
    <div class="out" id="o3d">${esc(CL_SAMPLES[0][5])}</div>`;
}

/* ---------- Scene 3: aggregometer ---------- */
const AG_PTS = [["norm", "Normal"], ["gt", "Glanzmann thrombasthenia"], ["asp", "Aspirin"], ["bss", "Bernard–Soulier syndrome"]];
const AG_AGS = [["adp", "ADP"], ["aa", "Arachidonic acid"], ["ris", "Ristocetin"]];
function agRule(pt, ag) {
  if (ag === "ris") return pt === "bss" ? { act: 0, bind: 0, txt: "No GPIb: ristocetin cannot make VWF bridge the platelets. No agglutination; the giant platelets just circle." } : { act: 0, bind: 1, txt: pt === "gt" ? "Ristocetin makes VWF bind GPIb, which is present: agglutination is normal even without GPIIb/IIIa." : "Ristocetin makes VWF bind GPIb: the platelets agglutinate without being activated." };
  if (pt === "asp" && ag === "aa") return { act: 0, bind: 0, txt: "Aspirin has blocked COX-1, so arachidonic acid cannot become thromboxane A2. The platelets stay as discs: no response." };
  if (pt === "gt") return { act: 1, bind: 0, txt: "The platelets change shape (spheres with pseudopods) but cannot bind fibrinogen without GPIIb/IIIa: no aggregation." };
  if (pt === "asp" && ag === "adp") return { act: 1, bind: 1, rev: 1, txt: "A primary wave of aggregation, which then reverses: without thromboxane A2 the platelets cannot release enough to hold the aggregates." };
  return { act: 1, bind: 1, txt: "Shape change, then fibrinogen bridges activated GPIIb/IIIa between platelets: large aggregates form and the plasma clears." };
}
function agInit(pt, ag) {
  const P = Array.from({ length: 150 }, () => { const r = Math.sqrt(Math.random()) * 13, a = rnd3(0, 6.283); return { r, a, y: rnd3(-24, 24), c: -1, sp: rnd3(0.8, 1.2) }; });
  return { kind: "ag", pt: pt || "norm", ag: ag || "adp", P, t: 0, t0: null, rule: null, trace: [], stir: 0 };
}
function agStep(s, dt) {
  s.stir += dt * 7; s.t += dt * 6;
  s.P.forEach((p) => { p.a += dt * 0.9 * p.sp * (p.c >= 0 ? 0.8 : 1); });
  if (s.t0 == null) return;
  const R = s.rule, since = s.t - s.t0;
  if (R.bind && since > (R.act ? 18 : 6) && !(R.rev && since > 120)) {
    for (let i = 0; i < s.P.length; i++) for (let j = i + 1; j < s.P.length; j++) {
      const a = s.P[i], b = s.P[j]; if (a.c >= 0 && a.c === b.c) continue;
      const dx = a.r * Math.cos(a.a) - b.r * Math.cos(b.a), dz = a.r * Math.sin(a.a) - b.r * Math.sin(b.a), dy = a.y - b.y;
      if (dx * dx + dy * dy + dz * dz < 20 && Math.random() < 0.2) {
        const id = a.c >= 0 ? a.c : b.c >= 0 ? b.c : i;
        const old = [a.c, b.c]; s.P.forEach((p) => { if (old.includes(p.c) && p.c >= 0) p.c = id; }); a.c = b.c = id;
      }
    }
    /* members drift together */
    const cm = {}; s.P.forEach((p) => { if (p.c >= 0) { const m = (cm[p.c] ||= [0, 0, 0, 0]); m[0] += p.r * Math.cos(p.a); m[1] += p.y; m[2] += p.r * Math.sin(p.a); m[3]++; } });
    s.P.forEach((p) => { if (p.c < 0) return; const m = cm[p.c], x = p.r * Math.cos(p.a), z = p.r * Math.sin(p.a), mx = m[0] / m[3], mz = m[2] / m[3];
      const nx = x + (mx - x) * 0.07, nz = z + (mz - z) * 0.07; p.r = Math.min(13, Math.hypot(nx, nz)); p.a = Math.atan2(nz, nx); p.y += (m[1] / m[3] - p.y) * 0.07; });
  }
  if (R.rev && since > 120 && since < 125) s.P.forEach((p) => { p.c = -1; p.y += rnd3(-2, 2); });
  const agg = s.P.filter((p) => p.c >= 0).length / s.P.length;
  const prev = s.trace.length ? s.trace[s.trace.length - 1][1] : 0, target = 88 * agg;
  if (since <= 300) s.trace.push([since, prev + (target - prev) * 0.08]);
}
function agDraw(g, W, H, s) {
  bg3(g, W, H); const k = Math.min(W, H) / 78, act = s.t0 != null && s.rule.act && s.t - s.t0 > 8;
  const last = s.trace.length ? s.trace[s.trace.length - 1][1] : 0;
  seg(g, p3([-30, 0, 0], W, H, k), p3([-16, 0, 0], W, H, k), "rgba(255,230,120,0.95)", 3);
  seg(g, p3([16, 0, 0], W, H, k), p3([30, 0, 0], W, H, k), `rgba(255,230,120,${(0.2 + 0.8 * last / 88).toFixed(2)})`, 3);
  const items = [];
  s.P.forEach((p) => {
    const q = p3([p.r * Math.cos(p.a), p.y, p.r * Math.sin(p.a)], W, H, k);
    items.push({ z: q[2], d: () => {
      if (act) { g.strokeStyle = "rgba(205,170,255,0.8)"; g.lineWidth = 1; for (let i = 0; i < 5; i++) { const an = i * 1.256 + p.a * 3; seg(g, q, [q[0] + Math.cos(an) * 2.6 * q[3], q[1] + Math.sin(an) * 2.6 * q[3]], "rgba(205,170,255,0.8)", 1); } ball(g, q, 1.5, "#a77be0"); }
      else { const R = Math.max(1, 1.7 * q[3]); g.fillStyle = "#a77be0"; g.beginPath(); g.ellipse(q[0], q[1], R, R * 0.45, p.a, 0, 7); g.fill(); g.fillStyle = "rgba(255,255,255,0.35)"; g.beginPath(); g.ellipse(q[0] - R * 0.25, q[1] - R * 0.1, R * 0.4, R * 0.15, p.a, 0, 7); g.fill(); }
    } });
  });
  drawSorted(g, items);
  tube3(g, W, H, k, 16, -30, 30, "rgba(220,214,240,0.7)");
  const sb = s.stir; seg(g, p3([-7 * Math.cos(sb), -28, -7 * Math.sin(sb)], W, H, k), p3([7 * Math.cos(sb), -28, 7 * Math.sin(sb)], W, H, k), "#e6e6ea", 4);
  label3(g, `${AG_PTS.find((x) => x[0] === s.pt)[1]} · ${AG_AGS.find((x) => x[0] === s.ag)[1]}`, 12, 22);
  label3(g, s.t0 == null ? "Stirring PRP at 37 °C, 1000 rpm" : `${Math.min(300, s.t - s.t0).toFixed(0)} s after the agonist`, 12, 40, "#c9d4df");
  chart3(g, W, H, s.trace, { title: "Aggregation % (down = more)", tmax: 300, vmax: 100, down: true });
}
function agHTML() {
  return `<p style="margin:0">Platelet-rich plasma is stirred in a cuvette at 37 °C. Add an agonist: activated platelets change shape, then stick together and the plasma clears, so more light reaches the detector.</p>
    <div class="field"><label for="agP">Patient</label><select id="agP">${AG_PTS.map(([kk, t]) => `<option value="${kk}">${esc(t)}</option>`).join("")}</select></div>
    <div class="field"><label for="agA">Agonist</label><select id="agA">${AG_AGS.map(([kk, t]) => `<option value="${kk}">${esc(t)}</option>`).join("")}</select></div>
    <div class="row"><button class="btn primary" data-ag="go">Add the agonist</button><button class="btn" data-ag="reset">New cuvette</button></div>
    <div class="out" id="o3d">Choose a patient and an agonist, then add it. Drag the picture to turn the cuvette.</div>`;
}

/* ---------- Shell, loop and events ---------- */
const S3_SCENES = { "3dcf": [cfHTML, () => cfInit(), cfStep, cfDraw], "3dcl": [clHTML, () => clInit("norm"), clStep, clDraw], "3dag": [agHTML, () => agInit(), agStep, agDraw] };
function view3D(kind) {
  return `<div class="anim"><div class="odc">
    <div class="svgwrap" style="padding:0;overflow:hidden"><canvas id="c3d" data-kind="${kind}" style="display:block;width:100%;aspect-ratio:4/3;touch-action:none;cursor:grab" role="img" aria-label="3D animation; drag to rotate"></canvas></div>
    <div class="card stack">${S3_SCENES[kind][0]()}
      <div class="row"><button class="btn small" data-s3="pause">${S3.playing ? "Pause" : "Play"}</button><button class="btn small" data-s3="view">Reset view</button></div>
      <p class="note" style="margin:0">Drag the picture to turn it in 3D. Schematic teaching model, not to scale.</p></div></div></div>`;
}
function start3D(kind) {
  cancelAnimationFrame(S3.raf);
  const cv = $("#c3d"); if (!cv) return;
  S3.scene = S3_SCENES[kind][1](); S3.kind = kind;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) S3.playing = false;
  let last = performance.now();
  const frame = (now) => {
    if (!document.body.contains(cv)) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const W = cv.clientWidth, H = cv.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
    if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (S3.playing) { S3_SCENES[S3.kind][2](S3.scene, dt); if (!S3.drag && S3.kind !== "3dcl") S3.cam.yaw += dt * 0.12; }
    S3_SCENES[S3.kind][3](g, W, H, S3.scene);
    S3.raf = requestAnimationFrame(frame);
  };
  S3.raf = requestAnimationFrame(frame);
}
document.addEventListener("pointerdown", (e) => { if (e.target.id === "c3d") { S3.drag = [e.clientX, e.clientY]; e.target.setPointerCapture(e.pointerId); } });
document.addEventListener("pointermove", (e) => {
  if (!S3.drag || e.target.id !== "c3d") return;
  S3.cam.yaw += (e.clientX - S3.drag[0]) * 0.01; S3.cam.pitch = Math.max(-1.2, Math.min(1.2, S3.cam.pitch + (e.clientY - S3.drag[1]) * 0.01));
  S3.drag = [e.clientX, e.clientY];
});
document.addEventListener("pointerup", () => (S3.drag = null));
document.addEventListener("click", (e) => {
  const t = e.target.closest("button"); if (!t || !S3.scene) return;
  const d = t.dataset, s = S3.scene, out = (h) => { const o = $("#o3d"); if (o) o.innerHTML = h; };
  if (d.s3 === "pause") { S3.playing = !S3.playing; t.textContent = S3.playing ? "Pause" : "Play"; }
  if (d.s3 === "view") S3.cam = { yaw: 0.5, pitch: 0.28, dist: 340 };
  if (d.spin) {
    if (d.spin === "reset") { S3.scene = cfInit(); out("A new tube of citrated whole blood."); return; }
    if (d.spin === "again") {
      if (!s.done) { out("Spin the blood first."); return; }
      if (s.g < 1000 && !s.second) { out("Do a hard spin first: double centrifugation means spinning platelet-poor plasma a second time."); return; }
      S3.scene = cfInit(true, cfCount(s)); S3.scene.g = 1500; S3.scene.dur = 15;
      out("The plasma was transferred to a clean tube with a plastic pipette, well above the buffy coat, and spun again at 1500 g. This is the plasma to freeze or use for lupus anticoagulant tests."); return;
    }
    const g0 = +d.spin, fresh = cfInit(); fresh.g = g0; fresh.dur = g0 >= 1000 ? 15 : 10; S3.scene = fresh;
    out(g0 >= 1000 ? "Hard spin: red cells, white cells and most platelets are driven down. The plasma above is platelet-poor: right for PT, APTT and factor assays." : "Soft spin with no brake: red and white cells settle but most platelets stay up. Take the top layer as platelet-rich plasma for aggregometry.");
  }
  if (d.cl === "go") { const key = $("#clS") ? $("#clS").value : "norm"; S3.scene = clInit(key); S3.scene.run = true; out(esc(S3.scene.S[5])); }
  if (d.ag === "reset") { S3.scene = agInit($("#agP").value, $("#agA").value); out("A fresh cuvette of stirred PRP."); }
  if (d.ag === "go") { const fresh = agInit($("#agP").value, $("#agA").value); fresh.rule = agRule(fresh.pt, fresh.ag); fresh.t0 = fresh.t; S3.scene = fresh; out(esc(fresh.rule.txt)); }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "clS") { S3.scene = clInit(e.target.value); const o = $("#o3d"); if (o) o.innerHTML = esc(S3.scene.S[5]); }
  if ((e.target.id === "agP" || e.target.id === "agA") && S3.scene && S3.scene.kind === "ag") S3.scene = agInit($("#agP").value, $("#agA").value);
});
