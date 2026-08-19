import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hirakada",

    short_name: "Hirakada",

    description:
      "Official portfolio of Hizkya Raka Priananda, showcasing software engineering projects, modern web applications, UI/UX design, and digital innovation.",

    start_url: "/",

    display: "standalone",

    background_color: "#101010",

    theme_color: "#101010",

    icons: [
      {
        src: "/brand/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}