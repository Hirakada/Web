import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://portfolio.hirakada.com";

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
 * Connect this to the SAME source used by
 * app/projects/[slug]/page.tsx.
 *
 * Do not create a second, separate project list if your
 * portfolio already has a data source.
 */
async function getProjectRoutes(): Promise<MetadataRoute.Sitemap> {
  // Example:
  //
  // const projects = await getProjects();
  //
  // return projects.map((project) => ({
  //   url: `${BASE_URL}/projects/${project.slug}`,
  //   lastModified: project.updatedAt
  //     ? new Date(project.updatedAt)
  //     : new Date(),
  //   changeFrequency: "monthly",
  //   priority: 0.7,
  // }));

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

  const projectEntries = await getProjectRoutes();

  return [
    ...staticEntries,
    ...projectEntries,
  ];
}