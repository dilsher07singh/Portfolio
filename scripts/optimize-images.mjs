// Resizes the full-resolution originals down to WebP at roughly 2x their
// displayed size and writes them to src/assets/optimized/, which is what the
// components actually import.
//
// The originals in src/assets/originals/ are the source of truth. They are not
// imported anywhere, so Vite never bundles them — only the generated WebP ships.
//
// The generated files ARE committed. That keeps the build working on a host
// where sharp's platform binary is unavailable, and it makes the payload of any
// given commit reviewable without running the pipeline.

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = resolve(ROOT, "src/assets/originals");
const OUT_DIR = resolve(ROOT, "src/assets/optimized");
const MANIFEST = resolve(OUT_DIR, ".manifest.json");

// width is ~2x the largest size the image is ever displayed at, so the file is
// crisp on retina without paying for the 1900-2553px source widths.
const TARGETS = [
  // Rendered by Hero.jsx at max-w-sm / width=384.
  { input: "dilsherSinghProfile.png", width: 768, quality: 78 },
  // Rendered by Projects.jsx at max-w-[200px].
  { input: "project-1.png", width: 400, quality: 76 },
  { input: "project-2.png", width: 400, quality: 76 },
  { input: "project-3.png", width: 400, quality: 76 },
];

const outputName = (input) => input.replace(/\.[^.]+$/, "") + ".webp";

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
  await mkdir(OUT_DIR, { recursive: true });
  const manifest = await readManifest();

  // Hash the source bytes alongside the encode settings so a checkout (which
  // does not preserve mtimes) never triggers a spurious re-encode, while a real
  // change to either the image or its target width always does.
  const planned = [];
  for (const target of TARGETS) {
    const name = outputName(target.input);
    const bytes = await readFile(resolve(SRC_DIR, target.input));
    const key = createHash("sha256")
      .update(bytes)
      .update(`\0${target.width}\0${target.quality}\0webp`)
      .digest("hex");

    const upToDate =
      manifest[name] === key && (await fileExists(resolve(OUT_DIR, name)));
    planned.push({ ...target, name, bytes, key, upToDate });
  }

  const stale = planned.filter((item) => !item.upToDate);
  if (stale.length === 0) {
    console.log(
      `[optimize-images] ${planned.length} images already up to date, skipping.`
    );
    return;
  }

  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch (error) {
    // Every output is committed, so a host without a usable sharp binary can
    // still build — as long as nothing is actually missing.
    const missing = [];
    for (const item of stale) {
      if (!(await fileExists(resolve(OUT_DIR, item.name)))) {
        missing.push(item.name);
      }
    }
    if (missing.length > 0) {
      console.error(
        `[optimize-images] sharp is unavailable (${error.message}) and these ` +
          `generated images are missing: ${missing.join(", ")}. ` +
          `Run \`yarn install\` and re-run this script.`
      );
      process.exitCode = 1;
      return;
    }
    console.warn(
      `[optimize-images] sharp is unavailable (${error.message}); ` +
        `keeping the committed images.`
    );
    return;
  }

  for (const item of stale) {
    const out = resolve(OUT_DIR, item.name);
    const info = await sharp(item.bytes)
      .resize({ width: item.width, withoutEnlargement: true })
      .webp({ quality: item.quality, effort: 6 })
      .toFile(out);

    manifest[item.name] = item.key;
    console.log(
      `[optimize-images] ${item.input} -> ${item.name} ` +
        `(${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)}KB)`
    );
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
};

await main();
