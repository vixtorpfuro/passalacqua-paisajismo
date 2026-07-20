/**
 * Crea documentos 'proyecto' en Sanity usando las imágenes ya subidas.
 * Uso: SANITY_TOKEN=sk... node migrate-proyectos.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";

const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) {
  console.error("Falta SANITY_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId: "kcbpv06c",
  dataset: "production",
  token: TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Mapa slug → metadata del proyecto
const proyectosMap = {
  "cerro-manquehue":      { name: "Cerro Manquehue",           folder: "01 cerro-manquehue",         order: 1,  location: "Santiago",      year: "2023", type: "Residencial",          description: "Un jardín en las laderas del cerro Manquehue que integra la vegetación nativa con especies mediterráneas, creando espacios de contemplación y bienestar." },
  "margo":                { name: "Margo",                      folder: "02 margo",                   order: 2,  location: "Santiago",      year: "2019", type: "Restaurante",          description: "Un interior que mira hacia adentro y hacia arriba. El jardín de Margo crece entre vigas y cristales, llevando la naturaleza al corazón del espacio gastronómico." },
  "bertin":               { name: "Bertin",                     folder: "02 bertin",                  order: 3,  location: "Santiago",      year: "2018", type: "Residencial",          description: "Un jardín diseñado para una familia que busca vivir el exterior como extensión del hogar." },
  "andrea-bertin-playa":  { name: "Andrea Bertin Playa",        folder: "02 andrea bertin playa",     order: 4,  location: "Costa Central", year: "2020", type: "Residencial Costero",  description: "Entre el viento marino y la arena, este jardín costero fue diseñado para resistir y florecer." },
  "antumalal":            { name: "Jardín Antumalal",           folder: "02 JARDIN ANTUMALAL",        order: 5,  location: "Pucón",         year: "2017", type: "Hotelería",            description: "El Hotel Antumalal asoma sobre el lago Villarrica con una arquitectura de los años cincuenta que dialoga con la naturaleza patagónica." },
  "gracia-cariola":       { name: "Jardín Gracia Cariola",      folder: "02 JARDIN GRACIA CARIOLA",   order: 6,  location: "Santiago",      year: "2016", type: "Residencial",          description: "Jardín de escala íntima en el sector oriente de Santiago." },
  "los-vilos":            { name: "Jardín Los Vilos",           folder: "02 JARDIN LOS VILOS",        order: 7,  location: "Los Vilos",     year: "2021", type: "Residencial Costero",  description: "En la costa norte chica, donde el clima es árido y el viento constante." },
  "ranco":                { name: "Jardín Ranco",               folder: "02 JARDIN RANCO",            order: 8,  location: "Lago Ranco",    year: "2022", type: "Residencial Lacustre", description: "A orillas del lago Ranco, rodeado de bosque nativo valdiviano." },
  "sennerman":            { name: "Jardín Sennerman",           folder: "02 JARDIN SENNERMAN",        order: 9,  location: "Santiago",      year: "2020", type: "Residencial",          description: "Un jardín diseñado para ser visto desde adentro y habitado desde afuera." },
  "denisse-neger":        { name: "Denisse Neger",              folder: "02 Denisse Neger",           order: 10, location: "Santiago",      year: "2015", type: "Residencial",          description: "Proyecto residencial en el sector alto de Santiago." },
  "lidia-langlois":       { name: "Lidia Langlois",             folder: "02 Lidia Langlois",          order: 11, location: "Santiago",      year: "2014", type: "Residencial",          description: "Un jardín que ha madurado con el tiempo." },
  "maria-gracia":         { name: "María Gracia",               folder: "02 Maria Gracia",            order: 12, location: "Santiago",      year: "2018", type: "Residencial",          description: "Jardín residencial diseñado en torno a un árbol centenario preexistente." },
  "china-correa":         { name: "China Correa",               folder: "02 china correa",            order: 13, location: "Santiago",      year: "2017", type: "Residencial",          description: "Un jardín compacto con mucho carácter." },
  "falabella":            { name: "Falabella",                  folder: "02 falabella",               order: 14, location: "Santiago",      year: "2016", type: "Corporativo",          description: "Proyecto de paisajismo corporativo para las oficinas centrales de Falabella." },
  "jose":                 { name: "José",                       folder: "02 jose",                    order: 15, location: "Santiago",      year: "2019", type: "Residencial",          description: "Jardín de diseño contemporáneo con materialidad noble." },
  "khammis":              { name: "Khammis",                    folder: "02 khammis",                 order: 16, location: "Santiago",      year: "2021", type: "Residencial",          description: "Proyecto residencial con fuerte presencia de agua." },
  "la-plaza":             { name: "La Plaza",                   folder: "02 la plaza",                order: 17, location: "Santiago",      year: "2018", type: "Residencial",          description: "Un jardín que funciona como plaza." },
  "mellafe":              { name: "Mellafe",                    folder: "02 mellafe",                 order: 18, location: "Santiago",      year: "2020", type: "Residencial",          description: "Proyecto de jardín y terraza en el barrio de Mellafe." },
  "moira":                { name: "Moira",                      folder: "02 moira",                   order: 19, location: "Santiago",      year: "2019", type: "Residencial",          description: "Jardín diseñado en estrecha colaboración con la arquitectura interior." },
  "pilar":                { name: "Pilar",                      folder: "02 pilar",                   order: 20, location: "Santiago",      year: "2016", type: "Residencial",          description: "Un jardín maduro que acumula historia." },
  "security":             { name: "Security",                   folder: "02 security",                order: 21, location: "Santiago",      year: "2017", type: "Corporativo",          description: "Paisajismo para el edificio corporativo del Banco Security." },
  "los-vilos-02":         { name: "Los Vilos",                  folder: "02 los vilos",               order: 22, location: "Los Vilos",     year: "2021", type: "Residencial Costero",  description: "Segunda intervención en la costa de Los Vilos." },
  "alejandra-prieto":     { name: "Alejandra Prieto",           folder: "Alejandra Prieto",           order: 23, location: "Santiago",      type: "Residencial",          description: "Jardín residencial diseñado en torno a la vida familiar." },
  "alejandro-alvarez":    { name: "Alejandro Álvarez",          folder: "Alejandro Alvarez",          order: 24, location: "Santiago",      type: "Residencial",          description: "Proyecto de diseño exterior con énfasis en la estructura." },
  "ana-maria-figueroa":   { name: "Ana María Figueroa",         folder: "Ana Maria Figueroa",         order: 25, location: "Santiago",      type: "Residencial",          description: "Un jardín íntimo pensado para ser disfrutado en silencio." },
  "andrea-bertin":        { name: "Andrea Bertin",              folder: "Andrea Bertin",              order: 26, location: "Santiago",      type: "Residencial",          description: "Jardín tradicional con vocación contemporánea." },
  "carola-matta":         { name: "Carola Matta",               folder: "Carola Matta",               order: 27, location: "Santiago",      type: "Residencial",          description: "El jardín de Carola Matta nace de una conversación larga." },
  "carola-del-campo":     { name: "Carola del Campo",           folder: "Carola del Campo",           order: 28, location: "Santiago",      type: "Residencial",          description: "Proyecto de remodelación de jardín existente." },
  "carolina-velasco":     { name: "Carolina Velasco",           folder: "Carolina Velasco",           order: 29, location: "Santiago",      type: "Residencial",          description: "Jardín de color." },
  "cecilia-claro":        { name: "Cecilia Claro",              folder: "Cecilia Claro",              order: 30, location: "Santiago",      type: "Residencial",          description: "Una intervención delicada en un jardín con historia." },
  "clinica-lo-curro":     { name: "Clínica Lo Curro",           folder: "Clinica Lo Curro",           order: 31, location: "Santiago",      type: "Salud",                description: "Paisajismo de una clínica con responsabilidad especial." },
  "diego-abadie":         { name: "Diego Abadie",               folder: "Diego Abadie",               order: 32, location: "Santiago",      type: "Residencial",          description: "Jardín urbano diseñado para maximizar el verde." },
  "eleana-vidaurre":      { name: "Eleana Vidaurre",            folder: "Eleana Vidaurre",            order: 33, location: "Santiago",      type: "Residencial",          description: "Un jardín que cambia según la hora y la estación." },
  "fernanda-otero":       { name: "Fernanda Otero",             folder: "Fernanda Otero",             order: 34, location: "Santiago",      type: "Residencial",          description: "Proyecto residencial con énfasis en el bienestar." },
  "francisca-goycolea":   { name: "Francisca Goycolea",         folder: "Francisca Goycolea",         order: 35, location: "Santiago",      type: "Residencial",          description: "Jardín de herencia clásica actualizado con sensibilidad contemporánea." },
  "jael-ergas":           { name: "Jael Ergas",                 folder: "Jael Ergas",                 order: 36, location: "Santiago",      type: "Residencial",          description: "Una de las intervenciones más completas del estudio." },
  "josefa-garcia":        { name: "Josefa García de la Huerta", folder: "Josefa Garcia de la Huerta", order: 37, location: "Santiago",      type: "Residencial",          description: "El jardín como extensión del salón." },
  "josefina-passalacqua": { name: "Josefina Passalacqua",       folder: "Josefina Passalacqua",       order: 38, location: "Santiago",      type: "Residencial",          description: "Proyecto personal con todo el cuidado que eso implica." },
  "juan-irrarazabal":     { name: "Juan E. Irarrázabal",        folder: "Juan E Irrarazabal",         order: 39, location: "Santiago",      type: "Residencial",          description: "Jardín de gran escala en el sector oriente de Santiago." },
  "m-elisa-sotta":        { name: "M. Elisa Sotta",             folder: "M.Elisa Sotta",              order: 40, location: "Santiago",      type: "Residencial",          description: "Un jardín diseñado para crecer con la familia." },
  "monica-valdes":        { name: "Mónica Valdés",              folder: "Monica Valdes",              order: 41, location: "Santiago",      type: "Residencial",          description: "Proyecto en un terreno con fuerte pendiente." },
  "paula-delano":         { name: "Paula Delano",               folder: "Paula Delano",               order: 42, location: "Santiago",      type: "Residencial",          description: "Jardín pensado desde la infancia." },
  "pollo-mir":            { name: "Pollo Mir",                  folder: "Pollo Mir",                  order: 43, location: "Santiago",      type: "Residencial",          description: "Una intervención que toma riesgos y los resuelve con gracia." },
  "rosario-figueroa":     { name: "Rosario Figueroa",           folder: "Rosario Figueroa",           order: 44, location: "Santiago",      type: "Residencial",          description: "Jardín mediterráneo adaptado al clima de Santiago." },
  "sebastian-oddo":       { name: "Sebastián Oddo",             folder: "Sebastian Oddo",             order: 45, location: "Santiago",      type: "Residencial",          description: "Diseño de exteriores con énfasis en los espacios nocturnos." },
  "titi-marincovic":      { name: "Titi Marincovic",            folder: "Titi Marincovic",            order: 46, location: "Santiago",      type: "Residencial",          description: "Un jardín generoso, lleno de plantas y lleno de vida." },
  "vespucio-2700":        { name: "Vespucio 2700",              folder: "VESPUCIO 2700",              order: 47, location: "Santiago",      year: "2021", type: "Corporativo",          description: "Proyecto de paisajismo urbano en la avenida Vespucio." },
  "veronica-calderon":    { name: "Verónica Calderón",          folder: "Veronica Calderon",          order: 48, location: "Santiago",      type: "Residencial",          description: "Jardín diseñado para una casa que recientemente cambió de propietaria." },
  "ximena-campos":        { name: "Ximena Campos",              folder: "Ximena Campos",              order: 49, location: "Santiago",      type: "Residencial",          description: "Un exterior íntimo diseñado para el descanso." },
  "angelica-correa":      { name: "Angélica Correa",            folder: "angelica correa",            order: 50, location: "Santiago",      type: "Residencial",          description: "Proyecto de pequeña escala con gran precisión." },
  "cimm":                 { name: "CIMM",                       folder: "cimm",                       order: 51, location: "Santiago",      year: "2018", type: "Corporativo",          description: "Paisajismo para el Centro de Investigación Minera y Metalúrgica." },
  "saval":                { name: "Saval",                      folder: "saval",                      order: 52, location: "Santiago",      type: "Corporativo",          description: "Proyecto de exteriores para las instalaciones de Saval." },
  "verdecee":             { name: "Verdecee",                   folder: "verdecee",                   order: 53, location: "Santiago",      type: "Residencial",          description: "Un jardín urbano en altura." },
};

// Leer JSON con URLs ya subidas
const uploadLog = JSON.parse(fs.readFileSync("./sanity-proyectos-urls.json", "utf8"));

// Agrupar por carpeta: folder → [{ assetId, url }]
const byFolder = {};
for (const item of uploadLog) {
  if (!byFolder[item.folder]) byFolder[item.folder] = [];
  byFolder[item.folder].push({ assetId: item.assetId, url: item.url });
}

function assetRef(assetId) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

async function run() {
  let created = 0;
  let skipped = 0;

  for (const [slug, proyecto] of Object.entries(proyectosMap)) {
    const images = byFolder[proyecto.folder] ?? [];

    if (images.length === 0) {
      console.log(`⚠️  Sin imágenes: ${slug} (carpeta: ${proyecto.folder})`);
      skipped++;
      continue;
    }

    const [cover, ...rest] = images;

    const doc = {
      _type: "proyecto",
      _id: `proyecto-${slug}`,
      name: proyecto.name,
      slug: { _type: "slug", current: slug },
      order: proyecto.order,
      coverImage: assetRef(cover.assetId),
      images: rest.map((img, i) => ({
        ...assetRef(img.assetId),
        _key: `img-${i}`,
      })),
      description: proyecto.description ?? "",
      location: proyecto.location ?? "",
      year: proyecto.year ?? "",
      type: proyecto.type ?? "",
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✓ ${slug} (${images.length} imágenes)`);
      created++;
    } catch (err) {
      console.log(`✗ ${slug} — ${err.message}`);
    }
  }

  console.log(`\n✅ ${created} documentos creados/actualizados, ${skipped} sin imágenes`);
}

run().catch(console.error);
