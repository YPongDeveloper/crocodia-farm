// Extract the emblem from the checkerboard-background JPG into a transparent WebP.
import sharp from "sharp";
import { statSync } from "node:fs";

const SRC = "../information/_picked/logo_hi.jpg";
const size = statSync(SRC).size;
console.log("source bytes:", size);

const img = sharp(SRC);
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// 1) sample the two checkerboard grays from the corners
const px = (x, y) => {
  const i = (y * W + x) * C;
  return [data[i], data[i + 1], data[i + 2]];
};
const c1 = px(6, 6), c2 = px(Math.round(W * 0.02), Math.round(H * 0.04));
const lum = ([r, g, b]) => Math.max(r, g, b);
const sat = ([r, g, b]) => Math.max(r, g, b) - Math.min(r, g, b);
console.log("checker samples:", c1, c2);

// 2) key low-saturation mid-gray pixels (checkerboard), keep white text (lum>218) & colors
const alpha = new Float32Array(W * H);
for (let i = 0, p = 0; i < data.length; i += C, p++) {
  const rgb = [data[i], data[i + 1], data[i + 2]];
  const l = lum(rgb), s = sat(rgb);
  const grayLike = s < 34;
  const nearChecker = grayLike && l > 38 && l < 216;
  if (nearChecker) {
    // distance to nearest checker shade -> feather
    const d1 = Math.abs(l - lum(c1));
    const d2 = Math.abs(l - lum(c2));
    const d = Math.min(d1, d2);
    alpha[p] = d < 16 ? 0 : d < 56 ? ((d - 16) / 40) * 255 : 255;
  } else {
    alpha[p] = 255;
  }
}

// 3) drop small specks (checker remnants): connected components on alpha>60
const visit = new Uint8Array(W * H);
const stack = [];
for (let p = 0; p < W * H; p++) {
  if (visit[p] || alpha[p] <= 60) continue;
  const comp = [];
  stack.length = 0; stack.push(p); visit[p] = 1;
  while (stack.length) {
    const q = stack.pop(); comp.push(q);
    const y = (q / W) | 0, x = q % W;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const n = ny * W + nx;
      if (!visit[n] && alpha[n] > 60) { visit[n] = 1; stack.push(n); }
    }
  }
  if (comp.length < 900) for (const q of comp) alpha[q] = 0;
}

// 4) write RGBA
const out = Buffer.alloc(W * H * 4);
for (let i = 0, j = 0, p = 0; i < data.length; i += C, j += 4, p++) {
  out[j] = data[i]; out[j + 1] = data[i + 1]; out[j + 2] = data[i + 2];
  out[j + 3] = Math.round(alpha[p]);
}
await sharp(out, { raw: { width: W, height: H, channels: 4 } })
  .resize({ width: 720, withoutEnlargement: true })
  .webp({ quality: 88, alphaQuality: 92 })
  .toFile("public/img/logo.webp");
console.log("public/img/logo.webp written");
