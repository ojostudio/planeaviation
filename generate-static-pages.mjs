#!/usr/bin/env node
/**
 * scripts/generate-static-pages.mjs
 * ============================================================
 * Gera páginas HTML estáticas (uma por aeronave ativa, uma por
 * artigo) a partir dos dados reais do Firestore, para que cada
 * uma tenha título, meta description, Open Graph e JSON-LD
 * verdadeiros já no HTML — sem depender de JavaScript rodar
 * primeiro. O visual/interatividade continua sendo o mesmo
 * aeronave.html / artigo.html de sempre (o JS deles roda por
 * cima normalmente, usando o mesmo id da aeronave/artigo).
 *
 * Não precisa de nenhuma senha/chave secreta: as coleções
 * "aircraft" e "articles" já são de leitura pública no
 * firestore.rules, então este script usa a API REST pública
 * do Firestore (mesmo projectId do firebase-config.js).
 *
 * Rode com: node scripts/generate-static-pages.mjs
 * ============================================================
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PROJECT_ID = "planeaviation-3aa6a"; // mesmo de js/firebase-config.js
const SITE_URL = "https://www.planeaviation.net.br";
const OG_IMAGE_FALLBACK = `${SITE_URL}/images/og-cover.jpg`;

const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// ------------------------------------------------------------
// Firestore REST → objeto JS simples
// ------------------------------------------------------------
function fromFirestoreValue(v) {
  if (v == null) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return Number(v.doubleValue);
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return v.timestampValue;
  if ("mapValue" in v) return fromFirestoreFields(v.mapValue.fields || {});
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(fromFirestoreValue);
  return null;
}
function fromFirestoreFields(fields) {
  const out = {};
  for (const [k, v] of Object.entries(fields || {})) out[k] = fromFirestoreValue(v);
  return out;
}

async function fetchCollection(name) {
  const docs = [];
  let pageToken = null;
  do {
    const url = new URL(`${FIRESTORE_BASE}/${name}`);
    url.searchParams.set("pageSize", "300");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Firestore fetch failed for ${name}: ${res.status} ${await res.text()}`);
    const data = await res.json();
    for (const d of data.documents || []) {
      const id = d.name.split("/").pop();
      docs.push({ id, ...fromFirestoreFields(d.fields) });
    }
    pageToken = data.nextPageToken || null;
  } while (pageToken);
  return docs;
}

// ------------------------------------------------------------
// Slugs
// ------------------------------------------------------------
function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function aircraftSlug(a) {
  const base = slugify(`${a.model || "aeronave"}${a.year ? "-" + a.year : ""}`);
  return `${base}-${a.id.slice(0, 6).toLowerCase()}`;
}
function articleSlug(a) {
  const base = slugify(a.title || "artigo");
  return `${base}-${a.id.slice(0, 6).toLowerCase()}`;
}

// ------------------------------------------------------------
// Em vez de reescrever manualmente cada caminho relativo (frágil:
// um `src="${url}"` dentro de JavaScript, por exemplo, não é um
// caminho de arquivo — é uma variável que já contém uma URL
// completa em tempo de execução, e reescrever isso quebraria o
// código), usamos uma tag <base>. Ela faz o navegador resolver
// TODOS os caminhos relativos (do HTML e os montados pelo JS)
// contra a raiz do site, não contra a pasta onde o arquivo mora
// fisicamente. É a forma padrão e segura de resolver isso.
// ------------------------------------------------------------
const BASE_TAG = `<base href="${SITE_URL}/">`;


function escapeHtml(s) {
  return String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ------------------------------------------------------------
// Bloco de <head> (título + meta description + canonical + OG +
// Twitter Card). Substitui o bloco equivalente que já existe no
// template (colocado no Bloco 1), pelos valores reais.
// ------------------------------------------------------------
function buildHeadBlock({ title, description, url, image, type }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return `<title>${t}</title>
<meta name="description" content="${d}">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/svg+xml" href="favicon.svg">

<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Plane Aviation">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:image" content="${image}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${image}">`;
}

// Remove o bloco de <title>...meta twitter:image> que o template já tem
// (colocado no Bloco 1), para não duplicar, e insere o novo no lugar.
function replaceHeadBlock(html, newBlock) {
  const re = /<title>[\s\S]*?<meta name="twitter:image"[^>]*>/;
  if (!re.test(html)) {
    throw new Error("Bloco de meta tags (Bloco 1) não encontrado no template — verifique se o arquivo ainda tem <title>/meta description/OG.");
  }
  return html.replace(re, newBlock);
}

function stripExistingJsonLd(html, id) {
  const re = new RegExp(`<script type="application/ld\\+json" id="${id}">[\\s\\S]*?</script>\\s*`, "g");
  return html.replace(re, "");
}

// ============================================================
// AERONAVES
// ============================================================
function fmtPrice(a) {
  if (a.sobConsulta || a.priceNum == null) return null;
  return a.currency === "BRL" ? "R$" + Number(a.priceNum).toLocaleString("pt-BR") : "USD " + Number(a.priceNum).toLocaleString("en-US");
}

async function generateAircraftPage(template, a, outDir) {
  const slug = aircraftSlug(a);
  const url = `${SITE_URL}/aeronaves/${slug}/`;
  const price = fmtPrice(a);
  const title = `${a.model}${a.year ? " " + a.year : ""} | Plane Aviation`;
  const description = (
    a.description ||
    `${a.model}${a.year ? ", " + a.year : ""}${a.condition ? " — " + a.condition : ""}${price ? ". " + price : ""}. Aeronave Cirrus disponível na Plane Aviation, representante exclusiva da marca no Brasil.`
  ).slice(0, 300);
  const image = (a.images && a.images[0]) || OG_IMAGE_FALLBACK;

  let html = template;
  html = replaceHeadBlock(html, buildHeadBlock({ title, description, url, image, type: "website" }));
  html = stripExistingJsonLd(html, "aircraft-jsonld");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: a.model,
    description,
    image: a.images && a.images.length ? a.images : [image],
    brand: { "@type": "Brand", name: "Cirrus Aircraft" },
    itemCondition: /novo|new/i.test(a.condition || "") ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
    ...(a.priceNum != null && !a.sobConsulta
      ? { offers: { "@type": "Offer", priceCurrency: a.currency || "USD", price: a.priceNum, availability: "https://schema.org/InStock", url } }
      : {}),
  };

  // Injeta o id da aeronave (pro JS existente saber qual documento buscar,
  // sem depender de query string) e o JSON-LD real, logo no <head>.
  html = html.replace(
    "<head>",
    `<head>\n${BASE_TAG}\n<script>window.__AIRCRAFT_ID__=${JSON.stringify(a.id)};</script>\n<script type="application/ld+json" id="aircraft-jsonld">${JSON.stringify(jsonLd)}</script>`
  );

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
  return slug;
}

async function generateAircraftStub(outDir, url) {
  const title = "Aeronave não disponível | Plane Aviation";
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
${BASE_TAG}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="stylesheet" href="styles.css">
</head>
<body class="bg-radial-dark">
<div id="site-header"></div>
<main>
  <div class="container" style="padding:6rem 0;text-align:center">
    <p class="eyebrow dark">Estoque</p>
    <h1 class="h-display" style="color:#fff;margin-bottom:1rem">Esta aeronave não está mais disponível</h1>
    <p class="muted" style="margin-bottom:2rem">Ela pode já ter sido vendida ou retirada do estoque. Veja as aeronaves disponíveis agora:</p>
    <a href="aeronaves.html" class="btn btn-solid">Ver Aeronaves Disponíveis</a>
  </div>
</main>
<div id="site-footer"></div>
<script src="js/i18n.js" defer></script>
<script src="js/site.js" defer></script>
</body>
</html>`;
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
}

// ============================================================
// ARTIGOS
// ============================================================
async function generateArticlePage(template, a, outDir) {
  const slug = articleSlug(a);
  const url = `${SITE_URL}/artigos/${slug}/`;
  const title = `${a.title} | Plane Aviation`;
  const description = (a.excerpt || (a.content || "").slice(0, 200).replace(/\n/g, " ")).trim().slice(0, 300);
  const image = a.imageUrl || OG_IMAGE_FALLBACK;
  const dateISO = a.createdAt ? new Date(a.createdAt).toISOString() : new Date().toISOString();

  let html = template;
  html = replaceHeadBlock(html, buildHeadBlock({ title, description, url, image, type: "article" }));
  html = stripExistingJsonLd(html, "article-jsonld");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description,
    image: [image],
    datePublished: dateISO,
    author: { "@type": "Organization", name: "Plane Aviation" },
    publisher: { "@type": "Organization", name: "Plane Aviation" },
  };

  html = html.replace(
    "<head>",
    `<head>\n${BASE_TAG}\n<script>window.__ARTICLE_ID__=${JSON.stringify(a.id)};</script>\n<script type="application/ld+json" id="article-jsonld">${JSON.stringify(jsonLd)}</script>`
  );

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
  return slug;
}

async function generateArticleStub(outDir) {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
${BASE_TAG}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Artigo não disponível | Plane Aviation</title>
<meta name="robots" content="noindex, follow">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="stylesheet" href="styles.css">
</head>
<body class="bg-radial-dark">
<div id="site-header"></div>
<main>
  <div class="container" style="padding:6rem 0;text-align:center">
    <p class="eyebrow dark">Editorial</p>
    <h1 class="h-display" style="color:#fff;margin-bottom:1rem">Este artigo não está mais disponível</h1>
    <a href="news.html" class="btn btn-solid">Ver Todos os Artigos</a>
  </div>
</main>
<div id="site-footer"></div>
<script src="js/i18n.js" defer></script>
<script src="js/site.js" defer></script>
</body>
</html>`;
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
}

// ------------------------------------------------------------
// Remove pastas geradas que não correspondem mais a nenhum item
// ativo, convertendo em "stub" (não apaga de vez — sem 404).
// ------------------------------------------------------------
async function reconcileFolder(parentDir, activeSlugsSet, stubFn) {
  let existing = [];
  try {
    existing = await fs.readdir(parentDir, { withFileTypes: true });
  } catch {
    return; // pasta ainda não existe
  }
  for (const entry of existing) {
    if (!entry.isDirectory()) continue;
    if (!activeSlugsSet.has(entry.name)) {
      await stubFn(path.join(parentDir, entry.name));
    }
  }
}

// ------------------------------------------------------------
// sitemap.xml — reconstruído do zero a cada execução
// ------------------------------------------------------------
async function writeSitemap(aircraftSlugs, articleSlugs) {
  const staticUrls = [
    { loc: "/", freq: "weekly", pri: "1.0" },
    { loc: "/aeronaves.html", freq: "daily", pri: "0.9" },
    { loc: "/universo-cirrus.html", freq: "monthly", pri: "0.8" },
    { loc: "/servicos.html", freq: "monthly", pri: "0.7" },
    { loc: "/sobre.html", freq: "monthly", pri: "0.6" },
    { loc: "/news.html", freq: "weekly", pri: "0.6" },
    { loc: "/contato.html", freq: "yearly", pri: "0.5" },
  ];

  const urlXml = (loc, freq, pri) =>
    `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;

  const parts = [
    ...staticUrls.map((u) => urlXml(u.loc, u.freq, u.pri)),
    ...aircraftSlugs.map((s) => urlXml(`/aeronaves/${s}/`, "weekly", "0.8")),
    ...articleSlugs.map((s) => urlXml(`/artigos/${s}/`, "monthly", "0.5")),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${parts.join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(ROOT, "sitemap.xml"), xml, "utf-8");
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log("→ Buscando dados no Firestore...");
  const [aircraftDocs, articleDocs] = await Promise.all([
    fetchCollection("aircraft"),
    fetchCollection("articles"),
  ]);

  const activeAircraft = aircraftDocs.filter((a) => !a.archived);
  console.log(`  ${aircraftDocs.length} aeronaves no total, ${activeAircraft.length} ativas.`);
  console.log(`  ${articleDocs.length} artigos.`);

  const aeronaveTemplate = await fs.readFile(path.join(ROOT, "aeronave.html"), "utf-8");
  const artigoTemplate = await fs.readFile(path.join(ROOT, "artigo.html"), "utf-8");

  const aeronavesDir = path.join(ROOT, "aeronaves");
  const artigosDir = path.join(ROOT, "artigos");

  // --- Aeronaves ativas: gera/atualiza página + manifesto id→slug ---
  const aircraftManifest = {};
  const activeAircraftSlugs = new Set();
  for (const a of activeAircraft) {
    const slug = await generateAircraftPage(aeronaveTemplate, a, path.join(aeronavesDir, aircraftSlug(a)));
    aircraftManifest[a.id] = slug;
    activeAircraftSlugs.add(slug);
  }
  await fs.mkdir(aeronavesDir, { recursive: true });
  await fs.writeFile(path.join(aeronavesDir, "index.json"), JSON.stringify(aircraftManifest, null, 2), "utf-8");

  // --- Aeronaves que existem em disco mas não estão mais ativas → stub ---
  await reconcileFolder(aeronavesDir, activeAircraftSlugs, (dir) => generateAircraftStub(dir, `${SITE_URL}/aeronaves.html`));

  // --- Artigos: gera/atualiza página + manifesto id→slug ---
  const articleManifest = {};
  const activeArticleSlugs = new Set();
  for (const a of articleDocs) {
    const slug = await generateArticlePage(artigoTemplate, a, path.join(artigosDir, articleSlug(a)));
    articleManifest[a.id] = slug;
    activeArticleSlugs.add(slug);
  }
  await fs.mkdir(artigosDir, { recursive: true });
  await fs.writeFile(path.join(artigosDir, "index.json"), JSON.stringify(articleManifest, null, 2), "utf-8");

  await reconcileFolder(artigosDir, activeArticleSlugs, (dir) => generateArticleStub(dir));

  // --- sitemap.xml ---
  await writeSitemap([...activeAircraftSlugs], [...activeArticleSlugs]);

  console.log(`✓ ${activeAircraftSlugs.size} páginas de aeronave geradas.`);
  console.log(`✓ ${activeArticleSlugs.size} páginas de artigo geradas.`);
  console.log("✓ sitemap.xml atualizado.");
}

main().catch((err) => {
  console.error("Erro ao gerar páginas estáticas:", err);
  process.exit(1);
});
