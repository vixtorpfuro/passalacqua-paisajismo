import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "kcbpv06c",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const proyectos = await client.fetch(
  `*[_type == "proyecto" && defined(type) && string::startsWith(type, "")]{_id, name, type}`
);

console.log(`Encontrados ${proyectos.length} proyectos con type string`);

for (const p of proyectos) {
  if (typeof p.type === "string") {
    await client.patch(p._id).set({ type: [p.type] }).commit();
    console.log(`✓ ${p.name}: "${p.type}" → ["${p.type}"]`);
  }
}

console.log("Migración completa.");
