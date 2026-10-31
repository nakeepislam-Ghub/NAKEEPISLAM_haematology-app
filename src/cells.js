/* Draws schematic Romanowsky-stained cells as SVG. All drawings are original.
   Units: one drawing unit = K px; cell parameters in data.js use these units. */

const K = 7;
const C0 = 100;
let svgSeq = 0;

function rng(seed) {
  let a = 0;
  for (const ch of String(seed)) a = (a * 31 + ch.charCodeAt(0)) | 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = amt < 0 ? 0 : 255, p = Math.abs(amt);
  r = Math.round((f - r) * p + r); g = Math.round((f - g) * p + g); b = Math.round((f - b) * p + b);
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

const f1 = (v) => Math.round(v * 10) / 10;

/* Smooth closed path through points (Catmull-Rom converted to cubic Bezier). */
function smoothPath(pts) {
  const n = pts.length;
  let d = `M${f1(pts[0][0])},${f1(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f1(c1[0])},${f1(c1[1])} ${f1(c2[0])},${f1(c2[1])} ${f1(p2[0])},${f1(p2[1])}`;
  }
  return d + "Z";
}

function blob(o, rand) {
  const { cx, cy, r, sx = 1, sy = 1, rot = 0, indent = 0, wobble = 0.03 } = o;
  const N = 36, pts = [];
  const ph1 = rand() * 6.28, ph2 = rand() * 6.28, ph3 = rand() * 6.28;
  const ia = (rot * Math.PI) / 180;
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    let rr = r * (1 + wobble * (Math.sin(3 * t + ph1) * 0.6 + Math.sin(5 * t + ph2) * 0.3 + Math.sin(2 * t + ph3) * 0.4));
    if (indent) {
      let dt = Math.atan2(Math.sin(t), Math.cos(t));
      rr *= 1 - indent * Math.exp(-(dt * dt) / (2 * 0.42 * 0.42));
    }
    const x = rr * Math.cos(t) * sx, y = rr * Math.sin(t) * sy;
    pts.push([cx + x * Math.cos(ia) - y * Math.sin(ia), cy + x * Math.sin(ia) + y * Math.cos(ia)]);
  }
  return smoothPath(pts);
}

