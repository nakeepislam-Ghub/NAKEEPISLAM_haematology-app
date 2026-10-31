/* Draws red cell morphology fields as SVG for the Module 2 atlas. All drawings are original.
   Reuses rng, shade, smoothPath and blob from cells.js. */

const PXU = 8.2; // px per µm in red cell fields
const RBC_R = 3.75 * PXU;
const RBC_COL = "#df949a";

function polarPath(cx, cy, fn, rot = 0, N = 72) {
  const pts = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const r = fn(t);
    const a = t + rot;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return smoothPath(pts);
}

let rbcSeq = 0;
/* One red cell. o: {r, sx, sy, rot, pallor (0..0.8), color, shape, target, slit} */
function rbcCell(cx, cy, o, rand) {
  const id = "rb" + (++rbcSeq);
  const r = o.r || RBC_R, col = o.color || RBC_COL, rot = o.rot ?? rand() * 6.28;
  const sx = o.sx || 1, sy = o.sy || 1;
  let fn;
  if (o.shape === "tear") fn = (t) => { const d = Math.atan2(Math.sin(t), Math.cos(t)); return r * (0.92 + 0.75 * Math.exp(-(d * d) / 0.05)); };
  else if (o.shape === "echino") fn = (t) => r * (1 + 0.07 * Math.pow(Math.max(0, Math.cos(16 * t)), 3));
  else if (o.shape === "acantho") {
    const sp = Array.from({ length: 5 + Math.floor(rand() * 4) }, () => [rand() * 6.28, 0.18 + rand() * 0.28]);
    fn = (t) => r * (1 + sp.reduce((s, [a, h]) => { const d = Math.atan2(Math.sin(t - a), Math.cos(t - a)); return s + h * Math.exp(-(d * d) / 0.006); }, 0));
  } else if (o.shape === "bite") fn = (t) => { const d = Math.atan2(Math.sin(t), Math.cos(t)); return r * (1 - 0.42 * Math.exp(-(d * d) / 0.09)); };
  else fn = (t) => r * (1 + 0.02 * Math.sin(3 * t + rot));
  let path;
  if (o.shape === "sickle") {
    const L = r * 1.9, W = r * 0.55, pts = [];
    for (let i = 0; i <= 24; i++) { const u = -1 + (2 * i) / 24; pts.push([u * L, -W * (1 - u * u) - r * 0.25 * (1 - u * u)]); }
    for (let i = 24; i >= 0; i--) { const u = -1 + (2 * i) / 24; pts.push([u * L * 0.97, W * 0.4 * (1 - u * u) - r * 0.25 * (1 - u * u)]); }
    path = smoothPath(pts.map(([x, y]) => [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]));
  } else if (o.shape === "helmet" || o.shape === "triangle") {
    const pts = o.shape === "helmet"
      ? [[-1, 0.15], [-0.85, -0.45], [-0.35, -0.85], [0.35, -0.85], [0.85, -0.45], [1, 0.15], [0.6, 0.05], [0.2, 0.12], [-0.2, 0.12], [-0.6, 0.05]]
      : [[0, -0.9], [0.18, -0.5], [0.85, 0.55], [0.3, 0.45], [-0.3, 0.5], [-0.8, 0.55], [-0.2, -0.45]];
    path = smoothPath(pts.map(([x, y]) => { const X = x * r * 0.9, Y = y * r * 0.9; return [cx + X * Math.cos(rot) - Y * Math.sin(rot), cy + X * Math.sin(rot) + Y * Math.cos(rot)]; }));
  } else {
    path = polarPath(cx, cy, (t) => fn(t) * (sx * sy) / Math.hypot(sy * Math.cos(t), sx * Math.sin(t)) , rot);
  }
  const pal = o.pallor ?? 0.33;
  let defs = `<radialGradient id="${id}" cx="0.5" cy="0.5" r="0.5">`;
  if (o.target) defs += `<stop offset="0" stop-color="${shade(col, -0.05)}"/><stop offset="0.2" stop-color="${shade(col, -0.05)}"/><stop offset="0.3" stop-color="${shade(col, 0.6)}"/><stop offset="0.5" stop-color="${shade(col, 0.55)}"/><stop offset="0.66" stop-color="${col}"/>`;
  else if (pal > 0) defs += `<stop offset="0" stop-color="${shade(col, 0.66)}"/><stop offset="${(pal * 0.85).toFixed(2)}" stop-color="${shade(col, 0.45)}"/><stop offset="${Math.min(0.95, pal + 0.22).toFixed(2)}" stop-color="${col}"/>`;
  else defs += `<stop offset="0" stop-color="${shade(col, 0.08)}"/>`;
  defs += `<stop offset="0.96" stop-color="${col}"/><stop offset="1" stop-color="${shade(col, -0.14)}"/></radialGradient>`;
  let s = `<defs>${defs}<clipPath id="${id}c"><path d="${path}"/></clipPath></defs><path d="${path}" fill="url(#${id})"/>`;
  if (o.slit) s += `<ellipse cx="${cx}" cy="${cy}" rx="${(r * 0.55).toFixed(1)}" ry="${(r * 0.12).toFixed(1)}" transform="rotate(${((rot * 180) / Math.PI).toFixed(0)} ${cx} ${cy})" fill="${shade(col, 0.7)}"/>`;
  if (o.blister) { const a = rot; s += `<circle cx="${(cx + Math.cos(a) * r * 0.62).toFixed(1)}" cy="${(cy + Math.sin(a) * r * 0.62).toFixed(1)}" r="${(r * 0.46).toFixed(1)}" fill="#f7f0f2" stroke="${shade(col, -0.1)}" stroke-width="1.2"/>`; }
  if (o.inc) s += `<g clip-path="url(#${id}c)">${o.inc(cx, cy, r, rand)}</g>`;
  return s;
}

