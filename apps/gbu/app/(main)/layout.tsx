import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://gbu.hirakada.com"),

  title: {
    absolute: "GBU CENTER",
  },

  description:
    "GBU CENTER — ATK • Print • Fotocopy • PPOB di Bulak, Surabaya.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "GBU CENTER",
    description:
      "GBU CENTER — ATK • Print • Fotocopy • PPOB di Bulak, Surabaya.",
    type: "website",
    url: "/",
  },

  twitter: {
    title: "GBU CENTER",
    description:
      "GBU CENTER — ATK • Print • Fotocopy • PPOB di Bulak, Surabaya.",
    card: "summary_large_image",
  },
};

export default function GbuLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}