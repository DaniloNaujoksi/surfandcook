// The four source files are marketing mockups kept in design/source, outside
// public/ — they carry baked-in headlines and a fabricated rating, so they must
// not be reachable on the live site. This lifts the clean photo tiles out of
// them, giving the site imagery without someone else's layout text across it.
//
//   node scripts/crop-source-images.mjs
//
// Coordinates were read off the source files; re-run only if those change.

import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "design/source";
const OUT = "public/images";

/** [source, left, top, width, height, name] */
const crops = [
  // 001 — 1536×1024, three tiles under the headline
  ["surfandcook001.jpeg", 27, 146, 478, 500, "surf/lesson-beginner"],
  ["surfandcook001.jpeg", 518, 146, 478, 500, "surf/diego-lineup"],
  ["surfandcook001.jpeg", 1023, 146, 478, 500, "surf/wave-ride"],

  // 002 — 1536×1024, eight dish tiles in two rows
  ["surfandcook002.jpeg", 22, 116, 360, 310, "dishes/ceviche"],
  ["surfandcook002.jpeg", 398, 116, 360, 310, "dishes/lomo-saltado"],
  ["surfandcook002.jpeg", 773, 116, 360, 310, "dishes/tiradito"],
  ["surfandcook002.jpeg", 1150, 116, 360, 310, "dishes/causa"],
  ["surfandcook002.jpeg", 22, 585, 360, 310, "dishes/parrillada"],
  ["surfandcook002.jpeg", 398, 585, 360, 310, "dishes/conchas"],
  ["surfandcook002.jpeg", 773, 585, 360, 310, "dishes/quinoa"],
  ["surfandcook002.jpeg", 1150, 585, 360, 310, "dishes/pisco-sour"],

  // 003 — 1402×1122, three tiles across the top
  ["surfandcook003.jpeg", 12, 16, 440, 440, "experience/surf-lesson"],
  ["surfandcook003.jpeg", 472, 16, 440, 440, "experience/cooking-hands"],
  ["surfandcook003.jpeg", 932, 16, 440, 440, "experience/sunset-table"],

  // 004 held the hero crop. The hero image is supplied directly now
  // (public/images/hero/diego-cooking.png), so nothing is lifted from it.
];

await mkdir(`${OUT}/surf`, { recursive: true });
await mkdir(`${OUT}/dishes`, { recursive: true });
await mkdir(`${OUT}/experience`, { recursive: true });

for (const [source, left, top, width, height, name] of crops) {
  await sharp(`${SRC}/${source}`)
    .extract({ left, top, width, height })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`);
  console.log(`${name}.jpg  ${width}×${height}`);
}

console.log(`\n${crops.length} images written.`);
