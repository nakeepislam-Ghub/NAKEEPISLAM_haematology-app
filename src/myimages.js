/* My images: the owner's own pictures (for example figures photographed or
   screenshotted from their textbooks) attached to atlas cells and case studies.
   They are stored only in this browser's IndexedDB on this device and are never
   part of the published site or the repository. A backup file moves them between
   devices. */

const MINE = {}; // target key -> [{ id, target, caption, source, stain, mag, created, url }]
const MINE_PREF = () => { try { return localStorage.getItem("idh:minePrefer") !== "0"; } catch { return true; } };
let mineDB = null;

function mineOpen() {
  if (mineDB) return Promise.resolve(mineDB);
  return new Promise((res, rej) => {
    if (!("indexedDB" in window)) { rej(new Error("This browser cannot store images.")); return; }
    const r = indexedDB.open("idh-mine", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("images", { keyPath: "id" });
    r.onsuccess = () => { mineDB = r.result; res(mineDB); };
    r.onerror = () => rej(r.error);
  });
}
function mineTx(mode, fn) {
  return mineOpen().then((db) => new Promise((res, rej) => {
    const tx = db.transaction("images", mode), st = tx.objectStore("images");
    const out = fn(st);
    tx.oncomplete = () => res(out && "result" in out ? out.result : out);
    tx.onerror = () => rej(tx.error);
  }));
}
function mineAddToMemory(rec) {
  const url = URL.createObjectURL(rec.blob);
  const m = { ...rec, url }; delete m.blob;
  (MINE[rec.target] ||= []).push(m);
  MINE[rec.target].sort((a, b) => a.created - b.created);
}
function mineLoad() {
  return mineTx("readonly", (st) => st.getAll()).then((all) => {
    Object.keys(MINE).forEach((k) => { MINE[k].forEach((m) => URL.revokeObjectURL(m.url)); delete MINE[k]; });
    (all || []).forEach(mineAddToMemory);
  });
}

/* Shrink to at most 1600 px on the long side and re-encode as JPEG. */
function mineShrink(file, max = 1600) {
  return new Promise((res, rej) => {
    const img = new Image(), src = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement("canvas");
      c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(src);
      c.toBlob((b) => (b ? res(b) : rej(new Error("Could not read that image."))), "image/jpeg", 0.88);
    };
    img.onerror = () => { URL.revokeObjectURL(src); rej(new Error("That file is not an image this browser can open.")); };
    img.src = src;
  });
}

async function mineSave(target, files, meta) {
  const added = [];
  for (const f of files) {
    const blob = await mineShrink(f);
    const rec = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7), target, created: Date.now(),
      caption: meta.caption || "", source: meta.source || "", stain: meta.stain || "", mag: meta.mag || "", blob };
    await mineTx("readwrite", (st) => st.put(rec));
    mineAddToMemory(rec); added.push(rec.id);
  }
  navigator.storage?.persist?.().catch(() => {});
  return added;
}
async function mineDelete(id) {
  await mineTx("readwrite", (st) => st.delete(id));
  for (const k of Object.keys(MINE)) {
    const i = MINE[k].findIndex((m) => m.id === id);
    if (i >= 0) { URL.revokeObjectURL(MINE[k][i].url); MINE[k].splice(i, 1); if (!MINE[k].length) delete MINE[k]; }
  }
}
async function mineUpdate(id, meta) {
  const rec = await mineTx("readonly", (st) => st.get(id));
  if (!rec) return;
  Object.assign(rec, meta);
  await mineTx("readwrite", (st) => st.put(rec));
  for (const k of Object.keys(MINE)) { const m = MINE[k].find((x) => x.id === id); if (m) Object.assign(m, meta); }
}

const mineFirst = (target) => (MINE[target] && MINE[target][0]) || null;
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
const mineCount = () => Object.values(MINE).reduce((n, a) => n + a.length, 0);
function mineMetaLine(m) {
  return [m.source, m.stain, m.mag].filter(Boolean).map(esc).join(" · ");
}

