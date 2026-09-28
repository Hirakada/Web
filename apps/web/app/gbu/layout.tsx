import type { Metadata } from "next";

import { defaultMetadata } from "@hirakada/config";

export const metadata: Metadata = {
  ...defaultMetadata,

  title: {
    absolute: "GBU CENTER",
  },

  description:
    "GBU CENTER — ATK • Print • Fotocopy • PPOB di Bulak, Surabaya.",

  alternates: {
    canonical: "/gbu",
  },

  openGraph: {
    title: "GBU CENTER",
    description:
      "GBU CENTER — ATK • Print • Fotocopy • PPOB di Bulak, Surabaya.",
    type: "website",
  },

  twitter: {
    title: "GBU CENTER",
    description:
      "GBU CENTER — ATK • Print • Fotocopy • PPOB di Bulak, Surabaya.",
    card: "summary_large_image",
  },

  icons: {
    icon: [
      {
        url: "/gbu/logo.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function GbuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}