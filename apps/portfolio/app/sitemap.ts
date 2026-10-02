import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://portfolio.hirakada.com";

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

  const hasPage = entries.some(
    (entry) =>
      entry.isFile() && isPageFile(entry.name),
  );

  if (hasPage) {
    routes.push(currentRoute || "/");
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const name = entry.name;

    // API/private directories
    if (shouldIgnoreDirectory(name)) {
      continue;
    }

    // Dynamic route such as [id]
    // It will be handled separately.
    if (isDynamicRoute(name)) {
      continue;
    }

    const childDirectory = path.join(
      directory,
      name,
    );

    // Route groups do not appear in URL.
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

/**
 * IMPORTANT:
 *
 * Replace this function with the SAME data source
 * that is used by app/[id]/page.tsx.
 *
 * Example result:
 *
 * [
 *   {
 *     id: "matcha-kun",
 *     updatedAt: "2026-09-20",
 *   },
 *   {
 *     id: "katamesta",
 *     updatedAt: "2026-09-25",
 *   },
 * ]
 */
async function getPortfolioRoutes(): Promise<
  MetadataRoute.Sitemap
> {
  /*
   * Example:
   *
   * const projects = await getProjects();
   *
   * return projects.map((project) => ({
   *   url: `${BASE_URL}/${project.id}`,
   *   lastModified: project.updatedAt
   *     ? new Date(project.updatedAt)
   *     : new Date(),
   *   changeFrequency: "monthly",
   *   priority: 0.7,
   * }));
   */

  return [];
}

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap
> {
  const appDirectory = path.join(
    process.cwd(),
    "app",
  );

  // Static routes
  const staticRoutes = findStaticRoutes(
    appDirectory,
  );

  const uniqueStaticRoutes = [
    ...new Set(staticRoutes),
  ];

  const staticEntries: MetadataRoute.Sitemap =
    uniqueStaticRoutes.map((route) => ({
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

  // Dynamic /[id] routes
  const portfolioEntries =
    await getPortfolioRoutes();

  return [
    ...staticEntries,
    ...portfolioEntries,
  ];
}