import { HEIGHTS, SIZES, STAGES } from '../data/catalog';

export const SKIN = "#E7C1A0";
export const SHOE = "#6B4A3A";
export const GOLD = "#B48A4A";

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export const hAt = (a) => {
  a = clamp(a, 3, 15);
  const i = Math.floor(a), f = a - i;
  return i >= 15 ? HEIGHTS[15] : lerp(HEIGHTS[i], HEIGHTS[i + 1], f);
};

export const sizeOf = (a) => SIZES.find((s) => a >= s[0] && a <= s[1]) || SIZES[4];
export const sizeTxt = (a) => {
  const s = sizeOf(a);
  return `${s[2]} (${s[0] === s[1] ? s[0] : s[0] + "–" + s[1]} yrs)`;
};
export const stageOf = (a) => STAGES.find((s) => a >= s[0] && a <= s[1]) || STAGES[2];
export const lineOf = (a) => (a <= 10 ? "k" : "o");

export function shade(hex, amt) {
  if (!hex || hex.startsWith("url")) return hex;
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  r = Math.round(r * (1 - amt));
  g = Math.round(g * (1 - amt));
  b = Math.round(b * (1 - amt));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export const f = (n) => n.toFixed(1);

export const inch = (cm) => {
  const v = Math.round((cm / 2.54) * 2) / 2;
  return Math.floor(v) + (v % 1 ? "½" : "");
};

export const ftin = (cm) => {
  let t = Math.round(cm / 2.54);
  return `${Math.floor(t / 12)} ft ${t % 12} in`;
};

export const ftc = (cm) => {
  let t = Math.round(cm / 2.54);
  return `${Math.floor(t / 12)}′${t % 12}″`;
};

export const both = (cm) => `${Math.round(cm)} cm · ${ftin(cm)}`;

export function figure(age, p, cx, ground, scale) {
  const t = clamp((age - 3) / 12, 0, 1), H = hAt(age) * scale, top = ground - H;
  const D = H / (3.3 + 2.1 * t);
  const hr = D * 0.56, hcY = top + hr;
  const ws = H * (0.135 - 0.02 * t);
  const yS = top + D * 0.95;
  const yK = top + D * 1.02 + H * (0.12 + 0.07 * t);
  const kw = Math.max(ws * 1.3, hr * 1.12);
  const yH = top + H * p.len;
  const hemH = ws * (0.55 + p.flare * 0.5);
  const ankleY = ground - H * 0.045;
  const kid = age <= 10;
  const body = p.c, sleeve = p.sl || shade(p.c, 0.06), det = p.c.startsWith("url") ? shade(p.sl, 0.18) : shade(p.c, 0.16);
  const hj = p.hj, hjD = shade(p.hj, 0.12);

  let s = `<g class="kid" style="transform-origin:${f(cx)}px ${f(ground)}px">`;
  s += `<ellipse cx="${f(cx)}" cy="${f(ground)}" rx="${f(Math.max(hemH, kw) * 0.95)}" ry="${f(3 + 3 * t)}" fill="#0F4C4A" opacity=".1"/>`;

  // legs and shoes
  [-1, 1].forEach((d) => {
    const x0 = cx + d * ws * 0.36, lw = (p.bottom === "shalwar" ? ws * 0.34 : ws * 0.25), lb = (p.bottom === "shalwar" ? ws * 0.2 : ws * 0.22);
    if (yH < ankleY - 1) {
      const bc = p.bc || "#F5ECDD";
      s += `<path d="M${f(x0 - lw)} ${f(yH - 8)} H${f(x0 + lw)} L${f(x0 + lb)} ${f(ankleY)} Q${f(x0)} ${f(ankleY + 2)} ${f(x0 - lb)} ${f(ankleY)}Z" fill="${bc}"/>`;
      if (p.bottom === "shalwar") s += `<path d="M${f(x0 - lb)} ${f(ankleY - 3)} H${f(x0 + lb)}" stroke="${shade(bc, 0.2)}" stroke-width="1.4" stroke-linecap="round"/>`;
    }
    s += `<ellipse cx="${f(x0 + d * ws * 0.06)}" cy="${f(ground - H * 0.02)}" rx="${f(ws * 0.3)}" ry="${f(H * 0.026)}" fill="${SHOE}"/>`;
  });

  // dress
  const bend = hemH * (p.type === "kurta" ? 0.07 : 0.16), r = Math.min(8, hemH * 0.15);
  s += `<path d="M${f(cx - ws * 0.92)} ${f(yS)} C${f(cx - ws * 1.0)} ${f(lerp(yS, yH, 0.45))} ${f(cx - hemH)} ${f(lerp(yS, yH, 0.6))} ${f(cx - hemH)} ${f(yH - r)} Q${f(cx - hemH)} ${f(yH + r * 0.3)} ${f(cx - hemH + r)} ${f(yH + r * 0.3)} Q${f(cx)} ${f(yH + bend)} ${f(cx + hemH - r)} ${f(yH + r * 0.3)} Q${f(cx + hemH)} ${f(yH + r * 0.3)} ${f(cx + hemH)} ${f(yH - r)} C${f(cx + hemH)} ${f(lerp(yS, yH, 0.6))} ${f(cx + ws * 1.0)} ${f(lerp(yS, yH, 0.45))} ${f(cx + ws * 0.92)} ${f(yS)}Z" fill="${body}"/>`;

  const at = (fr) => ({ y: lerp(yK, yH, fr) + bend * fr * fr * 0.8, w: lerp(Math.min(hemH, ws * 1.05), hemH, fr) });

  if (p.type === "tiered") {
    [0.25, 0.62].forEach((fr) => {
      const a = at(fr);
      s += `<path d="M${f(cx - a.w)} ${f(a.y)} Q${f(cx)} ${f(a.y + a.w * 0.18)} ${f(cx + a.w)} ${f(a.y)}" fill="none" stroke="${det}" stroke-width="1.6" stroke-linecap="round"/>`;
    });
  }
  if (p.type === "frock" && !p.trim) {
    [-0.45, 0, 0.45].forEach((k) => {
      s += `<path d="M${f(cx + k * ws * 0.6)} ${f(yK + 6)} Q${f(cx + k * hemH * 0.75)} ${f(lerp(yK, yH, 0.6))} ${f(cx + k * hemH * 0.8)} ${f(yH - 2 + bend * (1 - Math.abs(k)))}" fill="none" stroke="${det}" stroke-width="1" opacity=".55"/>`;
    });
  }
  if (p.type === "kurta") {
    [-1, 1].forEach((d) => {
      s += `<path d="M${f(cx + d * hemH * 0.94)} ${f(yH - 1)} l${f(-d * 1)} ${f(-H * 0.06)}" stroke="${det}" stroke-width="1.3" stroke-linecap="round"/>`;
    });
  }
  if (p.buttons) {
    for (let i = 0; i < 5; i++) {
      const y = lerp(yK + 6, yH - H * 0.05, i / 4);
      s += `<circle cx="${f(cx)}" cy="${f(y)}" r="${f(Math.max(1.4, H * 0.0065))}" fill="${shade(p.c, 0.3)}"/>`;
    }
  }
  if (p.trim) {
    const a = at(1);
    s += `<path d="M${f(cx - a.w + 4)} ${f(yH - 5)} Q${f(cx)} ${f(yH + bend - 5)} ${f(cx + a.w - 4)} ${f(yH - 5)}" fill="none" stroke="${GOLD}" stroke-width="2.6" stroke-dasharray=".1 4.4" stroke-linecap="round"/>`;
  }
  if (p.wrap) {
    const a = at(0.15);
    s += `<path d="M${f(cx - a.w * 0.5)} ${f(yK + 2)} Q${f(cx + a.w * 0.2)} ${f(lerp(yK, yH, 0.35))} ${f(cx + a.w * 0.9)} ${f(lerp(yK, yH, 0.42))}" fill="none" stroke="${GOLD}" stroke-width="1.8" stroke-linecap="round"/>`;
  }

  // little arms
  const aw = D * 0.2, wy = yK + H * (0.05 + 0.05 * t);
  [-1, 1].forEach((d) => {
    const x1 = cx + d * kw * 0.78, x2 = cx + d * (kw * 0.9 + D * 0.05);
    s += `<path d="M${f(x1)} ${f(yK - D * 0.3)} L${f(x2)} ${f(wy)}" stroke="${sleeve}" stroke-width="${f(aw)}" stroke-linecap="round"/>`;
    if (p.trim) s += `<path d="M${f(x2 - aw * 0.45)} ${f(wy - aw * 0.1)} h${f(aw * 0.9)}" stroke="${GOLD}" stroke-width="2" stroke-linecap="round"/>`;
    s += `<circle cx="${f(x2 + d * 1)}" cy="${f(wy + aw * 0.55)}" r="${f(aw * 0.48)}" fill="${SKIN}"/>`;
  });

  // khimar
  s += `<path d="M${f(cx - hr)} ${f(hcY)} A${f(hr)} ${f(hr)} 0 0 1 ${f(cx + hr)} ${f(hcY)} C${f(cx + hr * 1.02)} ${f(hcY + D * 0.42)} ${f(cx + kw)} ${f(yK - D * 0.45)} ${f(cx + kw)} ${f(yK - 4)} Q${f(cx + kw)} ${f(yK + 3)} ${f(cx + kw - 6)} ${f(yK + 3)} Q${f(cx)} ${f(yK + kw * 0.2)} ${f(cx - kw + 6)} ${f(yK + 3)} Q${f(cx - kw)} ${f(yK + 3)} ${f(cx - kw)} ${f(yK - 4)} C${f(cx - kw)} ${f(yK - D * 0.45)} ${f(cx - hr * 1.02)} ${f(hcY + D * 0.42)} ${f(cx - hr)} ${f(hcY)}Z" fill="${hj}"/>`;
  s += `<path d="M${f(cx + hr * 0.55)} ${f(hcY + D * 0.42)} Q${f(cx + kw * 0.7)} ${f(lerp(hcY, yK, 0.65))} ${f(cx + kw * 0.62)} ${f(yK)}" fill="none" stroke="${hjD}" stroke-width="1.3" stroke-linecap="round" opacity=".8"/>`;

  // face
  const fy = top + D * 0.57, frx = D * 0.3, fry = D * 0.335;
  s += `<ellipse cx="${f(cx)}" cy="${f(fy)}" rx="${f(frx + 2)}" ry="${f(fry + 2)}" fill="#FBF8F1"/>`;
  s += `<ellipse cx="${f(cx)}" cy="${f(fy)}" rx="${f(frx)}" ry="${f(fry)}" fill="${SKIN}"/>`;
  [-1, 1].forEach((d) => {
    s += `<ellipse cx="${f(cx + d * frx * 0.52)}" cy="${f(fy + fry * 0.3)}" rx="${f(frx * 0.2)}" ry="${f(frx * 0.13)}" fill="#E79A8C" opacity=".55"/>`;
  });

  // hair bow or pin
  if (kid) {
    const bx = cx + hr * 0.62, by = hcY - hr * 0.58, b = D * 0.11;
    s += `<path d="M${f(bx)} ${f(by)} L${f(bx - b * 1.3)} ${f(by - b * 0.8)} Q${f(bx - b * 1.5)} ${f(by)} ${f(bx - b * 1.3)} ${f(by + b * 0.8)}Z M${f(bx)} ${f(by)} L${f(bx + b * 1.3)} ${f(by - b * 0.8)} Q${f(bx + b * 1.5)} ${f(by)} ${f(bx + b * 1.3)} ${f(by + b * 0.8)}Z" fill="#E8A8A0"/><circle cx="${f(bx)}" cy="${f(by)}" r="${f(b * 0.4)}" fill="#D98C8C"/>`;
  } else {
    const bx = cx + hr * 0.78, by = hcY + hr * 0.2, b = D * 0.06;
    s += `<path d="M${f(bx)} ${f(by - b * 1.4)} L${f(bx + b)} ${f(by)} L${f(bx)} ${f(by + b * 1.4)} L${f(bx - b)} ${f(by)}Z" fill="${GOLD}"/>`;
  }

  s += `</g>`;
  return { svg: s, top, ground, hemH, sh: ws };
}

export const STAGE_CONFIG = { cx: 215, ground: 500, scale: 2.3 };
export const ARCH_PATH = "M28 540 L28 196 C28 118 128 86 180 16 C232 86 332 118 332 196 L332 540";

export function miniSVG(age, p) {
  if (!p) return "";
  const fig = figure(age, p, 100, 200, 1);
  const H = fig.ground - fig.top, pad = H * 0.06, w = (H + pad * 2) * 0.8;
  return `<svg viewBox="${f(100 - w / 2)} ${f(fig.top - pad)} ${f(w)} ${f(H + pad * 2)}" aria-hidden="true">${fig.svg}</svg>`;
}