/* Thumbnail used by cellPic when the owner has an image for the cell. */
function minePic(id, opts) {
  const m = mineFirst(id);
  const alt = opts.credit ? "Image to identify" : `My image: ${cellById[id].name}`;
  return `<div class="pic"><img src="${m.url}" alt="${esc(alt)}" loading="lazy" decoding="async"><span class="pic-tag mine">Mine</span>${opts.credit && m.source ? `<span class="pic-credit">${esc(m.source)}</span>` : ""}</div>`;
}

/* Gallery plus add form, shown in the cell panel and under each case. */
function mineGalleryHTML(target, label) {
  const list = MINE[target] || [];
  return `<section class="mine" data-mine-target="${esc(target)}" data-mine-label="${esc(label)}">
  <div class="row" style="justify-content:space-between;align-items:baseline"><h3 style="margin:0">My images${list.length ? ` <span class="muted">(${list.length})</span>` : ""}</h3><small class="muted">Saved on this device only</small></div>
  ${list.length ? `<div class="mine-grid">${list.map((m) => `<figure class="mine-fig">
    <a href="${m.url}" target="_blank" rel="noopener" class="figure"><img src="${m.url}" alt="${esc(m.caption || "My image: " + label)}"></a>
    <figcaption>${m.caption ? `<b>${esc(m.caption)}</b><br>` : ""}${mineMetaLine(m)}
      <span class="row" style="gap:6px;margin-top:4px"><button class="btn small" data-mine-edit="${m.id}">Edit</button><button class="btn small" data-mine-del="${m.id}">Delete</button></span></figcaption>
  </figure>`).join("")}</div>` : `<p class="muted" style="margin:6px 0 0">Add your own pictures of ${esc(label)}, for example a photo or screenshot of a textbook figure.</p>`}
  <details class="mine-add"${list.length ? "" : " open"}><summary class="btn small">＋ Add image</summary>
    <div class="mine-form">
      <label class="mine-drop"><input type="file" accept="image/*" multiple data-mine-file>
        <span>Choose images or take a photo</span><small class="muted">You can also paste a screenshot here (Ctrl+V)</small></label>
      <div class="mine-fields">
        <label>Caption<input data-mf="caption" placeholder="e.g. Hypersegmented neutrophil, B12 deficiency"></label>
        <label>Source<input data-mf="source" placeholder="e.g. Dacie & Lewis 12th ed, Fig. 5.42"></label>
        <label>Stain<input data-mf="stain" placeholder="e.g. MGG"></label>
        <label>Magnification<input data-mf="mag" placeholder="e.g. ×100 oil"></label>
      </div>
      <p class="mine-status note" aria-live="polite"></p>
    </div>
  </details>
</section>`;
}

function mineMeta(sec) {
  const meta = {};
  sec.querySelectorAll("[data-mf]").forEach((i) => { meta[i.dataset.mf] = i.value.trim(); });
  return meta;
}
async function mineHandleFiles(sec, files) {
  files = [...files].filter((f) => f.type.startsWith("image/"));
  if (!files.length) return;
  const status = sec.querySelector(".mine-status");
  status.textContent = `Saving ${files.length} image${files.length > 1 ? "s" : ""}…`;
  try {
    await mineSave(sec.dataset.mineTarget, files, mineMeta(sec));
    mineRefresh(sec);
  } catch (err) { status.textContent = err.message || "Could not save the image."; }
}
/* Redraw one gallery in place and any thumbnails behind the open panel. */
function mineRefresh(sec) {
  const t = sec.dataset.mineTarget;
  const open = sec.querySelector("details")?.open;
  if (sec.closest(".drawer")) {
    const div = document.createElement("div");
    div.innerHTML = mineGalleryHTML(t, sec.dataset.mineLabel);
    const fresh = div.firstElementChild;
    if (open && MINE[t]) fresh.querySelector("details").open = false;
    sec.replaceWith(fresh);
  }
  render(true);
}

