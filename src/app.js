/* App logic: routing, views and interactivity. Depends on data.js, m2-data.js, cells.js and rbc.js. */

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const cellById = Object.fromEntries(CELLS.concat(M2_CELLS, M2_NUCLEATED).map((c) => [c.id, c]));
const svgCache = {};
const renderCell = (c) => (c.kind || c.perls ? drawMorph(c) : drawCell(c));
const cellSVG = (id) => (svgCache[id] ||= renderCell(cellById[id]));

const M1_LESSON_CELLS = {
  haematopoiesis: ["myeloblast", "proerythroblast", "megakaryocyte", "small-lymphocyte"],
  erythropoiesis: ["proerythroblast", "basophilic-normoblast", "polychromatic-normoblast", "orthochromatic-normoblast", "reticulocyte", "rbc"],
  granulopoiesis: ["myeloblast", "promyelocyte", "myelocyte", "metamyelocyte", "band", "neutrophil", "eosinophil", "basophil"],
  "monocytes-lymphocytes": ["monocyte", "macrophage", "small-lymphocyte", "lgl", "plasma-cell", "hematogone"],
  megakaryopoiesis: ["megakaryocyte", "platelet"],
  "bone-marrow": ["osteoblast", "osteoclast", "mast-cell", "macrophage", "megakaryocyte", "plasma-cell"],
  "reference-values": ["rbc", "neutrophil", "small-lymphocyte", "monocyte", "eosinophil", "platelet"]
};

/* Calculators, shared between modules. Each reads its inputs and returns the result as HTML. */
const CALCS = {
  retic: { title: "Reticulocyte count and production index", inputs: [["rp", "Retics (%)", 6, 0.1], ["rr", "RBC (×10¹²/L)", 2.8, 0.01], ["rh", "Hct (L/L)", 0.25, 0.01]],
    run: ({ rp, rr, rh }) => {
      if (!(rh > 0)) return null;
      const abs = (rp / 100) * rr * 1000, corr = rp * (rh / 0.45);
      const mf = rh >= 0.4 ? 1 : rh >= 0.3 ? 1.5 : rh >= 0.2 ? 2 : 2.5, rpi = corr / mf;
      return `Absolute <b>${abs.toFixed(0)} × 10⁹/L</b><br>Corrected <b>${corr.toFixed(1)}%</b> · maturation factor <b>${mf}</b><br>RPI <b>${rpi.toFixed(1)}</b>: ${rpi >= 2 ? "adequate marrow response (think haemolysis or bleeding)" : "inadequate response for the degree of anaemia"}`;
    } },
  nrbc: { title: "White count corrected for NRBCs", inputs: [["ww", "WBC (×10⁹/L)", 18, 0.1], ["wn", "NRBC per 100 WBC", 50, 1]],
    run: ({ ww, wn }) => `Corrected WBC <b>${((ww * 100) / (100 + wn)).toFixed(1)} × 10⁹/L</b>` },
  absolute: { title: "Absolute count from a differential", inputs: [["aw", "WBC (×10⁹/L)", 7.5, 0.1], ["ap", "Cell type (%)", 62, 1]],
    run: ({ aw, ap }) => `Absolute count <b>${((aw * ap) / 100).toFixed(2)} × 10⁹/L</b>` },
  me: { title: "Marrow M:E ratio", inputs: [["mm", "All myeloid cells (%)", 60, 1], ["me", "All erythroblasts (%)", 22, 1]],
    run: ({ mm, me }) => { if (!(me > 0)) return null; const r = mm / me; return `M:E ratio <b>${r.toFixed(1)}:1</b> · ${r < 1.5 ? "erythroid predominance (low)" : r > 5 ? "myeloid predominance (high)" : "within the usual range"}`; } },
  mentzer: { title: "Mentzer index", inputs: [["zm", "MCV (fL)", 64, 1], ["zr", "RBC (×10¹²/L)", 5.6, 0.01]],
    run: ({ zm, zr }) => { if (!(zr > 0)) return null; const m = zm / zr; return `Mentzer index <b>${m.toFixed(1)}</b>: ${m < 13 ? "favours thalassaemia trait. Confirm with HPLC (HbA2)." : "favours iron deficiency. Check ferritin."}<br><span class="muted">A screening aid only; mixed states are common.</span>`; } },
  tsat: { title: "Transferrin saturation", inputs: [["ti", "Serum iron (µmol/L)", 6, 0.1], ["tt", "TIBC (µmol/L)", 78, 1], ["tf", "Ferritin (µg/L)", 9, 1]],
    run: ({ ti, tt, tf }) => {
      if (!(tt > 0)) return null;
      const t = (ti / tt) * 100;
      const read = tf < 15 ? "Absent iron stores: iron deficiency." : tf < 30 ? "Probable iron deficiency." : t < 20 && tf <= 100 ? "Possible iron deficiency with inflammation; check CRP and sTfR." : t > 45 ? "High saturation: consider iron overload or sideroblastic anaemia." : "Iron stores adequate.";
      return `TSAT <b>${t.toFixed(0)}%</b><br>${read}`;
    } }
};

const MODS = {
  m1: { id: "m1", n: 1, lessons: LESSONS, lessonCells: M1_LESSON_CELLS, cells: CELLS, facts: FACTS, quiz: QUIZ, cases: CASES,
    hero: ["promyelocyte", "neutrophil", "plasma-cell"], tagline: "From stem cells to reference ranges",
    trees: [{ id: "implausible", title: "Implausible results", intro: "Use this when a result does not fit the patient. Most implausible counts are sample or analyser problems.", nodes: TREE }],
    checklist: { title: "Reading a marrow aspirate", intro: "A systematic order for reporting a marrow aspirate. Tick each step as you go; your ticks are kept on this device.", steps: MARROW_STEPS },
    calcs: ["retic", "nrbc", "absolute", "me"], anims: [["tree", "Haematopoiesis"], ["mat", "Maturation explorer"], ["odc", "Oxygen dissociation curve"]] },
  m2: { id: "m2", n: 2, lessons: M2_LESSONS, lessonCells: M2_LESSON_CELLS, cells: M2_CELLS.concat(M2_NUCLEATED), facts: M2_FACTS, quiz: M2_QUIZ, cases: M2_CASES,
    hero: ["m2-sphero", "m2-sickle", "m2-target"], tagline: "From the anaemia algorithm to marrow failure",
    trees: M2_TREES, checklist: M2_CHECKLIST,
    calcs: ["retic", "mentzer", "tsat", "absolute"], anims: [["globin", "Globin switching"], ["odc", "Oxygen dissociation curve"]] }
};
MODULES.find((m) => m.id === "m2").ready = true;

