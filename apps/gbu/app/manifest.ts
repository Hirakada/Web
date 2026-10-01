import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GBU CENTER",
    short_name: "GBU",
    description:
      "GBU CENTER — ATK, Print, Fotocopy, dan PPOB di Bulak, Surabaya.",

    start_url: "/",
    display: "standalone",

    background_color: "#101010",
    theme_color: "#101010",

    icons: [
      {
        src: "/brand/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/brand/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}