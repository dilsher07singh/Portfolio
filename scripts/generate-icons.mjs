// Rasterizes public/dilsher2.svg into the PNG icons that index.html and
// site.webmanifest reference: the iOS home-screen icon and the two manifest
// icons.
//
// Same conventions as scripts/optimize-images.mjs: the outputs are COMMITTED so
// a host without a usable sharp binary can still build, and a sha256 of the
// source bytes plus the render settings decides whether there is any work to
// do, rather than mtimes (a git checkout does not preserve those).
//
// The source mark is a black disc with the monogram knocked out, so it is
// recoloured rather than used as-is: the disc is tinted to FOREGROUND and laid
// over BACKGROUND, which shows through the knockout as the letterforms. That
// matches the site and, unlike a transparent icon, survives iOS compositing
// home-screen icons onto an opaque backdrop.

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(ROOT, "public/dilsher2.svg");
const OUT_DIR = resolve(ROOT, "public");
// Kept out of public/, which Vite copies verbatim into dist/ — build state
// should not be deployed.
const MANIFEST = resolve(ROOT, "scripts/icons.manifest.json");

const FOREGROUND = "#f5f5f5"; // neutral-100, the site's heading colour
const BACKGROUND = "#0a0a0a"; // neutral-950, and the manifest theme_color

// Fraction of the icon's width the mark spans. The source SVG's own bounding
// box only fills 57%, which reads as lost inside a launcher tile, so the mark
// is trimmed out of its padding and re-inset to this. Staying under 80% also
// keeps it inside the maskable safe zone, which is what lets site.webmanifest
// honestly declare purpose "any maskable".
const MARK_RATIO = 0.72;

// Rasterise the vector once at a size no target exceeds, so every icon is
// downsampled from the same high-quality render.
const RENDER_SIZE = 1024;

const TARGETS = [
  // iOS ignores rel=icon and looks for this; 180 is the current 3x size.
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

const readManifest = async () => {
  try {
    return JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    return {};
  }
};

const fileExists = async (path) => {
  try {
    await readFile(path);
    return true;
  } catch {
    return false;
  }
};

const main = async () => {
  const source = await readFile(SOURCE);
  const settings = `\0${FOREGROUND}\0${BACKGROUND}\0${MARK_RATIO}\0${RENDER_SIZE}`;
  const manifest = await readManifest();

  const planned = [];
  for (const target of TARGETS) {
    const key = createHash("sha256")
      .update(source)
      .update(`${settings}\0${target.size}`)
      .digest("hex");
    const upToDate =
      manifest[target.name] === key &&
      (await fileExists(resolve(OUT_DIR, target.name)));
    planned.push({ ...target, key, upToDate });
  }

  const stale = planned.filter((item) => !item.upToDate);
  if (stale.length === 0) {
    console.log(
      `[generate-icons] ${planned.length} icons already up to date, skipping.`
    );
    return;
  }

  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch (error) {
    const missing = [];
    for (const item of stale) {
      if (!(await fileExists(resolve(OUT_DIR, item.name)))) {
        missing.push(item.name);
      }
    }
    if (missing.length > 0) {
      console.error(
        `[generate-icons] sharp is unavailable (${error.message}) and these ` +
          `icons are missing: ${missing.join(", ")}. ` +
          `Run \`yarn install\` and re-run this script.`
      );
      process.exitCode = 1;
      return;
    }
    console.warn(
      `[generate-icons] sharp is unavailable (${error.message}); ` +
        `keeping the committed icons.`
    );
    return;
  }

  // Render, then trim the transparent margin baked into the viewBox so
  // MARK_RATIO measures the mark itself rather than the source's own padding.
  const mark = await sharp(source)
    .resize(RENDER_SIZE, RENDER_SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
    .png()
    .toBuffer();

  for (const item of stale) {
    const inner = Math.round(item.size * MARK_RATIO);

    const scaled = await sharp(mark)
      .resize(inner, inner, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    // dest-in keeps the solid FOREGROUND only where the mark is opaque, which
    // recolours it while preserving the knockout and its anti-aliased edges.
    const tinted = await sharp({
      create: {
        width: inner,
        height: inner,
        channels: 4,
        background: FOREGROUND,
      },
    })
      .composite([{ input: scaled, blend: "dest-in" }])
      .png()
      .toBuffer();

    const offset = Math.round((item.size - inner) / 2);
    const info = await sharp({
      create: {
        width: item.size,
        height: item.size,
        channels: 4,
        background: BACKGROUND,
      },
    })
      .composite([{ input: tinted, top: offset, left: offset }])
      .png({ compressionLevel: 9, palette: true })
      .toFile(resolve(OUT_DIR, item.name));

    manifest[item.name] = item.key;
    console.log(
      `[generate-icons] ${item.name} ` +
        `(${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)}KB)`
    );
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
};

await main();
