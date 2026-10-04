import "@hirakada/ui/styles/global.css";

import type {
  Metadata,
  Viewport,
} from "next";
import Script from "next/script";

import {
  bodyFont,
  defaultMetadata,
  headingFont,
} from "@hirakada/config";
import { FirebaseInitializer } from "@hirakada/firebase";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#101010",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        dark
        ${headingFont.variable}
        ${bodyFont.variable}
      `}
    >
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
        {children}
      </body>
    </html>
  );
}