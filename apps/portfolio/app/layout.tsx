import "@hirakada/ui/styles/global.css";

import type { Metadata } from "next";

import {
  bodyFont,
  defaultMetadata,
  headingFont,
} from "@hirakada/config";

import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: "Portfolio | Hirakada",
    template: "%s | Portfolio | Hirakada",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <AppHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}