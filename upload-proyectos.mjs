/**
 * Sube las imágenes de public/proyectos/ a Sanity Media Library
 * Crea documentos sanity.imageAsset con metadata de carpeta/proyecto
 *
 * Uso: node upload-proyectos.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { createReadStream, statSync } from "fs";

const PROJECT_ID = "kcbpv06c";
const DATASET = "production";
const TOKEN = process.env.SANITY_TOKEN; // sanity manage → API → tokens → Editor

if (!TOKEN) {
  console.error("❌  Falta SANITY_TOKEN. Correlo así:");
  console.error("    SANITY_TOKEN=sk... node upload-proyectos.mjs");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const ROOT = "./public/proyectos";
const VALID_EXT = /\.(jpg|jpeg|png|webp)$/i;

async function upload(filePath, folder, filename) {
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, {
    filename,
    label: folder,
    source: {
      name: "upload-proyectos",
      id: `proyectos/${folder}/${filename}`,
    },
  });
  return asset;
}

function walkDir(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      results.push(...walkDir(full));
    } else if (VALID_EXT.test(entry)) {
      results.push(full);
    }
  }
  return results;
}

async function run() {
  const folders = fs.readdirSync(ROOT).filter(f =>
    fs.statSync(path.join(ROOT, f)).isDirectory()
  );

  let total = 0;
  let ok = 0;
  let log = [];

  for (const folder of folders) {
    const folderPath = path.join(ROOT, folder);
    const files = walkDir(folderPath);

    const limited = files.slice(0, 8);
    console.log(`\n📁 ${folder} (${limited.length}/${files.length} imágenes)`);

    for (const filePath of limited) {
      const filename = path.basename(filePath);
      total++;
      try {
        const asset = await upload(filePath, folder, filename);
        const url = asset.url;
        console.log(`  ✓ ${filename}`);
        log.push({ folder, filename, url, assetId: asset._id });
        ok++;
      } catch (err) {
        console.log(`  ✗ ${filename} — ${err.message}`);
      }
    }
  }

  // Guardar log con URLs
  fs.writeFileSync("./sanity-proyectos-urls.json", JSON.stringify(log, null, 2));

  console.log(`\n✅ ${ok}/${total} imágenes subidas`);
  console.log(`📄 URLs guardadas en sanity-proyectos-urls.json`);
}

run().catch(console.error);
