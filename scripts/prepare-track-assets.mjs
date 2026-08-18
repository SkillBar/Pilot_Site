import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = "C:/Users/user/Desktop/Site";
const destinationDirectory = path.join(projectRoot, "public", "tracks");

const backgrounds = [
  ["1.PNG", "yas-marina-bg.webp"],
  ["IMG_0697.PNG", "grozny-bg.webp"],
  ["IMG_0698.PNG", "sochi-bg.webp"],
  ["IMG_0699.PNG", "kazan-bg.webp"],
  ["IMG_0700.PNG", "minsk-bg.webp"],
  ["IMG_0701.PNG", "interlagos-bg.webp"],
];

const circuits = [
  ["ЯС_Марина.PNG", "yas-marina.webp"],
  ["Грозный.PNG", "grozny.webp"],
  ["Сочи.PNG", "sochi.webp"],
  ["Казань.PNG", "kazan.webp"],
  ["Минск.PNG", "minsk.webp"],
  ["Интерлагос.PNG", "interlagos.webp"],
];

for (const [source, destination] of backgrounds) {
  await sharp(path.join(sourceDirectory, source))
    .resize(900, 1200, { fit: "cover" })
    .webp({ quality: 80, effort: 5 })
    .toFile(path.join(destinationDirectory, destination));
}

for (const [source, destination] of circuits) {
  await sharp(path.join(sourceDirectory, source))
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 86, effort: 5 })
    .toFile(path.join(destinationDirectory, destination));
}

console.log("Track assets prepared.");