document.addEventListener("change", (e) => {
  const inp = e.target.closest("[data-mine-file]");
  if (inp) { mineHandleFiles(inp.closest(".mine"), inp.files); inp.value = ""; }
  if (e.target.id === "minePrefer") { try { localStorage.setItem("idh:minePrefer", e.target.checked ? "1" : "0"); } catch {} render(true); }
  if (e.target.id === "mineRestore" && e.target.files[0]) mineRestore(e.target.files[0]);
  if (e.target.id === "mineAddCell" && e.target.value) { openCell(e.target.value); e.target.value = ""; }
});
document.addEventListener("paste", (e) => {
  const sec = document.querySelector(".drawer .mine") || document.querySelector("#view .mine");
  if (!sec) return;
  const files = [...(e.clipboardData?.files || [])];
  if (files.length) { e.preventDefault(); const d = sec.querySelector("details"); if (d) d.open = true; mineHandleFiles(sec, files); }
});
document.addEventListener("dragover", (e) => { if (e.target.closest(".mine")) e.preventDefault(); });
document.addEventListener("drop", (e) => {
  const sec = e.target.closest(".mine");
  if (sec && e.dataTransfer.files.length) { e.preventDefault(); mineHandleFiles(sec, e.dataTransfer.files); }
});
document.addEventListener("click", async (e) => {
  const del = e.target.closest("[data-mine-del]");
  if (del) {
    e.stopPropagation();
    if (!confirm("Delete this image from this device?")) return;
    const sec = del.closest(".mine");
    await mineDelete(del.dataset.mineDel);
    if (sec) mineRefresh(sec); else render(true);
    return;
  }
  const ed = e.target.closest("[data-mine-edit]");
  if (ed) {
    e.stopPropagation();
    const id = ed.dataset.mineEdit;
    const m = Object.values(MINE).flat().find((x) => x.id === id);
    if (!m) return;
    const fig = ed.closest("figure");
    fig.querySelector("figcaption").innerHTML = `<div class="mine-fields">
      ${[["caption", "Caption"], ["source", "Source"], ["stain", "Stain"], ["mag", "Magnification"]].map(([k, t]) => `<label>${t}<input data-mfe="${k}" value="${esc(m[k] || "")}"></label>`).join("")}
    </div><span class="row" style="gap:6px;margin-top:6px"><button class="btn small primary" data-mine-save="${id}">Save</button></span>`;
    return;
  }
  const sv = e.target.closest("[data-mine-save]");
  if (sv) {
    e.stopPropagation();
    const meta = {};
    sv.closest("figure").querySelectorAll("[data-mfe]").forEach((i) => { meta[i.dataset.mfe] = i.value.trim(); });
    await mineUpdate(sv.dataset.mineSave, meta);
    const sec = sv.closest(".mine");
    if (sec) mineRefresh(sec); else render(true);
    return;
  }
  if (e.target.closest("#mineBackup")) { mineBackup(); return; }
});

/* Backup and restore as one JSON file, to move images between phone and computer. */
async function mineBackup() {
  const all = await mineTx("readonly", (st) => st.getAll());
  const toData = (b) => new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(b); });
  const items = [];
  for (const r of all) { const { blob, ...rest } = r; items.push({ ...rest, data: await toData(blob) }); }
  const file = new Blob([JSON.stringify({ app: "idh-my-images", version: 1, items })], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file); a.download = `my-haematology-images-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
async function mineRestore(file) {
  const st = $("#mineRestoreStatus");
  try {
    const j = JSON.parse(await file.text());
    if (j.app !== "idh-my-images" || !Array.isArray(j.items)) throw new Error("This is not a My images backup file.");
    const have = new Set(Object.values(MINE).flat().map((m) => m.id));
    let n = 0;
    for (const it of j.items) {
      if (have.has(it.id)) continue;
      const { data, ...rest } = it;
      const blob = await (await fetch(data)).blob();
      const rec = { ...rest, blob };
      await mineTx("readwrite", (s) => s.put(rec));
      mineAddToMemory(rec); n++;
    }
    render(true);
    const st2 = $("#mineRestoreStatus"); if (st2) st2.textContent = `Restored ${n} image${n === 1 ? "" : "s"}${j.items.length - n ? `; ${j.items.length - n} were already here` : ""}.`;
  } catch (err) { if (st) st.textContent = err.message || "Could not read that file."; }
}

/* The My images page: everything the owner has added, across all modules. */
function viewMine() {
  const targets = Object.keys(MINE);
  const cellT = targets.filter((t) => cellById[t]);
  const caseT = targets.filter((t) => t.startsWith("case:"));
  const allCases = Object.values(MODS).flatMap((m) => m.cases.map((c) => ({ ...c, mod: m })));
  const modOf = (id) => Object.values(MODS).find((m) => m.cells.some((c) => c.id === id));
  const options = Object.values(MODS).map((m) => `<optgroup label="Module ${m.n}">${m.cells.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join("")}</optgroup>`).join("");
  const tile = (t, name, sub, attrs) => `<button ${attrs}><div class="figure"><div class="pic"><img src="${MINE[t][0].url}" alt="" loading="lazy"><span class="pic-tag mine">${MINE[t].length}</span></div></div><b>${esc(name)}</b><small>${esc(sub)}</small></button>`;
  return `<h1>My images</h1>
