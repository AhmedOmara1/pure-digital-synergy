import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const clientDir = join(rootDir, "dist", "client");
const serverEntry = join(rootDir, "dist", "server", "server.js");

const routes = [
  { path: "/", file: "index.html" },
  { path: "/about", file: "about/index.html" },
  { path: "/services", file: "services/index.html" },
  { path: "/portfolio", file: "portfolio/index.html" },
  { path: "/testimonials", file: "testimonials/index.html" },
  { path: "/faq", file: "faq/index.html" },
  { path: "/contact", file: "contact/index.html" },
  { path: "/sitemap.xml", file: "sitemap.xml" },
];

const { default: server } = await import(pathToFileURL(serverEntry).href);

for (const route of routes) {
  const response = await server.fetch(new Request(`https://puredigital.ae${route.path}`), {}, {});

  if (!response.ok) {
    throw new Error(`Failed to prerender ${route.path}: ${response.status} ${response.statusText}`);
  }

  const outputPath = join(clientDir, route.file);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, await response.text());
}

console.log(`Prerendered ${routes.length} route(s) into dist/client`);
