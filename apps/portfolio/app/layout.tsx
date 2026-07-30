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
import AppFooter from "@/components/AppFooter";


export const metadata: Metadata = {
  ...defaultMetadata,

  title: {
    default:
      "Portfolio | Hizkya Raka Priananda",

    template:
      "%s | Portfolio | Hirakada",
  },


  description:
    "Explore software engineering projects, web applications, UI/UX case studies, and digital products created by Hizkya Raka Priananda.",


  keywords: [
    "Hizkya Raka Priananda Portfolio",
    "Software Engineering Projects",
    "Next.js Projects",
    "React Applications",
    "Web Development",
    "UI UX Case Studies",
  ],


  alternates: {
    canonical: "/",
  },


  openGraph: {
    ...defaultMetadata.openGraph,

    title:
      "Portfolio | Hizkya Raka Priananda",

    description:
      "A collection of software engineering projects, web applications, UI/UX designs, and digital experiences created by Hizkya Raka Priananda.",

    url:
      "/",
  },


  twitter: {
    ...defaultMetadata.twitter,

    title:
      "Portfolio | Hizkya Raka Priananda",

    description:
      "Explore software engineering projects, web applications, UI/UX case studies, and digital products.",
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
      className={`
        dark
        ${headingFont.variable}
        ${bodyFont.variable}
      `}
    >

      <body>

        <AppHeader />

        <main>
          {children}
        </main>

        <AppFooter/>
      </body>

    </html>
  );
}