<p class="muted" style="max-width:66ch">Your own pictures, such as photos or screenshots of figures from your textbooks, attached to atlas cells and case studies. They are kept only in this browser on this device. They are not uploaded and not part of the published app, so they are for your personal study.</p>
<div class="card" style="margin-top:16px;max-width:720px">
  <h3 style="margin-top:0">Add an image</h3>
  <p class="muted" style="margin-top:0">Pick the cell or finding, then add pictures in its panel. For a case, open the case and use <i>My images</i> under the case data.</p>
  <select id="mineAddCell" class="modsel" style="max-width:100%"><option value="">Choose a cell or finding…</option>${options}</select>
  <label class="row" style="margin-top:14px;gap:8px"><input type="checkbox" id="minePrefer" ${MINE_PREF() ? "checked" : ""}> Show my image instead of the built-in picture in the atlas, flashcards and slides</label>
</div>
<div class="section-h"><h2>Atlas cells</h2><span class="muted">${cellT.length ? plural(cellT.reduce((n, t) => n + MINE[t].length, 0), "image") : "None yet"}</span></div>
${cellT.length ? `<div class="atlas">${cellT.map((t) => { const m = modOf(t); return tile(t, cellById[t].name, m ? `Module ${m.n}` : "", `data-cell="${t}"`); }).join("")}</div>` : `<p class="muted">Open any cell in the atlas and use <b>＋ Add image</b>.</p>`}
<div class="section-h"><h2>Case studies</h2><span class="muted">${caseT.length ? plural(caseT.reduce((n, t) => n + MINE[t].length, 0), "image") : "None yet"}</span></div>
${caseT.length ? `<div class="atlas">${caseT.map((t) => { const c = allCases.find((x) => "case:" + x.id === t); return c ? tile(t, c.title, `Module ${c.mod.n}`, `data-mine-case="${c.id}" data-mine-mod="${c.mod.id}"`) : ""; }).join("")}</div>` : `<p class="muted">Open a case and use <b>＋ Add image</b>.</p>`}
<div class="card" style="margin-top:22px;max-width:720px">
  <h3 style="margin-top:0">Backup and move to another device</h3>
  <p class="muted" style="margin-top:0">Images stay on the device where you added them. Save a backup file, then restore it on your phone or another computer. Clearing this browser's site data deletes the images, so keep a backup.</p>
  <div class="row" style="gap:10px;flex-wrap:wrap"><button class="btn" id="mineBackup" ${mineCount() ? "" : "disabled"}>Save backup (${plural(mineCount(), "image")})</button>
  <label class="btn">Restore from backup<input type="file" id="mineRestore" accept="application/json,.json" hidden></label></div>
  <p class="note" id="mineRestoreStatus" aria-live="polite"></p>
</div>`;
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-mine-case]");
  if (!b) return;
  setModule(b.dataset.mineMod);
  cs = { id: b.dataset.mineCase, step: 0, picks: [] };
  location.hash = "cases"; render();
});

mineOpen().then(mineLoad).then(() => { if (mineCount()) render(true); }).catch(() => {});
