import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, 'public', 'mediapipe');
const wasmOutput = path.join(output, 'wasm');
const modelPath = path.join(output, 'face_landmarker.task');
const modelUrl = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
const expectedHash = '64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff';
const wasmFiles = [
  'vision_wasm_internal.js',
  'vision_wasm_internal.wasm',
  'vision_wasm_nosimd_internal.js',
  'vision_wasm_nosimd_internal.wasm',
];

await mkdir(wasmOutput, { recursive: true });
for (const name of wasmFiles) {
  await copyFile(path.join(root, 'node_modules', '@mediapipe', 'tasks-vision', 'wasm', name), path.join(wasmOutput, name));
}

let model;
try { model = await readFile(modelPath); } catch { /* First setup. */ }
if (!model || createHash('sha256').update(model).digest('hex') !== expectedHash) {
  const response = await fetch(modelUrl);
  if (!response.ok) throw new Error(`Não foi possível baixar o modelo facial (${response.status}).`);
  model = Buffer.from(await response.arrayBuffer());
  if (createHash('sha256').update(model).digest('hex') !== expectedHash) {
    throw new Error('O modelo facial baixado não corresponde à versão esperada.');
  }
  await writeFile(modelPath, model);
  console.log('Modelo facial local preparado.');
}