/* Per-viewer progress, kept in this browser only. */
const store = {
  get(k, d) { try { const v = localStorage.getItem("idh:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("idh:" + k, JSON.stringify(v)); } catch {} }
};
let MOD = MODS[store.get("module", "m1")] || MODS.m1;
const state = {
  lesson: store.get("lesson:" + MOD.id, MOD.lessons[0].id),
  done: new Set(store.get("done", [])),
  known: new Set(store.get("known", [])),
  quizBest: store.get("quizBest:" + MOD.id, null),
  casesDone: new Set(store.get("casesDone", [])),
  atlasFilter: "All",
  practiceTab: "cards",
  deck: "cells",
  workTab: "tree0",
  animTab: MOD.anims[0][0],
  slideLesson: null,
  slideIdx: 0
};
const save = () => {
  store.set("module", MOD.id); store.set("lesson:" + MOD.id, state.lesson); store.set("done", [...state.done]); store.set("known", [...state.known]);
  store.set("quizBest:" + MOD.id, state.quizBest); store.set("casesDone", [...state.casesDone]);
};
function setModule(id) {
  if (!MODS[id] || MOD.id === id) return;
  MOD = MODS[id];
  state.lesson = store.get("lesson:" + id, MOD.lessons[0].id);
  state.quizBest = store.get("quizBest:" + id, null);
  state.atlasFilter = "All"; state.workTab = "tree0"; state.animTab = MOD.anims[0][0];
  state.slideLesson = null; state.slideIdx = 0;
  fc = { cards: [], i: 0, flipped: false }; qz = { i: 0, score: 0, answered: null, order: [] };
  cs = { id: null, step: 0, picks: [] }; tr = { path: ["start"] };
  save();
}
const factKey = (i) => (MOD.id === "m1" ? "fact:" + i : `fact:${MOD.id}:${i}`);
const lineageOf = (c) => c.lineage || c.group;

const ICONS = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  learn: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/><path d="M8 7h7"/>',
  atlas: '<circle cx="12" cy="12" r="8"/><circle cx="10" cy="11" r="3"/><circle cx="15.5" cy="14" r="1"/><circle cx="14" cy="8" r="1"/>',
  practice: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
  cases: '<path d="M9 4h6v3H9z"/><rect x="4" y="6" width="16" height="15" rx="2"/><path d="M8 12h8M8 16h5"/>',
  workups: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 7v10M8 5h3a4 4 0 0 1 4 4v1M8 19h3a4 4 0 0 0 4-4v-1"/>',
  animations: '<polygon points="7,4 20,12 7,20"/>',
  slides: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M12 16v4M8 20h8"/>',
  about: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'
};
const ROUTES = [
  ["home", "Home"], ["learn", "Lessons"], ["atlas", "Atlas"], ["practice", "Flashcards & quiz"], ["cases", "Case studies"],
  ["workups", "Workups"], ["animations", "Animations"], ["slides", "Slides"], ["about", "Sources & install"]
];
const MOBILE = [["home", "Home"], ["learn", "Learn"], ["atlas", "Atlas"], ["practice", "Practise"], ["more", "More"]];
const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k] || ICONS.about}</svg>`;

function renderNav(route) {
  $("#nav").innerHTML = ROUTES.map(([r, t]) => `<a href="#${r}" ${r === route ? 'aria-current="page"' : ""}>${icon(r)}${t}</a>`).join("");
  const moreRoutes = ["cases", "workups", "animations", "slides", "about", "more"];
  $("#tabs").innerHTML = MOBILE.map(([r, t]) => {
    const cur = r === route || (r === "more" && moreRoutes.includes(route));
    return `<a href="#${r}" ${cur ? 'aria-current="page"' : ""}>${icon(r === "more" ? "workups" : r)}${t}</a>`;
  }).join("");
}

/* ---------- Views ---------- */

function viewHome() {
  const doneIn = (m) => m.lessons.filter((l) => state.done.has(l.id)).length;
  const cardTotal = MOD.cells.length + MOD.facts.length;
  const cardPct = Math.round((deckIds("all").filter((k) => state.known.has(k)).length / cardTotal) * 100);
  const casesHere = MOD.cases.filter((c) => state.casesDone.has(c.id)).length;
  const cur = MOD.lessons.find((l) => l.id === state.lesson) || MOD.lessons[0];
  return `
<section class="hero">
  <div class="stack">
    <span class="label">For Clinical Pathology MSc and MD students</span>
    <h1>Interactive Diagnostic Haematology</h1>
    <p class="lede">Learn haematology the way you report it: lessons, a cell atlas, flashcards, cases and step-by-step diagnostic workups. Everything except video links works offline.</p>
    <div class="row"><a class="btn primary" href="#learn" data-lesson="${cur.id}">${doneIn(MOD) ? "Continue" : "Start"} Module ${MOD.n}: ${esc(cur.title)}</a><a class="btn" href="#atlas">Open the atlas</a></div>
  </div>
  <div class="hero-cells">
    ${MOD.hero.map((id) => `<div class="figure">${cellSVG(id)}</div>`).join("")}
  </div>
</section>

<div class="section-h"><h2>Modules</h2><span class="muted">Built in this order</span></div>
<div class="modules">
${MODULES.map((m) => `
  <${m.ready ? `a href="#learn" data-mod="${m.id}"` : "div"} class="card module ${m.ready ? "" : "locked"} ${m.id === MOD.id ? "current" : ""}">
    <span class="n">${m.n}</span>
    <h3>${esc(m.title)}</h3>
    <span class="muted">${esc(m.sub)}</span>
    ${m.ready ? `<div class="stack" style="gap:4px"><div class="bar"><i style="width:${Math.round((doneIn(MODS[m.id]) / MODS[m.id].lessons.length) * 100)}%"></i></div><small class="muted">${doneIn(MODS[m.id])} of ${MODS[m.id].lessons.length} lessons complete${m.id === MOD.id ? " · open now" : ""}</small></div>` : `<span class="tag az">In preparation</span>`}
  </${m.ready ? "a" : "div"}>`).join("")}
</div>

<div class="section-h"><h2>Module ${MOD.n} at a glance</h2></div>
<div class="quick">
  <a href="#learn"><b>${MOD.lessons.length} lessons</b><span>${esc(MOD.tagline)}</span></a>
  <a href="#atlas"><b>${MOD.cells.length} images in the atlas</b><span>${MOD.id === "m1" ? "Features, sizes and look-alikes" : "Red cell shapes, inclusions and marrow clues"}</span></a>
  <a href="#practice"><b>${cardTotal} flashcards</b><span>${cardPct}% marked as known</span></a>
  <a href="#practice" data-tab="quiz"><b>${MOD.quiz.length} MCQs</b><span>${state.quizBest == null ? "Not attempted yet" : `Best score ${state.quizBest} of ${MOD.quiz.length}`}</span></a>
  <a href="#cases"><b>${MOD.cases.length} case studies</b><span>${casesHere} completed</span></a>
  <a href="#workups"><b>Workups and calculators</b><span>${esc(MOD.trees.map((t) => t.title).concat(MOD.checklist.title).join(", "))}</span></a>
  <a href="#animations"><b>${MOD.anims.length} animations</b><span>${esc(MOD.anims.map((a) => a[1]).join(", "))}</span></a>
  <a href="#slides"><b>Slide decks</b><span>Every lesson as a presentation</span></a>
</div>`;
}

function viewLearn() {
  const i = Math.max(0, MOD.lessons.findIndex((l) => l.id === state.lesson));
  const L = MOD.lessons[i];
  const body = L.body.replace(/<table/g, '<div class="tablewrap"><table').replace(/<\/table>/g, "</table></div>");
  const cells = MOD.lessonCells[L.id] || [];
  return `
<div class="learn">
  <nav class="toc" aria-label="Lessons">
    ${MOD.lessons.map((l, k) => `<button data-go-lesson="${l.id}" aria-current="${l.id === L.id}"><span class="tick ${state.done.has(l.id) ? "done" : ""}">${state.done.has(l.id) ? "✓" : k + 1}</span><span>${esc(l.title)}</span></button>`).join("")}
  </nav>
  <article class="reader">
    <span class="label">Lesson ${i + 1} of ${MOD.lessons.length}</span>
    <h1>${esc(L.title)}</h1>
    <div class="meta"><span>About ${L.minutes} minutes</span>
      <a class="btn small" href="#slides" data-slides="${L.id}">${icon("slides")}Present as slides</a>
      <a class="btn small" href="https://www.youtube.com/results?search_query=${encodeURIComponent(L.video)}" target="_blank" rel="noopener">${icon("animations")}Find videos (online)</a>
    </div>
    ${cells.length ? `<div class="strip">${cells.map((c) => `<button data-cell="${c}"><div class="figure">${cellSVG(c)}</div><span>${esc(cellById[c].name)}</span></button>`).join("")}</div>` : ""}
    ${body}
    <div class="keypoints"><h3>Key points</h3><ul>${L.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
    <div class="row">
      <button class="btn ${state.done.has(L.id) ? "" : "primary"}" data-complete="${L.id}">${state.done.has(L.id) ? "✓ Completed" : "Mark lesson complete"}</button>
    </div>
    <div class="sources"><b>Read more in</b><ul>${L.sources.map((s) => `<li>${esc(SOURCES[s])}</li>`).join("")}</ul></div>
    <div class="pager">
      ${i > 0 ? `<button class="btn" data-go-lesson="${MOD.lessons[i - 1].id}">← ${esc(MOD.lessons[i - 1].title)}</button>` : "<span></span>"}
      ${i < MOD.lessons.length - 1 ? `<button class="btn" data-go-lesson="${MOD.lessons[i + 1].id}">${esc(MOD.lessons[i + 1].title)} →</button>` : `<a class="btn primary" href="#practice">Test yourself →</a>`}
    </div>
  </article>
</div>`;
}

function viewAtlas() {
  const groups = ["All", ...new Set(MOD.cells.map(lineageOf))];
  const list = MOD.cells.filter((c) => state.atlasFilter === "All" || lineageOf(c) === state.atlasFilter);
  return `
<h1>${MOD.id === "m1" ? "Cell atlas" : "Red cell morphology atlas"}</h1>
<p class="muted" style="max-width:66ch">${MOD.id === "m1" ? "Original schematic drawings of Romanowsky-stained cells, drawn to scale against the red cells around them. Tap a cell for its features, normal numbers and look-alikes." : "Original schematic drawings of the red cell changes you report on a film, with the marrow and white cell clues that go with them. Tap a picture for what it is, where it is seen, and a reporting tip."}</p>
<div class="filters">${groups.map((g) => `<button class="chip" data-filter="${g}" aria-pressed="${g === state.atlasFilter}">${g}</button>`).join("")}</div>
<div class="atlas">${list.map((c) => `<button data-cell="${c.id}"><div class="figure">${cellSVG(c.id)}</div><b>${esc(c.name)}</b><small>${esc(lineageOf(c))}${c.size ? " · " + esc(c.size) : ""}</small></button>`).join("")}</div>
<p class="note" style="margin-top:18px">Compare these drawings with the photographs in Bain's Blood Cells and the Color Atlas of Hematology in your library.</p>`;
}

