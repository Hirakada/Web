import "@hirakada/ui/styles/global.css";

import type {
  Metadata,
  Viewport,
} from "next";

import {
  bodyFont,
  defaultMetadata,
  headingFont,
} from "@hirakada/config";

import AppHeader from "@/components/AppHeader";

import {
  ScrollIndicator,
  GlobalBackground,
} from "@hirakada/ui";

import AppFooter from "@/components/AppFooter";

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
        <GlobalBackground/>
        <ScrollIndicator />

        <AppHeader />

        <main className="relative z-10">
          {children}
        </main>

        <AppFooter/>
      </body>
    </html>
  );
}