import "@hirakada/ui/styles/global.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { FirebaseInitializer } from "@hirakada/firebase";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_GBU_SITE_URL!),

  title: {
    absolute: "GBU CENTER",
  },

  description:
    "GBU CENTER — ATK • Print • Fotokopi • PPOB di Bulak, Surabaya.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "GBU CENTER",
    description:
      "GBU CENTER — ATK • Print • Fotokopi • PPOB di Bulak, Surabaya.",
    type: "website",
    url: "/",
  },

  twitter: {
    title: "GBU CENTER",
    description:
      "GBU CENTER — ATK • Print • Fotokopi • PPOB di Bulak, Surabaya.",
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
        <FirebaseInitializer />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S8MLFTKJQ3');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S8MLFTKJQ3"
          strategy="beforeInteractive"
        />

        {/* Google AdSense — load once */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GBU_ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />

        {children}
      </body>
    </html>
  );
}