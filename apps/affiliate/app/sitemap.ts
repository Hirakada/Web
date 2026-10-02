import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://affiliate.hirakada.com";

function isPageFile(name: string) {
  return name === "page.tsx" || name === "page.ts";
}

function isRouteGroup(name: string) {
  return name.startsWith("(") && name.endsWith(")");
}

function isDynamicRoute(name: string) {
  return name.startsWith("[") && name.endsWith("]");
}

function shouldIgnore(name: string) {
  return (
    name.startsWith("_") ||
    name.startsWith(".") ||
    name.startsWith("@") ||
    name === "api"
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

    if (shouldIgnore(name)) {
      continue;
    }

    // Dynamic routes are handled by Supabase.
    if (isDynamicRoute(name)) {
      continue;
    }

    const childRoute = isRouteGroup(name)
      ? currentRoute
      : `${currentRoute}/${name}`;

    routes.push(
      ...findStaticRoutes(
        path.join(directory, name),
        childRoute,
      ),
    );
  }

  return routes;
}

/**
 * Categories
 *
 * Example:
 * /electronics
 * /fashion
 */
async function getCategoryRoutes(): Promise<
  MetadataRoute.Sitemap
> {
  // Supabase query goes here.
  return [];
}

/**
 * Subcategories
 *
 * Example:
 * /electronics/gaming
 * /electronics/accessories
 */
async function getSubcategoryRoutes(): Promise<
  MetadataRoute.Sitemap
> {
  // Supabase query goes here.
  return [];
}

/**
 * Products
 *
 * Example:
 * /product/legion-5
 * /product/mouse-lumi-g1
 */
async function getProductRoutes(): Promise<
  MetadataRoute.Sitemap
> {
  // Supabase query goes here.
  return [];
}

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap
> {
  const appDirectory = path.join(
    process.cwd(),
    "app",
  );

  /*
   * Static routes only.
   *
   * Dynamic routes such as [category],
   * [subcategory], and [slug] are excluded here.
   */
  const staticRoutes = findStaticRoutes(
    appDirectory,
  );

  const staticEntries: MetadataRoute.Sitemap =
    [...new Set(staticRoutes)].map((route) => ({
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

  const [
    categoryEntries,
    subcategoryEntries,
    productEntries,
  ] = await Promise.all([
    getCategoryRoutes(),
    getSubcategoryRoutes(),
    getProductRoutes(),
  ]);

  return [
    ...staticEntries,
    ...categoryEntries,
    ...subcategoryEntries,
    ...productEntries,
  ];
}