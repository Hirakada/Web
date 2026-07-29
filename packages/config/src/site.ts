export const SITE = {
  name: "Hirakada",

  shortName: "Hirakada",

  owner:
    "Hizkya Raka Priananda",


  url:
    process.env.NEXT_PUBLIC_WEB_URL ??
    "https://hirakada.vercel.app",


  description:
    "Official portfolio of Hizkya Raka Priananda, showcasing software engineering projects, modern web applications, UI/UX design, and digital innovation.",


  locale:
    "en_US",


  keywords: [
    "Hizkya Raka Priananda",
    "Hirakada",
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "UI UX Design",
    "Software Engineering Portfolio",
    "Digital Innovation",
  ],


  theme: {
    color:
      "#101010",

    background:
      "#101010",
  },


  author: {
    name:
      "Hizkya Raka Priananda",

    url:
      process.env.NEXT_PUBLIC_WEB_URL ??
      "https://hirakada.vercel.app",
  },


  social: {
    github:
      "",

    linkedin:
      "",

    x:
      "",
  },


  images: {
    og:
      "/og-image.png",

    twitter:
      "/og-image.png",

    favicon:
      "/icon.svg",

    apple:
      "/apple-icon.png",
  },


} as const;