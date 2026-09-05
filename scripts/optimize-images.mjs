// Build-time image optimizer: converts picked source images into
// right-sized WebP assets under public/img. Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = "../information/_picked";
const MAP_SRC = "../information/_mapwork/cleaned_map.jpg";
const OUT = "public/img";
const sizes = { hero: 1600, wide: 1280, card: 640, thumb: 480, small: 320 };

// name -> [variant, width-key, quality]
const images = {
  // hero / page headers
  "hero-croc": ["hero", 1440, 66],
  "hero-scenic": ["wide", 1080, 68],
  "d-statue": ["wide", 820, 56],
  "d-trex": ["wide", 1080, 72],
  // home highlights + services cards
  "show-wrestling": ["card", 560, 64],
  "show-arena": ["card", 560, 64],
  "eleph-ride": ["card", 560, 64],
  "lion-photo": ["card", 560, 64],
  "food": ["card", 560, 64],
  "cafe": ["card", 560, 64],
  "golfcart": ["card", 560, 64],
  "garden-statue": ["card", 560, 64],
  "family-eleph": ["card", 560, 64],
  "feed-crocs": ["card", 560, 64],
  "act-train": ["card", 560, 64],
  "act-train2": ["card", 560, 64],
  "act-jump": ["card", 560, 64],
  "act-hippo": ["card", 560, 64],
  "act-boat": ["card", 560, 64],
  "act-horse": ["card", 560, 64],
  "act-pony": ["card", 560, 64],
  "act-rest": ["card", 560, 64],
  "act-shop": ["card", 560, 64],
  "act-macaw": ["card", 560, 64],
  "act-play": ["card", 480, 56],
  "act-chimp": ["card", 560, 64],
  "act-crocshow": ["card", 560, 64],
  "act-crocshow2": ["card", 560, 64],
  "act-pondview": ["card", 560, 64],
  "act-feed": ["card", 560, 64],
  // animals (thumbs for gallery)
  "a-crocs": ["thumb", 420, 62], "a-tiger": ["thumb", 420, 62], "a-hippo": ["thumb", 420, 62],
  "a-elephant": ["thumb", 420, 62], "a-eleph2": ["thumb", 420, 62], "a-bear": ["thumb", 420, 62],
  "a-sunbear": ["thumb", 420, 62], "a-chimp": ["thumb", 420, 62], "a-gibbon": ["thumb", 420, 62],
  "a-deer": ["thumb", 420, 62], "a-deer2": ["thumb", 420, 62], "a-goat": ["thumb", 420, 62],
  "a-alpaca": ["thumb", 420, 62], "a-capybara": ["thumb", 420, 62], "a-minipig": ["thumb", 420, 62],
  "a-peacock": ["thumb", 420, 62], "a-peacock2": ["thumb", 420, 62], "a-macaw": ["thumb", 420, 62],
  "a-cockatoo": ["thumb", 420, 62], "a-iguana": ["thumb", 420, 62], "a-python": ["thumb", 420, 62],
  "a-binturong": ["thumb", 420, 62], "a-tigercub": ["thumb", 420, 62], "a-cow": ["thumb", 420, 62],
  "a-turtle": ["thumb", 420, 62],
  // history
  "h-founder": ["card", 560, 66], "h-founder2": ["card", 480, 58],
  "h-old1": ["card", 560, 66], "h-old2": ["card", 560, 66],
  "h-old3": ["card", 560, 66], "h-old4": ["card", 560, 66], "h-old5": ["card", 560, 66],
  // dinosaurs (transparent-ish cartoons)
  "d-brachio": ["card", 560, 70], "d-pterano": ["card", 560, 70],
  "d-pair": ["card", 560, 70], "d-fossil": ["card", 560, 66],
  "d-trike": ["card", 560, 66], "d-eggs": ["card", 560, 66],
  "d-skulls": ["card", 560, 66], "d-apes": ["card", 560, 66], "d-monkey": ["card", 560, 66],
  "d-mascot": ["card", 560, 70],
  // map base
  "map-base": ["map", 1024, 82],
};

mkdirSync(OUT, { recursive: true });

let total = 0;
// illustrations drawn on a solid black background -> key black to transparency
const BLACK_KEY = new Set([
  "d-brachio", "d-pterano", "d-pair", "d-trex", "d-mascot", "d-fossil",
]);

async function keyBlack(img) {
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    out[j] = r; out[j + 1] = g; out[j + 2] = b;
    const lum = Math.max(r, g, b);
    out[j + 3] = lum < 26 ? 0 : lum < 44 ? Math.round(((lum - 26) / 18) * 255) : 255;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}

for (const [name, [variant, width, q]] of Object.entries(images)) {
  let src;
  if (variant === "map") src = MAP_SRC;
  else src = path.join(SRC, `${name}.png`);
  let img = sharp(src);
  const meta = await img.metadata();
  if (name === "d-statue") {
    img = img.resize({ width: 900, height: 560, fit: "cover" });
  } else if (meta.width > width) {
    img = img.resize({ width, withoutEnlargement: true });
  }
  const key = BLACK_KEY.has(name);
  if (key) {
    img = await keyBlack(img);
  }
  const out = path.join(OUT, `${name}.webp`);
  const info = await img
    .webp({ quality: q, alphaQuality: key ? 90 : undefined })
    .toFile(out);
  total += info.size;
  console.log(
    `${name}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(1)}KB`
  );
}


// OG image from hero croc
await sharp(path.join(SRC, "hero-croc.png"))
  .resize(1200, 630, { fit: "cover" })
  .webp({ quality: 66 })
  .toFile(path.join(OUT, "og-image.webp"));

console.log(`TOTAL: ${(total / 1024).toFixed(0)}KB`);
