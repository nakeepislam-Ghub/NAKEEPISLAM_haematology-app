/* Photo helpers. PHOTOS (generated, in photos.js) maps a cell id to an openly
   licensed photomicrograph from Wikimedia Commons with its credit. Cells without a
   photo fall back to the original drawing. */

const LICENCE_URLS = {
  "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC BY-SA 2.5": "https://creativecommons.org/licenses/by-sa/2.5/",
  "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/"
};

function creditHTML(p, short) {
  const lic = LICENCE_URLS[p.licence] ? `<a href="${LICENCE_URLS[p.licence]}" target="_blank" rel="noopener">${esc(p.licence)}</a>` : esc(p.licence);
  const src = `<a href="${esc(p.page)}" target="_blank" rel="noopener">Wikimedia Commons</a>`;
  if (short) return `Photo: ${esc(p.author)} · ${lic}`;
  return `Photo: ${esc(p.author)} · ${lic} · ${src}${p.note ? " · " + esc(p.note) : ""}`;
}

const ATLAS_PHOTO_NOTE = "Photos are from Wikimedia Commons under CC0, public domain, CC BY or CC BY-SA licences; each photo's credit is in its detail panel and on the Sources page. Where no suitable open photo was found, the original drawing is shown and marked “Drawing”. For more photomicrographs, see the textbooks under Further reading in each panel and the online atlases below.";

/* Thumbnail for grids, strips, flashcards and slides. */
function cellPic(id, opts = {}) {
  if (MINE_PREF() && mineFirst(id)) return minePic(id, opts);
  const p = PHOTOS[id];
  if (!p) return `<div class="pic drawn">${cellSVG(id)}<span class="pic-tag">Drawing</span></div>`;
  const alt = opts.credit ? "Photomicrograph to identify" : `Photomicrograph: ${cellById[id].name}`;
  return `<div class="pic"><img src="${p.src}" alt="${esc(alt)}" loading="lazy" decoding="async">${opts.credit ? `<span class="pic-credit">${creditHTML(p, true)}</span>` : ""}</div>`;
}

/* Large photo with full credit line, for the cell detail panel. */
function photoFigure(id) {
  const p = PHOTOS[id];
  if (!p) return "";
  return `<figure class="pic-fig"><div class="figure pic"><img src="${p.src}" alt="${esc(p.alt || "Photomicrograph: " + cellById[id].name)}"></div>
    <figcaption>${p.caption ? esc(p.caption) + "<br>" : ""}${creditHTML(p)}</figcaption></figure>`;
}

/* Which library textbooks to read for more photos of each kind of cell. */
function readingFor(c) {
  if (c.id.startsWith("m3-")) return c.group === "Marrow" ? ["bmd", "hp", "bmp"] : ["bc", "hp", "bmd"];
  if (c.id.startsWith("m2-")) {
    if (c.group === "Marrow") return ["bmd", "bmp", "bc"];
    if (c.group === "Parasites") return ["dl", "bc"];
    return ["bc", "dl", "rbcd"];
  }
  if (c.lineage === "Stromal" || c.lineage === "Other" || c.id === "macrophage") return ["bmd", "bmp", "bmm"];
  if (/Marrow/.test(c.where) && !/^Blood/.test(c.where)) return ["bmd", "bmm", "bc"];
  return ["bc", "atlas", "dl"];
}
function readingHTML(c) {
  const keys = readingFor(c).filter((k) => SOURCES[k]);
  return `<div class="sources"><b>Further reading and more photomicrographs</b><ul>${keys.map((k) => `<li>${esc(SOURCES[k])}</li>`).join("")}
</ul></div>`;
}

/* Full credits list for the Sources page. */
function photoCreditsHTML() {
  const ids = Object.keys(PHOTOS).filter((id) => cellById[id]);
  return `<h2 style="margin-top:22px">Photo credits</h2>
<p>Photomicrographs are from Wikimedia Commons, used under the licence shown. Photos marked “cropped” or “resized” were cut to one cell and scaled for the app; that is the only change. CC BY-SA photos, in their adapted form here, are shared under the same licence.</p>
<ol class="credits">${ids.map((id) => { const p = PHOTOS[id]; return `<li><b>${esc(cellById[id].name)}</b>: “${esc(p.title)}”. ${creditHTML(p)}</li>`; }).join("")}</ol>`;
}
