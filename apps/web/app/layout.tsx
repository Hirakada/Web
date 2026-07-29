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
} from "@hirakada/ui";


export const metadata: Metadata =
  defaultMetadata;


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

      <body>

        <ScrollIndicator />


        <AppHeader />


        {children}

      </body>

    </html>
  );
}