/* Inside test for an ellipse, used to place granules and vacuoles. */
function inEllipse(x, y, cx, cy, rx, ry) {
  const dx = (x - cx) / rx, dy = (y - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

function rbcShape(cx, cy, r, color, poly, id, rand) {
  const g = `${id}g${Math.floor(rand() * 1e6)}`;
  const inner = poly ? shade(color, 0.08) : shade(color, 0.62);
  return `<defs><radialGradient id="${g}"><stop offset="0" stop-color="${inner}"/><stop offset="${poly ? 0.5 : 0.38}" stop-color="${poly ? color : shade(color, 0.35)}"/><stop offset="0.92" stop-color="${color}"/><stop offset="1" stop-color="${shade(color, -0.12)}"/></radialGradient></defs>` +
    `<path d="${blob({ cx, cy, r, wobble: 0.025 }, rand)}" fill="url(#${g})"/>`;
}

function backgroundRBCs(rbcR, rand, id, avoidR) {
  let s = "";
  const spots = [[-0.82, -0.8], [0.86, -0.72], [-0.9, 0.78], [0.8, 0.86], [0.02, -1.05], [-1.05, 0.05], [1.05, 0.12]];
  spots.forEach(([fx, fy], i) => {
    const x = C0 + fx * 100 + (rand() - 0.5) * 16, y = C0 + fy * 100 + (rand() - 0.5) * 16;
    const dist = Math.hypot(x - C0, y - C0);
    if (dist < avoidR + rbcR * 0.4) return;
    s += rbcShape(x, y, rbcR, "#e7b0b4", false, id + "b" + i, rand);
  });
  return s;
}

function chromatin(type, shapeBox, base, rand) {
  const { x0, y0, x1, y1 } = shapeBox;
  const w = x1 - x0, h = y1 - y0;
  const dots = [];
  const add = (n, rmin, rmax, col, op) => {
    for (let i = 0; i < n; i++) {
      dots.push(`<circle cx="${f1(x0 + rand() * w)}" cy="${f1(y0 + rand() * h)}" r="${f1((rmin + rand() * (rmax - rmin)) * K)}" fill="${col}" opacity="${op}"/>`);
    }
  };
  const area = (w * h) / (K * K);
  if (type === "fine") { add(area * 5, 0.12, 0.22, shade(base, -0.35), 0.35); add(area * 3, 0.1, 0.2, shade(base, 0.3), 0.3); }
  else if (type === "smooth") { add(area * 2, 0.15, 0.3, shade(base, -0.2), 0.18); }
  else if (type === "medium") { add(area * 2.6, 0.2, 0.36, shade(base, -0.4), 0.4); add(area, 0.15, 0.3, shade(base, 0.3), 0.3); }
  else if (type === "coarse") { add(area * 1.6, 0.3, 0.55, shade(base, -0.45), 0.5); add(area, 0.2, 0.35, shade(base, 0.3), 0.35); }
  else if (type === "clumped") { add(area * 1.2, 0.35, 0.6, shade(base, -0.5), 0.55); add(area * 0.8, 0.18, 0.3, shade(base, 0.25), 0.3); }
  else if (type === "checker") {
    const step = 1.15 * K;
    for (let x = x0; x < x1; x += step) for (let y = y0; y < y1; y += step) {
      dots.push(`<circle cx="${f1(x + (rand() - 0.5) * 3)}" cy="${f1(y + (rand() - 0.5) * 3)}" r="${f1(0.42 * K)}" fill="${shade(base, -0.5)}" opacity="0.7"/>`);
    }
  }
  else if (type === "clockface") {
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rr = Math.min(w, h) / 2;
    for (let i = 0; i < 9; i++) {
      const t = (i / 9) * Math.PI * 2 + rand() * 0.2;
      dots.push(`<circle cx="${f1(cx + Math.cos(t) * rr * 0.72)}" cy="${f1(cy + Math.sin(t) * rr * 0.72)}" r="${f1(rr * 0.24)}" fill="${shade(base, -0.55)}" opacity="0.85"/>`);
    }
    dots.push(`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(rr * 0.26)}" fill="${shade(base, -0.55)}" opacity="0.85"/>`);
  }
  else if (type === "lacy") {
    for (let i = 0; i < area * 2.2; i++) {
      const x = x0 + rand() * w, y = y0 + rand() * h, a = rand() * 6.28, L = (0.5 + rand() * 0.8) * K;
      dots.push(`<path d="M${f1(x)},${f1(y)} q${f1(Math.cos(a + 1) * L / 2)},${f1(Math.sin(a + 1) * L / 2)} ${f1(Math.cos(a) * L)},${f1(Math.sin(a) * L)}" stroke="${shade(base, -0.4)}" stroke-width="${f1(0.16 * K)}" fill="none" opacity="0.55"/>`);
    }
  }
  return dots.join("");
}

/* Builds nucleus geometry: an array of SVG shapes (union) plus extras such as filaments. */
function nucleusGeometry(n, rand) {
  const cx = C0 + (n.dx || 0) * K, cy = C0 + (n.dy || 0) * K;
  const shapes = [], extras = [], centres = [];
  let box;
  if (n.type === "round" || n.type === "oval") {
    const r = n.r * K;
    shapes.push(`<path d="${blob({ cx, cy, r, sx: n.sx || 1, sy: n.sy || 1, wobble: 0.035 }, rand)}"/>`);
    box = { x0: cx - r * 1.2, y0: cy - r * 1.2, x1: cx + r * 1.2, y1: cy + r * 1.2 };
    centres.push([cx, cy, r]);
  } else if (n.type === "kidney") {
    const r = n.r * K;
    shapes.push(`<path d="${blob({ cx, cy, r, sx: 1.12, sy: 0.9, rot: n.rot || 0, indent: n.indent, wobble: n.wobble || 0.04 }, rand)}"/>`);
    box = { x0: cx - r * 1.3, y0: cy - r * 1.3, x1: cx + r * 1.3, y1: cy + r * 1.3 };
    centres.push([cx, cy, r * 0.6]);
  } else if (n.type === "band") {
    const R = n.arc * K, w = n.w * K, a0 = rand() * 6.28, span = 4.2;
    const out = [], inn = [];
    for (let i = 0; i <= 20; i++) {
      const t = a0 - span / 2 + (span * i) / 20;
      const ww = w * (0.92 + 0.12 * Math.sin(i * 1.3));
      out.push([cx + Math.cos(t) * (R + ww / 2), cy + Math.sin(t) * (R + ww / 2)]);
      inn.push([cx + Math.cos(t) * (R - ww / 2), cy + Math.sin(t) * (R - ww / 2)]);
    }
    shapes.push(`<path d="${smoothPath(out.concat(inn.reverse()))}"/>`);
    [a0 - span / 2, a0 + span / 2].forEach((t) => shapes.push(`<circle cx="${f1(cx + Math.cos(t) * R)}" cy="${f1(cy + Math.sin(t) * R)}" r="${f1(w / 2)}"/>`));
    box = { x0: cx - R - w, y0: cy - R - w, x1: cx + R + w, y1: cy + R + w };
    centres.push([cx, cy, R]);
  } else if (n.type === "lobes" || n.type === "mega") {
    const count = n.n, lr = n.lr * K, sp = n.spread * K;
    const pts = [];
    if (n.type === "lobes") {
      const a0 = rand() * 6.28, span = count === 2 ? 2.2 : 3.6;
      for (let i = 0; i < count; i++) {
        const t = a0 + (count === 1 ? 0 : -span / 2 + (span * i) / (count - 1));
        pts.push([cx + Math.cos(t) * sp, cy + Math.sin(t) * sp, lr * (0.85 + rand() * 0.3)]);
      }
      for (let i = 0; i < pts.length - 1; i++) {
        extras.push(`<line x1="${f1(pts[i][0])}" y1="${f1(pts[i][1])}" x2="${f1(pts[i + 1][0])}" y2="${f1(pts[i + 1][1])}" stroke="NUC" stroke-width="${f1(0.28 * K)}" stroke-linecap="round"/>`);
      }
      pts.forEach((p) => shapes.push(`<path d="${blob({ cx: p[0], cy: p[1], r: p[2], sx: 1.1, sy: 0.88, rot: rand() * 180, wobble: 0.06 }, rand)}"/>`));
    } else {
      for (let i = 0; i < count; i++) {
        const t = rand() * 6.28, d = Math.sqrt(rand()) * sp;
        pts.push([cx + Math.cos(t) * d, cy + Math.sin(t) * d, lr * (0.75 + rand() * 0.45)]);
      }
      pts.forEach((p) => shapes.push(`<path d="${blob({ cx: p[0], cy: p[1], r: p[2], wobble: 0.1 }, rand)}"/>`));
    }
    box = { x0: cx - sp - lr * 1.5, y0: cy - sp - lr * 1.5, x1: cx + sp + lr * 1.5, y1: cy + sp + lr * 1.5 };
    pts.forEach((p) => centres.push(p));
  } else if (n.type === "flower") {
    const lr = n.lr * K, sp = n.spread * K, pts = [], a0 = rand() * 6.28;
    shapes.push(`<path d="${blob({ cx, cy, r: sp * 0.9, wobble: 0.08 }, rand)}"/>`);
    for (let i = 0; i < n.n; i++) {
      const t = a0 + (i / n.n) * Math.PI * 2 + (rand() - 0.5) * 0.3;
      pts.push([cx + Math.cos(t) * sp, cy + Math.sin(t) * sp, lr * (0.85 + rand() * 0.3)]);
    }
    pts.forEach((p) => shapes.push(`<path d="${blob({ cx: p[0], cy: p[1], r: p[2], sx: 1.15, sy: 0.85, rot: rand() * 180, wobble: 0.08 }, rand)}"/>`));
    box = { x0: cx - sp - lr * 1.5, y0: cy - sp - lr * 1.5, x1: cx + sp + lr * 1.5, y1: cy + sp + lr * 1.5 };
    centres.push([cx, cy, sp]); pts.forEach((p) => centres.push(p));
  } else if (n.type === "multi") {
    const r = n.r * K, sp = n.spread * K, pts = [];
    let guard = 0;
    while (pts.length < n.n && guard++ < 400) {
      const t = rand() * 6.28, d = Math.sqrt(rand()) * sp;
      const p = [cx + Math.cos(t) * d, cy + Math.sin(t) * d, r * (0.9 + rand() * 0.2)];
      if (pts.every((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) > (q[2] + p[2]) * 1.15)) pts.push(p);
    }
    pts.forEach((p) => shapes.push(`<path d="${blob({ cx: p[0], cy: p[1], r: p[2], sx: 1.1, sy: 0.9, rot: rand() * 180 }, rand)}"/>`));
    box = { x0: cx - sp - r * 2, y0: cy - sp - r * 2, x1: cx + sp + r * 2, y1: cy + sp + r * 2 };
    pts.forEach((p) => centres.push(p));
  }
  return { shapes, extras, centres, box, cx, cy };
}

function nearNucleus(x, y, centres, pad) {
  return centres.some(([cx, cy, r]) => Math.hypot(x - cx, y - cy) < r + pad);
}

function drawCell(cell, opts = {}) {
  const id = "c" + (++svgSeq);
  const rand = rng(cell.id + (opts.seed || ""));
  const d = cell.draw;
  const label = opts.label === false ? "" : `<title>${cell.name}: schematic illustration</title>`;
  let s = `<svg viewBox="0 0 200 200" class="cellsvg" role="img" aria-label="${cell.name}, schematic illustration" xmlns="http://www.w3.org/2000/svg">${label}`;
  s += stainDefs(id, Math.floor(rand() * 900) + 1) + `<rect width="200" height="200" fill="url(#${id}bg)"/>`;

  if (d.plateletField) {
    const pk = 14; // px per µm in this zoomed field
    const r2 = rng(cell.id + "f");
    [[38, 40], [150, 30], [100, 104], [36, 160], [168, 150], [120, 196], [-10, 96], [212, 92]].forEach(([x, y], i) => {
      s += rbcShape(x, y, 3.75 * pk, "#e3a1a6", false, id + "p" + i, r2);
    });
    [[96, 40], [62, 96], [150, 88], [94, 160], [182, 196], [20, 120], [140, 136], [58, 6]].forEach(([x, y], i) => {
      const r = (1.0 + r2() * 0.5) * pk;
      s += `<path d="${blob({ cx: x, cy: y, r, sx: 1.15, sy: 0.85, rot: r2() * 180, wobble: 0.12 }, r2)}" fill="#cdb0d8"/>`;
      for (let g = 0; g < 7; g++) {
        const t = r2() * 6.28, dd = r2() * r * 0.45;
        s += `<circle cx="${f1(x + Math.cos(t) * dd)}" cy="${f1(y + Math.sin(t) * dd)}" r="${f1(0.18 * pk + r2())}" fill="#6d2f78" opacity="0.85"/>`;
      }
    });
    s += vignette(id) + scaleBar(5, pk);
    return s + "</svg>";
  }

  const pxPerUm = (K * 2 * (d.r || 3.8)) / cell.sizeUm;
  const R = (d.r || 3.8) * K;

  s += `<g filter="url(#${id}fb)" opacity="0.92">${backgroundRBCs(3.75 * pxPerUm, rand, id, R * Math.max(d.sx || 1, 1))}</g>`;

  if (d.smudge) {
    // A crushed cell: bare, smeared nuclear chromatin with no cytoplasm.
    s += `<path d="${blob({ cx: C0, cy: C0, r: R, sx: 1.15, sy: 0.9, rot: rand() * 180, wobble: 0.22 }, rand)}" fill="#a98cc2" opacity="0.75"/>`;
    for (let i = 0; i < 26; i++) {
      const t = rand() * 6.28, r0 = R * rand() * 0.5, L = R * (0.4 + rand() * 0.7);
      s += `<path d="M${f1(C0 + Math.cos(t) * r0)},${f1(C0 + Math.sin(t) * r0)} q${f1(Math.cos(t + 0.5) * L / 2)},${f1(Math.sin(t + 0.5) * L / 2)} ${f1(Math.cos(t) * L)},${f1(Math.sin(t) * L)}" stroke="#5d3a80" stroke-width="${f1(0.15 * K + rand() * 0.8)}" fill="none" opacity="0.55"/>`;
    }
    s += `<path d="${blob({ cx: C0 + (rand() - 0.5) * 8, cy: C0 + (rand() - 0.5) * 8, r: R * 0.45, wobble: 0.25 }, rand)}" fill="#5b3a7e" opacity="0.6"/>`;
    s += vignette(id) + scaleBar(10, pxPerUm);
    return s + "</svg>";
  }

  if (d.rbc) {
    s += rbcShape(C0, C0, R, d.cyto, d.rbc === "poly", id, rand);
    s += vignette(id) + scaleBar(pxPerUm * 10 > 90 ? 5 : 10, pxPerUm);
    return s + "</svg>";
  }

  const cytoPath = blob({ cx: C0, cy: C0, r: R, sx: d.sx || 1, sy: d.sy || 1, rot: (rand() - 0.5) * 30, wobble: d.irregular || 0.025 }, rand);
  const gid = id + "cg";
  s += `<defs><radialGradient id="${gid}" cx="0.5" cy="0.5" r="0.55"><stop offset="0" stop-color="${shade(d.cyto, 0.12)}"/><stop offset="0.85" stop-color="${d.cyto}"/><stop offset="1" stop-color="${shade(d.cyto, -0.15)}"/></radialGradient>`;
  s += `<clipPath id="${id}cc"><path d="${cytoPath}"/></clipPath></defs>`;

  if (d.plts) {
    for (let i = 0; i < 9; i++) {
      const t = rand() * 6.28;
      s += `<path d="${blob({ cx: C0 + Math.cos(t) * R * 1.02, cy: C0 + Math.sin(t) * R * 1.02, r: 4 + rand() * 3, wobble: 0.15 }, rand)}" fill="${shade(d.cyto, -0.08)}"/>`;
    }
  }
  if (d.blebs) {
    for (let i = 0; i < 3; i++) {
      const t = rand() * 6.28;
      s += `<circle cx="${f1(C0 + Math.cos(t) * R * 0.98)}" cy="${f1(C0 + Math.sin(t) * R * 0.98)}" r="${f1(R * (0.12 + rand() * 0.08))}" fill="${d.cyto}"/>`;
    }
  }
  const projections = (n, from, span, len, w) => {
    let g = "";
    for (let i = 0; i < n; i++) {
      const t = from + (rand() - 0.5) * span, L = R * len * (0.6 + rand() * 0.8), bend = (rand() - 0.5) * 0.9;
      const x0 = C0 + Math.cos(t) * R * 0.85 * (d.sx || 1), y0 = C0 + Math.sin(t) * R * 0.85 * (d.sy || 1);
      g += `<path d="M${f1(x0)},${f1(y0)} q${f1(Math.cos(t + bend) * L * 0.6)},${f1(Math.sin(t + bend) * L * 0.6)} ${f1(Math.cos(t) * L * 1.1)},${f1(Math.sin(t) * L * 1.1)}" stroke="${d.cyto}" stroke-width="${f1(w * (0.6 + rand() * 0.6))}" stroke-linecap="round" fill="none"/>`;
    }
    return g;
  };
  if (d.hairs) s += projections(d.hairs, 0, Math.PI * 2, 0.32, 0.25 * K);
  if (d.villi) { const a = rand() * 6.28; s += projections(d.villi, a, 1.1, 0.2, 0.32 * K) + projections(Math.ceil(d.villi / 2), a + Math.PI, 0.9, 0.18, 0.32 * K); }
  s += `<path d="${cytoPath}" fill="url(#${gid})" filter="url(#${id}fc)"/>`;

  const nuc = d.nuc;
  const geo = nucleusGeometry(nuc, rand);
  const nucColor = d.chrom === "pyknotic" ? "#2a1238" : d.chrom === "fine" || d.chrom === "smooth" ? "#6a4790" : d.chrom === "lacy" ? "#7a5a9c" : "#4f2b6c";

  s += `<g clip-path="url(#${id}cc)">`;
  if (d.halo) s += `<circle cx="${f1(geo.cx)}" cy="${f1(geo.cy)}" r="${f1(nuc.r * K * 1.28)}" fill="${shade(d.cyto, 0.32)}" opacity="0.55"/>`;
  if (d.hof) {
    const vx = C0 - geo.cx, vy = C0 - geo.cy, L = Math.hypot(vx, vy) || 1;
    const off = (nuc.r || 3) * K * 0.95;
    const hx = d.hofFar ? C0 + (vx / L) * R * 0.2 : geo.cx + (vx / L) * off;
    const hy = d.hofFar ? C0 + (vy / L) * R * 0.2 : geo.cy + (vy / L) * off;
    const hr = (nuc.r || 3) * K * (d.hofStrong ? 0.75 : 0.6);
    s += `<ellipse cx="${f1(hx)}" cy="${f1(hy)}" rx="${f1(hr)}" ry="${f1(hr * 0.75)}" transform="rotate(${f1((Math.atan2(vy, vx) * 180) / Math.PI + 90)} ${f1(hx)} ${f1(hy)})" fill="#ffffff" opacity="${d.hofStrong ? 0.5 : 0.35}"/>`;
  }
  // granules under the nucleus layer
  const gran = d.gran;
  const granDots = (over) => {
    let g = "";
    if (!gran || !!gran.over !== over) return g;
    const rx = R * (d.sx || 1) * 0.93, ry = R * (d.sy || 1) * 0.93;
    let placed = 0, guard = 0;
    while (placed < gran.n && guard++ < gran.n * 20) {
      const x = C0 + (rand() * 2 - 1) * rx, y = C0 + (rand() * 2 - 1) * ry;
      if (!inEllipse(x, y, C0, C0, rx, ry)) continue;
      if (!gran.over && nearNucleus(x, y, geo.centres, 3)) continue;
      const gr = gran.s * K * (0.7 + rand() * 0.6);
      g += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(gr)}" fill="${gran.color}" opacity="${f1(0.75 + rand() * 0.25)}"/>`;
      placed++;
    }
    return g;
  };
  s += granDots(false);
  if (d.vac) {
    const rx = R * (d.sx || 1) * 0.85, ry = R * (d.sy || 1) * 0.85;
    let placed = 0, guard = 0;
    while (placed < d.vac && guard++ < 300) {
      const x = C0 + (rand() * 2 - 1) * rx, y = C0 + (rand() * 2 - 1) * ry;
      if (!inEllipse(x, y, C0, C0, rx, ry) || nearNucleus(x, y, geo.centres, 6)) continue;
      const vr = (0.35 + rand() * 0.55) * K;
      s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(vr)}" fill="#fbf7f8" stroke="${shade(d.cyto, -0.2)}" stroke-width="0.6" opacity="0.92"/>`;
      placed++;
    }
  }
  if (d.debris) {
    for (let i = 0; i < d.debris; i++) {
      const t = rand() * 6.28, dd = R * (0.2 + rand() * 0.6);
      const x = C0 + Math.cos(t) * dd, y = C0 + Math.sin(t) * dd;
      if (nearNucleus(x, y, geo.centres, 4)) continue;
      s += `<path d="${blob({ cx: x, cy: y, r: (0.4 + rand() * 0.6) * K, wobble: 0.2 }, rand)}" fill="${i % 2 ? "#8a6a2e" : "#3e5b9e"}" opacity="0.8"/>`;
    }
  }
  if (d.dohle) {
    for (let i = 0; i < d.dohle; i++) {
      const t = rand() * 6.28;
      s += `<path d="${blob({ cx: C0 + Math.cos(t) * R * 0.78, cy: C0 + Math.sin(t) * R * 0.78, r: 0.9 * K, sx: 1.4, sy: 0.7, rot: (t * 180) / Math.PI + 90, wobble: 0.15 }, rand)}" fill="#7f9ccc" opacity="0.75"/>`;
    }
  }
  s += `</g>`;

  // nucleus with chromatin texture
  const nclip = id + "nc";
  s += `<defs><clipPath id="${nclip}">${geo.shapes.join("")}</clipPath></defs>`;
  s += geo.extras.join("").replace(/NUC/g, shade(nucColor, -0.1));
  s += `<g filter="url(#${id}fn)"><g clip-path="url(#${nclip})"><rect x="${f1(geo.box.x0)}" y="${f1(geo.box.y0)}" width="${f1(geo.box.x1 - geo.box.x0)}" height="${f1(geo.box.y1 - geo.box.y0)}" fill="${nucColor}"/>`;
  s += chromatin(d.chrom, geo.box, nucColor, rand);
  if (d.grooves) {
    const [gx, gy, gr] = geo.centres[0];
    for (let i = 0; i < d.grooves; i++) {
      const t = rand() * 6.28, off = (rand() - 0.5) * gr * 0.9, L = gr * (d.grooves === 1 ? 1.5 : 0.9 + rand() * 0.6);
      const px = gx + Math.cos(t + 1.57) * off, py = gy + Math.sin(t + 1.57) * off;
      s += `<path d="M${f1(px - Math.cos(t) * L / 2)},${f1(py - Math.sin(t) * L / 2)} q${f1(Math.cos(t + 1.57) * gr * 0.25 + Math.cos(t) * L / 2)},${f1(Math.sin(t + 1.57) * gr * 0.25 + Math.sin(t) * L / 2)} ${f1(Math.cos(t) * L)},${f1(Math.sin(t) * L)}" stroke="${shade(d.cyto, 0.15)}" stroke-width="${f1(0.22 * K)}" fill="none" opacity="0.85" stroke-linecap="round"/>`;
    }
  }
  if (d.nucleoli) {
    const list = nuc.type === "multi" ? geo.centres : geo.centres.slice(0, 1);
    list.forEach(([cx, cy, r]) => {
      const count = nuc.type === "multi" ? 1 : d.nucleoli;
      for (let i = 0; i < count; i++) {
        const t = rand() * 6.28, dd = r * (count === 1 ? 0.2 : 0.42) * rand();
        const nr = (nuc.type === "multi" ? 0.3 : 0.55 + rand() * 0.3) * K;
        s += `<circle cx="${f1(cx + Math.cos(t) * dd + (i - count / 2) * r * 0.35)}" cy="${f1(cy + Math.sin(t) * dd)}" r="${f1(nr)}" fill="#a9acd8" stroke="#4d3473" stroke-width="0.7" opacity="0.9"/>`;
      }
    });
  }
  s += `</g></g>`;
  s += granDots(true);
  if (d.satellites) {
    for (let i = 0; i < d.satellites; i++) {
      const t = (i / d.satellites) * 6.28 + rand() * 0.3, rr = (1 + rand() * 0.4) * pxPerUm, dd = R * 1.02 + rr * 0.9;
      s += `<path d="${blob({ cx: C0 + Math.cos(t) * dd, cy: C0 + Math.sin(t) * dd, r: rr, sx: 1.15, sy: 0.85, rot: rand() * 180, wobble: 0.14 }, rand)}" fill="#cdb0d8"/>`;
      for (let g = 0; g < 4; g++) s += `<circle cx="${f1(C0 + Math.cos(t) * dd + (rand() - 0.5) * rr)}" cy="${f1(C0 + Math.sin(t) * dd + (rand() - 0.5) * rr)}" r="${f1(0.18 * pxPerUm + 0.4)}" fill="#6d2f78" opacity="0.85"/>`;
    }
  }
  s += vignette(id);
  if (d.auer) {
    const rx = R * (d.sx || 1) * 0.8, ry = R * (d.sy || 1) * 0.8;
    const n = d.auer.faggot ? 14 : d.auer.n || 1;
    const fx = C0 + (rand() - 0.5) * rx, fy = C0 + (rand() - 0.5) * ry;
    let placed = 0, guard = 0;
    while (placed < n && guard++ < 400) {
      const x = d.auer.faggot ? fx + (rand() - 0.5) * K * 3 : C0 + (rand() * 2 - 1) * rx;
      const y = d.auer.faggot ? fy + (rand() - 0.5) * K * 3 : C0 + (rand() * 2 - 1) * ry;
      if (!inEllipse(x, y, C0, C0, rx, ry) || nearNucleus(x, y, geo.centres, 0.6 * K)) continue;
      const a = d.auer.faggot ? (placed % 2 ? 0.5 : -0.4) + rand() * 0.3 : rand() * 3.14, L = (d.auer.faggot ? 2.2 : 2.8 + rand()) * K / 2;
      s += `<line x1="${f1(x - Math.cos(a) * L)}" y1="${f1(y - Math.sin(a) * L)}" x2="${f1(x + Math.cos(a) * L)}" y2="${f1(y + Math.sin(a) * L)}" stroke="#a3174a" stroke-width="${f1(0.24 * K)}" stroke-linecap="round" opacity="0.92"/>`;
      placed++;
    }
  }
  s += scaleBar(pxPerUm * 10 > 95 ? 5 : 10, pxPerUm);
  return s + "</svg>";
}

