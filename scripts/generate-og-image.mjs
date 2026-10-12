// Renders public/og-image.jpg (1200x630): name, title and the brief's one-line
// summary on the left, the profile photo on the right.
//
// Not part of `yarn build`. The output is committed, and the build should not
// depend on which fonts the build machine has installed. Run it by hand with
// `yarn generate:og` after changing the copy below or the profile photo. It
// needs the Inter font installed locally for the text to render as designed.

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PHOTO = resolve(ROOT, "src/assets/originals/dilsherSinghProfile.png");
const OUT = resolve(ROOT, "public/og-image.jpg");

const WIDTH = 1200;
const HEIGHT = 630;
const PHOTO_HEIGHT = 510;
const PHOTO_TOP = (HEIGHT - PHOTO_HEIGHT) / 2;

const background = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="30%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#7877c6" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="title" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#f9a8d4"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0a0a0a"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <g font-family="Inter, sans-serif">
    <text x="72" y="230" font-size="84" font-weight="200" fill="#fafafa" letter-spacing="-2">Dilsher Singh</text>
    <text x="74" y="298" font-size="40" font-weight="400" fill="url(#title)">Senior Full Stack Engineer</text>
    <text x="74" y="388" font-size="30" font-weight="300" fill="#d4d4d4">I build financial systems that</text>
    <text x="74" y="430" font-size="30" font-weight="300" fill="#d4d4d4">have to be right every time.</text>
    <text x="74" y="520" font-size="22" font-weight="400" fill="#a3a3a3">Hong Kong · dilshersingh.com</text>
  </g>
</svg>`;

const resized = await sharp(PHOTO).resize({ height: PHOTO_HEIGHT }).png().toBuffer();
const { width: photoWidth = 0 } = await sharp(resized).metadata();

// Rounded corners, matching the site.
const photo = await sharp(resized)
  .composite([
    {
      input: Buffer.from(
        `<svg width="${photoWidth}" height="${PHOTO_HEIGHT}"><rect width="${photoWidth}" height="${PHOTO_HEIGHT}" rx="24" ry="24"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

await sharp(Buffer.from(background))
  .composite([
    { input: photo, top: PHOTO_TOP, left: WIDTH - photoWidth - 72 },
  ])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(OUT);

console.log(`[generate-og-image] Wrote ${OUT}`);