const dot = (x, y, r, c, op = 1) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${c}" opacity="${op}"/>`;
const INC = {
  hj: (cx, cy, r, rand) => { const a = rand() * 6.28; return dot(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55, r * 0.16, "#3b1650"); },
  stipple: (cx, cy, r, rand) => { let s = ""; for (let i = 0; i < 26; i++) { const a = rand() * 6.28, d = Math.sqrt(rand()) * r * 0.92; s += dot(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 0.9 + rand() * 0.8, "#3d3f97", 0.85); } return s; },
  pappen: (cx, cy, r, rand) => { let s = ""; const a = rand() * 6.28, bx = cx + Math.cos(a) * r * 0.6, by = cy + Math.sin(a) * r * 0.6; for (let i = 0; i < 5; i++) s += dot(bx + (rand() - 0.5) * 7, by + (rand() - 0.5) * 7, 1.2 + rand() * 0.6, "#4b2a6b"); return s; },
  hbh: (cx, cy, r) => { let s = ""; for (let x = -r; x <= r; x += 4.6) for (let y = -r; y <= r; y += 4.6) s += dot(cx + x + (Math.abs(y) % 9 ? 2.3 : 0), cy + y, 1.3, "#1e5f8a", 0.85); return s; },
  heinz: (cx, cy, r, rand) => { let s = ""; const n = 1 + Math.floor(rand() * 2); for (let i = 0; i < n; i++) { const a = rand() * 6.28; s += dot(cx + Math.cos(a) * r * 0.66, cy + Math.sin(a) * r * 0.66, r * 0.17, "#4a2a86"); } return s; },
  malaria: (cx, cy, r, rand) => {
    let s = ""; const n = 1 + Math.floor(rand() * 2.4);
    for (let i = 0; i < n; i++) {
      const a = rand() * 6.28, d = i === 1 ? r * 0.82 : r * rand() * 0.5, x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d, rr = r * 0.2;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="none" stroke="#5f6fc0" stroke-width="1.6"/>`;
      s += dot(x + rr * 0.9, y - rr * 0.4, 1.9, "#7a1d55");
      if (rand() > 0.6) s += dot(x - rr * 0.9, y - rr * 0.3, 1.6, "#7a1d55");
    }
    return s;
  }
};

const FIELD = [[52, 50], [146, 46], [100, 104], [44, 154], [152, 150], [100, 190], [196, 100], [4, 100]];

function rbcField(kind, rand) {
  let s = "", bg = "#f7f0f2";
  const each = (spec) => FIELD.forEach(([x, y], i) => { const o = typeof spec === "function" ? spec(i) : spec; if (o) s += rbcCell(x + (rand() - 0.5) * 10, y + (rand() - 0.5) * 10, o, rand); });
  const normal = { pallor: 0.33 };
  switch (kind) {
    case "normal": each(normal); break;
    case "microhypo": each((i) => i === 6 ? { r: RBC_R * 0.8, sx: 1.7, sy: 0.55, pallor: 0.45, color: "#e6aeb2" } : { r: RBC_R * 0.8, pallor: 0.62, color: "#e6aeb2" }); break;
    case "macro": each((i) => i > 5 ? null : ({ r: RBC_R * 1.1, sx: 1.18, sy: 0.88, pallor: 0.18 })); break;
    case "poly": each((i) => i % 3 === 0 ? { r: RBC_R * 1.12, pallor: 0, color: "#b79bb7" } : normal); break;
    case "dimorphic": each((i) => i % 2 ? { r: RBC_R * 0.82, pallor: 0.62, color: "#ebbbbe" } : normal); break;
    case "sphero": each((i) => i % 3 === 1 ? normal : { r: RBC_R * 0.78, pallor: 0, color: "#cf6f79" }); break;
    case "target": each((i) => i === 5 ? normal : { target: true }); break;
    case "ellipto": each(() => ({ r: RBC_R * 0.82, sx: 1.55, sy: 0.6, pallor: 0.25 })); break;
    case "schisto": each((i) => i === 0 || i === 4 ? { shape: "helmet", pallor: 0 } : i === 2 ? { shape: "triangle", r: RBC_R * 0.8, pallor: 0 } : i === 6 ? { r: RBC_R * 0.6, pallor: 0, color: "#cf6f79" } : normal); break;
    case "sickle": each((i) => i % 2 ? { shape: "sickle", pallor: 0, color: "#d9838b" } : i === 4 ? { target: true } : normal); break;
    case "tear": each((i) => i % 2 === 0 ? { shape: "tear", pallor: 0.25 } : normal); break;
    case "acantho": each((i) => i % 3 === 2 ? normal : { shape: "acantho", r: RBC_R * 0.85, pallor: 0, color: "#d67e88" }); break;
    case "echino": each(() => ({ shape: "echino", pallor: 0.2 })); break;
    case "stomato": each((i) => i === 3 ? normal : { slit: true, pallor: 0 }); break;
    case "bite": each((i) => i % 2 ? { shape: "bite", pallor: 0.2 } : normal); break;
    case "blister": each((i) => i === 2 || i === 0 ? { blister: true, pallor: 0, color: "#d68790" } : normal); break;
    case "hj": each((i) => i === 2 || i === 4 ? { ...normal, inc: INC.hj } : normal); break;
    case "stipple": each((i) => i === 2 || i === 0 ? { ...normal, pallor: 0.15, inc: INC.stipple } : normal); break;
    case "pappen": each((i) => i === 2 || i === 1 ? { ...normal, inc: INC.pappen } : normal); break;
    case "hbh": bg = "#eef5f4"; each((i) => i % 3 === 1 ? { pallor: 0, color: "#a9c8cf" } : { pallor: 0, color: "#a9c8cf", inc: INC.hbh }); break;
    case "heinz": bg = "#eef0f6"; each((i) => ({ pallor: 0, color: "#c9c3dc", inc: i % 2 ? INC.heinz : null })); break;
    case "malaria": each((i) => i % 2 === 0 ? { ...normal, inc: INC.malaria } : normal); break;
    case "rouleaux":
      [[30, 70, 0.3], [40, 150, -0.2]].forEach(([x0, y0, ang]) => { for (let k = 0; k < 9; k++) s += rbcCell(x0 + k * 17 * Math.cos(ang), y0 + k * 17 * Math.sin(ang), { r: RBC_R * 0.95, pallor: 0.12 }, rand); });
      break;
    case "agglut":
      [[70, 70], [140, 140]].forEach(([x0, y0]) => { for (let k = 0; k < 9; k++) { const a = rand() * 6.28, d = rand() * 30; s += rbcCell(x0 + Math.cos(a) * d, y0 + Math.sin(a) * d, { r: RBC_R * 0.92, pallor: 0.1 }, rand); } });
      s += rbcCell(170, 40, normal, rand) + rbcCell(30, 170, normal, rand);
      break;
  }
  return { body: s, bg };
}

function ringSideroblast(rand) {
  // Perls stain: pink counterstain, erythroblast nucleus red, blue iron granules around the nucleus.
  let s = `<rect width="200" height="200" fill="#f6eef0"/>`;
  [[30, 36], [172, 40], [28, 168], [175, 165]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="${RBC_R * 0.8}" fill="#f0d7da"/>`; });
  s += `<circle cx="100" cy="100" r="52" fill="#efd0d6"/>`;
  s += `<path d="${blob({ cx: 100, cy: 100, r: 30, wobble: 0.04 }, rand)}" fill="#b5475f"/>`;
  for (let i = 0; i < 70; i++) s += dot(100 + (rand() - 0.5) * 50, 100 + (rand() - 0.5) * 50, 2 + rand() * 2, "#8f2f48", 0.5);
  for (let i = 0; i < 13; i++) { const a = -0.6 + (i / 13) * 3.9 + (rand() - 0.5) * 0.15, d = 36 + rand() * 4; s += dot(100 + Math.cos(a) * d, 100 + Math.sin(a) * d, 2.6 + rand() * 1.2, "#1f4fb0"); }
  return s + scaleBar(10, 52 * 2 / 12) + "</svg>";
}

function drawMorph(c) {
  const rand = rng(c.id);
  let s = `<svg viewBox="0 0 200 200" class="cellsvg" role="img" aria-label="${c.name}, schematic illustration" xmlns="http://www.w3.org/2000/svg"><title>${c.name}: schematic illustration</title>`;
  if (c.perls) return s + ringSideroblast(rand);
  const f = rbcField(c.kind, rand);
  const vid = "v" + (++svgSeq);
  s += stainDefs(vid, 7) + `<rect width="200" height="200" fill="${f.bg}"/>` + f.body + vignette(vid);
  if (c.stain) s += `<g><rect x="118" y="6" width="76" height="16" rx="3" fill="#ffffff" opacity="0.85"/><text x="156" y="17" font-size="7.5" text-anchor="middle" fill="#2c2337" font-family="sans-serif">${c.stain}</text></g>`;
  return s + scaleBar(5, PXU) + "</svg>";
}
