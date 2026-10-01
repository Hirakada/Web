import "@hirakada/ui/styles/global.css";

import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#101010",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="relative overflow-x-hidden bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}