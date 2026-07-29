import type { Metadata } from "next";

import { SITE } from "./site";


export const defaultMetadata: Metadata = {

  metadataBase:
    new URL(SITE.url),


  title: {
    default:
      `${SITE.name} | ${SITE.owner}`,

    template:
      `%s | ${SITE.name}`,
  },


  description:
    SITE.description,


  applicationName:
    SITE.name,


  authors: [
    {
      name:
        SITE.author.name,

      url:
        SITE.author.url,
    },
  ],


  creator:
    SITE.owner,


  publisher:
    SITE.owner,


  generator:
    "Next.js",


  keywords:
    [...SITE.keywords],


  category:
    "technology",


  referrer:
    "origin-when-cross-origin",


  alternates: {
    canonical:
      "/",
  },


  robots: {
    index:
      true,

    follow:
      true,

    googleBot: {
      index:
        true,

      follow:
        true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },


  openGraph: {

    type:
      "website",

    locale:
      "en_US",

    siteName:
      SITE.name,


    title:
      `${SITE.name} | ${SITE.owner}`,


    description:
      SITE.description,


    images: [
      {
        url:
          SITE.images.og,

        width:
          1200,

        height:
          630,

        alt:
          `${SITE.name} | ${SITE.owner}`,
      },
    ],
  },


  twitter: {

    card:
      "summary_large_image",


    title:
      `${SITE.name} | ${SITE.owner}`,


    description:
      SITE.description,


    creator:
      SITE.social.x
        ? SITE.social.x
        : undefined,


    images: [
      SITE.images.twitter,
    ],
  },


  icons: {

    icon: [
      {
        url:
          "/icon.svg",

        type:
          "image/svg+xml",
      },

      {
        url:
          "/favicon.ico",

        type:
          "image/x-icon",
      },
    ],


    apple:
      "/apple-icon.png",
  },


  manifest:
    "/manifest.webmanifest",


  appleWebApp: {

    capable:
      true,


    title:
      SITE.name,


    statusBarStyle:
      "black-translucent",
  },


  formatDetection: {

    telephone:
      false,

    email:
      false,

    address:
      false,
  },

};