import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://affiliate.hirakada.com";

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

/**
 * Replace this function with your existing Supabase
 * server-side query for active affiliate products.
 *
 * Expected result:
 *
 * [
 *   {
 *     slug: "legion-5",
 *     updated_at: "2026-10-01T..."
 *   },
 *   ...
 * ]
 */
async function getProductRoutes(): Promise<MetadataRoute.Sitemap> {
  // TODO:
  // Connect to the existing Supabase client used by the app.
  //
  // Example shape:
  //
  // const products = await getProductsFromSupabase();
  //
  // return products.map((product) => ({
  //   url: `${BASE_URL}/products/${product.slug}`,
  //   lastModified: product.updated_at
  //     ? new Date(product.updated_at)
  //     : new Date(),
  //   changeFrequency: "weekly",
  //   priority: 0.7,
  // }));

  return [];
}

/**
 * Optional category slug routes.
 *
 * Use this if your affiliate app has category/[slug].
 */
async function getCategoryRoutes(): Promise<MetadataRoute.Sitemap> {
  // Connect this to your existing category query if categories
  // are stored dynamically in Supabase.

  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDirectory = path.join(process.cwd(), "app");

  const staticRoutes = [
    "/",
    ...findStaticRoutes(appDirectory),
  ];

  const staticEntries: MetadataRoute.Sitemap =
    [...new Set(staticRoutes)].map((route) => ({
      url:
        route === "/"
          ? BASE_URL
          : `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency:
        route === "/" ? "weekly" : "monthly",
      priority:
        route === "/" ? 1 : 0.8,
    }));

  const productEntries = await getProductRoutes();
  const categoryEntries = await getCategoryRoutes();

  return [
    ...staticEntries,
    ...categoryEntries,
    ...productEntries,
  ];
}