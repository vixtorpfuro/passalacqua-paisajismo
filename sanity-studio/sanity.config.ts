import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { proyectoType } from "./schemaTypes/proyecto";
import { postType } from "./schemaTypes/post";

export default defineConfig({
  name: "passalacqua-paisajismo",
  title: "Passalacqua Paisajismo",
  projectId: "kcbpv06c",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [proyectoType, postType],
  },
});
