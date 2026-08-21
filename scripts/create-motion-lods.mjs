import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import {
  dequantize,
  meshopt,
  prune,
  simplify,
  weld,
} from "@gltf-transform/functions";
import {
  MeshoptDecoder,
  MeshoptEncoder,
  MeshoptSimplifier,
} from "meshoptimizer";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modelDirectory = path.join(projectRoot, "public", "three", "models");

const models = [
  ["dodge.web.glb", "dodge.motion.glb"],
  ["meshy-ai-jeep.web.glb", "meshy-ai-jeep.motion.glb"],
  ["meshy-scale-24.web.glb", "meshy-scale-24.motion.glb"],
  ["meshy-scale-10.web.glb", "meshy-scale-10.motion.glb"],
];

await Promise.all([
  MeshoptDecoder.ready,
  MeshoptEncoder.ready,
  MeshoptSimplifier.ready,
]);

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    "meshopt.decoder": MeshoptDecoder,
    "meshopt.encoder": MeshoptEncoder,
  });

for (const [inputName, outputName] of models) {
  const document = await io.read(path.join(modelDirectory, inputName));

  await document.transform(
    dequantize(),
    weld(),
    simplify({
      simplifier: MeshoptSimplifier,
      ratio: 0.35,
      error: 0.002,
      lockBorder: true,
    }),
  );

  // Motion LOD reuses the HQ material in the browser. Removing its own material
  // avoids decoding and allocating a second copy of every 2K texture.
  for (const mesh of document.getRoot().listMeshes()) {
    for (const primitive of mesh.listPrimitives()) primitive.setMaterial(null);
  }

  await document.transform(
    prune(),
    meshopt({
      encoder: MeshoptEncoder,
      level: "high",
      quantizePosition: 14,
      quantizeNormal: 10,
      quantizeTexcoord: 12,
    }),
  );
  await io.write(path.join(modelDirectory, outputName), document);
  console.log(`Generated ${outputName}`);
}
