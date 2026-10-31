/* Draws platelet fields for Module 4 (blood film at ×100). Original drawings; uses helpers from cells.js. */
function drawPlt(c) {
  const id = "p" + (++svgSeq), r = rng(c.id), pk = 9;
  let s = `<svg viewBox="0 0 200 200" class="cellsvg" role="img" aria-label="${c.name}, schematic illustration" xmlns="http://www.w3.org/2000/svg"><title>${c.name}: schematic illustration</title>`;
  s += stainDefs(id, 11) + `<rect width="200" height="200" fill="url(#${id}bg)"/>`;
  const v = c.plt;
  const rbcs = [[30, 30], [110, 22], [192, 38], [70, 98], [150, 104], [22, 172], [108, 176], [192, 170]];
  rbcs.forEach(([x, y], i) => { s += rbcShape(x, y, 3.75 * pk, "#e3a1a6", false, id + "r" + i, r); });
  const plt = (x, y, um, opt = {}) => {
    const rr = (um / 2) * pk;
    let g = `<path d="${blob({ cx: x, cy: y, r: rr, sx: 1.12, sy: 0.88, rot: r() * 180, wobble: 0.14 }, r)}" fill="${opt.grey ? "#d9d3e4" : "#cdb0d8"}" opacity="0.95"/>`;
    const n = opt.grey ? 0 : Math.round(5 + um * 3);
    for (let k = 0; k < n; k++) {
      const t = r() * 6.28, d = r() * rr * 0.5;
      g += `<circle cx="${f1(x + Math.cos(t) * d)}" cy="${f1(y + Math.sin(t) * d)}" r="${f1(0.16 * pk + r() * 0.9)}" fill="#6d2f78" opacity="0.85"/>`;
    }
    return g;
  };
  const free = [[70, 52], [150, 57], [110, 136], [40, 104], [180, 104], [66, 150], [152, 146]];
  if (v === "normal") free.forEach(([x, y]) => (s += plt(x, y, 2 + r() * 1.2)));
  if (v === "low") [[150, 57]].forEach(([x, y]) => (s += plt(x, y, 2.4)));
  if (v === "giant") { s += plt(110, 132, 8.4); s += plt(70, 52, 2.4); s += plt(178, 104, 6.2); }
  if (v === "grey") { s += plt(110, 134, 5.5, { grey: true }); s += plt(150, 57, 4.4, { grey: true }); s += plt(42, 104, 3.4, { grey: true }); }
  if (v === "clump") {
    for (let k = 0; k < 16; k++) { const t = r() * 6.28, d = Math.sqrt(r()) * 20; s += plt(110 + Math.cos(t) * d * 1.3, 136 + Math.sin(t) * d, 2 + r() * 1.4); }
  }
  if (v === "large") { s += plt(70, 54, 4.5); s += plt(150, 58, 5); s += plt(110, 136, 4.4); s += plt(40, 106, 3.8); s += plt(178, 104, 4.2); }
  s += vignette(id) + scaleBar(10, pk);
  return s + "</svg>";
}
