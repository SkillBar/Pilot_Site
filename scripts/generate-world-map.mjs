/**
 * Regenerates static dotted world maps into /public.
 * Usage: npx dotted-map is not enough — run:
 *   npm i -D dotted-map && node scripts/generate-world-map.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import DottedMap from "dotted-map";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, "..", "public");
const height = 72;

const variants = [
  ["world-map-dark.svg", { color: "#FFFFFF60", backgroundColor: "#050201" }],
  ["world-map-light.svg", { color: "#00000050", backgroundColor: "#f4efe8" }],
];

for (const [name, opts] of variants) {
  const map = new DottedMap({ height, grid: "diagonal" });
  const svg = map
    .getSVG({ radius: 0.24, shape: "circle", ...opts })
    .replace(/\n+/g, "");
  writeFileSync(join(pub, name), svg);
  console.log("wrote", name, `${(svg.length / 1024).toFixed(1)}KB`);
}
