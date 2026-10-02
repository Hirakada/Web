import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://gbu.hirakada.com";

const IGNORED_DIRECTORIES = new Set([
  "api",
]);

function isPageFile(name: string): boolean {
  return name === "page.tsx" || name === "page.ts";
}

function isRouteGroup(name: string): boolean {
  return name.startsWith("(") && name.endsWith(")");
}

function isDynamicRoute(name: string): boolean {
  return (
    name.startsWith("[") &&
    name.endsWith("]")
  );
}

function shouldIgnoreDirectory(name: string): boolean {
  return (
    name.startsWith("_") ||
    name.startsWith(".") ||
    name.startsWith("@") ||
    IGNORED_DIRECTORIES.has(name)
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

  // Check whether this directory contains page.tsx/page.ts
  const hasPage = entries.some(
    (entry) =>
      entry.isFile() &&
      isPageFile(entry.name),
  );

  if (hasPage) {
    routes.push(currentRoute || "/");
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const name = entry.name;

    // Ignore API/private directories
    if (shouldIgnoreDirectory(name)) {
      continue;
    }

    // Dynamic routes such as [id] / [slug]
    // must be handled from their actual data source.
    if (isDynamicRoute(name)) {
      continue;
    }

    const childDirectory = path.join(
      directory,
      name,
    );

    /*
     * Route groups:
     *
     * (main)
     * (marketing)
     * (dashboard)
     *
     * do not appear in the URL.
     *
     * Example:
     *
     * app/(main)/layanan/page.tsx
     *
     * becomes:
     *
     * /layanan
     */
    const childRoute = isRouteGroup(name)
      ? currentRoute
      : `${currentRoute}/${name}`;

    routes.push(
      ...findStaticRoutes(
        childDirectory,
        childRoute,
      ),
    );
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDirectory = path.join(
    process.cwd(),
    "app",
  );

  const routes = findStaticRoutes(
    appDirectory,
  );

  const uniqueRoutes = [
    ...new Set(routes),
  ];

  return uniqueRoutes.map((route) => ({
    url:
      route === "/"
        ? BASE_URL
        : `${BASE_URL}${route}`,

    lastModified: new Date(),

    changeFrequency:
      route === "/"
        ? "weekly"
        : "monthly",

    priority:
      route === "/"
        ? 1
        : 0.8,
  }));
}