import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { createReadStream } from "fs";

const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error("Falta SANITY_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "kcbpv06c", dataset: "production",
  token: TOKEN, apiVersion: "2024-01-01", useCdn: false,
});

const ROOT = "./public/wellbeing";
const VALID = /\.(jpg|jpeg|png|webp)$/i;

async function run() {
  const files = fs.readdirSync(ROOT).filter(f => VALID.test(f) && fs.statSync(path.join(ROOT, f)).isFile());
  const log = [];
  let ok = 0;

  for (const filename of files) {
    const filePath = path.join(ROOT, filename);
    try {
      const asset = await client.assets.upload("image", createReadStream(filePath), { filename });
      console.log(`✓ ${filename} → ${asset.url}`);
      log.push({ filename, url: asset.url, assetId: asset._id });
      ok++;
    } catch (err) {
      console.log(`✗ ${filename} — ${err.message}`);
    }
  }

  fs.writeFileSync("./sanity-wellbeing-urls.json", JSON.stringify(log, null, 2));
  console.log(`\n✅ ${ok}/${files.length} subidas → sanity-wellbeing-urls.json`);
}

run().catch(console.error);