/* Photographic look: stain texture filters, a microscope-field background and a soft vignette. */
function stainDefs(id, seed) {
  const tex = (name, freq, oct, a, b, blur) => `<filter id="${id}${name}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${oct}" seed="${seed}" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.05  0 0 0 0 0  0 0 0 0 0.12  ${a} 0 0 0 ${b}" result="d"/>
    <feComposite in="d" in2="SourceGraphic" operator="in" result="dm"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="dm"/></feMerge>${blur ? `<feGaussianBlur stdDeviation="${blur}"/>` : ""}
  </filter>`;
  return `<defs>${tex("fc", 0.11, 2, 0.55, -0.3, 0)}${tex("fn", 0.24, 2, 1.5, -0.62, 0.32)}
  <filter id="${id}fb"><feGaussianBlur stdDeviation="0.6"/></filter>
  <radialGradient id="${id}bg" cx="0.5" cy="0.45" r="0.75"><stop offset="0" stop-color="#fbf5f4"/><stop offset="0.7" stop-color="#f3e8ec"/><stop offset="1" stop-color="#e6d6de"/></radialGradient>
  <radialGradient id="${id}vg" cx="0.5" cy="0.5" r="0.72"><stop offset="0.62" stop-color="#3a2340" stop-opacity="0"/><stop offset="1" stop-color="#3a2340" stop-opacity="0.16"/></radialGradient></defs>`;
}
const vignette = (id) => `<rect width="200" height="200" fill="url(#${id}vg)" pointer-events="none"/>`;

function scaleBar(um, pxPerUm) {
  const L = um * pxPerUm;
  return `<g class="scalebar"><rect x="8" y="180" width="${f1(L + 12)}" height="14" rx="2" fill="#ffffff" opacity="0.8"/><line x1="14" y1="190" x2="${f1(14 + L)}" y2="190" stroke="#2c2337" stroke-width="2"/><text x="${f1(14 + L / 2)}" y="187" font-size="7.5" text-anchor="middle" fill="#2c2337" font-family="sans-serif">${um} µm</text></g>`;
}