function openCell(id) {
  const c = cellById[id];
  const bg = document.createElement("div");
  bg.className = "drawer-bg";
  bg.innerHTML = `<div class="drawer" role="dialog" aria-modal="true" aria-label="${esc(c.name)}">
    <div class="row" style="justify-content:space-between"><span class="tag az">${esc(lineageOf(c))}</span><button class="btn small" data-close>Close</button></div>
    <h2 style="margin-top:12px">${esc(c.name)}</h2>
    <div class="figure">${renderCell(c)}</div>
    ${c.what ? `<dl class="kv">
      <dt>What it is</dt><dd>${esc(c.what)}</dd>
      <dt>Seen in</dt><dd>${esc(c.seen)}</dd>
      <dt>Reporting tip</dt><dd>${esc(c.tip)}</dd>
      ${c.stain ? `<dt>Stain</dt><dd>${esc(c.stain)} (supravital)</dd>` : ""}
    </dl>` : `<dl class="kv">
      <dt>Size</dt><dd class="num">${esc(c.size)}</dd>
      <dt>Found in</dt><dd>${esc(c.where)}</dd>
      <dt>Nucleus</dt><dd>${esc(c.nucleus)}</dd>
      <dt>Cytoplasm</dt><dd>${esc(c.cyto)}</dd>
      <dt>N:C ratio</dt><dd>${esc(c.nc)}</dd>
      <dt>Normal numbers</dt><dd>${esc(c.normal)}</dd>
      <dt>Look-alikes</dt><dd>${esc(c.mimic)}</dd>
    </dl>`}
    <p class="note">Schematic illustration, not a photomicrograph. The scale bar is drawn to the same scale as the cells; normal red cells are about 7.5 µm across.</p>
  </div>`;
  const close = () => { bg.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = (e) => { if (e.key === "Escape") close(); };
  bg.addEventListener("click", (e) => { if (e.target === bg || e.target.closest("[data-close]")) close(); });
  document.addEventListener("keydown", onKey);
  document.body.appendChild(bg);
  $("[data-close]", bg).focus();
}

/* Flashcards */
let fc = { cards: [], i: 0, flipped: false };
function deckIds(deck) {
  const cellIds = MOD.cells.map((c) => "cell:" + c.id), factIds = MOD.facts.map((_, i) => factKey(i));
  return deck === "cells" ? cellIds : deck === "facts" ? factIds : cellIds.concat(factIds);
}
function buildDeck() {
  const cellCards = MOD.cells.map((c) => ({ id: "cell:" + c.id, kind: "cell", cell: c.id, a: c.name, sub: c.what || `${c.size}. ${c.nucleus}.` }));
  const factCards = MOD.facts.map((f, i) => ({ id: factKey(i), kind: "fact", q: f[0], a: f[1] }));
  let cards = state.deck === "cells" ? cellCards : state.deck === "facts" ? factCards : cellCards.concat(factCards);
  const unknown = cards.filter((c) => !state.known.has(c.id));
  if (unknown.length) cards = unknown;
  const r = rng("deck" + Date.now());
  cards = cards.slice().sort(() => r() - 0.5);
  fc = { cards, i: 0, flipped: false };
}
function flashHTML() {
  if (!fc.cards.length) buildDeck();
  const c = fc.cards[fc.i];
  const total = state.deck === "cells" ? MOD.cells.length : state.deck === "facts" ? MOD.facts.length : MOD.cells.length + MOD.facts.length;
  const knownHere = deckIds(state.deck).filter((k) => state.known.has(k)).length;
  const front = c.kind === "cell"
    ? `<span class="label">${MOD.id === "m1" ? "Identify this cell" : "Name this finding"}</span><div class="figure">${cellSVG(c.cell)}</div>`
    : `<span class="label">Question</span><div class="q">${esc(c.q)}</div>`;
  const back = c.kind === "cell"
    ? `<span class="label">Answer</span><div class="q">${esc(c.a)}</div><p>${esc(c.sub)}</p><p class="muted">${esc(cellById[c.cell].mimic || cellById[c.cell].seen)}</p>`
    : `<span class="label">Answer</span><p style="font-size:1.1rem">${esc(c.a)}</p>`;
  return `
<div class="row" style="justify-content:space-between;max-width:560px;margin-top:16px">
  <div class="seg" role="group" aria-label="Deck">${[["cells", "Cell identification"], ["facts", "Facts"], ["all", "Mixed"]].map(([k, t]) => `<button data-deck="${k}" aria-pressed="${state.deck === k}">${t}</button>`).join("")}</div>
  <span class="muted num">${knownHere}/${total} known</span>
</div>
<div class="flash"><div class="flash-inner ${fc.flipped ? "flipped" : ""}" id="flash" tabindex="0" role="button" aria-label="Flip card">
  <div class="face front">${front}<span class="muted" style="font-size:.85rem">Tap to show the answer</span></div>
  <div class="face back">${back}</div>
</div></div>
<div class="row" style="max-width:560px">
  <button class="btn" data-fc="again">Again</button>
  <button class="btn primary" data-fc="known">I knew it</button>
  <span class="muted num" style="margin-left:auto">Card ${fc.i + 1} of ${fc.cards.length}</span>
</div>
<p class="note" style="margin-top:14px">Cards you mark as known are skipped next time. <button class="btn small" data-fc="reset">Reset this deck</button></p>`;
}

/* Quiz */
let qz = { i: 0, score: 0, answered: null, order: [] };
function quizHTML() {
  if (!qz.order.length) { const r = rng("q" + Date.now()); qz.order = MOD.quiz.map((_, i) => i).sort(() => r() - 0.5); }
  if (qz.i >= MOD.quiz.length) {
    return `<div class="quiz card" style="margin-top:16px"><span class="label">Quiz complete</span><h2 style="margin:6px 0">${qz.score} of ${MOD.quiz.length}</h2>
      <p>${qz.score >= 15 ? "Excellent. You are ready for Module 2." : qz.score >= 11 ? "Good. Review the lessons for the questions you missed." : "Go back over the lessons and try again."}</p>
      <button class="btn primary" data-quiz="restart">Try again</button></div>`;
  }
  const Q = MOD.quiz[qz.order[qz.i]];
  return `<div class="quiz" style="margin-top:16px">
  <div class="row" style="justify-content:space-between"><span class="label">Question ${qz.i + 1} of ${MOD.quiz.length}</span><span class="muted num">Score ${qz.score}</span></div>
  <div class="bar" style="margin:8px 0 16px"><i style="width:${(qz.i / MOD.quiz.length) * 100}%"></i></div>
  <p style="font-size:1.12rem;font-weight:600">${esc(Q.q)}</p>
  <div class="opts">${Q.a.map((a, k) => {
    let cls = "";
    if (qz.answered != null) { if (k === Q.c) cls = "right"; else if (k === qz.answered) cls = "wrong"; }
    return `<button class="opt ${cls}" data-ans="${k}" ${qz.answered != null ? "disabled" : ""}><span class="letter">${"ABCD"[k]}</span><span>${esc(a)}</span></button>`;
  }).join("")}</div>
  ${qz.answered != null ? `<div class="explain"><b>${qz.answered === Q.c ? "Correct." : "Not quite."}</b> ${esc(Q.e)}</div><div class="row" style="margin-top:14px"><button class="btn primary" data-quiz="next">${qz.i === MOD.quiz.length - 1 ? "See score" : "Next question"}</button></div>` : ""}
</div>`;
}

function viewPractice() {
  return `<h1>Flashcards and quiz</h1>
<div class="seg" role="group" aria-label="Practice mode" style="margin-top:14px">
  <button data-ptab="cards" aria-pressed="${state.practiceTab === "cards"}">Flashcards</button>
  <button data-ptab="quiz" aria-pressed="${state.practiceTab === "quiz"}">MCQ quiz</button>
</div>
<div id="practiceBody">${state.practiceTab === "cards" ? flashHTML() : quizHTML()}</div>`;
}

/* Cases */
let cs = { id: null, step: 0, picks: [] };
function viewCases() {
  if (!cs.id) {
    return `<h1>Case studies</h1><p class="muted" style="max-width:66ch">Work through each case one decision at a time. Each step explains the reasoning before you move on.</p>
<div class="cases" style="margin-top:18px">${MOD.cases.map((c) => `<button class="card" data-case="${c.id}"><span class="row"><span class="tag">${esc(c.tag)}</span>${state.casesDone.has(c.id) ? '<span class="tag ok">Done</span>' : ""}</span><h3 style="margin:0">${esc(c.title)}</h3><span class="muted">${esc(c.stem.slice(0, 110))}…</span></button>`).join("")}</div>`;
  }
  const C = MOD.cases.find((c) => c.id === cs.id);
  let html = `<button class="btn small" data-case-back>← All cases</button>
<div style="max-width:720px;margin-top:14px"><span class="tag">${esc(C.tag)}</span><h1 style="margin-top:8px">${esc(C.title)}</h1><p>${esc(C.stem)}</p>
<div class="casedata">${C.data.map(([k, v]) => `<div><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join("")}</div>`;
  C.steps.forEach((S, k) => {
    if (k > cs.step) return;
    const pick = cs.picks[k];
    html += `<div class="step"><span class="label">Step ${k + 1} of ${C.steps.length}</span><p style="font-weight:600;font-size:1.06rem">${esc(S.q)}</p><div class="opts">${S.opts.map((o, j) => {
      let cls = "";
      if (pick != null) { if (j === S.c) cls = "right"; else if (j === pick) cls = "wrong"; }
      return `<button class="opt ${cls}" data-cstep="${k}" data-copt="${j}" ${pick != null ? "disabled" : ""}><span class="letter">${"ABCD"[j]}</span><span>${esc(o)}</span></button>`;
    }).join("")}</div>${pick != null ? `<div class="explain">${esc(S.fb)}</div>` : ""}</div>`;
  });
  const finished = cs.picks.length === C.steps.length && cs.picks.every((p) => p != null);
  if (cs.picks[cs.step] != null && cs.step < C.steps.length - 1) html += `<div class="row" style="margin-top:14px"><button class="btn primary" data-cnext>Next step</button></div>`;
  if (finished) html += `<div class="keypoints"><h3>Teaching points</h3><ul>${C.teach.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`;
  return html + "</div>";
}

/* Workups */
let tr = { path: ["start"] };
function treeHTML(T) {
  const nodes = T.nodes;
  const node = nodes[tr.path[tr.path.length - 1]];
  const trail = tr.path.slice(1).map((k) => {
    for (const key in nodes) { const o = nodes[key].opts; if (o) { const f = o.find((x) => x[1] === k); if (f) return f[0]; } }
    return k;
  });
  return `<div class="tree">
  <p class="muted">${esc(T.intro)}</p>
  ${trail.length ? `<div class="trail">${trail.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
  ${node.end ? `<div class="endbox"><span class="label">Conclusion</span><h3>${esc(node.end)}</h3><p style="margin:0">${esc(node.detail)}</p></div>`
    : `<div class="card"><p style="font-weight:600;font-size:1.08rem;margin-top:0">${esc(node.q)}</p><div class="opts">${node.opts.map(([t, k]) => `<button class="opt" data-tnode="${k}"><span class="letter">→</span><span>${esc(t)}</span></button>`).join("")}</div></div>`}
  <div class="row">${tr.path.length > 1 ? `<button class="btn small" data-tback>Back</button><button class="btn small" data-treset>Start again</button>` : ""}</div>
</div>`;
}
const ticksKey = () => (MOD.id === "m1" ? "marrowTicks" : "ticks:" + MOD.id);
function marrowHTML() {
  const ticks = store.get(ticksKey(), []);
  return `<p class="muted" style="max-width:66ch">${esc(MOD.checklist.intro)}</p>
<ol class="checklist">${MOD.checklist.steps.map(([h, t], i) => `<li><label><input type="checkbox" data-mtick="${i}" ${ticks.includes(i) ? "checked" : ""}><div><b>${i + 1}. ${esc(h)}</b><br><span>${esc(t)}</span></div></label></li>`).join("")}</ol>
<div class="row" style="margin-top:12px"><button class="btn small" data-mreset>Clear ticks</button></div>`;
}
function calcHTML() {
  return `<div class="calcs">${MOD.calcs.map((k) => {
    const C = CALCS[k];
    return `<div class="card"><h3 style="margin-top:0">${C.title}</h3><div class="fields">${C.inputs.map(([id, label, v, step]) => `<div class="field"><label for="${id}">${label}</label><input id="${id}" data-calc="${k}" type="number" step="${step}" value="${v}"></div>`).join("")}</div><div class="out" id="out-${k}"></div></div>`;
  }).join("")}</div>
<p class="note">Teaching tools. Check results against your laboratory's methods before using them for a report.</p>`;
}
function runCalcs() {
  MOD.calcs.forEach((k) => {
    const out = $("#out-" + k); if (!out) return;
    const vals = {}; let ok = true;
    CALCS[k].inputs.forEach(([id]) => { vals[id] = parseFloat($("#" + id).value); if (!Number.isFinite(vals[id])) ok = false; });
    const html = ok ? CALCS[k].run(vals) : null;
    out.innerHTML = html || "Enter all values.";
  });
}
function viewWorkups() {
  const tabs = MOD.trees.map((t, i) => ["tree" + i, t.title]).concat([["marrow", MOD.checklist.title], ["calc", "Calculators"]]);
  if (!tabs.some(([k]) => k === state.workTab)) state.workTab = "tree0";
  return `<h1>Workups</h1>
<div class="seg" role="group" aria-label="Workup" style="margin:14px 0 18px">${tabs.map(([k, t]) => `<button data-wtab="${k}" aria-pressed="${state.workTab === k}">${t}</button>`).join("")}</div>
${state.workTab.startsWith("tree") ? treeHTML(MOD.trees[+state.workTab.slice(4)]) : state.workTab === "marrow" ? marrowHTML() : calcHTML()}`;
}

/* Animations */
const TNODES = [
  { id: "hsc", x: 380, y: 40, t: "HSC", c: "#4a3891", lv: 0, info: "Haematopoietic stem cell. CD34+ CD38− CD90+ CD45RA−. Self-renews and gives rise to every blood cell." },
  { id: "mpp", x: 380, y: 110, t: "MPP", c: "#4a3891", lv: 1, p: "hsc", info: "Multipotent progenitor. Has lost long-term self-renewal but can still make all lineages." },
  { id: "cmp", x: 230, y: 190, t: "CMP", c: "#b93a60", lv: 2, p: "mpp", info: "Common myeloid progenitor. Driven by GATA1 towards MEP, or by PU.1 and C/EBPα towards GMP." },
  { id: "clp", x: 590, y: 190, t: "CLP", c: "#2f6fb0", lv: 2, p: "mpp", info: "Common lymphoid progenitor. IL-7 dependent. PAX5 commits to B cells; Notch and GATA3 to T cells." },
  { id: "mep", x: 120, y: 270, t: "MEP", c: "#b93a60", lv: 3, p: "cmp", info: "Megakaryocyte–erythroid progenitor. GATA1 with FOG1, then KLF1 for red cells or FLI1 for megakaryocytes." },
  { id: "gmp", x: 340, y: 270, t: "GMP", c: "#b93a60", lv: 3, p: "cmp", info: "Granulocyte–monocyte progenitor. G-CSF, GM-CSF and M-CSF steer it towards neutrophils or monocytes. Eosinophil and basophil progenitors arise close to this stage, IL-5 driving eosinophils." },
  { id: "rbc", x: 60, y: 365, t: "Red cell", c: "#d06a78", lv: 4, p: "mep", cell: "rbc", info: "BFU-E → CFU-E → erythroblasts → reticulocyte → red cell. Needs EPO, iron, B12 and folate." },
  { id: "plt", x: 175, y: 365, t: "Platelets", c: "#9a6aa6", lv: 4, p: "mep", cell: "megakaryocyte", info: "Megakaryocytes form by endomitosis under TPO and shed platelets into sinusoids." },
  { id: "neut", x: 270, y: 365, t: "Neutrophil", c: "#c28aa8", lv: 4, p: "gmp", cell: "neutrophil", info: "Myeloblast → promyelocyte → myelocyte → metamyelocyte → band → segmented neutrophil." },
  { id: "eos", x: 350, y: 365, t: "Eos / Baso", c: "#e46a3a", lv: 4, p: "gmp", cell: "eosinophil", info: "Eosinophils (IL-5) and basophils (IL-3). Basophils are CD123+ CD203c+." },
  { id: "mono", x: 430, y: 365, t: "Monocyte", c: "#7f84b6", lv: 4, p: "gmp", cell: "monocyte", info: "Monoblast → promonocyte → monocyte → tissue macrophage. Dendritic cells arise close to this branch." },
  { id: "b", x: 530, y: 365, t: "B cell", c: "#2f6fb0", lv: 4, p: "clp", cell: "plasma-cell", info: "Matures in the marrow (hematogones); final stage is the plasma cell." },
  { id: "t", x: 615, y: 365, t: "T cell", c: "#2f6fb0", lv: 4, p: "clp", cell: "small-lymphocyte", info: "Progenitors leave the marrow and mature in the thymus." },
  { id: "nk", x: 700, y: 365, t: "NK cell", c: "#2f6fb0", lv: 4, p: "clp", cell: "lgl", info: "Large granular lymphocytes, CD16+ CD56+ CD3−." }
];
let treeTimer = null, treeLevel = 4;
function treeSVG() {
  const byId = Object.fromEntries(TNODES.map((n) => [n.id, n]));
  let s = `<svg viewBox="0 0 760 420" role="img" aria-label="Haematopoietic tree">`;
  TNODES.forEach((n) => { if (n.p) { const p = byId[n.p]; s += `<path class="tedge ${n.lv > treeLevel ? "hidden" : ""}" d="M${p.x},${p.y + 18} C${p.x},${(p.y + n.y) / 2} ${n.x},${(p.y + n.y) / 2} ${n.x},${n.y - 20}"/>`; } });
  TNODES.forEach((n) => {
    s += `<g class="tnode ${n.lv > treeLevel ? "hidden" : ""}" data-tn="${n.id}" tabindex="0" role="button" aria-label="${n.t}">
      <circle cx="${n.x}" cy="${n.y}" r="${n.lv === 4 ? 20 : 22}" fill="${n.c}" opacity="0.92"/>
      ${n.lv < 4 ? `<text x="${n.x}" y="${n.y + 4}" text-anchor="middle" font-size="12" font-weight="700" style="fill:#fff">${n.t}</text>` : `<circle cx="${n.x}" cy="${n.y}" r="8" fill="#fff" opacity="0.35"/><text x="${n.x}" y="${n.y + 38}" text-anchor="middle" font-size="12" font-weight="600">${n.t}</text>`}
    </g>`;
  });
  return s + `<text x="20" y="410" font-size="11" style="fill:var(--muted)">Myeloid branch in pink, lymphoid in blue. Tap any cell.</text></svg>`;
}
const MAT = {
  erythroid: { ids: ["proerythroblast", "basophilic-normoblast", "polychromatic-normoblast", "orthochromatic-normoblast", "reticulocyte", "rbc"], divides: [true, true, true, false, false, false] },
  granulocytic: { ids: ["myeloblast", "promyelocyte", "myelocyte", "metamyelocyte", "band", "neutrophil"], divides: [true, true, true, false, false, false] }
};
let mat = { line: "erythroid", i: 0, timer: null };
function matPanel() {
  const M = MAT[mat.line], c = cellById[M.ids[mat.i]];
  return `<span class="label">Stage ${mat.i + 1} of ${M.ids.length}</span><h3 style="margin:4px 0 8px">${esc(c.name)}</h3>
  <div class="row" style="margin-bottom:8px"><span class="tag ${M.divides[mat.i] ? "ok" : "az"}">${M.divides[mat.i] ? "Can divide" : "No longer divides"}</span><span class="tag az num">${esc(c.size)}</span></div>
  <dl class="kv"><dt>Nucleus</dt><dd>${esc(c.nucleus)}</dd><dt>Cytoplasm</dt><dd>${esc(c.cyto)}</dd><dt>N:C ratio</dt><dd>${esc(c.nc)}</dd></dl>`;
}
function odcHTML() {
  return `<div class="odc">
  <div class="svgwrap" style="padding:8px"><svg viewBox="0 0 420 300" id="odcsvg" role="img" aria-label="Oxygen dissociation curve" style="min-width:0"></svg></div>
  <div class="card stack">
    <div class="field"><label for="ph">pH <span class="num" id="phv"></span></label><input class="slider" id="ph" type="range" min="7.0" max="7.8" step="0.01" value="7.40"></div>
    <div class="field"><label for="tp">Temperature °C <span class="num" id="tpv"></span></label><input class="slider" id="tp" type="range" min="34" max="42" step="0.1" value="37"></div>
    <div class="field"><label for="bpg">2,3-BPG mmol/L <span class="num" id="bpgv"></span></label><input class="slider" id="bpg" type="range" min="3" max="8" step="0.1" value="5"></div>
    <label class="row" style="gap:8px"><input type="checkbox" id="hbf"> Fetal haemoglobin (HbF)</label>
    <div class="out" id="odcout"></div>
    <button class="btn small" id="odcreset">Reset to normal</button>
    <p class="note" style="margin:0">Teaching model using the Hill equation (n = 2.7). Real curves also depend on CO₂, which acts mainly through pH.</p>
  </div></div>`;
}
function drawODC() {
  const svg = $("#odcsvg"); if (!svg) return;
  const pH = +$("#ph").value, T = +$("#tp").value, B = +$("#bpg").value, F = $("#hbf").checked;
  $("#phv").textContent = pH.toFixed(2); $("#tpv").textContent = T.toFixed(1); $("#bpgv").textContent = B.toFixed(1);
  const base = F ? 19 : 26.6, bpgK = F ? 0.025 : 0.085;
  const p50 = base * Math.pow(10, 0.48 * (7.4 - pH)) * Math.pow(10, 0.024 * (T - 37)) * (1 + bpgK * (B - 5));
  const n = 2.7, S = (p, P = p50) => Math.pow(p, n) / (Math.pow(p, n) + Math.pow(P, n));
  const X = (p) => 46 + (p / 100) * 354, Y = (s) => 262 - s * 240;
  let g = "";
  for (let p = 0; p <= 100; p += 20) g += `<line class="grid" x1="${X(p)}" y1="22" x2="${X(p)}" y2="262"/><text x="${X(p)}" y="278" text-anchor="middle">${p}</text>`;
  for (let s = 0; s <= 1.001; s += 0.25) g += `<line class="grid" x1="46" y1="${Y(s)}" x2="400" y2="${Y(s)}"/><text x="40" y="${Y(s) + 4}" text-anchor="end">${Math.round(s * 100)}</text>`;
  const path = (P) => { let d = ""; for (let p = 0; p <= 100; p += 1) d += (p ? "L" : "M") + X(p).toFixed(1) + "," + Y(S(p, P)).toFixed(1); return d; };
  g += `<path d="${path(26.6)}" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4"/>`;
  g += `<path d="${path(p50)}" fill="none" stroke="var(--eosin)" stroke-width="3"/>`;
  g += `<line x1="${X(p50)}" y1="${Y(0.5)}" x2="${X(p50)}" y2="262" stroke="var(--eosin)" stroke-dasharray="3 3"/><circle cx="${X(p50)}" cy="${Y(0.5)}" r="4.5" fill="var(--eosin)"/>`;
  [40, 100].forEach((p) => { g += `<circle cx="${X(p)}" cy="${Y(S(p))}" r="4" fill="var(--azure)"/>`; });
  g += `<text x="223" y="296" text-anchor="middle">PO₂ (mmHg)</text><text x="12" y="142" text-anchor="middle" transform="rotate(-90 12 142)">Saturation (%)</text>`;
  g += `<text x="${X(62)}" y="${Y(0.55)}" style="fill:var(--muted)">normal</text>`;
  svg.innerHTML = g;
  const unload = (S(100) - S(40)) * 100;
  const shift = p50 > 27.6 ? "Right shift: oxygen is released more easily to tissues." : p50 < 25.6 ? "Left shift: haemoglobin holds oxygen more tightly." : "Close to the normal curve.";
  $("#odcout").innerHTML = `P₅₀ <b>${p50.toFixed(1)} mmHg</b> (${(p50 * 0.1333).toFixed(2)} kPa)<br>Saturation at 100 mmHg <b>${(S(100) * 100).toFixed(0)}%</b>, at 40 mmHg <b>${(S(40) * 100).toFixed(0)}%</b><br>Unloaded between arterial and venous blood <b>${unload.toFixed(0)}%</b><br>${shift}`;
}
/* Globin switching: approximate share of α-like and β-like chain synthesis (teaching model). */
const GLOB = {
  zeta: (t) => 100 / (1 + Math.exp((t - 7) / 1.2)),
  eps: (t) => 100 / (1 + Math.exp((t - 8) / 1.3)),
  beta: (t) => (8 + 89 / (1 + Math.exp(-(t - 44) / 4.5))) * (1 - GLOB.eps(t) / 100),
  delta: (t) => 2.6 / (1 + Math.exp(-(t - 46) / 5)),
  gamma: (t) => Math.max(0, 100 - GLOB.eps(t) - GLOB.beta(t) - GLOB.delta(t)),
  alpha: (t) => 100 - GLOB.zeta(t)
};
const GLOB_LINES = [["zeta", "ζ", "#9a6aa6", "5 4"], ["alpha", "α", "#4a3891", "5 4"], ["eps", "ε", "#e46a3a", ""], ["gamma", "γ", "#b93a60", ""], ["beta", "β", "#2f6fb0", ""], ["delta", "δ", "#23714f", ""]];
function globinHTML() {
  return `<div class="odc">
  <div class="svgwrap" style="padding:8px"><svg viewBox="0 0 440 300" id="globsvg" role="img" aria-label="Globin chain synthesis before and after birth" style="min-width:0"></svg></div>
  <div class="card stack">
    <div class="field"><label for="gt">Age <span class="num" id="gtv"></span></label><input class="slider" id="gt" type="range" min="2" max="92" step="1" value="40"></div>
    <div class="out" id="globout"></div>
    <p class="note" style="margin:0">Dashed lines are α-like chains, solid lines β-like chains. Curves are a smoothed teaching model of the published pattern.</p>
  </div></div>`;
}
function drawGlobin() {
  const svg = $("#globsvg"); if (!svg) return;
  const t = +$("#gt").value;
  const X = (w) => 40 + (w / 92) * 385, Y = (v) => 255 - v * 2.25;
  let g = "";
  for (let v = 0; v <= 100; v += 25) g += `<line class="grid" x1="40" y1="${Y(v)}" x2="425" y2="${Y(v)}"/><text x="34" y="${Y(v) + 4}" text-anchor="end">${v}</text>`;
  [[0, "Conception"], [20, "20 wk"], [40, "Birth"], [66, "6 mo"], [92, "1 yr"]].forEach(([w, l]) => { g += `<line class="grid" x1="${X(w)}" y1="30" x2="${X(w)}" y2="255"/><text x="${X(w)}" y="272" text-anchor="middle">${l}</text>`; });
  g += `<line x1="${X(40)}" y1="30" x2="${X(40)}" y2="255" stroke="var(--muted)" stroke-width="1.5"/>`;
  GLOB_LINES.forEach(([k, lab, col, dash]) => {
    let d = ""; for (let w = 0; w <= 92; w += 1) d += (w ? "L" : "M") + X(w).toFixed(1) + "," + Y(GLOB[k](w)).toFixed(1);
    g += `<path d="${d}" fill="none" stroke="${col}" stroke-width="2.5" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
  });
  [["zeta", 4], ["alpha", 18], ["eps", 3], ["gamma", 26], ["beta", 80], ["delta", 84]].forEach(([k, w]) => {
    const [, lab, col] = GLOB_LINES.find((x) => x[0] === k);
    g += `<text x="${X(w) + 4}" y="${Y(GLOB[k](w)) - 6}" style="fill:${col};font-weight:700;font-size:13px">${lab}</text>`;
  });
  g += `<line x1="${X(t)}" y1="30" x2="${X(t)}" y2="255" stroke="var(--eosin)" stroke-width="2"/>`;
  g += `<text x="12" y="142" text-anchor="middle" transform="rotate(-90 12 142)">% of chain synthesis</text>`;
  svg.innerHTML = g;
  const age = t < 40 ? `${t} weeks of gestation` : t === 40 ? "Birth" : `${Math.round((t - 40) / 4.33)} months after birth`;
  $("#gtv").textContent = age;
  const e = GLOB.eps(t), z = GLOB.zeta(t), a = GLOB.alpha(t), gm = GLOB.gamma(t), b = GLOB.beta(t), dl = GLOB.delta(t);
  const emb = Math.max(e, z);
  const hbF = (gm * a) / 100, hbA = (b * a) / 100, hbA2 = (dl * a) / 100;
  $("#globout").innerHTML = emb > 10
    ? `<b>Embryonic period.</b> The yolk sac makes ζ and ε chains: Hb Gower 1 (ζ₂ε₂), Gower 2 (α₂ε₂) and Portland (ζ₂γ₂).`
    : `HbF (α₂γ₂) <b>${hbF.toFixed(0)}%</b> · HbA (α₂β₂) <b>${hbA.toFixed(0)}%</b> · HbA₂ (α₂δ₂) <b>${hbA2.toFixed(1)}%</b><br>${t < 30 ? "The liver is the main site; γ chains dominate." : t <= 44 ? "The switch from γ to β is under way. HbF is 60–90% at birth." : t < 70 ? "HbF falls quickly. β-thalassaemia major usually presents in this period, as γ chain synthesis falls." : "Close to the adult pattern: HbF under 1–2%, HbA2 2.2–3.5%."}`;
}
function viewAnimations() {
  const tabs = MOD.anims;
  if (!tabs.some(([k]) => k === state.animTab)) state.animTab = tabs[0][0];
  let body = "";
  if (state.animTab === "tree") body = `<div class="anim"><div class="row"><button class="btn primary" id="treePlay">▶ Play the build-up</button><span class="muted">Then tap any cell to read about it.</span></div><div class="svgwrap" id="treeWrap">${treeSVG()}</div><div class="card" id="treeInfo"><b>HSC</b><p style="margin-bottom:0">${TNODES[0].info}</p></div></div>`;
  if (state.animTab === "mat") {
    const M = MAT[mat.line];
    body = `<div class="anim"><div class="seg" role="group" aria-label="Lineage">${[["erythroid", "Erythroid"], ["granulocytic", "Neutrophil"]].map(([k, t]) => `<button data-mline="${k}" aria-pressed="${mat.line === k}">${t}</button>`).join("")}</div>
    <div class="mat"><div><div class="stage figure" id="matStage">${M.ids.map((id, k) => `<div style="opacity:${k === mat.i ? 1 : 0}">${cellSVG(id)}</div>`).join("")}</div></div>
    <div class="stack"><div id="matPanel">${matPanel()}</div>
      <input class="slider" id="matSlider" type="range" min="0" max="${M.ids.length - 1}" step="1" value="${mat.i}" aria-label="Maturation stage">
      <div class="ticks">${M.ids.map((id) => `<span>${esc(cellById[id].name.split(" (")[0].replace("erythroblast", "").replace("Neutrophil ", ""))}</span>`).join("")}</div>
      <div class="row"><button class="btn primary" id="matPlay">${mat.timer ? "❚❚ Pause" : "▶ Play"}</button></div></div></div></div>`;
  }
  if (state.animTab === "odc") body = odcHTML();
  if (state.animTab === "globin") body = globinHTML();
  return `<h1>Animations</h1>
<div class="seg" role="group" aria-label="Animation" style="margin:14px 0 18px">${tabs.map(([k, t]) => `<button data-atab="${k}" aria-pressed="${state.animTab === k}">${t}</button>`).join("")}</div>${body}`;
}
function setMat(i) {
  mat.i = i;
  const st = $("#matStage"); if (!st) return;
  [...st.children].forEach((d, k) => (d.style.opacity = k === i ? 1 : 0));
  $("#matPanel").innerHTML = matPanel();
  $("#matSlider").value = i;
}

/* Slides */
function buildSlides(L) {
  const slides = [];
  slides.push(`<div class="slide title"><span class="kicker" style="color:#f6c1d1">Module ${MOD.n} · Lesson ${MOD.lessons.indexOf(L) + 1}</span><h2>${esc(L.title)}</h2><p>Interactive Diagnostic Haematology</p></div>`);
  const parts = L.body.split(/<h3>/);
  if (parts[0].trim()) slides.push(`<div class="slide"><span class="kicker">Overview</span>${parts[0]}</div>`);
  parts.slice(1).forEach((p) => {
    const [h, rest] = p.split("</h3>");
    slides.push(`<div class="slide"><span class="kicker">${esc(L.title)}</span><h3>${h}</h3>${rest}</div>`);
  });
  const cells = MOD.lessonCells[L.id] || [];
  if (cells.length) slides.push(`<div class="slide"><span class="kicker">Morphology</span><h3>Cells in this lesson</h3><div class="cells">${cells.map((c) => `<div><div class="figure">${cellSVG(c)}</div><small>${esc(cellById[c].name)}</small></div>`).join("")}</div></div>`);
  slides.push(`<div class="slide"><span class="kicker">Summary</span><h3>Key points</h3><ul>${L.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`);
  return slides;
}
function viewSlides() {
  const L = MOD.lessons.find((l) => l.id === (state.slideLesson || state.lesson)) || MOD.lessons[0];
  const slides = buildSlides(L);
  state.slideIdx = Math.min(state.slideIdx, slides.length - 1);
  return `<h1>Slides</h1>
<div class="row" style="margin:14px 0 16px"><div class="field" style="min-width:0;flex:1 1 260px;max-width:420px"><label for="slideSel">Lesson</label><select id="slideSel">${MOD.lessons.map((l) => `<option value="${l.id}" ${l.id === L.id ? "selected" : ""}>${esc(l.title)}</option>`).join("")}</select></div></div>
<div class="deck" id="deck">${slides[state.slideIdx]}
  <div class="deckbar"><div class="row"><button class="btn small" data-sl="-1" ${state.slideIdx === 0 ? "disabled" : ""}>← Previous</button><button class="btn small" data-sl="1" ${state.slideIdx === slides.length - 1 ? "disabled" : ""}>Next →</button></div>
  <span class="num">${state.slideIdx + 1} / ${slides.length}</span><button class="btn small" id="fsBtn">Full screen</button></div>
</div>
<p class="note">Use the arrow keys or swipe to move between slides. Present from a laptop connected to a projector.</p>`;
}

function viewAbout() {
  return `<div class="prose"><h1>Sources and install</h1>
<h2 style="margin-top:22px">Install on your phone</h2>
<ul>
<li><b>Android (Chrome):</b> open the app link, tap the menu (⋮), then <i>Install app</i> or <i>Add to Home screen</i>.</li>
<li><b>iPhone and iPad (Safari):</b> open the link, tap Share, then <i>Add to Home Screen</i>.</li>
<li><b>Computer (Chrome or Edge):</b> click the install icon in the address bar.</li>
</ul>
<p>After the first visit, lessons, atlas, flashcards, quiz, cases, workups, animations and slides all work without internet. Video links need a connection. Your progress is stored on your own device.</p>
<h2 style="margin-top:22px">Content and copyright</h2>
<p>All text in this app is original teaching material written for it. The cell pictures are original schematic drawings, not copies of textbook figures or photographs. Facts and reference ranges were checked against the books below, which you should read for full detail and real photomicrographs.</p>
<ul>${Object.values(SOURCES).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
<p>Reference ranges differ between laboratories, analysers and populations. Always use your own laboratory's ranges for reporting.</p>
<h2 style="margin-top:22px">Coming next</h2>
<ul>${MODULES.filter((m) => !m.ready).map((m) => `<li><b>Module ${m.n}: ${esc(m.title)}.</b> ${esc(m.sub)}.</li>`).join("")}</ul>
<p class="footer-note">Interactive Diagnostic Haematology · Modules 1 and 2 · For education only, not for clinical decision-making.</p></div>`;
}

function viewMore() {
  return `<h1>More</h1><div class="quick" style="margin-top:16px">
  <a href="#cases"><b>Case studies</b><span>${MOD.cases.length} stepwise cases</span></a>
  <a href="#workups"><b>Workups</b><span>Decision tree, marrow checklist, calculators</span></a>
  <a href="#animations"><b>Animations</b><span>Haematopoiesis, maturation, O₂ curve</span></a>
  <a href="#slides"><b>Slides</b><span>Present any lesson</span></a>
  <a href="#about"><b>Sources and install</b><span>Offline use and references</span></a>
</div>`;
}

const VIEWS = { home: viewHome, learn: viewLearn, atlas: viewAtlas, practice: viewPractice, cases: viewCases, workups: viewWorkups, animations: viewAnimations, slides: viewSlides, about: viewAbout, more: viewMore };
const TITLES = Object.fromEntries(ROUTES.concat([["more", "More"]]));

function render(keepScroll) {
  let route = location.hash.replace("#", "");
  if (!VIEWS[route]) route = "home";
  renderNav(route);
  $("#crumb").textContent = `Module ${MOD.n} · ${TITLES[route]}`;
  $("#modSel").value = MOD.id;
  const y = window.scrollY;
  $("#view").innerHTML = VIEWS[route]();
  if (route === "workups" && state.workTab === "calc") runCalcs();
  if (route === "animations" && state.animTab === "odc") drawODC();
  if (route === "animations" && state.animTab === "globin") drawGlobin();
  window.scrollTo(0, keepScroll ? y : 0);
}

/* ---------- Events ---------- */

document.addEventListener("click", (e) => {
  const t = e.target.closest("button, a, [data-tn]");
  if (!t) return;
  const d = t.dataset;
  if (d.mod) { setModule(d.mod); }
  if (d.lesson) { state.lesson = d.lesson; save(); }
  if (d.tab) { state.practiceTab = d.tab; }
  if (d.slides) { state.slideLesson = d.slides; state.slideIdx = 0; }
  if (d.goLesson) { state.lesson = d.goLesson; save(); render(); return; }
  if (d.complete) { state.done.has(d.complete) ? state.done.delete(d.complete) : state.done.add(d.complete); save(); render(true); return; }
  if (d.cell) { openCell(d.cell); return; }
  if (d.filter) { state.atlasFilter = d.filter; render(true); return; }
  if (d.ptab) { state.practiceTab = d.ptab; render(true); return; }
  if (d.deck) { state.deck = d.deck; fc.cards = []; render(true); return; }
  if (d.fc) {
    const c = fc.cards[fc.i];
    if (d.fc === "known") state.known.add(c.id);
    if (d.fc === "reset") { deckIds(state.deck).forEach((k) => state.known.delete(k)); fc.cards = []; }
    else { fc.i = (fc.i + 1) % fc.cards.length; fc.flipped = false; if (d.fc === "known" && fc.i === 0) fc.cards = []; }
    save(); $("#practiceBody").innerHTML = flashHTML(); return;
  }
  if (d.ans) { const Q = MOD.quiz[qz.order[qz.i]]; qz.answered = +d.ans; if (qz.answered === Q.c) qz.score++; $("#practiceBody").innerHTML = quizHTML(); return; }
  if (d.quiz === "next") { qz.i++; qz.answered = null; if (qz.i >= MOD.quiz.length) { state.quizBest = Math.max(state.quizBest || 0, qz.score); save(); } $("#practiceBody").innerHTML = quizHTML(); return; }
  if (d.quiz === "restart") { qz = { i: 0, score: 0, answered: null, order: [] }; $("#practiceBody").innerHTML = quizHTML(); return; }
  if (d.case) { cs = { id: d.case, step: 0, picks: [] }; render(); return; }
  if ("caseBack" in d) { cs = { id: null, step: 0, picks: [] }; render(); return; }
  if (d.cstep != null && d.copt != null) {
    const C = MOD.cases.find((c) => c.id === cs.id);
    cs.picks[+d.cstep] = +d.copt;
    if (cs.picks.length === C.steps.length && cs.picks.every((p) => p != null)) { state.casesDone.add(C.id); save(); }
    render(true); return;
  }
  if ("cnext" in d) { cs.step++; render(true); return; }
  if (d.wtab) { state.workTab = d.wtab; tr.path = ["start"]; render(true); return; }
  if (d.tnode) { tr.path.push(d.tnode); render(true); return; }
  if ("tback" in d) { tr.path.pop(); render(true); return; }
  if ("treset" in d) { tr.path = ["start"]; render(true); return; }
  if ("mreset" in d) { store.set(ticksKey(), []); render(true); return; }
  if (d.atab) { state.animTab = d.atab; clearInterval(mat.timer); mat.timer = null; render(true); return; }
  if (d.mline) { mat.line = d.mline; mat.i = 0; clearInterval(mat.timer); mat.timer = null; render(true); return; }
  if (t.id === "matPlay") {
    if (mat.timer) { clearInterval(mat.timer); mat.timer = null; t.textContent = "▶ Play"; }
    else {
      if (mat.i === MAT[mat.line].ids.length - 1) setMat(0);
      t.textContent = "❚❚ Pause";
      mat.timer = setInterval(() => {
        const n = MAT[mat.line].ids.length;
        if (mat.i >= n - 1) { clearInterval(mat.timer); mat.timer = null; const b = $("#matPlay"); if (b) b.textContent = "▶ Play"; return; }
        setMat(mat.i + 1);
      }, 2200);
    }
    return;
  }
  if (t.id === "treePlay") {
    clearInterval(treeTimer); treeLevel = -1;
    const step = () => {
      treeLevel++;
      document.querySelectorAll("#treeWrap .tnode, #treeWrap .tedge").forEach((el) => {
        const id = el.dataset.tn; let lv;
        if (id) lv = TNODES.find((n) => n.id === id).lv;
        el.classList.toggle("hidden", id ? lv > treeLevel : false);
      });
      const edges = document.querySelectorAll("#treeWrap .tedge");
      TNODES.filter((n) => n.p).forEach((n, k) => edges[k] && edges[k].classList.toggle("hidden", n.lv > treeLevel));
      if (treeLevel >= 4) clearInterval(treeTimer);
    };
    step(); treeTimer = setInterval(step, 900); return;
  }
  const tn = e.target.closest("[data-tn]");
  if (tn) {
    const n = TNODES.find((x) => x.id === tn.dataset.tn);
    $("#treeInfo").innerHTML = `<div class="row" style="align-items:flex-start;gap:14px">${n.cell ? `<div class="figure" style="width:110px;flex:none">${cellSVG(n.cell)}</div>` : ""}<div style="flex:1;min-width:0"><b>${n.t}</b><p style="margin-bottom:0">${n.info}</p></div></div>`;
    return;
  }
  if (t.id === "odcreset") { $("#ph").value = 7.4; $("#tp").value = 37; $("#bpg").value = 5; $("#hbf").checked = false; drawODC(); return; }
  if (d.sl) { state.slideIdx += +d.sl; render(true); return; }
  if (t.id === "fsBtn") { const deck = $("#deck"); (document.fullscreenElement ? document.exitFullscreen() : deck.requestFullscreen?.())?.catch?.(() => {}); return; }
  if (t.id === "installBtn" && deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; t.hidden = true; return; }
  if (t.closest("#results")) { $("#results").hidden = true; $("#q").value = ""; }
});

document.addEventListener("click", (e) => {
  const f = e.target.closest("#flash");
  if (f) { fc.flipped = !fc.flipped; f.classList.toggle("flipped", fc.flipped); }
});

document.addEventListener("input", (e) => {
  const id = e.target.id;
  if (e.target.dataset.calc) runCalcs();
  if (id === "gt") drawGlobin();
  if (["ph", "tp", "bpg", "hbf"].includes(id)) drawODC();
  if (id === "matSlider") { clearInterval(mat.timer); mat.timer = null; const b = $("#matPlay"); if (b) b.textContent = "▶ Play"; setMat(+e.target.value); }
  if (id === "q") search(e.target.value);
});
document.addEventListener("change", (e) => {
  if (e.target.id === "modSel") { setModule(e.target.value); render(); return; }
  if (e.target.id === "slideSel") { state.slideLesson = e.target.value; state.slideIdx = 0; render(true); }
  if (e.target.dataset.mtick != null) {
    const i = +e.target.dataset.mtick; let ticks = store.get(ticksKey(), []);
    ticks = e.target.checked ? [...new Set(ticks.concat(i))] : ticks.filter((x) => x !== i);
    store.set(ticksKey(), ticks);
  }
});
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, select, textarea")) return;
  if (location.hash === "#slides" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
    const n = buildSlides(MOD.lessons.find((l) => l.id === (state.slideLesson || state.lesson)) || MOD.lessons[0]).length;
    const ni = state.slideIdx + (e.key === "ArrowRight" ? 1 : -1);
    if (ni >= 0 && ni < n) { state.slideIdx = ni; const fs = document.fullscreenElement; render(true); if (fs) $("#deck").requestFullscreen?.().catch(() => {}); }
  }
  if ((e.key === "Enter" || e.key === " ") && e.target.id === "flash") { e.preventDefault(); e.target.click(); }
  if ((e.key === "Enter" || e.key === " ") && e.target.closest("[data-tn]")) { e.preventDefault(); e.target.closest("[data-tn]").dispatchEvent(new MouseEvent("click", { bubbles: true })); }
});
let touchX = null;
document.addEventListener("touchstart", (e) => { if (e.target.closest(".slide")) touchX = e.touches[0].clientX; }, { passive: true });
document.addEventListener("touchend", (e) => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX; touchX = null;
  if (Math.abs(dx) > 50) { const b = document.querySelector(`[data-sl="${dx < 0 ? 1 : -1}"]`); if (b && !b.disabled) b.click(); }
});

/* Search across lessons, atlas and flashcards. */
const strip = (h) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const INDEX = Object.values(MODS).flatMap((m) => [
  ...m.lessons.map((l) => ({ kind: `M${m.n} lesson`, title: l.title, text: strip(l.body) + " " + l.points.join(" "), go: () => { setModule(m.id); state.lesson = l.id; save(); location.hash = "learn"; render(); } })),
  ...m.cells.map((c) => ({ kind: `M${m.n} atlas`, title: c.name, text: [c.nucleus, c.cyto, c.mimic, c.what, c.seen, lineageOf(c)].filter(Boolean).join(" "), go: () => openCell(c.id) })),
  ...m.facts.map((f) => ({ kind: `M${m.n} card`, title: f[0], text: f[1], go: null, answer: f[1] }))
]);
function search(q) {
  const box = $("#results");
  q = q.trim().toLowerCase();
  if (q.length < 2) { box.hidden = true; return; }
  const hits = INDEX.map((it) => {
    const tt = it.title.toLowerCase(), tx = it.text.toLowerCase();
    const score = (tt.includes(q) ? 3 : 0) + (tx.includes(q) ? 1 : 0);
    return { it, score, at: tx.indexOf(q) };
  }).filter((h) => h.score).sort((a, b) => b.score - a.score).slice(0, 12);
  box.hidden = false;
  if (!hits.length) { box.innerHTML = `<div style="padding:10px" class="muted">No matches for “${esc(q)}”.</div>`; return; }
  box.innerHTML = hits.map((h, k) => {
    const snip = h.it.answer || (h.at >= 0 ? "…" + h.it.text.slice(Math.max(0, h.at - 40), h.at + 80) + "…" : "");
    return `<a href="javascript:void 0" data-hit="${k}"><span class="tag az">${h.it.kind}</span> <b>${esc(h.it.title)}</b><small>${esc(snip)}</small></a>`;
  }).join("");
  box.querySelectorAll("[data-hit]").forEach((a) => a.addEventListener("click", (ev) => { ev.preventDefault(); const it = hits[+a.dataset.hit].it; box.hidden = true; $("#q").value = ""; if (it.go) it.go(); }));
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("#results").hidden = true; });

/* Online status and install prompt (install works when served from the app's own site). */
function net() { const p = $("#netpill"); p.textContent = navigator.onLine ? "Online" : "Offline: all but videos work"; p.classList.toggle("off", !navigator.onLine); }
window.addEventListener("online", net); window.addEventListener("offline", net);
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredPrompt = e; $("#installBtn").hidden = false; });

window.addEventListener("hashchange", () => render());
net();
render();
