import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { prune } from "@gltf-transform/functions";
import { MeshoptDecoder, MeshoptEncoder } from "meshoptimizer";
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

await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready]);

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    "meshopt.decoder": MeshoptDecoder,
    "meshopt.encoder": MeshoptEncoder,
  });

for (const [inputName, outputName] of models) {
  const document = await io.read(path.join(modelDirectory, inputName));

  // Motion LOD reuses the HQ material in the browser. Removing its own material
  // avoids decoding and allocating a second copy of every 2K texture.
  for (const mesh of document.getRoot().listMeshes()) {
    for (const primitive of mesh.listPrimitives()) primitive.setMaterial(null);
  }

  await document.transform(prune());
  await io.write(path.join(modelDirectory, outputName), document);
  console.log(`Generated ${outputName}`);
}
