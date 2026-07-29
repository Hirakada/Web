import "@hirakada/ui/styles/global.css";

import type { Metadata } from "next";

import {
  bodyFont,
  defaultMetadata,
  headingFont,
} from "@hirakada/config";

import AppHeader from "@/components/AppHeader";

import {
  ScrollIndicator
} from "@hirakada/ui";

export const metadata: Metadata = defaultMetadata;

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
        <ScrollIndicator />
        <AppHeader />
        {children}
      </body>
    </html>
  );
}