import "@hirakada/ui/styles/global.css";

import type { Metadata, Viewport } from "next";

import { bodyFont, headingFont } from "@hirakada/config";
import { GlobalBackground } from "@hirakada/ui";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: {
    default: "Affiliate Picks",
    template: "%s | Affiliate Picks",
  },

  description:
    "Curated products worth checking out from selected marketplaces.",

  robots: {
    index: true,
    follow: true,
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
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${headingFont.variable} ${bodyFont.variable}`}
    >
      <body className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <GlobalBackground />

        <AppHeader />

        <main className="relative z-10">{children}</main>

        <AppFooter />
      </body>
    </html>
  );
}