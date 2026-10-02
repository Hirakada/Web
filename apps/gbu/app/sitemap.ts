import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://gbu.hirakada.com";

const IGNORED_DIRECTORIES = new Set([
  "api",
]);

function isPageFile(name: string) {
  return name === "page.tsx" || name === "page.ts";
}

function shouldIgnoreDirectory(name: string) {
  return (
    name.startsWith("_") ||
    name.startsWith(".") ||
    name.startsWith("(") ||
    name.startsWith("@") ||
    name.startsWith("[")
  );
}

function findStaticRoutes(
  directory: string,
  currentRoute = "",
): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const routes: string[] = [];

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  const hasPage = entries.some(
    (entry) => entry.isFile() && isPageFile(entry.name),
  );

  if (hasPage && currentRoute) {
    routes.push(currentRoute);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const name = entry.name;

    if (
      shouldIgnoreDirectory(name) ||
      IGNORED_DIRECTORIES.has(name)
    ) {
      continue;
    }

    routes.push(
      ...findStaticRoutes(
        path.join(directory, name),
        `${currentRoute}/${name}`,
      ),
    );
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDirectory = path.join(process.cwd(), "app");

  const routes = [
    "/",
    ...findStaticRoutes(appDirectory),
  ];

  const uniqueRoutes = [...new Set(routes)];

  return uniqueRoutes.map((route) => ({
    url: route === "/" ? BASE_URL : `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}