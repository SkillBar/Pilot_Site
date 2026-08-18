import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = "C:/Users/user/AppData/Local/Temp";
const destinationDirectory = path.join(projectRoot, "public", "anatomy");

const assets = [
  ["codex-clipboard-eec3bae6-6ac3-422a-afb2-19f31c68ad28.png", "camera.webp", 900, 90],
  ["codex-clipboard-b26c736a-f75a-4545-8db3-95cddea36724.png", "video-receiver.webp", 900, 84],
  ["codex-clipboard-45c46db0-264a-4b45-b9b7-2462994cfc11.png", "controller.webp", 900, 84],
  ["codex-clipboard-8ed8656b-feec-4b9a-ae43-11f309fbf0c0.png", "radio-module.webp", 900, 84],
  ["codex-clipboard-d8ff7214-99b0-447b-9a10-7f060d04e6e8.png", "drive.webp", 1200, 84],
];

for (const [source, destination, width, quality] of assets) {
  await sharp(path.join(sourceDirectory, source))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5, alphaQuality: 90 })
    .toFile(path.join(destinationDirectory, destination));
}

console.log("Hardware assets prepared.");
